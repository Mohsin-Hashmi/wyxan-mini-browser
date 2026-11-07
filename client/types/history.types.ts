import type { FormikProps } from "formik";
import type { InferType } from "yup";
import type { historySearchSchema } from "@/schemas/history.schema";
import type { useVisitHistory } from "@/hooks/apis/use-visits";
import type { Visit } from "@/types/visits.types";

export type HistorySearchValues = InferType<typeof historySearchSchema>;

export interface HistorySearchProps {
  formik: FormikProps<HistorySearchValues>;
}

export interface HistoryEntryProps {
  visit: Visit;
}

export interface HistoryListProps {
  visits: Visit[];
}

export interface HistoryResultsProps {
  personId: string;
  history: ReturnType<typeof useVisitHistory>;
  visits: Visit[];
  hasSearch: boolean;
}

export interface HistoryDayGroup {
  label: string;
  visits: Visit[];
}

export interface ClearHistoryDialogProps {
  personId: string;
  personName: string;
  disabled: boolean;
}
