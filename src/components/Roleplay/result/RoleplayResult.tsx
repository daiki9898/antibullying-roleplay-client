import RoleplayDocument from "./RoleplayDocument";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  useFormDataContext,
  useRoleplayContext,
} from "../../../context/RoleplayContext";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { generateRoleplay } from "../../../api/roleplay";
import LoadingBackdrop from "../../common/LoadingBackdrop";
import axios, { CancelTokenSource } from "axios";

const RoleplayResult: React.FC = () => {
  const navigate = useNavigate();
  const { formData } = useFormDataContext(); // スコープ検討
  const { roleplayData, setRoleplayData } = useRoleplayContext();
  const [isLoading, setIsLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );

  // Scenario と Worksheet に個別の ref を用意
  const scenarioRef = useRef<HTMLDivElement>(null);
  const worksheetRef = useRef<HTMLDivElement>(null);

  // 入力画面に戻る
  const handleBack = () => {
    navigate("/input");
    setRoleplayData(null); // 要検討
  };

  /* 再作成関数 */

  // 送信
  const handleRegenerate = async () => {
    if (!formData) {
      console.error("フォームデータが見つかりません"); // error messageで管理出来たら嬉しい
      navigate("/input");
      return;
    }
    setIsLoading(true);
    const source = axios.CancelToken.source();
    setCancelToken(source);
    try {
      await generateRoleplay(formData, {
        onSuccess: (response) => setRoleplayData(response),
        onError: (error) => console.error("再作成に失敗しました:", error),
        cancelToken: source.token,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // キャンセル
  const cancelRequest = () => {
    if (cancelToken) {
      cancelToken.cancel();
      setCancelToken(null);
    }
  };

  /* ドキュメントで開く */
  const fetchAuthUrl = () => {
    try {
      localStorage.setItem("roleplayData", JSON.stringify(roleplayData));
    } catch (storageError) {
      console.error("ローカルストレージへの保存に失敗しました:", storageError);
    }
    try {
      window.open("http://localhost:8080/auth-url", "_blank");
    } catch (error) {
      console.error("認証ページが開けませんでした", error);
    }
  };

  /* PDFでダウンロード */
  const downloadPDF = async () => {
    try {
      if (!scenarioRef.current || !worksheetRef.current) return;

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210; // A4横幅 (mm)
      const pageHeight = 297; // A4縦幅 (mm)
      const margin = 20; // 余白を20mmに増やす
      const contentHeight = pageHeight - margin * 2;

      let currentHeight = margin; // 現在の描画位置

      // Scenario 全体を取得
      const scenarioElement = scenarioRef.current;

      // Intro と Scene 要素を取得
      const introElement = scenarioElement.querySelector(".intro");
      const sceneElements = scenarioElement.querySelectorAll(".scene");

      // **描画関数**: ページを超える場合は新しいページを追加
      const drawElement = async (
        element: HTMLElement,
        extraMarginTop = 0,
        extraMarginBottom = 0
      ) => {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - margin * 2; // 170mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // 要素がページを超える場合
        if (currentHeight + imgHeight + extraMarginTop > contentHeight) {
          pdf.addPage(); // 新しいページを追加
          currentHeight = margin; // 新しいページの高さをリセット
        }

        // マージンを反映して要素を描画
        currentHeight += extraMarginTop; // 上部マージンを追加
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          currentHeight,
          imgWidth,
          imgHeight
        );
        currentHeight += imgHeight + extraMarginBottom; // 要素の高さ + 下部マージンを加算
      };

      // **描画関数**
      const drawSimpleElement = async (
        element: HTMLElement,
        extraMarginTop = 0,
        extraMarginBottom = 0
      ) => {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - margin * 2; // 160mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // マージンを反映して要素を描画
        currentHeight += extraMarginTop; // 上部マージンを追加
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          currentHeight,
          imgWidth,
          imgHeight
        );
        currentHeight += imgHeight + extraMarginBottom; // 要素の高さ + 下部マージンを加算
      };

      // **Step 1: Intro を描画**
      if (introElement) {
        await drawElement(introElement as HTMLElement);
      }

      // **Step 2: Scene を順番に描画**
      for (const scene of sceneElements) {
        if (scene) {
          await drawElement(scene as HTMLElement, 2, 2);
        }
      }

      // **Step 3: Postscript を描画**
      const postscriptElement = scenarioElement.querySelector(".postscript");
      if (postscriptElement) {
        await drawElement(postscriptElement as HTMLElement);
      }

      // **Step 4: Worksheet を描画**
      if (worksheetRef.current) {
        pdf.addPage();
        currentHeight = margin;
        await drawSimpleElement(worksheetRef.current as HTMLElement);
      }

      pdf.save(`roleplay_${roleplayData!.scenario.title}.pdf`);
    } catch (error) {
      console.error("PDFの生成に失敗しました:", error);
    }
  };

  return (
    <Fade in={true}>
      <Box sx={{ position: "relative", maxWidth: "210mm", mx: "auto", mt: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          入力画面に戻る
        </Button>
        {/* ローディングオーバーレイ */}
        <LoadingBackdrop isOpen={isLoading} onCancel={cancelRequest} />
        {/* メインコンテンツ */}
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <Box sx={{ flex: 1 }}>
            <RoleplayDocument
              data={roleplayData!}
              refs={{ scenarioRef, worksheetRef }}
            />
          </Box>
          {/* ボタン群 */}
          <Paper
            elevation={3}
            sx={{
              height: "fit-content",
              p: 1,
              borderRadius: 1,
              position: "sticky",
              top: "100px",
            }}
          >
            <Stack spacing={2}>
              {/* 再作成 */}
              <Tooltip title="同じ条件で再作成する">
                <IconButton
                  onClick={handleRegenerate}
                  color="primary"
                  size="large"
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              {/* ドキュメントで開く */}
              <Tooltip title="ドキュメントで開く">
                <IconButton onClick={fetchAuthUrl} color="primary" size="large">
                  <DescriptionIcon />
                </IconButton>
              </Tooltip>
              {/* PDFでダウンロード */}
              <Tooltip title="PDFでダウンロード">
                <IconButton
                  onClick={downloadPDF}
                  color="secondary"
                  size="large"
                >
                  <PictureAsPdfIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Fade>
  );
};

export default RoleplayResult;
