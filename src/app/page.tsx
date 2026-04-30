export default function Home() {
  return (
    <section className="page-section home">
      <div className="space-y-6 home__hero">
        <div>
          <h1 className="home__title-main">
            Descubre libros
          </h1>
          <p className="home__title-sub">
            de manera inteligente
          </p>
        </div>
        <p className="home__description">
          Busca entre miles de libros, explora detalles, guarda tus favoritos y mantén tu biblioteca personal. Todos los datos provienen de Open Library, una base de datos abierta y gratuita.
        </p>
        <div className="home__buttons">
          <a href="/buscar" className="btn btn--primary">
            Comenzar búsqueda
          </a>
          <a href="/acerca" className="btn btn--secondary">
            Más información
          </a>
        </div>
      </div>
    </section>
  );
}
