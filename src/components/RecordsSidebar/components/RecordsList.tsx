import { RecordStatus } from "@/types/RecordStatus";
import Record from "./Record";

const RecordsList = () => {
  return (
    <div className="flex flex-col gap-1">
      <Record id="1" name="Caso NL 001-2012-12-23" status={RecordStatus.OPEN} />
      <Record
        id="2"
        name="Caso SN 002-2012-12-23"
        status={RecordStatus.OPEN}
        selected
      />
      <Record
        id="3"
        name="Caso YC 001-2018-12-23"
        status={RecordStatus.PAUSED}
      />
      <Record
        id="4"
        name="Caso ZC 001-2020-12-23"
        status={RecordStatus.CLOSED}
      />
    </div>
  );
};

export default RecordsList;
