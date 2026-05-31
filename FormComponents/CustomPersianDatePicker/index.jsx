import { Grid, TextField, Typography } from "@mui/material";
import { getIn } from "formik";
import React from "react";
import DatePicker from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import "react-multi-date-picker/styles/layouts/mobile.css";

function DatePickerInput({
  value,
  onFocus,
  onChange,
  placeholder,
  disabled,
  hasError,
  helperText,
}) {
  return (
    <TextField
      size="small"
      fullWidth
      value={value || ""}
      onFocus={onFocus}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      error={hasError}
      helperText={helperText}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          bgcolor: "background.default",
          minHeight: "55px",
        },
      }}
    />
  );
}

export default function CustomPersianDatePicker({
  formik,
  name,
  value = "",
  onChange,
  size,
  label,
  placeholder = "",
  timestampType = "ms",
  disabled = false,
}) {
  const hasFormik = Boolean(formik && name);

  const fieldValue = hasFormik ? getIn(formik.values, name) : value;
  const fieldError = hasFormik ? getIn(formik.errors, name) : undefined;
  const fieldTouched = hasFormik ? getIn(formik.touched, name) : undefined;

  const hasError = Boolean(fieldTouched && fieldError);

  const handleChange = (date) => {
    const timestamp = date
      ? timestampType === "seconds"
        ? Math.floor(date.valueOf() / 1000)
        : date.valueOf()
      : "";

    if (hasFormik) {
      formik.setFieldValue(name, timestamp);
      return;
    }

    if (onChange) {
      onChange(timestamp);
    }
  };

  const handleClose = () => {
    if (hasFormik) {
      formik.setFieldTouched(name, true);
    }
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

      <DatePicker
        value={fieldValue || ""}
        onChange={handleChange}
        onClose={handleClose}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        format="YYYY/MM/DD"
        disabled={disabled}
        containerStyle={{
          width: "100%",
        }}
        render={(value, openCalendar, handleValueChange) => (
          <DatePickerInput
            value={value}
            onFocus={openCalendar}
            onChange={handleValueChange}
            placeholder={placeholder}
            disabled={disabled}
            hasError={hasError}
            helperText={hasError ? fieldError : ""}
          />
        )}
      />
    </Grid>
  );
}