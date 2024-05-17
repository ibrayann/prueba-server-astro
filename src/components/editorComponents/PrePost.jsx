import { useState, useEffect } from "react";
import { createPrePost } from "../../api/api-Helper";
import toast, { Toaster } from "react-hot-toast";
import categorias from "../../helpers/categorias.json";

const checkUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      window.location.replace("/login");
    }
  }, [user]);

  return user;
};

function PrePost() {
  const [categoriaSeleccionado, setcategoriaSeleccionado] = useState("");
  const user = checkUser();

  const handlecategoriaChange = (event) => {
    setcategoriaSeleccionado(event.target.value);
  };

  const handlePrePost = (event) => {
    event.preventDefault();
    const titulo = event.target.titulo.value;
    const autor = user.name;
    const categoria = event.target.categoria.value;
    const content = "";
    const data = {
      post: {
        titulo,
        autor,
        categoria,
        content,
      },
    };
    toast.promise(createPrePost(data), {
      loading: "Creando post...",
      success: "Post creado",
      error: "Error al crear post",
    });
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => handlePrePost(e)}
    >
      <div>
        <Toaster />
      </div>
      <label htmlFor="titulo" className="block mb-2 font-bold text-xl">
        Titulo:
      </label>
      <input
        type="text"
        id="titulo"
        required
        placeholder="Ingresa el titulo"
        className="w-full px-3 py-2 border rounded-lg"
      />

      <label htmlFor="categoria" className="block mt-5 mb-2 font-bold text-xl">
        categoria:
      </label>
      <select
        name="categoria"
        id="categoria"
        value={categoriaSeleccionado}
        onChange={handlecategoriaChange}
        className="rounded-lg px-4 py-2 w-full border"
      >
        <option value="">Selecciona un categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.categoria} value={categoria.categoria}>
            {categoria.categoria}
          </option>
        ))}
      </select>
      <small className=" text-xs text-green-950 mt-5 mb-3">
        ** Te recordamos que, una vez concluido el procedimiento, serás
        redireccionado a nuestra página oficial con el fin de proceder a la
        carga de los datos del post. En caso de que, dicha redirección no se
        produzca, te rogamos que entres en contacto con nuestro equipo técnico
        para recibir la asistencia necesaria.
      </small>

      <button
        className="mt-5 px-7 py-2 border text-white rounded-lg bg-primary"
        type="submit"
      >
        Crear Post
      </button>
    </form>
  );
}

export default PrePost;
