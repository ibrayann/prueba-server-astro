import React, { useState } from "react";

const Perfil = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Eliminar cookies
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <div>
      {user.name ? (
        <>
          <div className="">
            <button
              id="dropdownInformationButton"
              data-dropdown-toggle="dropdownInformation"
              className="text-white font-medium border rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
              type="button"
              onClick={toggleDropdown}
            >
              {user.name}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isOpen && (
              <div
                id="dropdownInformation"
                className="z-50 absolute right-3 md:right-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{user.name}</div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <div className="py-2">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <a
          href="./login"
          target="_self"
          className="text-white font-bold text-xl hover:border-white px-5 py-2 rounded-md border"
        >
          Entrar
        </a>
      )}
    </div>
  );
};

export default Perfil;
