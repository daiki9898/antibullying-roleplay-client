import { FORM_FIELD_NAMES } from "../constants/formFieldNames";

export interface RoleplayRequest {
  [FORM_FIELD_NAMES.LEARNING_GOAL]: string;
  [FORM_FIELD_NAMES.GRADE]: string;
  [FORM_FIELD_NAMES.BULLYING_TYPE]: string;
  [FORM_FIELD_NAMES.BULLYING_SEVERITY]: string;
  [FORM_FIELD_NAMES.CHARACTER_COUNT]: number;
  [FORM_FIELD_NAMES.BULLYING_SITUATION]?: string;
}
