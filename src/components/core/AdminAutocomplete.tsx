import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Fragment, useState } from "react";

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
  size: "small" | "medium";
  className?: string;
  textClassName?: string;
  onSearchTextChange?: (event: any) => void;
  disabled?: boolean;
};

const AdminAutocomplete = ({
  onChange,
  value,
  noOptionText,
  options = [],

  labelClass = "font-medium tracking-wide text-base",
  label,
  isOptionEqualToValue,
  error,
  helperText,
  size,
  className,
  textClassName,
  onSearchTextChange,
  disabled = false,
  loading = false,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <p className={`text-theme text-wider font-medium ${className}`}>
          {label}
        </p>
      )}
      <Autocomplete
        disabled={disabled}
        size={size}
        loading={loading}
        id="asynchronous-autocomplete"
        open={open}
        fullWidth
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={(option: any) =>
          `${option.label} ${
            option?.optionName ? `(${option?.optionName})` : ""
          }`
        }
        onChange={onChange}
        value={value}
        noOptionsText={noOptionText}
        options={options || []}
        renderInput={(params) => (
          <>
            <TextField
              className={textClassName}
              error={error}
              helperText={helperText}
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
          </>
        )}
      />
    </div>
  );
};

export default AdminAutocomplete;
