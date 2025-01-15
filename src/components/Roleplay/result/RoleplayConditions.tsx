import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RoleplayRequest } from "../../../types/roleplayRequest";
import { Option } from "../../../types/option";
import { LEARNING_GOAL_OPTIONS } from "../../../constants/options/learningOptions";
import { GRADE_OPTIONS } from "../../../constants/options/gradeOptions";
import { BULLYING_TYPE_OPTIONS } from "../../../constants/options/bullyingTypeOptions";
import { BULLYING_SEVERITY_OPTIONS } from "../../../constants/options/bullyingSeverityOptions";

interface RoleplayConditionsProps {
  formData: RoleplayRequest;
}

const RoleplayConditions: React.FC<RoleplayConditionsProps> = ({
  formData,
}) => {
  // 各オプションから表示用のラベルを取得
  const getLabelFromValue = (options: Option[], value: string) => {
    return options.find((option) => option.value === value)?.text || value;
  };

  const createChipLabel = (label: string, value: string) => (
    <Box component="span">
      <Typography component="span" color="text.primary">
        {label}:&nbsp;
      </Typography>
      <Typography component="span" color="primary">
        {value}
      </Typography>
    </Box>
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Typography>作成条件を表示</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              目的
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={createChipLabel(
                  "学習目標",
                  getLabelFromValue(
                    LEARNING_GOAL_OPTIONS,
                    formData.learning_goal
                  )
                )}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={createChipLabel(
                  "対象学年",
                  getLabelFromValue(GRADE_OPTIONS, formData.grade)
                )}
                color="primary"
                variant="outlined"
              />
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              いじめ情報
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                label={createChipLabel(
                  "種別",
                  getLabelFromValue(
                    BULLYING_TYPE_OPTIONS,
                    formData.bullying_type
                  )
                )}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={createChipLabel(
                  "深刻度",
                  getLabelFromValue(
                    BULLYING_SEVERITY_OPTIONS,
                    formData.bullying_severity
                  )
                )}
                color="primary"
                variant="outlined"
              />
              {formData.bullying_situation && (
                <Chip
                  label={createChipLabel("場面", formData.bullying_situation)}
                  color="primary"
                  variant="outlined"
                />
              )}
              <Chip
                label={createChipLabel(
                  "登場人物数",
                  `${formData.character_count}`
                )}
                color="primary"
                variant="outlined"
              />
            </Stack>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default RoleplayConditions;
