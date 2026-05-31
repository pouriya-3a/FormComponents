import {
  CircularProgress,
  LinearProgress,
  Modal,
  Stack,
  useTheme,
} from "@mui/material";
import React from "react";

export default function LoadingModal({ loading }) {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        bgcolor: "transparent",
        backdropFilter: "blur(20px)",
        justifyContent: "center",
        alignItems: "center",
        display: loading ? "flex" : "none",
      }}
    >
      {/* <LinearProgress
        sx={{
          height: "4px",
          width: "150px",
          bgcolor: theme.palette.extra.darkBlue,
        }}
      /> */}
      <CircularProgress
        sx={{
        //   color: theme.palette.extra.darkBlue,
        }}
      />
    </Stack>
  );
}