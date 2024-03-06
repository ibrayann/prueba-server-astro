import axios from "axios";
import fs from "node:fs/promises";
import path from "node:path";

export const getPost = async () => {
  try {
    const response = await axios.get(
      "https://api-sandbox.monbak.com/v1/post/all"
    );
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const postsFiler = await getPost();

export const createMd = ({ posts }) => {
  const contentFolder = path.join(process.cwd(), "src/pages/posts");
  const collectionFolder = path.join(process.cwd(), "src/content/posts");
  const createMd = ({
    titulo,
    author,
    content,
    createdAt,
    likes,
    tags,
    publico,
    estado,
    slug,
    slugcategoria,
    categoria,
    id,
    descripcion,
  }) => `---
  titulo: "${titulo}"
  slug: "${slug}"
  categoria: ${categoria}
  slugcategoria: ${slugcategoria}
  descripcion: "${descripcion}"
  author: ${author}
  createdAt: ${createdAt}
  tags: ${tags}
  estado: ${estado}
  publico: ${publico}
  likes: ${likes}
  id: ${id}
---
${content}
    `;

  posts.forEach((post) => {
    const {
      titulo,
      autor,
      content,
      categoria,
      createdAt,
      publico,
      tags,
      id,
      estado,
    } = post;
    const fileName = titulo.toLowerCase().replace(/ /g, "-").replace(/:/g, "");
    const slugcategoria = "tema-" + categoria.toLowerCase().replace(/ :/g, "-");
    const contentReady = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const descripcion = content.slice(0, 200).replace(/\*\*/g, "");

    const markdown = createMd({
      titulo,
      author: autor,
      content: contentReady,
      slug: fileName,
      slugcategoria,
      categoria,
      createdAt,
      estado,
      publico,
      tags,
      id,
      descripcion,
    });

    fs.writeFile(`${contentFolder}/${fileName}.md`, markdown, "utf8")
      .then(() => console.log("✅ File created by pages" + fileName))
      .catch((err) => console.log(err));

    fs.writeFile(`${collectionFolder}/${fileName}.md`, markdown, "utf8")
      .then(() => console.log("✅ File created by collection " + fileName))
      .catch((err) => console.log(err));
  });
};

createMd({ posts: postsFiler });
