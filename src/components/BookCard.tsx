"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isFavorite as checkFavorite, toggleFavorite } from "@/utils/favorites";

type Props = {
  workKey?: string;
  title?: string;
  authors?: string[];
};

export default function BookCard({ workKey, title, authors }: Props) {
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

  return (
    <article className={`card book-card ${favorited ? "is-favorited" : ""}`}>
      <h3 className="card__title">{title}</h3>
      <div className="card__content">{authors ? authors.join(", ") : "Autor desconocido"}</div>

      <div className="card__actions">
        <Link href={`/libro/${id}`} className="btn btn--secondary">
          Ver
        </Link>
        <button
          type="button"
          className={`btn btn--primary ${favorited ? "active" : ""}`}
          aria-pressed={favorited}
          onClick={handleToggle}
        >
          {favorited ? "Quitar favorito" : "Favorito"}
        </button>
      </div>
    </article>
  );
}
