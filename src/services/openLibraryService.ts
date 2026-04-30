// Servicio centralizado para consumir Open Library API

const OPEN_LIBRARY_API = 'https://openlibrary.org/api';

/**
 * Busca libros en Open Library
 * @param query - Término de búsqueda
 * @returns Lista de libros encontrados
 */
export async function searchBooks(query: string) {
  const response = await fetch(`${OPEN_LIBRARY_API}/search.json?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
}
