"use client";

import React from 'react';
export default function Loading() {
  const skeletonCards = Array(4).fill(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {skeletonCards.map((_, index) => (
        <div 
          key={index} 
          className="animate-pulse flex flex-col gap-4 p-4 border border-zinc-800 rounded-lg bg-zinc-900/50"
          aria-hidden="true"
        >
          {/* Espacio para la imagen de portada */}
          <div className="bg-zinc-800 h-60 w-full rounded-md"></div>
          
          {/* Espacio para el título */}
          <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
          
          {/* Espacio para el autor */}
          <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
          
          {/* Espacio para los botones */}
          <div className="flex gap-2 mt-2">
            <div className="h-10 bg-zinc-800 rounded w-full"></div>
            <div className="h-10 bg-zinc-800 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}