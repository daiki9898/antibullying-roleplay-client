import RoleplayResultComponent from "../components/Roleplay/result/RoleplayResult";
import { Navigate } from "react-router-dom";
import { useRoleplayContext } from "../context/RoleplayContext";
import LayoutWrapper from "../components/common/LayoutWrapper";

const RoleplayResult: React.FC = () => {
  const { roleplayData } = useRoleplayContext();

  if (!roleplayData) {
    return <Navigate to="/input" replace />;
  }

  return (
    <LayoutWrapper>
      <RoleplayResultComponent />
    </LayoutWrapper>
  );
};

export default RoleplayResult;
