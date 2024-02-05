export const CardTools = ({ to, title, content }) => (
  <a
    href={to}
    className={
      " bg-bgCard hover:opacity-70 h-36 hover:scale-105 transform transition duration-300 ease-in-out  rounded-lg p-7 shadow-md px-5 w-full"
    }
  >
    <section className="text-center mt-3 text-ellipsis">
      <h2 className="text-xl font-bold mb-3 text-center line-clamp-2">
        {title}
      </h2>
      <p className=" text-gray-500 text-sm line-clamp-3">{content}</p>
    </section>
  </a>
);
