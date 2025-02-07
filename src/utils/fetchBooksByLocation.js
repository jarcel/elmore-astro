import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

// Fetch books by genre slug, ordered by Year (DESC), paginated (50 per page)
export async function fetchBooksByLocation(locationSlug) {
  const QUERY = gql`
    query BooksByLocation($slug: String!, $pagination: PaginationArg) {
      books(
        filters: { Locations: { slug: { eq: $slug } } }
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
    slug: locationSlug,
    pagination: { limit: 100 },
  }

  const data = await fetchGraphQL(QUERY, variables)

  return data?.books || []
}

// Fetch all genres
export async function fetchLocations() {
  const QUERY = gql`
    query {
      locations(pagination: { limit: 100 }) {
        Name
        slug
      }
    }
  `

  const data = await fetchGraphQL(QUERY)
  return data?.locations || []
}
