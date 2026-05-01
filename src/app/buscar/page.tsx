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
  
    </section>
  );
}