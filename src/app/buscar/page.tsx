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
}