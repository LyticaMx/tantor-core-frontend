import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import { Record, RecordPayload, RecordsContextType } from "./types";
import { RecordsContext } from "./context";
import { useApolloClient } from "@apollo/client";
import { ADD_CASE, GET_CASES } from "./queries/cases.graphql";
import { useAuth } from "../Auth";

interface Props {
  children: ReactNode;
}

const RecordsProvider = ({ children }: Props): ReactElement => {
  const [records, setRecords] = useState<Record[]>([]);
  const [activeRecord, setActiveRecord] = useState<Record | null>(null);
  const { auth } = useAuth();
  const client = useApolloClient();

  const createRecord = async (record: RecordPayload): Promise<boolean> => {
    try {
      const response = await client.mutate({
        mutation: ADD_CASE,
        variables: {
          name: record.name,
        },
      });

      if (response.data) {
        setRecords((records) => [
          ...records,
          {
            id: response.data.createCase.mongoId,
            name: response.data.createCase.name,
            status: response.data.createCase.status,
            root:
              (response.data.createCase.folders as any[]).find(
                (folder) => folder.name === "root"
              )?.mongoId ?? "",
          },
        ]);
      }

      return true;
    } catch {
      return false;
    }
  };

  const getRecords = async (search?: string): Promise<void> => {
    try {
      const response = await client.query({
        query: GET_CASES,
        variables: {
          name: search,
        },
      });

      setRecords(
        (response.data?.getCases?.edges as any[])?.map((edge) => ({
          id: edge?.node?.mongoId,
          name: edge?.node?.name,
          status: edge?.node?.status,
          root:
            (edge?.node?.folders ?? []).find((folder) => folder.name === "root")
              ?.mongoId ?? "",
        })) ?? []
      );
    } catch (e) {
      console.error(e);
    }
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

  useEffect(() => {
    if (!auth.isLoggedIn) {
      setRecords([]);
      setActiveRecord(null);
    }
  }, [auth.isLoggedIn]);

  return (
    <RecordsContext.Provider value={contextValue}>
      {children}
    </RecordsContext.Provider>
  );
};

export { RecordsProvider };
