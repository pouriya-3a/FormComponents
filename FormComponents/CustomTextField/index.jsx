import { Grid, TextField, Typography, useTheme, MenuItem } from "@mui/material";
import React from "react";
// Import getIn from formik
import { getIn } from "formik";

export default function CustomTextField({
  formik,
  name,
  size,
  label,
  placeholder = "",
  minRows = 1,
  multiline = false,
  type = "text",
  select = false, // Added prop to determine if it's a select field
  options = [], // Array of options: [{ value: "...", label: "..." }]
}) {
  const theme = useTheme();

  // Extract values, touched, and errors securely using Formik's getIn
  const value = getIn(formik?.values, name) ?? "";
  const touched = getIn(formik?.touched, name);
  const error = getIn(formik?.errors, name);

  return (
    <Grid size={size}>
      {/* Label section */}
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

      <TextField
        select={select}
        type={type}
        size="small"
        fullWidth
        multiline={multiline}
        placeholder={placeholder}
        minRows={minRows}
        name={name}
        value={value}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        error={touched && Boolean(error)}
        helperText={touched && error}
        variant="outlined"
        SelectProps={{
          displayEmpty: true,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "background.default",
            minHeight: "55px",
          },
        }}
      >
        {/* Render placeholder as a disabled option if in select mode */}
        {select && placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}

        {/* Render dynamic options if in select mode */}
        {select &&
          options?.map((option, index) => (
            <MenuItem key={index} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
      </TextField>
    </Grid>
  );
}
