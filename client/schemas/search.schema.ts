import * as yup from "yup";

export const searchSchema = yup.object({
  query: yup
    .string()
    .trim()
    .required("Enter a word or phrase to search")
    .max(200, "Search must be 200 characters or fewer"),
});
