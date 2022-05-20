import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

interface SnackBarData {
  severity: "error" | "warning" | "info" | "success";
  message: string;
}

export function showErrorMessage(message: string) {
  const snackData = { severity: "error", message };
  const customEvent = new CustomEvent("snackMessage", {
    detail: { snackData },
  });
  document.dispatchEvent(customEvent);
}

export function showSuccessMessage(message: string) {
  const snackData = { severity: "success", message };
  const customEvent = new CustomEvent("snackMessage", {
    detail: { snackData },
  });
  document.dispatchEvent(customEvent);
}

export function sendSnackMessage(data: SnackBarData) {
  const snackData = data;
  const customEvent = new CustomEvent("snackMessage", {
    detail: { snackData },
  });
  document.dispatchEvent(customEvent);
}

export default function SnackbarComponent() {
  const [snackData, setSnackData] = useState<SnackBarData | null>(null);

  useEffect(() => {
    document.addEventListener("snackMessage", updateSnackData);
    return () => {
      document.removeEventListener("snackMessage", updateSnackData);
    };
  }, []);

  const updateSnackData = (event: any) => {
    setSnackData(event.detail.snackData);
  };

  return (
    snackData && (
      <Snackbar
        open={!!snackData}
        autoHideDuration={6000}
        onClose={() => setSnackData(null)}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert elevation={6} variant="filled" severity={snackData.severity}>
          {snackData.message}
        </Alert>
      </Snackbar>
    )
  );
}
