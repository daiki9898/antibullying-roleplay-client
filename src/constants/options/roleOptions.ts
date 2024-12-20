import { Option } from "../../types/option";

export const ROLE_OPTIONS: Option[] = [
  {
    value: "perpetrator",
    text: "加害者（いじめる生徒）",
  },
  {
    value: "bystander-active",
    text: "観衆（はやしたてたり、おもしろがったりして見ている）",
  },
  {
    value: "bystander-passive",
    text: "傍観者（見て見ない振りをする）",
  },
  {
    value: "victim",
    text: "被害者（いじめられる生徒）",
  },
];
