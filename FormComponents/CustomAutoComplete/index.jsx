import {
  Grid,
  TextField,
  Typography,
  useTheme,
  Autocomplete,
} from "@mui/material";
import React from "react";
import { getIn } from "formik";

export default function CustomAutocomplete({
  formik,
  name,
  size,
  label,
  placeholder = "",
  options = [], // Array of options: [{ value: "...", label: "..." }]
  freeSolo = false, // Allow free text input
  multiple = false, // For multi-select
  loading = false, // For async loading
  disabled = false,
  getOptionLabel = (option) => option?.label || option || "",
  isOptionEqualToValue = (option, value) => option?.value === value?.value,
  onChange,
  onInputChange,
  ...rest
}) {
  const theme = useTheme();

  // Extract values, touched, and errors securely using Formik's getIn
  const value = getIn(formik?.values, name) ?? (multiple ? [] : null);
  const touched = getIn(formik?.touched, name);
  const error = getIn(formik?.errors, name);

  // Handle change for formik
  const handleChange = (event, newValue) => {
    if (multiple) {
      formik?.setFieldValue(name, newValue);
    } else {
      // For single select, store the whole object
      formik?.setFieldValue(name, newValue);
    }

    // Call custom onChange if provided
    if (onChange) {
      onChange(event, newValue);
    }
  };

  // Handle input change for freeSolo
  const handleInputChange = (event, newInputValue) => {
    if (freeSolo && !multiple) {
      formik?.setFieldValue(name, newInputValue);
    }

    if (onInputChange) {
      onInputChange(event, newInputValue);
    }
  };

  // Get current value for display
  const getCurrentValue = () => {
    if (multiple) return value || [];
    if (freeSolo) return value || "";
    return value || null;
  };

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

      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        value={getCurrentValue()}
        onChange={handleChange}
        onInputChange={handleInputChange}
        freeSolo={freeSolo}
        multiple={multiple}
        disabled={disabled}
        loading={loading}
        disablePortal
        fullWidth
        {...rest}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            name={name}
            placeholder={placeholder}
            error={touched && Boolean(error)}
            helperText={touched && error}
            onBlur={formik?.handleBlur}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "background.default",
                minHeight: "55px",
              },
            }}
          />
        )}
        sx={{
          "& .MuiAutocomplete-inputRoot": {
            bgcolor: "background.default",
            minHeight: "55px",
          },
        }}
      />
    </Grid>
  );
}
