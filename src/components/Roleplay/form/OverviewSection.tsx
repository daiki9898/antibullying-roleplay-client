import CustomTextField from "../../common/CustomTextField";
import CustomSelectField from "../../common/CustomSelectField";
import { BULLYING_TYPE_OPTIONS } from "../../../constants/options/bullyingTypeOptions";
import { BULLYING_SEVERITY_OPTIONS } from "../../../constants/options/bullyingSeverityOptions";
import SimpleSlider from "../../common/SimpleSlider";
import { Stack, Typography } from "@mui/material";
import { MAX_CHARACTER, MIN_CHARACTER } from "../../../constants/appConstants";
import { FORM_FIELD_NAMES } from "../../../constants/formFieldNames";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { RoleplayRequest } from "../../../types/roleplayRequest";

interface OverviewSectionProps {
  control: Control<RoleplayRequest>;
  errors: FieldErrors<RoleplayRequest>;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  control,
  errors,
}) => {
  return (
    <>
      <Stack spacing={3}>
        <Typography variant="subtitle1">いじめ情報</Typography>
        <Controller
          name={FORM_FIELD_NAMES.BULLYING_TYPE}
          control={control}
          render={({ field }) => (
            <CustomSelectField
              {...field}
              isRequired={true}
              label="種別"
              options={BULLYING_TYPE_OPTIONS}
            />
          )}
        />
        <Controller
          name={FORM_FIELD_NAMES.BULLYING_SEVERITY}
          control={control}
          render={({ field }) => (
            <CustomSelectField
              {...field}
              isRequired={true}
              label="深刻度"
              options={BULLYING_SEVERITY_OPTIONS}
            />
          )}
        />
        <Controller
          name={FORM_FIELD_NAMES.BULLYING_SITUATION}
          control={control}
          rules={{
            required: false,
            maxLength: {
              value: 20,
              message: "20文字以内で入力してください",
            },
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              isRequired={false}
              label="場面"
              placeholder="例：プールの授業、文化祭前など"
              error={!!errors[FORM_FIELD_NAMES.BULLYING_SITUATION]}
              helperText={errors[FORM_FIELD_NAMES.BULLYING_SITUATION]?.message}
            />
          )}
        />
        <Controller
          name={FORM_FIELD_NAMES.CHARACTER_COUNT}
          control={control}
          render={({ field }) => (
            <SimpleSlider
              {...field}
              label="登場人物数"
              min={MIN_CHARACTER}
              max={MAX_CHARACTER}
            />
          )}
        />
      </Stack>
    </>
  );
};

export default OverviewSection;
