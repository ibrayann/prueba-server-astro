import { useState, useEffect } from "react";
import { getPost } from "../../api/api-Helper.js";
import { Editar } from "../icons/icons.jsx";
import { Search } from "../icons/icons.jsx";
import CreatePost from "../editorComponents/CreatePost.jsx";

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const CeoAllPost = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true); // [1
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleEditar = (id) => (setiDaEditar(id), setIsOpen(true));
  const [iDaEditar, setiDaEditar] = useState(null);

  const filteredPosts = post.filter((post) =>
    post.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
  );

  useEffect(() => {
    getPost()
      .then((res) => {
        setPost(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Boton para generar el rebuild */}
      <section className="grid grid-cols-10 pt-20">
        <form className="col-span-5">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search Mockups, Logos..."
              value={filtroTitulo}
              onChange={(e) => setFiltroTitulo(e.target.value)}
            />
          </div>
        </form>
        <div className="col-span-3"></div>
        <button className="bg-primaryDark col-span-2 text-white px-4 py-2 rounded-md items-stretch">
          <a href="/editor">Crear Post</a>
        </button>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div className="absolute inset-0 bg-gray-400/50 opacity-75 z-40"></div>
          <div className="bg-white p-8 rounded-lg top-10 bottom-10 shadow-lg z-50 relative  w-[80%]  overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              onClick={isOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <CreatePost handleModal={setIsOpen} id={iDaEditar} />
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center mt-10">Cagando</div>
      ) : (
        <div className="relative overflow-x-auto mt-5 pb-20">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Titulo del Post
                </th>
                <th scope="col" className="px-6 py-3">
                  Autor
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.titulo} className=" border  hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap "
                  >
                    {post.titulo.length > 50
                      ? post.titulo.substring(0, 50) + "..."
                      : post.titulo}
                  </th>
                  <td className="px-6 py-4">{post.autor}</td>
                  <td className="px-6 py-4">{formatDate(post.createdAt)}</td>
                  <td className="px-6 py-4">{post.estado}</td>

                  <td className="px-6 py-4">
                    <button
                      className="px-6 py-4"
                      onClick={() => handleEditar(post.id)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CeoAllPost;
