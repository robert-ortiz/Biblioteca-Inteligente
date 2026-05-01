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

    // src/app/libro/[id]/page.tsx
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
);
}