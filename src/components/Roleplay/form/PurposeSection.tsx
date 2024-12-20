import { Stack, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { RoleplayRequest } from "../../../types/roleplayRequest";
import CustomSelectField from "../../common/CustomSelectField";
import { GRADE_OPTIONS } from "../../../constants/options/gradeOptions";
import { FORM_FIELD_NAMES } from "../../../constants/formFieldNames";
import { LEARNING_GOAL_OPTIONS } from "../../../constants/options/learningOptions";

interface PurposeSectionProps {
  control: Control<RoleplayRequest>;
}

export const PurposeSection: React.FC<PurposeSectionProps> = ({ control }) => {
  return (
    <Stack spacing={3}>
      <Typography variant="subtitle1">目的</Typography>
      <Controller
        name={FORM_FIELD_NAMES.LEARNING_GOAL}
        control={control}
        render={({ field }) => (
          <CustomSelectField
            {...field}
            isRequired={true}
            label="学習目標の選択"
            options={LEARNING_GOAL_OPTIONS}
          />
        )}
      />
      <Controller
        name={FORM_FIELD_NAMES.GRADE}
        control={control}
        render={({ field }) => (
          <CustomSelectField
            {...field}
            isRequired={true}
            label="対象学年"
            options={GRADE_OPTIONS}
          />
        )}
      />
    </Stack>
  );
};
