import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { OWL_ICON } from "../../constants/appConstants";
import { useState, useEffect, useRef } from "react";
import "./LoadingBackdrop.css";

interface LoadingBackdropProps {
  isOpen: boolean;
  onCancel?: () => void;
  message?: string;
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
  isOpen,
  onCancel,
  message = "AIが教材を作成中です...",
}) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const messages = [
    "今日もお疲れ様",
    "今教材を作成しています。\nちょっと待ってね",
  ];

  useEffect(() => {
    if (!isOpen) {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setMessageIndex(0);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOpen, messages.length]);

  return (
    <Backdrop
      sx={{
        color: "#000",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
      open={isOpen}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h6" mb={4}>
            {message}
          </Typography>
          {onCancel && (
            <Button variant="contained" color="inherit" onClick={onCancel}>
              作成を中止する
            </Button>
          )}
        </Box>
      </Box>
      {/* キャラクター */}
      <Box
        component="img"
        src={OWL_ICON}
        alt="Owl Icon"
        sx={{
          position: "absolute",
          top: "30%",
          left: "65%",
          width: 150,
          height: 150,
          mt: 3,
          animation: "yurayura 2s linear infinite",
        }}
      />
      {/* メッセージ */}
      <Box
        className="message-container"
        position="absolute"
        top="15%"
        left="59%"
      >
        <Typography variant="body1">{messages[messageIndex]}</Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingBackdrop;
