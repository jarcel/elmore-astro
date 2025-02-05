import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

// Fetch books by genre slug, ordered by Year (DESC), paginated (50 per page)
export async function fetchBooksByCharacter(characterSlug) {
  const QUERY = gql`
    query BooksByCharacter($slug: String!, $pagination: PaginationArg) {
      books(
        filters: { Characters: { slug: { eq: $slug } } }
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
    slug: characterSlug,
    pagination: { limit: 100 },
  }

  const data = await fetchGraphQL(QUERY, variables)

  return data?.books || []
}

// Fetch all genres
export async function fetchCharacters() {
  const QUERY = gql`
    query {
      characters {
        Name
        slug
      }
    }
  `

  const data = await fetchGraphQL(QUERY)
  return data?.characters || []
}
