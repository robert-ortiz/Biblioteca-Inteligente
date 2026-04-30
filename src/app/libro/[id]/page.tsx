type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LibroPage({ params }: BookPageProps) {
  const { id } = await params;

  return (
    <section className="page-section libro">
      <button className="libro__back-button">
        ← Volver
      </button>

      <h1 className="libro__title">Título del libro</h1>

      <div className="libro__content">
        <div className="libro__cover-section">
          <div className="libro__cover">
            Portada no disponible
          </div>
          <button className="libro__add-favorite-button">
            Agregar a favoritos
          </button>
        </div>

        <div className="libro__info-section">
          <div className="libro__info-block">
            <h3 className="libro__info-title">Autores</h3>
            <p className="libro__info-value">Sin información disponible</p>
          </div>
          <div className="libro__info-block">
            <h3 className="libro__info-title">Año de publicación</h3>
            <p className="libro__info-value">Sin información disponible</p>
          </div>
          <div className="libro__info-block">
            <h3 className="libro__info-title">Descripción</h3>
            <p className="libro__info-value">Sin información disponible</p>
          </div>
          <p className="libro__info-id">ID: {id}</p>
        </div>
      </div>
    </section>
  );
}