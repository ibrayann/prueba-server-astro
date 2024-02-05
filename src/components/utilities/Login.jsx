import React, { useState, useEffect } from "react";
import { login } from "../../api/api-Helper";
import toast, { Toaster } from "react-hot-toast";

const InputField = ({
  id,
  type,
  value,
  setValue,
  label,
  placeholder,
  error,
  handleBlur,
  ...props
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <label htmlFor={id} className="block mb-2 text-xs font-semibold">
          {label}
        </label>
        {error && <p className="text-red-800 text-xs mt-1">{error}</p>}
      </div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        {...props}
        className={`w-full focus:outline-none px-3 py-2 border focus:border-none focus:border-collapse placeholder:text-xs ${
          error &&
          "border-red-800 placeholder-red-800 focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800"
        } rounded-lg`}
      />
    </div>
  );
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDisable, setDisable] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailTouched) {
      setEmailError(
        !email.trim()
          ? "Ingrese un correo electrónico."
          : !emailRegex.test(email)
          ? "Ingrese un correo electrónico válido."
          : ""
      );
    }

    if (passwordTouched) {
      setPasswordError(!password.trim() ? "Ingrese una contraseña." : "");
    }

    setDisable(!(email.trim() && password.trim() && emailRegex.test(email)));
  }, [email, password, emailTouched, passwordTouched]);

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(!email.trim() ? "Ingrese un correo electrónico." : "");
    setPasswordError(!password.trim() ? "Ingrese una contraseña." : "");

    try {
      setIsLoading(true);
      const message = await login({ email, password });
      if (!message) {
        toast.success("¡Bienvenido!");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("¡Ups! Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div>
        <Toaster />
      </div>
      <InputField
        id="email"
        value={email}
        setValue={setEmail}
        label="Email"
        placeholder="Email"
        error={emailError}
        handleBlur={handleEmailBlur}
        s
      />
      <InputField
        id="password"
        type="password"
        value={password}
        setValue={setPassword}
        placeholder="Contraseña"
        label="Contraseña"
        error={passwordError}
        handleBlur={handlePasswordBlur}
      />
      <button
        id="login"
        type="submit"
        className={` ${
          isDisable ? "bg-primary" : "bg-primaryDark"
        } w-full text-white font-bold py-2 px-4 rounded block mt-5 ${
          isLoading ? "cursor-wait opacity-70" : ""
        }`}
        disabled={isDisable || isLoading}
      >
        {isLoading ? "Cargando.." : "Entrar"}
      </button>
    </form>
  );
}

export default LoginForm;
