import { type SchemaTypeDefinition } from "sanity";
import { upload } from "./upload";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [upload],
}
