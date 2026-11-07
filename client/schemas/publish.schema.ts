import * as yup from "yup";

export const publishSchema = yup.object({
  authorId: yup
    .string()
    .required("Choose a publisher")
    .matches(/^[a-fA-F0-9]{24}$/, "Choose a valid publisher"),
  address: yup
    .string()
    .trim()
    .lowercase()
    .required("Enter a site address")
    .matches(
      /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.zz$/,
      "Use an address such as my-website.zz, without a scheme or path",
    ),
  title: yup
    .string()
    .trim()
    .required("Enter a page title")
    .max(160, "Page title must be 160 characters or fewer"),
  html: yup
    .string()
    .trim()
    .required("Enter your page HTML")
    .max(102400, "HTML must not exceed 100 KiB")
    .test(
      "html-size",
      "HTML must not exceed 100 KiB",
      (value) => !value || new TextEncoder().encode(value).length <= 102400,
    ),
});
