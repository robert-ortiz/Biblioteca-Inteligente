"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isFavorite as checkFavorite, toggleFavorite } from "@/utils/favorites";

type Props = {
  workKey?: string;
  title?: string;
  authors?: string[];
  coverId?: number;
  firstPublishYear?: number;
  editionCount?: number;
};

export default function BookCard({
  workKey,
  title,
  authors,
  coverId,
  firstPublishYear,
  editionCount,
}: Props) {
  const id = workKey?.startsWith("/works/") ? workKey.split("/").pop() : workKey;
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;
    setFavorited(checkFavorite(id));
  }, [id]);

  const handleToggle = () => {
    if (!id) return;
    const newState = toggleFavorite(id);
    setFavorited(newState);
  };

  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  return (
    <article className={`card book-card flex flex-col h-full ${favorited ? "is-favorited" : ""}`}>
      {/* Portada */}
      <div className="relative w-full aspect-[2/3] mb-4 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="text-center text-zinc-600">
            <p className="text-sm">Sin portada</p>
          </div>
        )}
        {favorited && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
            Favorito
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-grow flex flex-col">
        <h3 className="card__title text-base font-bold text-white line-clamp-2 mb-2">{title}</h3>

        <div className="card__content text-sm text-zinc-400 mb-3 line-clamp-1">
          {authors && authors.length > 0 ? authors[0] : "Autor desconocido"}
        </div>

        {/* Metadatos */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-zinc-500 py-2 border-t border-zinc-800">
          <div>
            <span className="block text-zinc-600">Año</span>
            <span className="text-white font-semibold">{firstPublishYear || "N/A"}</span>
          </div>
          <div>
            <span className="block text-zinc-600">Ediciones</span>
            <span className="text-white font-semibold">{editionCount || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="card__actions flex gap-2">
        <Link href={`/libro/${id}`} className="flex-1 btn btn--secondary text-sm py-2 text-center">
          Ver
        </Link>
        <button
          type="button"
          className={`flex-1 btn btn--primary text-sm py-2 text-center ${favorited ? "active bg-red-600 hover:bg-red-700" : ""}`}
          aria-pressed={favorited}
          onClick={handleToggle}
        >
          {favorited ? "Favorito" : "Agregar"}
        </button>
      </div>
    </article>
  );
}