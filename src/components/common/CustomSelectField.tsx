import {
  Box,
  FormControl,
  FormLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Option } from "../../types/option";
import { forwardRef } from "react";

interface SelectFieldProps {
  isRequired: boolean;
  label: string;
  name: string;
  options: Option[];
  size?: "small" | "medium";
  id?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
}

const CustomSelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      isRequired,
      label,
      name,
      options,
      size = "small",
      id = name,
      value,
      defaultValue,
      onChange,
    },
    ref
  ) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth required={isRequired}>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <Select
            native
            size={size}
            name={name}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            displayEmpty={!isRequired}
            inputRef={ref}
          >
            {!isRequired && <option value="">未選択</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
);

// 表示名を設定
CustomSelectField.displayName = "CustomSelectField";

export default CustomSelectField;
