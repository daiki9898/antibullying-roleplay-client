import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { customRequest } from "../api/apiClient";
import { RoleplayResponse } from "../types/roleplayResponse";
import { Box, CircularProgress, Fade, Typography } from "@mui/material";

const CreateDocument = () => {
  const navigate = useNavigate();
  // 開発環境用のフラグ
  const hasInitialized = useRef(false);

  useEffect(() => {
    // 開発環境で2回アクセスされるのを防ぐ
    if (hasInitialized.current) return;

    (async () => {
      hasInitialized.current = true;
      // ローカルストレージからデータを取得
      let roleplayData: RoleplayResponse;
      try {
        const storedData = localStorage.getItem("roleplayData");
        if (!storedData) {
          throw new Error("ローカルストレージからデータを取得できません");
        }
        roleplayData = JSON.parse(storedData);
      } catch (error) {
        console.error("ローカルストレージからデータを取得できません", error);
        navigate("/result");
      }
      console.log("roleplayData", roleplayData!);
      // URLから認証コードを取得
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");

      if (accessToken) {
        try {
          const response = await customRequest<{ document_url: string }>({
            method: "POST",
            url: "/create-document",
            data: {
              access_token: accessToken,
              data: roleplayData!,
            },
          });
          window.location.href = response.data.document_url;
          localStorage.removeItem("roleplayData");
        } catch (error) {
          console.error("ドキュメントの作成に失敗しました", error);
          navigate("/result");
        }
      } else {
        console.error("認証コードが見つかりません");
        navigate("/result");
      }
    })();
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Fade in={true}>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
          <Typography
            variant="h5"
            sx={{
              mt: 3,
              mb: 1,
              fontWeight: "medium",
            }}
          >
            ドキュメントを作成しています
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ animation: "ellipsis 1.5s infinite" }}
          >
            しばらくお待ちください...
          </Typography>
        </Box>
      </Fade>

      <style>
        {`
          @keyframes ellipsis {
            0% { opacity: .2; }
            50% { opacity: 1; }
            100% { opacity: .2; }
          }
        `}
      </style>
    </Box>
  );
};

export default CreateDocument;
