import { RecordStatus } from "@/types/RecordStatus";

export interface Record {
  id: string;
  name: string;
  status: RecordStatus;
}

export type RecordPayload = Omit<Record, "id" | "status">;

export interface RecordsContextType {
  activeRecord: Record | null;
  records: Record[];
  actions?: {
    getRecords: () => Promise<void>;
    createRecord: (record: RecordPayload) => Promise<boolean>;
    setActiveRecord: (record?: Record) => void;
  };
}
