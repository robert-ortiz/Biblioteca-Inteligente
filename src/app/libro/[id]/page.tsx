import { getBookDetails } from "@/services/openLibraryService";
import Link from "next/link";
import Image from "next/image";

type LibroPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LibroPage({ params }: LibroPageProps) {
  const { id } = await params;
  let book;

  try {
    book = await getBookDetails(id);
  } catch (error) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl">Libro no encontrado</h2>
        <Link href="/buscar" className="text-blue-500 underline mt-4 block">Volver al buscador</Link>
      </div>
    );
  }

  // Lógica para la descripción
  const description = typeof book.description === 'string' 
    ? book.description 
    : book.description?.value || "No hay una descripción disponible para esta obra.";

  // URL de Portada Grande
  const coverUrl = book.covers && book.covers.length > 0
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : null;

  return (
    <section className="page-section libro max-w-5xl mx-auto p-6 md:p-12">
      {/* Botón Volver*/}
      <Link href="/buscar" className="libro__back-button mb-8 inline-flex items-center text-zinc-400 hover:text-white transition">
        <span className="mr-2">←</span> Volver a resultados
      </Link>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sección de Portada */}
        <div className="md:w-1/3">
          <div className="libro__cover shadow-2xl rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[2/3] flex items-center justify-center">
            {coverUrl ? (
              <img 
                src={coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-zinc-600">Portada no disponible</span>
            )}
          </div>
          
          <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
            Agregar a favoritos
          </button>
        </div>

     {/* Sección de Información*/}
        <div className="md:w-2/3 space-y-8">
          <h1 className="text-5xl font-extrabold text-white leading-tight">{book.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="libro__info-block">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Publicación</h3>
              <p className="text-lg text-zinc-200">
                {/* Intentamos obtener el año de creación o publicación */}
                {book.first_publish_date || (book.created?.value ? new Date(book.created.value).getFullYear() : "Desconocido")}
              </p>
            </div>

            <div className="libro__info-block">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Temas / Categorías</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {book.subjects?.slice(0, 6).map((subject: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-zinc-800 text-zinc-400 text-sm rounded-full border border-zinc-700">
                    {subject}
                  </span>
                )) || <p className="text-zinc-500 italic">Sin etiquetas</p>}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Descripción</h3>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {description}
            </p>
          </div>

         
  );
}