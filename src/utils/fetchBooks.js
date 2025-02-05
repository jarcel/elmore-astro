import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

const BOOKS_QUERY = gql`
  query Query($sort: [String], $pagination: PaginationArg) {
    books(sort: $sort, pagination: $pagination) {
      Title
      Year
      Thumbnail {
        url
      }
      slug
      PrimaryColor
      Genres {
        Name
        slug
      }
      createdAt
    }
  }
`

export async function fetchBooks(order = "asc") {
  try {
    // Determine the sorting order
    const sortOrder = order === "asc" ? "createdAt:asc" : "createdAt:desc"

    // Pass the sorting parameter
    const variables = {
      sort: [sortOrder],
      pagination: { limit: 100 },
    }

    // Fetch data from the GraphQL API
    const data = await fetchGraphQL(BOOKS_QUERY, variables)

    // Return the books or an empty array if no data
    return data?.books || []
  } catch (error) {
    console.error("Error fetching books:", error.message)
    return []
  }
}
