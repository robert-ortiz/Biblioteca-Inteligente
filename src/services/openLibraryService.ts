// Servicio centralizado para consumir Open Library API

const OPEN_LIBRARY_API = 'https://openlibrary.org';

/**
 * Busca libros en Open Library
 * @param query - Término de búsqueda
 * @returns Lista de libros encontrados
 * @throws Error si la búsqueda falla
 */
export async function searchBooks(query: string) {
  try {
    const response = await fetch(`${OPEN_LIBRARY_API}/search.json?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Error en búsqueda: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al buscar libros:', error);
    throw error;
  }
}

/**
 * Obtiene los detalles de un libro específico
 * @param workId - ID de la obra (ej: OL82563W)
 * @returns Detalles completos del libro
 * @throws Error si la solicitud falla
 */
export async function getBookDetails(workId: string) {
  try {
    const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
    if (!response.ok) {
      throw new Error(`Error al obtener detalle: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener detalles del libro:', error);
    throw error;
  }
}
