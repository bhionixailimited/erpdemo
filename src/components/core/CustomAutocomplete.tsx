import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";

type Props = {
  onChange?: (event: any, value: any) => void;
  value?: any;
  noOptionText?: any;
  options?: any[];
  loading?: boolean;
  label?: string;
  labelClass?: string;
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  error?: boolean;
  helperText?: string;
  onSearchTextChange?: (event: any) => void;
  disabled?: boolean;
  mainClass?: string;
  onBlur?: () => void;
  freeSolo?: boolean;
  multiple?: boolean;
  defaultValue?: any;
};

const CustomAutocomplete = ({
  onChange,
  value,
  noOptionText,
  options = [],
  loading,
  labelClass = "font-medium tracking-wide text-base",
  label,
  isOptionEqualToValue,
  error,
  helperText,
  onSearchTextChange,
  disabled,
  mainClass,
  onBlur,
  freeSolo,
  multiple,
  defaultValue = null,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`w-full flex flex-col gap-4 ${mainClass} `}>
      {label && <h3 className={labelClass}>{label}</h3>}
      <Autocomplete
        defaultValue={defaultValue}
        freeSolo={freeSolo}
        multiple={multiple}
        open={open}
        fullWidth
        disabled={disabled}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={(option: any) => option.label}
        onChange={onChange}
        value={value}
        noOptionsText={noOptionText}
        options={options || []}
        loading={loading}
        onBlur={onBlur}
        renderInput={(params) => (
          <TextField
            error={error}
            helperText={helperText}
            onBlur={onBlur}
            {...params}
            fullWidth
            onChange={onSearchTextChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default CustomAutocomplete;
