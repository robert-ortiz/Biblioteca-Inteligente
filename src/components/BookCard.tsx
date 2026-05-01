"use client";

import Link from "next/link";

type Props = {
  workKey?: string;
  title?: string;
  authors?: string[];
};

export default function BookCard({ workKey, title, authors }: Props) {
  const id = workKey?.startsWith("/works/") ? workKey.split("/").pop() : workKey;

  return (
    <article className="card book-card">
      <h3 className="card__title">{title}</h3>
      <div className="card__content">{authors ? authors.join(", ") : "Autor desconocido"}</div>

      <div className="card__actions">
        <Link href={`/libro/${id}`} className="btn btn--secondary">
          Ver
        </Link>
        <button type="button" className="btn btn--primary">
          Favorito
        </button>
      </div>
    </article>
  );
}
