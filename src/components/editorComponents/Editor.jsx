import React from "react";
import { uploadImagePost } from "../../api/api-Helper";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";

const Editor = ({ texto, setTexto, html, postid, content }) => {
  const agregarTextoEnPosicion = (
    textoAAgregar,
    posicionInicial,
    posicionFinal
  ) => {
    const textoNuevo =
      texto.substring(0, posicionInicial) +
      textoAAgregar +
      texto.substring(posicionFinal);
    setTexto(textoNuevo);
  };

  const agregarNegrita = () => {
    const posicionInicial = document.getElementById("texto").selectionStart;
    const posicionFinal = document.getElementById("texto").selectionEnd;

    agregarTextoEnPosicion("**", posicionInicial, posicionInicial);
    agregarTextoEnPosicion("**", posicionFinal, posicionFinal);
  };

  const agregarCursiva = () => {
    debugger;
    const posicionInicial = document.getElementById("texto").selectionStart;
    const posicionFinal = document.getElementById("texto").selectionEnd;

    agregarTextoEnPosicion("_", posicionInicial, posicionInicial);
    agregarTextoEnPosicion("_", posicionFinal, posicionFinal);
  };

  const agregarLista = () => {
    const posicionInicial = document.getElementById("texto").selectionStart;
    const posicionFinal = document.getElementById("texto").selectionEnd;

    agregarTextoEnPosicion("\n* ", posicionInicial, posicionInicial);
    agregarTextoEnPosicion("\n* ", posicionFinal, posicionFinal);
  };

  const agregarEnlace = () => {
    const posicionInicial = document.getElementById("texto").selectionStart;
    const posicionFinal = document.getElementById("texto").selectionEnd;
    const enlace = prompt("Introduce el enlace");

    if (enlace) {
      agregarTextoEnPosicion(
        `[${texto.substring(posicionInicial, posicionFinal)}](${enlace})`,
        posicionInicial,
        posicionFinal
      );
    }
  };

  const agregarCita = () => {
    const posicionInicial = document.getElementById("texto").selectionStart;
    agregarTextoEnPosicion("\n> ", posicionInicial, posicionInicial);
  };

  const uploadImage = (event) => {
    event.preventDefault();
    const posicionInicial = document.getElementById("texto").selectionStart;
    const posicionFinal = document.getElementById("texto").selectionEnd;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target.result;
      const postId = postid;

      toast.promise(uploadImagePost({ postId, base64 }), {
        loading: "Subiendo imagen...",
        success: (response) => {
          agregarTextoEnPosicion(
            `<img class="w-full my-10 rounded-lg" src="${response}" alt="${file.name}">`,
            posicionInicial,
            posicionFinal
          ),
            "Imagen subida";
        },
        error: "Error al subir la imagen",
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div>
        <Toaster />
      </div>
      <div className="flex bg-primary  p-2 mt-5">
        <Button onClick={agregarNegrita}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" h-5 w-5"
          >
            <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"></path>
          </svg>
        </Button>
        <Button onClick={agregarCursiva}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" h-5 w-5"
          >
            <path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"></path>
          </svg>
        </Button>
        <Button onClick={agregarLista}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" h-5 w-5"
          >
            <path d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path>
          </svg>
        </Button>
        <Button onClick={agregarEnlace}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path d="M13.0605 8.11073L14.4747 9.52494C17.2084 12.2586 17.2084 16.6908 14.4747 19.4244L14.1211 19.778C11.3875 22.5117 6.95531 22.5117 4.22164 19.778C1.48797 17.0443 1.48797 12.6122 4.22164 9.87849L5.63585 11.2927C3.68323 13.2453 3.68323 16.4112 5.63585 18.3638C7.58847 20.3164 10.7543 20.3164 12.7069 18.3638L13.0605 18.0102C15.0131 16.0576 15.0131 12.8918 13.0605 10.9392L11.6463 9.52494L13.0605 8.11073ZM19.778 14.1211L18.3638 12.7069C20.3164 10.7543 20.3164 7.58847 18.3638 5.63585C16.4112 3.68323 13.2453 3.68323 11.2927 5.63585L10.9392 5.98941C8.98653 7.94203 8.98653 11.1079 10.9392 13.0605L12.3534 14.4747L10.9392 15.8889L9.52494 14.4747C6.79127 11.741 6.79127 7.30886 9.52494 4.57519L9.87849 4.22164C12.6122 1.48797 17.0443 1.48797 19.778 4.22164C22.5117 6.95531 22.5117 11.3875 19.778 14.1211Z"></path>
          </svg>
        </Button>
        <Button disabled onClick={agregarCita}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path d="M4.58341 17.3211C3.55316 16.2275 3 15 3 13.0104C3 9.51092 5.45651 6.37372 9.03059 4.82324L9.92328 6.20085C6.58804 8.00545 5.93618 10.3461 5.67564 11.8221C6.21263 11.5444 6.91558 11.4467 7.60471 11.5106C9.40908 11.6778 10.8312 13.1591 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0096 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2275 13 15 13 13.0104C13 9.51092 15.4565 6.37372 19.0306 4.82324L19.9233 6.20085C16.588 8.00545 15.9362 10.3461 15.6756 11.8221C16.2126 11.5444 16.9156 11.4467 17.6047 11.5106C19.4091 11.6778 20.8312 13.1591 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0096 14.5834 17.3211Z"></path>
          </svg>
        </Button>
        <input
          type="file"
          name="imagen"
          id="imagen"
          onChange={(e) => uploadImage(e)}
          className="hidden"
          accept="image/*"
        />
        <Button
          onClick={() => document.querySelector("input[type=file]").click()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" h-5 w-5"
          >
            <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path>
          </svg>
        </Button>
      </div>
      <div className="flex-col lg:flex-row flex flex-1 gap-5">
        <textarea
          id="texto"
          className="w-full p-5  rounded-lg border-gray-300 border"
          value={texto}
          defaultValue={content ? content : texto}
          onChange={(e) => setTexto(e.target.value)}
        ></textarea>
        <div
          className="w-full bg-white border border-gray-300 rounded-lg markdown-preview p-5"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </div>
  );
};

export default Editor;
