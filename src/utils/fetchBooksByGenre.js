import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

// Fetch books by genre slug, ordered by Year (DESC), paginated (50 per page)
export async function fetchBooksByGenre(genreSlug) {
  const QUERY = gql`
    query BooksByGenre($slug: String!, $pagination: PaginationArg) {
      books(
        filters: { Genres: { slug: { eq: $slug } } }
        sort: ["Year:asc"]
        pagination: $pagination
      ) {
        Title
        Year
        slug
        PrimaryColor
        Thumbnail {
          url
        }
      }
    }
  `

  const variables = {
    slug: genreSlug,
    pagination: { limit: 100 },
  }

  const data = await fetchGraphQL(QUERY, variables)

  return data?.books || []
}

// Fetch all genres
export async function fetchGenres() {
  const QUERY = gql`
    query {
      genres(pagination: { limit: 100 }) {
        Name
        slug
      }
    }
  `

  const data = await fetchGraphQL(QUERY)
  return data?.genres || []
}
