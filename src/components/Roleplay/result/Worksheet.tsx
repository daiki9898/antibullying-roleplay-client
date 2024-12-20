import { forwardRef } from "react";
import { RoleplayResponse } from "../../../types/roleplayResponse";

interface WorksheetProps {
  worksheet: RoleplayResponse["worksheet"];
}

const Worksheet = forwardRef<HTMLDivElement, WorksheetProps>(
  ({ worksheet }, ref) => {
    return (
      <div ref={ref} className="worksheet">
        {/* ワークシート部分 */}
        <h2 className="text-xl mb-4 pb-2 border-b border-gray-200">
          ワークシート
        </h2>
        {worksheet.questions.map((q) => (
          <div
            key={q.question_number}
            className="my-5 p-4 border border-gray-200"
          >
            <h3 className="text-base mb-3 text-gray-700">
              質問{q.question_number}
            </h3>
            <p className="leading-relaxed">{q.question_text}</p>
          </div>
        ))}
      </div>
    );
  }
);

Worksheet.displayName = "Worksheet";

export default Worksheet;
