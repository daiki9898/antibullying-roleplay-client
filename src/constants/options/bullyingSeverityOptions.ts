import { Option } from "../../types/option";

export const BULLYING_SEVERITY_OPTIONS: Option[] = [
  { value: "MILD", text: "軽度" },
  {
    value: "MODERATE",
    text: "中度",
  },
  {
    value: "SEVERE",
    text: "重度（相当の期間学校を欠席することを余儀なくされているもの）",
  },
  {
    value: "CRITICAL",
    text: "重度（生命、心身または財産に重大な被害が生じているもの）",
  },
];
