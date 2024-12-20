import { Option } from "../../types/option";

export const BULLYING_TYPE_OPTIONS: Option[] = [
  {
    value: "VERBAL",
    text: "冷やかしやからかい、悪口や脅し文句、嫌なことを言われる",
  },
  { value: "EXCLUSION", text: "仲間はずれ、集団による無視をされる" },
  {
    value: "PHYSICAL",
    text: "軽くぶつかられたり、遊ぶふりをして叩かれたり、蹴られたりする",
  },
  { value: "EXTORTION", text: "金品をたかられる" },
  {
    value: "PROPERTY",
    text: "金品を隠されたり、盗まれたり、壊されたり、捨てられたりする",
  },
  {
    value: "COMPULSION",
    text: "嫌なことや恥ずかしいこと、危険なことをされたり、させられたりする",
  },
  {
    value: "CYBER",
    text: "パソコンや携帯電話等で、誹謗中傷や嫌なことをされる",
  },
  { value: "OTHER", text: "その他" },
];
