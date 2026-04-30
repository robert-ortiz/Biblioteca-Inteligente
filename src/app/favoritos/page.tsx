export default function FavoritosPage() {
  return (
    <section className="page-section favoritos">
      <div className="favoritos__header">
        <h1 className="page-heading">Mis favoritos</h1>
        <p className="page-subheading">Tus libros guardados localmente</p>
      </div>

      <div className="favoritos__empty">
        <div className="favoritos__empty-content">
          <div className="favoritos__empty-icon">📚</div>
          <p className="favoritos__empty-title">No tienes libros guardados todavía</p>
          <p className="favoritos__empty-description">Guarda libros desde la búsqueda para verlos aquí</p>
          <a href="/buscar" className="favoritos__empty-button">
            Ir a buscar
          </a>
        </div>
      </div>
    </section>
  );
}