import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { getIn } from "formik";
import React from "react";

export default function CustomArrayTextField({
  formik,
  name,
  value = [],
  onChange,
  label,
  itemLabel = "آیتم",
  placeholder = "",
  size,
  addButtonText = "افزودن",
}) {
  const hasFormik = Boolean(formik && name);

  const fieldValue = hasFormik ? getIn(formik.values, name) : value;
  const fieldErrors = hasFormik ? getIn(formik.errors, name) : [];
  const fieldTouched = hasFormik ? getIn(formik.touched, name) : [];

  const items = Array.isArray(fieldValue) ? fieldValue : [];

  const hasEmptyItem = items.some((item) => !item || item.trim() === "");

  const setItems = (newItems) => {
    if (hasFormik) {
      formik.setFieldValue(name, newItems);
      return;
    }

    if (onChange) {
      onChange(newItems);
    }
  };

  const handleAdd = () => {
    if (hasEmptyItem) return;

    setItems([...items, ""]);
  };

  const handleChange = (index, newValue) => {
    const updatedItems = [...items];
    updatedItems[index] = newValue;

    setItems(updatedItems);
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(updatedItems);
  };

  return (
    <Grid size={size}>
      {label && (
        <Typography
          sx={{
            fontSize: { xs: ".85rem", md: ".85rem", xxl: "1rem" },
            mb: "8px",
          }}
        >
          {label}
        </Typography>
      )}

      <Box sx={{}}>
        <Stack spacing={1.5}>
          {items.map((item, index) => {
            const error = Array.isArray(fieldErrors)
              ? fieldErrors[index]
              : undefined;

            const touched = Array.isArray(fieldTouched)
              ? fieldTouched[index]
              : undefined;

            const hasError = Boolean(touched && error);

            return (
              <Stack
                key={index}
                direction="row"
                gap={1}
                alignItems="flex-start"
              >
                <TextField
                  size="small"
                  fullWidth
                  placeholder={placeholder}
                  value={item}
                  onChange={(event) => handleChange(index, event.target.value)}
                  onBlur={() => {
                    if (hasFormik) {
                      formik.setFieldTouched(`${name}[${index}]`, true);
                    }
                  }}
                  error={hasError}
                  helperText={hasError ? error : ""}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "background.default",
                      minHeight: "55px",
                    },
                  }}
                />

                <IconButton
                  color="error"
                  onClick={() => handleDelete(index)}
                  sx={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "10px",
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            );
          })}

          <Button
            variant="outlined"
            size="small"
            startIcon={<Add />}
            onClick={handleAdd}
            disabled={hasEmptyItem}
            sx={{
              width: "fit-content",
              borderRadius: "10px",
              mt: items.length ? 0.5 : 0,
            }}
          >
            {addButtonText}
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
}
