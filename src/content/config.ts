/* import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    categoria: z.string(),
    slugcategoria: z.string(),
    descripcion: z.string(),
    author: z.string(),
    createdAt: z.coerce.date(),
    tags: z.array(z.string()),
    estado: z.string(),
    publico: z.string(),
    likes: z.undefined(), // Puedes usar z.unknown() si no estás seguro si será undefined
    id: z.string(),
  }),
});

export const collections = { posts };
 */
