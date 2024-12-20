import RoleplayForm from "../components/Roleplay/form/RoleplayForm";
import { Navigate } from "react-router-dom";
import { useRoleplayContext } from "../context/RoleplayContext";
import LayoutWrapper from "../components/common/LayoutWrapper";

const RoleplayInput: React.FC = () => {
  const { roleplayData } = useRoleplayContext();

  if (roleplayData) {
    return <Navigate to="/result" replace />;
  }

  return (
    <LayoutWrapper>
      <RoleplayForm />
    </LayoutWrapper>
  );
};

export default RoleplayInput;
