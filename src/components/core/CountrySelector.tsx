import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { COUNTRIES } from "utils";

type Props = {
  countryDetails?: {
    code?: string | undefined;
    label?: string | undefined;
    phone?: string | undefined;
  };
  setCountryDetails: React.Dispatch<React.SetStateAction<any>>;
  label?: string;
  size?: "small" | "medium" | undefined;
};

const CountrySelector: React.FC<Props> = ({
  countryDetails,
  setCountryDetails,
  label,
  size,
}) => {
  return (
    <div className="w-full flex flex-col">
      <p className="text-theme font-bold ">{label}</p>
      <div className="">
        <Autocomplete
          size={size}
          id="country-select-demo"
          sx={{ width: "100%" }}
          options={COUNTRIES}
          className="rounded-lg"
          autoHighlight
          onChange={(event: any, newValue: any) => {
            setCountryDetails(newValue);
          }}
          value={
            COUNTRIES.filter((item) => {
              return item.label === countryDetails?.label && item;
            })[0] as any
          }
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <React.Fragment key={option.label}>
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="10"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Country"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <img
                      src={`https://flagcdn.com/w20/${countryDetails?.code?.toLowerCase()}.png`}
                      alt=""
                    />
                  </>
                ),
                classes: {
                  root: "",
                  notchedOutline: "notchedCountry",
                  input: "form-textfieldCountry",
                },
              }}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default CountrySelector;
