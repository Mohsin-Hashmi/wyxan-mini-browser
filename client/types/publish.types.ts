import type { InferType } from "yup";
import type { publishSchema } from "@/schemas/publish.schema";

export type PublishFormValues = InferType<typeof publishSchema>;
