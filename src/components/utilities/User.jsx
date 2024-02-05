const User = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <h1 className="text-secondary font-bold text-4xl mb-7">
      {`¿Que crearemos hoy ${user?.name} ?`}
    </h1>
  );
};

export default User;
