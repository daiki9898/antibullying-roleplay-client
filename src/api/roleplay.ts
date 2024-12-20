import axios, { AxiosError, CancelToken } from "axios";
import { customRequest } from "./apiClient";
import { RoleplayResponse } from "../types/roleplayResponse";
import { RoleplayRequest } from "../types/roleplayRequest";

interface GenerateRoleplayOptions {
  onSuccess?: (response: RoleplayResponse) => void;
  onError?: (error: Error | AxiosError) => void;
  cancelToken?: CancelToken;
}

export const generateRoleplay = async (
  data: RoleplayRequest,
  options?: GenerateRoleplayOptions
): Promise<RoleplayResponse | null> => {
  try {
    const response = await customRequest<RoleplayResponse>({
      method: "POST",
      url: "/generate-roleplay",
      data,
      cancelToken: options?.cancelToken,
    });

    options?.onSuccess?.(response.data);
    return response.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.warn("リクエストがキャンセルされました", error);
    } else {
      options?.onError?.(error);
      console.error("エラーが発生しました:", error);
    }
    return null;
  }
};
