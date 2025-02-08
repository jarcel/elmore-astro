export function generateBookJsonLd(book) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.Title,
    author: {
      "@type": "Person",
      name: "Elmore Leonard",
    },
    datePublished: book.Year?.toString(),
    genre: book.Genres?.map((genre) => genre.Name),
    description: book.Synopsis || "",
    image: book.Thumbnail?.url || "",
    url: `${import.meta.env.APP_URL}/books/${book.slug}`,
    publisher: book.Publisher
      ? {
          "@type": "Organization",
          name: book.Publisher,
        }
      : undefined,
  }
}

export function generateFilmJsonLd(film) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: film.Title,
    director: film.Director
      ? {
          "@type": "Person",
          name: film.Director,
        }
      : undefined,
    datePublished: film.Year?.toString(),
    genre: film.Genres?.map((genre) => genre.Name),
    image: film.Poster?.url || "",
    url: `${import.meta.env.APP_URL}/film/${film.slug}`,
    description: film.Synopsis || "",
  }
}
