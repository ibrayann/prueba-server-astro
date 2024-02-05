import React, { useEffect } from "react";

const YourComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      const header = document.getElementById("header");
      const info = document.getElementById("info");
      const spinner = document.getElementById("spinner");
      const content = document?.getElementById("content");
      const encuesta = document.getElementById("encuesta");

      header.classList.add("hidden");
      info.classList.add("hidden");
      content?.classList.add("hidden");
      encuesta.classList.add("hidden");
      spinner.classList.remove("hidden");

      setTimeout(() => {
        spinner.classList.add("hidden");
        header.classList.remove("hidden");
        header.classList.add("flex");
        info.classList.remove("hidden");
        content?.classList.remove("hidden");
        encuesta.classList.remove("hidden");
        encuesta.classList.add("flex");
      }, 1000);
    };

    fetchData();
  }, []);
};

export default YourComponent;
