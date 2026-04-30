export default function AcercaPage() {
  return (
    <section className="page-section acerca">
      <div className="acerca__header">
        <h1 className="page-heading">Acerca de</h1>
        <p className="page-subheading">Información sobre Biblioteca Inteligente</p>
      </div>

      <div className="acerca__grid">
        <div className="acerca__card">
          <h2 className="acerca__card-title">📖 Biblioteca Inteligente</h2>
          <div className="acerca__card-content">
            Una aplicación para buscar, explorar y guardar tus libros favoritos usando la API pública de Open Library.
          </div>
        </div>

        <div className="acerca__card">
          <h2 className="acerca__card-title">✨ Características</h2>
          <ul className="acerca__card-list">
            <li><span>•</span> Búsqueda avanzada</li>
            <li><span>•</span> Detalles de libros</li>
            <li><span>•</span> Guardar favoritos</li>
            <li><span>•</span> Almacenamiento local</li>
          </ul>
        </div>
      </div>

      <div className="acerca__card acerca__full-card">
        <h2 className="acerca__card-title">🔗 Datos y fuentes</h2>
        <div className="acerca__card-content">
          Los datos provienen de{" "}
          <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="acerca__link">
            Open Library
          </a>
          , una base de datos abierta, gratuita y colaborativa de libros del proyecto Internet Archive.
        </div>
      </div>
    </section>
  );
}