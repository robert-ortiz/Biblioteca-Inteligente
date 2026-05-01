"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchBooks } from "@/services/openLibraryService";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

function BuscarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryUrl = searchParams?.get("q") || "";
  const typeUrl = searchParams?.get("type") || "q";
  const sortUrl = searchParams?.get("sort") || "";
  const yearMinUrl = searchParams?.get("yearMin") || "";
  const yearMaxUrl = searchParams?.get("yearMax") || "";
  const langUrl = searchParams?.get("lang") || "";
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState(queryUrl);
  const [type, setType] = useState(typeUrl); 
  const [sort, setSort] = useState(sortUrl);
  const [yearMin, setYearMin] = useState(yearMinUrl);
  const [yearMax, setYearMax] = useState(yearMaxUrl);
  const [lang, setLang] = useState(langUrl);
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(!!queryUrl);

  const totalPages = Math.ceil(total / 100);
  useEffect(() => {
    if (queryUrl) {
      ejecutarBusqueda(queryUrl, typeUrl, sortUrl, page, yearMinUrl, yearMaxUrl, langUrl);
    }
  }, [queryUrl, typeUrl, sortUrl, page, yearMinUrl, yearMaxUrl, langUrl]);

  const ejecutarBusqueda = async (q: string, t: string, s: string, p: number, yMin: string, yMax: string, l: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await searchBooks(q, t, s, p, yMin, yMax, l);
      setResults(data.docs || []);
      setTotal(data.numFound || 0);
    } catch (err) {
      setError("Error al conectar con Open Library.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setHasSearched(true);
    setPage(1);
    const params = new URLSearchParams({
      q: query,
      type: type,
      sort: sort,
      yearMin: yearMin,
      yearMax: yearMax,
      lang: lang,
    });
    router.push(`/buscar?${params.toString()}`);
  };

  return (
    <section className="page-section buscar p-6 md:p-10">
      <div className="buscar__header mb-8">
        <h1 className="text-4xl font-bold text-white">Buscar libros</h1>
        <p className="text-zinc-400 mt-2">Explora miles de títulos en Open Library</p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-10 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div className="flex flex-col md:flex-row gap-3">
          <select 
            className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg text-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="q">Todo</option>
            <option value="title">Título</option>
            <option value="author">Autor</option>
          </select>
          
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <label htmlFor="yearMin" className="text-zinc-400">Año desde:</label>
            <input
              id="yearMin"
              type="number"
              className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-white"
              placeholder="2000"
              value={yearMin}
              onChange={(e) => setYearMin(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="yearMax" className="text-zinc-400">Año hasta:</label>
            <input
              id="yearMax"
              type="number"
              className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-white"
              placeholder="2024"
              value={yearMax}
              onChange={(e) => setYearMax(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lang" className="text-zinc-400">Idioma:</label>
            <select 
              id="lang"
              className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-white"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="eng">Inglés</option>
              <option value="spa">Español</option>
              <option value="fra">Francés</option>
              <option value="deu">Alemán</option>
              <option value="ita">Italiano</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sortSelect" className="text-zinc-400">Ordenar por:</label>
            <select 
              id="sortSelect"
              className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-white"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Relevancia</option>
              <option value="new">Más reciente</option>
              <option value="old">Más antiguo</option>
              <option value="editions">Más ediciones</option>
            </select>
          </div>
        </div>
      </form>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && hasSearched && results.length === 0 && (
        <div className="text-center p-12 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-500">
          <p className="text-6xl mb-4">🔎</p>
          <p className="text-xl font-semibold text-zinc-300">No encontramos resultados</p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((book) => (
            <BookCard key={book.key} workKey={book.key} title={book.title} authors={book.author_name} />
          ))}
        </div>
      )}
{!loading && results.length > 0 && (
  <div className="flex justify-center gap-4 mt-10">
    <button
      disabled={page <= 1}
      onClick={() => setPage(page - 1)}
      className="btn btn--secondary"
    >
      Anterior
    </button>

    <span className="text-white">Página {page}</span>

    <button
      disabled={page >= totalPages}
      onClick={() => setPage(page + 1)}
      className="btn btn--primary"
    >
      Siguiente
    </button>
  </div>
)}
    </section>
  );
}
export default function BuscarPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BuscarContent />
    </Suspense>
  );
}