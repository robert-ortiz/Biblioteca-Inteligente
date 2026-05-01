"use client";

import React from 'react';

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="p-4 my-4 bg-red-900/20 border border-red-900 text-red-400 rounded-lg text-center" role="alert">
      ❌ <strong className="font-bold">Error:</strong> {message}
    </div>
  );
}