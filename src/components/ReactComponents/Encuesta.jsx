import { useEffect, useState } from "react";
import { getPost } from "../../api/api-Helper";

const Encuesta = ({ id }) => {
  const [toggle, setToggle] = useState(false);
  const [encuesta, setEncuesta] = useState("");
  const [like, setLike] = useState(false);

  return (
    <div
      id="encuesta"
      className=" justify-center mt-10 items-center flex-col w-full h-full mb-20"
    >
      <section className="text-center">
        <h4 className="text-xl text-secondary font-semibold mb-3">
          ¿Te ha sido útil este artículo?
        </h4>

        <div className="space-x-4">
          {!like ? (
            <>
              <button
                className="py-3 px-8 rounded-full border dark:border-secondary border-primary dark:hover:bg-secondary hover:bg-primary hover:text-white text-primary dark:text-secondary"
                type="button"
                onClick={() => {
                  setLike(true);
                }}
              >
                Sí
              </button>
              <button
                className="py-3 px-8 rounded-full border dark:border-secondary border-primary dark:hover:bg-secondary hover:bg-primary hover:text-white text-primary dark:text-secondary"
                type="button"
                onClick={() => {
                  setToggle(true);
                }}
              >
                No
              </button>
            </>
          ) : (
            <p className="mt-7 font-semibold text-lg text-secondary">
              Gracias por tu opinión ✌️
            </p>
          )}
        </div>
      </section>
      {toggle && (
        <div className=" w-3/4 mt-6">
          <textarea
            className="w-full h-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Escribenos tu opinión"
          />
          <button
            className="py-3 px-8 rounded-full border dark:bg-secondary bg-primary dark:text-white mt-4 text-secondary"
            type="button"
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default Encuesta;
