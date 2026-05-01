// src/services/openLibraryService.ts
const OPEN_LIBRARY_API = 'https://openlibrary.org';

/**
 * Busca libros en Open Library (Actualizado para HU5 y HU6)
 * @param query - Término de búsqueda
 * @param type - Tipo de búsqueda (q, title, author) -> REQUERIDO PARA TU HU5
 * @param sort - Ordenamiento (new, old, editions) -> REQUERIDO PARA TU HU6
 */
export async function searchBooks(query: string, type: string = 'q', sort: string = '') {
  try {
    // Aquí armamos el link largo que mencionabas antes
    // Si hay sort, lo agregamos al link, si no, se queda vacío
    const url = `${OPEN_LIBRARY_API}/search.json?${type}=${encodeURIComponent(query)}${sort ? `&sort=${sort}` : ''}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en búsqueda: ${response.status}`);
    }
    const data = await response.json();
    return data; // Retornamos el objeto completo para que el Home no falle
  } catch (error) {
    console.error('Error al buscar libros:', error);
    throw error;
  }
}
