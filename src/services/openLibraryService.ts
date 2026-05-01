// src/services/openLibraryService.ts
const OPEN_LIBRARY_API = 'https://openlibrary.org';

/**
 * Busca libros en Open Library 
 * @param query - Término de búsqueda
 * @param type - Tipo de búsqueda (q, title, author)
 * @param sort - Ordenamiento (new, old, editions)
 * @param page - Página de resultados
 * @param yearMin - Año mínimo de publicación
 * @param yearMax - Año máximo de publicación
 * @param lang - Idioma (ej: 'es', 'en', 'fr')
 */
export async function searchBooks(
  query: string, 
  type: string = 'q', 
  sort: string = '', 
  page: number = 1,
  yearMin: string = '',
  yearMax: string = '',
  lang: string = ''
) {
  try {
    let url = `${OPEN_LIBRARY_API}/search.json?${type}=${encodeURIComponent(query)}&page=${page}`;
    
    if (sort && sort !== "") {
      url += `&sort=${sort}`;
    }
    if (yearMin && yearMin !== "") {
      url += `&first_publish_year=[${yearMin}%20TO%20*]`;
    }
    if (yearMax && yearMax !== "") {
      url += `&first_publish_year=[*%20TO%20${yearMax}]`;
    }
    if (lang && lang !== "") {
      url += `&language=${lang}`;
    }
    
    const response = await fetch(url);
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
