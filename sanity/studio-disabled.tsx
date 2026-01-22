/* Embedded sanity studio has been disabled
*  To enable embedded studio again, paste this into:
*  /app/(client)/studio/[[...tool]]/page.tsx
*/

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
    return <NextStudio config={config} />;
}
