export default function BuscarPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Buscar libros</h1>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Buscar por título, autor o tema..."
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-400 focus:border-white focus:outline-none"
        />
        <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors">
          Buscar
        </button>
      </div>

      <p className="mt-6 text-sm text-zinc-400">
        Ingresa un término para buscar entre miles de libros de Open Library.
      </p>
    </section>
  );
}