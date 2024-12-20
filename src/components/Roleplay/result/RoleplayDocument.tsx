import { Paper } from "@mui/material";
import { RoleplayResponse } from "../../../types/roleplayResponse";
import Scenario from "./Scenario";
import Worksheet from "./Worksheet";

interface RoleplayDocumentProps {
  data: RoleplayResponse;
  refs: RoleplayDocumentRefs;
}

type RoleplayDocumentRefs = {
  scenarioRef: React.RefObject<HTMLDivElement>;
  worksheetRef: React.RefObject<HTMLDivElement>;
};

const RoleplayDocument: React.FC<RoleplayDocumentProps> = ({ data, refs }) => {
  const { scenario, worksheet } = data;

  return (
    <div className="max-w-[210mm] mx-auto bg-white text-gray-800 font-sans">
      <Paper elevation={3} sx={{ padding: "20mm", marginBottom: "12mm" }}>
        <div ref={refs.scenarioRef}>
          <Scenario scenario={scenario} />
        </div>
      </Paper>
      <Paper elevation={3} sx={{ padding: "20mm" }} className="min-h-[297mm]">
        <div ref={refs.worksheetRef}>
          <Worksheet worksheet={worksheet} />
        </div>
      </Paper>
    </div>
  );
};

RoleplayDocument.displayName = "RoleplayDocument";

export default RoleplayDocument;
