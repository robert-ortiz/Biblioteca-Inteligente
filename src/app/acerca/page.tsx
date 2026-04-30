export default function AcercaPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Acerca de</h1>

      <div className="mt-8 space-y-6 text-zinc-300">
        <div>
          <h2 className="text-lg font-semibold text-white">Biblioteca Inteligente</h2>
          <p className="mt-2">Una aplicación para buscar, explorar y guardar tus libros favoritos usando la API pública de Open Library.</p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Características</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Búsqueda avanzada por título, autor y tema</li>
            <li>• Vista detallada de cada libro</li>
            <li>• Guarda tus libros favoritos localmente</li>
            <li>• Interfaz limpia y responsiva</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Datos</h3>
          <p className="mt-2 text-sm">Los datos provienen de <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Open Library</a>, una base de datos abierta de libros.</p>
        </div>
      </div>
    </section>
  );
}