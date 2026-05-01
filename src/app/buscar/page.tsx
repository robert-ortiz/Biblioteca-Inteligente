// src/app/buscar/page.tsx
"use client";
import { useState } from "react";
import { searchBooks } from "@/services/openLibraryService";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
