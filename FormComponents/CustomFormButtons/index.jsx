import { Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomFormButtons({ formik }) {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      sx={{
        mt: 4,
        pt: 2,
        justifyContent: "flex-end",
        gap: "8px",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => {
          formik?.resetForm();
          navigate(-1);
        }}
        sx={{
          borderColor: "error.main",
          color: "error.main",
          "&:hover": {
            borderColor: "error.dark",
            bgcolor: "error.main",
            color: "white",
          },
        }}
      >
        انصراف
      </Button>

      <Button
        type="submit"
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
            transform: "translateY(-1px)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {formik.isSubmitting ? "در حال ثبت..." : "ثبت"}
      </Button>
    </Stack>
  );
}
