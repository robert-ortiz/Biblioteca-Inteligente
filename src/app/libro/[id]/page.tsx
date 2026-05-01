"use client"; 

import { getBookDetails } from "@/services/openLibraryService";
import { useRouter } from "next/navigation"; 
import { useEffect, useState, use } from "react";
import Link from "next/link";

type LibroPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function LibroPage({ params }: LibroPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookDetails(id)
      .then(data => setBook(data))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20 text-center text-white text-2xl font-bold">Cargando detalles...</div>;

  if (!book) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl text-white">Libro no encontrado</h2>
        <Link href="/buscar" className="text-blue-500 underline mt-4 block">Volver al buscador</Link>
      </div>
    );
  }

  const coverId = (book.covers && book.covers.length > 0 && book.covers[0] !== -1) 
    ? book.covers[0] 
    : (book.cover_id || null);
  
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` 
    : null;

  const description = typeof book.description === 'string' 
    ? book.description 
    : book.description?.value || "No hay una descripción disponible para esta obra.";

  return (
    <section className="page-section libro max-w-5xl mx-auto p-6 md:p-12">
      {/* BOTÓN VOLVER: */}
      <button 
        onClick={() => router.back()} 
        className="libro__back-button mb-8 inline-flex items-center text-zinc-400 hover:text-white transition bg-transparent border-none cursor-pointer p-0"
      >
        <span className="mr-2">←</span> Volver a resultados
      </button>

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
              <div className="text-center text-zinc-600">
                <p className="text-4xl">📖</p>
                <p className="text-sm">Portada no disponible</p>
              </div>
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
                {/*first_publish_date */}
                {book.first_publish_date || "Desconocido"}
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

          {/* Enlace Open Library*/}
          <div className="pt-8">
            <a 
              href={`https://openlibrary.org/works/${id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
            >
              Ver ficha técnica completa en Open Library 
              <span className="ml-2 text-sm">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}