"use client";

import { useEffect, useState } from "react";
import { getFavorites } from "@/utils/favorites";
import { getBookDetails } from "@/services/openLibraryService";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

export default function FavoritosPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      setError("");

      try {
        const ids = getFavorites(); // ["OL123W", ...]

        const results = await Promise.all(
          ids.map(async (id: string) => {
            const data = await getBookDetails(id);

            const coverId = data.covers && data.covers.length > 0 && data.covers[0] !== -1
              ? data.covers[0]
              : null;

            return {
              key: id,
              title: data.title,
              author_name: data.authors?.map((a: any) => a.name) || ["Autor desconocido"],
              cover_i: coverId,
              first_publish_year: data.first_publish_date ? new Date(data.first_publish_date).getFullYear() : null,
              edition_count: data.edition_count || null,
            };
          })
        );

        setBooks(results);
      } catch (err) {
        setError("Error al cargar favoritos");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  return (
    <section className="p-6 md:p-10">
      <h1 className="text-4xl font-bold text-white mb-8">
        Mis Favoritos
      </h1>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && books.length === 0 && (
        <p className="text-zinc-400">No tienes favoritos aún.</p>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.key}
              workKey={book.key}
              title={book.title}
              authors={book.author_name}
              coverId={book.cover_i}
              firstPublishYear={book.first_publish_year}
              editionCount={book.edition_count}
            />
          ))}
        </div>
      )}
    </section>
  );
}