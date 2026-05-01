// src/services/openLibraryService.ts
const OPEN_LIBRARY_API = 'https://openlibrary.org';

/**
 * Busca libros en Open Library 
 * @param query - Término de búsqueda
 * @param type - Tipo de búsqueda (q, title, author)
 * @param sort - Ordenamiento (new, old, editions)
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

/**
 * Obtiene los detalles de un libro específico 
 * @param workId - ID de la obra
 */
export async function getBookDetails(workId: string) {
  try {
    // Limpiamos el ID por si viene con "/works/"
    const id = workId.replace('/works/', '');
    const response = await fetch(`${OPEN_LIBRARY_API}/works/${id}.json`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener detalle: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener detalles del libro:', error);
    throw error;
  }
}
