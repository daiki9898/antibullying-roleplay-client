export interface RoleplayResponse {
  scenario: {
    title: string;
    setting: {
      characters: Character[];
      description: string;
    };
    scenes: Scene[];
    postscript: string;
  };
  worksheet: {
    questions: Question[];
  };
}

interface Character {
  label: string;
  description: string;
}

interface Scene {
  scene_number: number;
  scene_description: string;
  dialogue_pairs: DialoguePair[];
}

interface DialoguePair {
  speaker: string;
  line: string;
}

interface Question {
  question_number: number;
  question_text: string;
}
