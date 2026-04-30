export default function BuscarPage() {
  return (
    <section className="page-section buscar">
      <div className="buscar__header">
        <h1 className="page-heading">Buscar libros</h1>
        <p className="page-subheading">Explora miles de títulos en Open Library</p>
      </div>

      <form className="buscar__form">
        <input
          type="text"
          placeholder="Buscar por título, autor o tema..."
          className="buscar__input"
        />
        <button type="button" className="buscar__button">
          Buscar
        </button>
      </form>

      <p className="buscar__hint">
        Sugerencias: "Clean Code", "Tolkien", "Artificial Intelligence"
      </p>
    </section>
  );
}