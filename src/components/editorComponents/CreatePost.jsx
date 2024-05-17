import { useEffect, useState } from "react";
import { marked } from "marked";
import Editor from "./Editor.jsx";
import { getPostbyId, updatePost } from "../../api/api-Helper.js";
import toast, { Toaster } from "react-hot-toast";
import categorias from "../../helpers/categorias.json";

const separarPorComa = (frase) => {
  return frase.split(",");
};

const Usuarios = ["user", "asistente", "general"];

function EditorMarkdown({ id, handleModal }) {
  const [prePost, setPrePost] = useState(undefined);
  const [texto, setTexto] = useState("");
  const html = marked(texto);
  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState("");
  const [statusPost, setStatusPost] = useState("Guardado");

  const postid = id;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostbyId(postid);
      setPrePost(data);
    };
    fetchData();
  }, [postid]);

  useEffect(() => {
    if (prePost && prePost.categoria) {
      setCategoriaSeleccionado(prePost.categoria);
    }
  }, [prePost]);

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionado(event.target.value);
  };
  const handleInputChange = (event) => {
    const nuevoValor = event.target.value;
    const nuevosTags = nuevoValor.split(",");

    setPrePost({
      ...prePost,
      tags: nuevosTags,
    });
  };
  const handleTituloChange = (event) => {
    const nuevoTitulo = event.target.value;

    // Actualizar el estado de prePost con el nuevo título
    setPrePost({
      ...prePost,
      titulo: nuevoTitulo,
    });
  };

  const PublicarPost = (event) => {
    event.preventDefault();

    const titulo = event.target.titulo.value;
    const estado = statusPost;
    const createdAt = new Date();
    const categoria = event.target.categoria.value;
    const autor = JSON.parse(localStorage.getItem("user")).name;
    const publico = [event.target.usuario.value];
    const tags = separarPorComa(event.target.tags.value);

    const content = texto;
    const data = {
      post: {
        titulo,
        autor,
        createdAt,
        categoria,
        content,
        estado,
        publico,
        tags,
      },
    };

    toast.promise(updatePost(postid, data), {
      loading: "Creando post...",
      success: "Post creado",
      error: "Error al crear post",
    });
  };

  return (
    <>
      {prePost && (
        <div className="px-11 mt-10">
          <Toaster />
          {/*  <button onClick={() => handleModal(false)} className="font-bold">
            Cancelar
          </button> */}
          <form className="mt-10" onSubmit={(e) => PublicarPost(e)}>
            <section className="flex gap-5 flex-col md:flex-row">
              <section className="w-3/4 flex gap-5 flex-wrap">
                <section>
                  <label
                    htmlFor="titulo"
                    className="block my-2 font-bold text-lg"
                  >
                    Título
                  </label>
                  <input
                    type="text"
                    placeholder="titulo"
                    name="titulo"
                    value={prePost.titulo}
                    onChange={handleTituloChange}
                    className="rounded-2xl px-6 py-3 border-slate-300 border"
                  />
                </section>
                <section>
                  <label
                    htmlFor="usuario"
                    className="block my-2 font-bold text-lg"
                  >
                    Usuario:
                  </label>
                  <select
                    name="usuario"
                    id="usuario"
                    className="rounded-2xl px-6 py-3 border-slate-300 border"
                  >
                    {Usuarios.map((publico) => (
                      <option key={publico} value={publico}>
                        {publico}
                      </option>
                    ))}
                  </select>
                </section>
                <section>
                  <label
                    htmlFor="categoria"
                    className="block my-2 font-bold text-lg"
                  >
                    Categoría:
                  </label>
                  <select
                    name="categoria"
                    id="categoria"
                    value={categoriaSeleccionado}
                    onChange={handleCategoriaChange}
                    className="rounded-2xl px-6 py-3 border-slate-300 border"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                      <option
                        key={categoria.categoria}
                        value={categoria.categoria}
                      >
                        {categoria.categoria}
                      </option>
                    ))}
                  </select>
                </section>

                <section>
                  <label
                    htmlFor="tags"
                    className="block my-2 font-bold text-lg"
                  >
                    Tags:
                  </label>
                  <input
                    type="text"
                    placeholder="Escribe palabras separadas por comas"
                    name="tags"
                    value={prePost.tags.join(",")}
                    onChange={handleInputChange}
                    className="rounded-2xl px-6 py-3 border-slate-300 border w-full md:w-96"
                  />
                </section>
              </section>

              <section className="flex items-end justify-end ml-auto">
                <button
                  className="mt-10 border px-4 py-2 place-self-end ml-auto bg-primary rounded-md"
                  type="submit"
                  name="publicar"
                  onClick={(e) => setStatusPost("Publicado")}
                >
                  Publicar
                </button>
                <button
                  className="mt-10 border px-4 py-2 place-self-end ml-2 bg-primary rounded-md"
                  type="submit"
                  name="guardar"
                  onClick={(e) => setStatusPost("Guardado")}
                >
                  Guardar
                </button>
              </section>
            </section>
            <Editor
              content={prePost?.content}
              texto={texto}
              setTexto={setTexto}
              html={html}
              postid={postid}
            />
          </form>
        </div>
      )}
    </>
  );
}

export default EditorMarkdown;
