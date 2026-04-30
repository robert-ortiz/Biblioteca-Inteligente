export default function FavoritosPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Mis favoritos</h1>

      <div className="mt-8 flex h-64 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950">
        <div className="text-center">
          <p className="text-zinc-400">No tienes libros guardados todavía</p>
          <p className="mt-2 text-sm text-zinc-500">Guarda libros desde la búsqueda para verlos aquí</p>
        </div>
      </div>
    </section>
  );
}