import { Box, Slider, Typography } from "@mui/material";
import { forwardRef } from "react";

interface SimpleSliderProps {
  label: string;
  name: string;
  value: number;
  onChange: (newValue: number) => void;
  min: number;
  max: number;
  step?: number;
  id?: string;
}

const SimpleSlider = forwardRef<HTMLDivElement, SimpleSliderProps>(
  (
    { label, name, value, onChange, min, max, step = 1, id = `${name}-slider` },
    ref
  ) => {
    const handleChange = (_event: Event, newValue: number | number[]) => {
      if (typeof newValue === "number") {
        onChange(newValue);
      }
    };

    return (
      <Box sx={{ width: 250 }} ref={ref}>
        <Typography id={id} gutterBottom>
          {label}: <strong>{value}</strong>
        </Typography>
        <Slider
          name={name}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          valueLabelDisplay="auto"
          aria-labelledby={id}
        />
      </Box>
    );
  }
);

// 表示名を設定
SimpleSlider.displayName = "SimpleSlider";

export default SimpleSlider;
