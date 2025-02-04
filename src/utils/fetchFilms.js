import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

const ADAPTATION_QUERY = gql`
  query Query($sort: [String], $pagination: PaginationArg) {
    adaptations(sort: $sort, pagination: $pagination) {
      Title
      Year
      Thumbnail {
        url
      }
      slug
      createdAt
    }
  }
`

export async function fetchFilms(order = "asc") {
  try {
    // Determine the sorting order
    const sortOrder = order === "asc" ? "createdAt:asc" : "createdAt:desc"

    // Pass the sorting parameter
    const variables = {
      sort: [sortOrder],
      pagination: { limit: 100 },
    }

    // Fetch data from the GraphQL API
    const data = await fetchGraphQL(ADAPTATION_QUERY, variables)

    // Return the books or an empty array if no data
    return data?.adaptations || []
  } catch (error) {
    console.error("Error fetching films:", error.message)
    return []
  }
}
