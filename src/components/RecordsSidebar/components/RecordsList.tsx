import { useEffect } from "react";
import Record from "./Record";
import { useRecords } from "@/context/Records";

const RecordsList = () => {
  const { records, activeRecord, actions } = useRecords();

  useEffect(() => {
    actions?.getRecords();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {records.map((record) => (
        <Record
          key={record.id}
          id={record.id}
          root={record.root}
          name={record.name}
          status={record.status}
          selected={record.id === activeRecord?.id}
          onClick={actions?.setActiveRecord ?? (() => {})}
        />
      ))}
    </div>
  );
};

export default RecordsList;
