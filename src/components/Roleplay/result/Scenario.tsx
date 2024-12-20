import { forwardRef } from "react";
import { RoleplayResponse } from "../../../types/roleplayResponse";
import "./RoleplayElement.css";

interface ScenarioProps {
  scenario: RoleplayResponse["scenario"];
}

const Scenario = forwardRef<HTMLDivElement, ScenarioProps>(
  ({ scenario }, ref) => {
    return (
      <div ref={ref} className="scenario">
        <div className="intro">
          <h1 className="text-2xl text-center mb-8 font-bold">
            {scenario.title}
          </h1>

          {/* 設定 */}
          <section className="mb-8">
            {/* 登場人物 */}
            <h3 className="text-lg mt-5 mb-4 pb-2 border-b border-gray-200">
              登場人物
            </h3>
            {scenario.setting.characters.map((char) => (
              <div key={char.label} className="mb-4">
                <h4 className="font-medium">{char.label}：</h4>
                <p className="leading-relaxed">{char.description}</p>
              </div>
            ))}

            {/* 状況説明 */}
            <h3 className="text-lg mt-5 mb-4 pb-2 border-b border-gray-200">
              状況説明
            </h3>
            <div className="wrapper">
              <p className="leading-relaxed mb-3">
                {scenario.setting.description}
              </p>
            </div>
          </section>
        </div>

        {/* シーン */}
        {scenario.scenes.map((scene, index) => (
          <div
            key={index}
            className={`scene scene-${scene.scene_number} my-8 p-4 bg-gray-50`}
          >
            <h3 className="text-base mb-4 text-gray-700">
              シーン{scene.scene_number}: {scene.scene_description}
            </h3>
            {scene.dialogue_pairs.map((dialogue, index) => (
              <div key={index} className="my-2">
                {dialogue.speaker ? (
                  <p>
                    <span className="font-medium text-gray-700">
                      {dialogue.speaker}:
                    </span>{" "}
                    {dialogue.line}
                  </p>
                ) : (
                  <p className="text-gray-600">{dialogue.line}</p>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* 後日談 */}
        <div className={"mt-8 postscript"}>
          <h3 className="text-lg mb-4 pb-2 border-b border-gray-200">後日談</h3>
          <div className="wrapper">
            <p>{scenario.postscript}</p>
          </div>
        </div>
      </div>
    );
  }
);

Scenario.displayName = "Scenario";

export default Scenario;
