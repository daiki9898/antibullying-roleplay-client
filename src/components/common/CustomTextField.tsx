import {
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
} from "@mui/material";

import { forwardRef } from "react";

interface TextFieldProps {
  isRequired: boolean;
  label: string;
  name: string;
  id?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

const CustomTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      isRequired,
      label,
      name,
      id = name,
      placeholder,
      error,
      helperText,
      ...rest
    },
    ref
  ) => {
    return (
      <FormControl fullWidth required={isRequired} error={error}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <OutlinedInput
          size="small"
          name={name}
          id={id}
          placeholder={placeholder}
          inputRef={ref}
          {...rest}
        />
        {helperText && (
          <FormHelperText sx={{ color: "error.main", fontSize: 15 }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
