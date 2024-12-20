import { Container } from "@mui/material";
import AppBar from "../AppBar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <>
      <AppBar />
      <Container sx={{ mb: 3 }}>{children}</Container>
      <footer>
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <p style={{ color: "#000", margin: 0 }}>
            &copy; 2024 PeacefulSchool. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default LayoutWrapper;
