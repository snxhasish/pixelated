import { defineType, defineField } from "sanity";

export const upload = defineType({
    name: "upload",
    title: "Upload",
    type: "document",
    fields: [
        defineField({
            name: "userId",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
});
