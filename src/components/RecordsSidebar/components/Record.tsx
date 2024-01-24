import { Record as RecordType } from "@/context/Records/types";
import { RecordStatus } from "@/types/RecordStatus";
import clsx from "clsx";

interface Props {
  id: string;
  name: string;
  status: RecordStatus;
  selected?: boolean;
  onClick: (record: RecordType) => void;
}

const Record = (props: Props) => (
  <div
    className={clsx(
      "flex items-center gap-2 p-2 rounded-lg hover:bg-purple-100 transition-background",
      props.selected && "bg-purple-600 bg-opacity-15"
    )}
    role="button"
    onClick={() =>
      props.onClick({ id: props.id, name: props.name, status: props.status })
    }
  >
    <span
      className={clsx("inline-block w-3 h-3 bg-green-400 rounded-full", {
        "bg-green-400": props.status === RecordStatus.OPEN,
        "bg-orange-400": props.status === RecordStatus.PAUSED,
        "bg-gray-400": props.status === RecordStatus.CLOSED,
      })}
    />
    <p>{props.name}</p>
  </div>
);
export default Record;
