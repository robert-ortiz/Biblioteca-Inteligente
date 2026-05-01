import { searchBooks } from "@/services/openLibraryService";
import BookCard from "@/components/BookCard";

type Book = {
  key?: string;
  title?: string;
  author_name?: string[];
};

export default async function Home() {
  // Carga inicial según la HU: query = 'programming'
  const res = await searchBooks("programming");
  const docs: Book[] = res?.docs?.slice(0, 8) ?? [];

  return (
    <section className="page-section home">
      <div className="space-y-6 home__hero">
        <div>
          <h1 className="home__title-main">Descubre libros</h1>
          <p className="home__title-sub">de manera inteligente</p>
        </div>
        <p className="home__description">
          Busca entre miles de libros, explora detalles, guarda tus favoritos y mantén tu biblioteca personal. Todos los datos provienen de Open Library, una base de datos abierta y gratuita.
        </p>
        <div className="home__buttons">
          <a href="/buscar" className="btn btn--primary">Comenzar búsqueda</a>
          <a href="/acerca" className="btn btn--secondary">Más información</a>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="page-heading">Recomendados</h2>
        <div className="page-grid mt-4">
          {docs.map((b) => (
            <BookCard
              key={b.key ?? b.title}
              workKey={b.key}
              title={b.title}
              authors={b.author_name}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
