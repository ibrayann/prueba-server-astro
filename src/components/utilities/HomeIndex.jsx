import { Home, MenorQue } from "../icons/icons.jsx";

const HomeIndex = ({ slugCategoria, categoria, titulo }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center text-secondary hover:text-gray-400 md:ml-2 dark:text-secondary dark:hover:text-gray-400">
          <a href="/" className="inline-flex items-center text-sm font-medium">
            <Home />
            Home
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <MenorQue />
            <a
              href={slugCategoria}
              className="ml-1 text-sm font-medium text-secondary hover:text-gray-400 md:ml-2 dark:text-secondary dark:hover:text-gray-400"
            >
              {categoria}
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <MenorQue />
            <span className="ml-1 text-sm font-medium text-secondary hover:text-gray-400 md:ml-2 dark:text-secondary dark:hover:text-gray-400">
              {titulo}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default HomeIndex;
