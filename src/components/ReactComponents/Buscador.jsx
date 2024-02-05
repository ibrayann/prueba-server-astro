import React, { useState, useEffect } from "react";

const Buscador = ({ posts }) => {
  const [allPosts, setAllPosts] = useState(posts);
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);

    let inputKeywords = e.target.value.trim().split(/\s+/);

    if (
      inputKeywords.length === 0 ||
      inputKeywords.every((word) => word === "")
    ) {
      setFilteredPosts([]);
      return;
    }

    const postsFiltered = allPosts.filter((post) => {
      const titleMatch = post.frontmatter.titulo
        .toLowerCase()
        .includes(inputKeywords.join(" ").toLowerCase());

      let postTags = post.frontmatter.tags
        .toLowerCase()
        .replace(/,/g, " ")
        .split(" ")
        .map((s) => s.trim());

      const tagsMatch = inputKeywords.some((tag) =>
        postTags.includes(tag.trim().toLowerCase())
      );

      return titleMatch || tagsMatch;
    });

    setFilteredPosts(postsFiltered);
  };

  const handleModalToggle = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <form className="flex-1">
        <input
          className="focus:outline-none w-full"
          placeholder="Busca algún tema de interés"
          type="text"
          name="a"
          value={busqueda}
          onChange={handleInputChange}
          onFocus={handleModalToggle}
        />
      </form>
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div className="absolute inset-0 bg-gray-400/50 opacity-75 z-40"></div>
          <div className="bg-white p-8 rounded-lg top-32 shadow-lg z-50 relative max-h-[70%] w-[95%]  md:w-[50%] min-h-96 overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              onClick={handleCloseModal}
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
            <form className="flex-1">
              <input
                className="focus:outline-none w-full"
                placeholder="Busca algún tema de interés"
                type="text"
                name="a"
                value={busqueda}
                onChange={handleInputChange}
              />
            </form>
            <section className="mt-8">
              Resultados de la búsqueda para: <strong>{busqueda}</strong>
            </section>
            <ul>
              {filteredPosts.map((item) => (
                <li key={item.frontmatter.id}>
                  <CustomLink
                    to={item.frontmatter.slug}
                    title={item.frontmatter.titulo}
                    description={item.frontmatter.descripcion.replace(
                      /[_*]+/g,
                      ""
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const CustomLink = ({ to, title, description }) => {
  return (
    <a
      className="flex border-b max-w-3xl mx-auto lg:p-6 hover:scale-105 transform transition duration-300 ease-in-out"
      onClick={() => {
        window.location.href = `/${to}`;
      }}
    >
      <div className="text-ellipsis my-5 w-11/12">
        <h2 className="text-xl md:text-2xl font-bold mb-2  line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-500 text-base line-clamp-2">{description}</p>
      </div>
      <div className="flex justify-end my-auto"></div>
    </a>
  );
};

export default Buscador;
