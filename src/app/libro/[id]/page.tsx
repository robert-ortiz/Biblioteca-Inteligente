type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LibroPage({ params }: BookPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Detalle del libro</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        Vista inicial del libro con id {id}.
      </p>
    </section>
  );
}