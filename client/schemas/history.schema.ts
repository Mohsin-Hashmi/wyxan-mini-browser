import * as yup from "yup";

export const historySearchSchema = yup.object({
  query: yup
    .string()
    .trim()
    .max(200, "Search must be 200 characters or fewer")
    .default("")
    .defined(),
});
