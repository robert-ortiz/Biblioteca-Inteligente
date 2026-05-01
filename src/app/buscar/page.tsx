"use client";
import { useState } from "react";
import { searchBooks } from "@/services/openLibraryService";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("q"); 
  const [sort, setSort] = useState(""); 
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false); 

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setHasSearched(true); 
    setResults([]); 

    try {
      const data = await searchBooks(query, type, sort);
      setResults(data.docs || []);
    } catch (err) {
      setError("Hubo un problema al conectar con Open Library. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section buscar p-6 md:p-10">
      <div className="buscar__header mb-8">
        <h1 className="text-4xl font-bold text-white">Buscar libros</h1>
        <p className="text-zinc-400 mt-2">Explora miles de títulos en Open Library</p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-10 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Selector HU5 */}
          <select 
            className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg text-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="q">Todo</option>
            <option value="title">Título</option>
            <option value="author">Autor</option>
          </select>
          
          {/* Input HU5 */}
          <input
            type="text"
            className="flex-1 bg-zinc-800 border border-zinc-700 p-3 rounded-lg text-white placeholder:text-zinc-500"
            placeholder="Clean Code, Tolkien, Artificial Intelligence..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          <button type="submit" className="btn btn--primary bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold text-white transition">
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {/* Filtrar y ordenar*/}
        <div className="flex items-center gap-3 text-sm text-zinc-400 mt-2 pl-1">
          <label htmlFor="sortSelect">Ordenar por:</label>
          <select 
            id="sortSelect"
            className="bg-transparent border-b border-zinc-700 pb-1 text-zinc-200"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Relevancia</option>
            <option value="new">Más reciente</option>
            <option value="old">Más antiguo</option>
          </select>
        </div>
      </form>

      
  );
}