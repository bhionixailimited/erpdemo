import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef } from "react";
type Props = {
  disabled?: boolean;
  size?: "small" | "medium";
  fieldClassName?: string;
  onChange?: (e: ChangeEvent<any>) => void;
  onBlur?: (e: ChangeEvent<any>) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  hidden?: boolean;
  type:
    | "text"
    | "password"
    | "email"
    | "checkbox"
    | "radio"
    | "select"
    | "number"
    | "date"
    | "autocomplete"
    | "native-file";
  labelClass?: string;
  className?: string;
  name?: string;
  value?: any;
  accept?: string | undefined;
  multiple?: string | undefined;
  variant?: "standard" | "outlined" | "filled";
  options?: {
    state?: any;
    phone?: any;
    key: any;
    label: any;
    value: any;
  }[];
  mainClass?: string;
} & TextFieldProps;

const InputField = ({
  size,
  className = "!rounded-md ",
  fieldClassName,
  onChange,
  onBlur,
  error,
  helperText,
  label,
  labelClass = "font-medium tracking-wide text-base",
  name,
  multiline,
  rows,
  type,
  value,
  variant = "outlined",
  options,
  placeholder,
  InputProps,
  inputProps,
  disabled,
  hidden,
  onKeyDown,
  mainClass,
  ref,
  accept,
  multiple,
}: Props) => {
  const quantityInputRef = useRef<any>(null);
  useEffect(() => {
    const ignoreScroll = (e: any) => {
      e.preventDefault();
    };
    quantityInputRef?.current &&
      quantityInputRef?.current?.addEventListener("wheel", ignoreScroll);
  }, [quantityInputRef]);
  if (type === "text") {
    return (
      <div className={`flex flex-col w-full gap-2 md:gap-4 ${mainClass} `}>
        {label && <h3 className={labelClass}>{label}</h3>}
        <TextField
          size={size}
          variant={variant}
          multiline={multiline}
          rows={rows}
          value={value}
          fullWidth
          inputProps={{
            className: fieldClassName,
            ...inputProps,
          }}
          InputProps={{
            className: className,
            sx: {
              ":focus": {
                outlineColor: "red",
              },
            },
            ...InputProps,
          }}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          ref={ref}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          type={type}
          hidden={hidden}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className={`flex flex-col w-full gap-2 md:gap-4 ${mainClass} `}>
        {label && <h3 className={labelClass}>{label}</h3>}
        <FormControl size={size}>
          <Select
            ref={ref}
            disabled={disabled}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value ?? ""}
            name={name}
            onChange={(e: any) => onChange?.(e)}
            className={className}
            variant={variant}
            placeholder={placeholder}
            error={error}
          >
            {options?.map((item) => (
              <MenuItem
                key={item?.key}
                value={
                  item?.value ?? (item?.state as any) ?? (item?.phone as any)
                }
              >
                {item?.label ?? (item?.state as any)}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText className="!text-red-600">
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    );
  } else
    return (
      <div className={`flex flex-col w-full gap-2 md:gap-4 ${mainClass} `}>
        {label && <h3 className={labelClass}>{label}</h3>}
        <TextField
          size={size}
          variant={variant}
          multiline={multiline}
          rows={rows}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          fullWidth
          inputProps={{
            className: fieldClassName,
            accept: accept,
            multiple: multiple,
            ...inputProps,
          }}
          InputProps={{
            className: className,
          }}
          ref={type === "number" ? quantityInputRef : ref}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          type={type === "native-file" ? "file" : type}
          onKeyDown={onKeyDown}
          // accept="image/png, image/gif, image/jpeg"
        />
      </div>
    );
};

export default InputField;
