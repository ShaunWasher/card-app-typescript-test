export default function Settings() {
  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle("dark");
      }}
      className="self-center m-1 md:m-2 p-1  rounded-md bg-slate-800 hover:bg-slate-600 dark:bg-slate-200 dark:hover:bg-slate-400 font-medium text-white dark:text-black"
    >
      toggle dark mode
    </button>
  );
}
