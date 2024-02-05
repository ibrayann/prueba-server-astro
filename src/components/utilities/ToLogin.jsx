import { useEffect } from "react";

const ToLogin = ({ publico }) => {
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        let userlocal = await localStorage.getItem("user");
        console.log(userlocal);
        let rolelocal = userlocal ? JSON.parse(userlocal).role : null;
        console.log(rolelocal);

        if (publico !== "general") {
          if (!userlocal) {
            console.log("No puedes ver esta página sin iniciar sesión");
            window.location.href = "/login";
          }

          if (rolelocal !== "ceo" && publico !== rolelocal) {
            console.log("No tienes permiso para ver esta página");
            window.location.href = "/login";
          }

          if (rolelocal === "ceo") {
            return;
          }
          return;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkPermissions();
  }, []); // La dependencia vacía [] indica que este efecto solo se ejecutará una vez (equivalente a componentDidMount)
};

export default ToLogin;
