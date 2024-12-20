import { createContext, useContext, useMemo, useState } from "react";
import { RoleplayResponse } from "../types/roleplayResponse";
import { RoleplayRequest } from "../types/roleplayRequest";

/* フォームのデータを管理するコンテキスト */

const FormDataContext = createContext<{
  formData: RoleplayRequest | null;
  setFormData: React.Dispatch<React.SetStateAction<RoleplayRequest | null>>;
} | null>(null);

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<RoleplayRequest | null>(null);

  const contextValue = useMemo(() => ({ formData, setFormData }), [formData]);

  return (
    <FormDataContext.Provider value={contextValue}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormDataContext = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error(
      "useFormDataContext must be used within a FormDataProvider"
    );
  }
  return context;
};

/* ロールプレイのデータを管理するコンテキスト */

const RoleplayContext = createContext<{
  roleplayData: RoleplayResponse | null;
  setRoleplayData: React.Dispatch<
    React.SetStateAction<RoleplayResponse | null>
  >;
} | null>(null);

export const RoleplayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [roleplayData, setRoleplayData] = useState<RoleplayResponse | null>(
    null
  );

  const contextValue = useMemo(
    () => ({ roleplayData, setRoleplayData }),
    [roleplayData]
  );

  return (
    <RoleplayContext.Provider value={contextValue}>
      {children}
    </RoleplayContext.Provider>
  );
};

export const useRoleplayContext = () => {
  const context = useContext(RoleplayContext);
  if (!context) {
    throw new Error(
      "useRoleplayContext must be used within a RoleplayProvider"
    );
  }
  return context;
};
