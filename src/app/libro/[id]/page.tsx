type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LibroPage({ params }: BookPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20">
      <button className="mb-6 w-fit rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 transition-colors">
        ← Volver
      </button>

      <h1 className="text-4xl font-bold tracking-tight">Título del libro</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <div className="aspect-video rounded-lg bg-zinc-800">
            <p className="flex h-full items-center justify-center text-zinc-500">Portada no disponible</p>
          </div>
          <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-colors">
            Agregar a favoritos
          </button>
        </div>

        <div className="sm:col-span-2 space-y-4 text-zinc-300">
          <div>
            <h3 className="font-semibold text-white">Autores</h3>
            <p className="mt-1">Sin información disponible</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Año de publicación</h3>
            <p className="mt-1">Sin información disponible</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Descripción</h3>
            <p className="mt-1">Sin información disponible</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">ID: {id}</p>
          </div>
        </div>
      </div>
    </section>
  );
}