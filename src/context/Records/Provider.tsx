import { ReactElement, ReactNode, useMemo, useState } from "react";
import { Record, RecordPayload, RecordsContextType } from "./types";
import { useLoader } from "../Loader";
import { RecordsContext } from "./context";
import { RecordStatus } from "@/types/RecordStatus";

interface Props {
  children: ReactNode;
}

const RecordsProvider = ({ children }: Props): ReactElement => {
  const [records, setRecords] = useState<Record[]>([]);
  const [activeRecord, setActiveRecord] = useState<Record | null>(null);
  const { actions } = useLoader();

  const createRecord = async (record: RecordPayload): Promise<boolean> => {
    try {
      actions?.addPendingActions();
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
      setRecords((records) => [
        ...records,
        {
          id: new Date().toISOString(),
          name: record.name,
          status: RecordStatus.OPEN,
        },
      ]);
      actions?.removePendingActions();
      return true;
    } catch {
      return false;
    }
  };

  const getRecords = async (): Promise<void> => {
    try {
      actions?.addPendingActions();
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
      setRecords([]);
      actions?.removePendingActions();
    } catch {}
  };

  const setActive = (record?: Record): void => {
    if (record) setActiveRecord(record);
    else setActiveRecord(null);
  };

  const contextValue = useMemo<RecordsContextType>(
    () => ({
      activeRecord,
      records,
      actions: {
        createRecord,
        getRecords,
        setActiveRecord: setActive,
      },
    }),
    [records, activeRecord]
  );

  return (
    <RecordsContext.Provider value={contextValue}>
      {children}
    </RecordsContext.Provider>
  );
};

export { RecordsProvider };
