import OverviewSection from "./OverviewSection";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LEARNING_GOAL_OPTIONS } from "../../../constants/options/learningOptions";
import { useState } from "react";
import CustomDivider from "../../common/CustomDivider";
import { customRequest } from "../../../api/apiClient";
import { RoleplayRequest } from "../../../types/roleplayRequest";
import { MIN_CHARACTER } from "../../../constants/appConstants";
import { FORM_FIELD_NAMES } from "../../../constants/formFieldNames";
import { GRADE_OPTIONS } from "../../../constants/options/gradeOptions";
import { RoleplayResponse } from "../../../types/roleplayResponse";
import {
  useFormDataContext,
  useRoleplayContext,
} from "../../../context/RoleplayContext";
import { useForm } from "react-hook-form";
import { BULLYING_TYPE_OPTIONS } from "../../../constants/options/bullyingTypeOptions";
import { BULLYING_SEVERITY_OPTIONS } from "../../../constants/options/bullyingSeverityOptions";
import { useNavigate } from "react-router-dom";
import axios, { CancelTokenSource } from "axios";
import LoadingBackdrop from "../../common/LoadingBackdrop";
import { PurposeSection } from "./PurposeSection";

const RoleplayForm: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormDataContext();

  // デフォルト値を設定
  const defaultValues: RoleplayRequest = formData || {
    [FORM_FIELD_NAMES.LEARNING_GOAL]: LEARNING_GOAL_OPTIONS[0].value,
    [FORM_FIELD_NAMES.GRADE]: GRADE_OPTIONS[0].value,
    [FORM_FIELD_NAMES.BULLYING_TYPE]: BULLYING_TYPE_OPTIONS[0].value,
    [FORM_FIELD_NAMES.BULLYING_SEVERITY]: BULLYING_SEVERITY_OPTIONS[0].value,
    [FORM_FIELD_NAMES.CHARACTER_COUNT]: MIN_CHARACTER,
    [FORM_FIELD_NAMES.BULLYING_SITUATION]: "",
  };
  // フォームを初期化
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RoleplayRequest>({
    defaultValues,
    mode: "onChange",
  });

  const { setRoleplayData } = useRoleplayContext();
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );
  watch(FORM_FIELD_NAMES.CHARACTER_COUNT);

  // フォーム送信
  const onSubmit = async (data: RoleplayRequest) => {
    // キャンセルトークンを設定
    const source = axios.CancelToken.source();
    setCancelToken(source);

    // フォームデータを更新
    setFormData(data);

    // ロールプレイ作成APIを呼び出す
    try {
      const response = await customRequest<RoleplayResponse>({
        method: "POST",
        url: "/generate-roleplay",
        data: data,
        cancelToken: source.token,
      });
      setRoleplayData(response.data);
      navigate("/result");
    } catch (error) {
      if (axios.isCancel(error)) {
        // 開発環境のみログを出力
        if (import.meta.env.DEV) {
          console.warn("リクエストがキャンセルされました", error);
        }
      } else {
        console.error("ロールプレイ作成に失敗しました:", error);
      }
    }
  };

  // ロールプレイ作成を中止
  const cancelRequest = () => {
    if (cancelToken) {
      cancelToken.cancel();
      setCancelToken(null);
      // 入力画面に戻る
      navigate("/input");
    }
  };

  return (
    <>
      {/* Form */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={5}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* タイトル */}
        <Box textAlign="center">
          <Typography variant="h4">新規教材作成</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", fontStyle: "italic" }}
          >
            情報を入力し、ロールプレイを作成しましょう。
          </Typography>
        </Box>

        {/* 入力エリア */}
        <Paper elevation={4} sx={{ padding: "2rem", margin: "2rem 0" }}>
          <PurposeSection control={control} />
          <CustomDivider />
          <OverviewSection control={control} errors={errors} />
        </Paper>

        {/* footer */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {/* 作成ボタン */}
          <Button
            type="submit"
            size="large"
            variant="contained"
            disabled={isSubmitting}
          >
            教材を作成する
          </Button>
          {/* AI使用時の注意 */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            ※
            AIが生成する内容は完璧ではなく、不適切な内容が含まれる可能性があります。
            <br />
            必ず内容を確認してからご使用ください。
          </Typography>
        </Box>
      </Box>

      {/* ローディングオーバーレイ */}
      <LoadingBackdrop isOpen={isSubmitting} onCancel={cancelRequest} />
    </>
  );
};

export default RoleplayForm;
