import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

const BOOKS_QUERY = gql`
  query Query($sort: [String]) {
    books(sort: $sort) {
      Title
      Year
      Thumbnail {
        url
      }
      slug
      PrimaryColor
    }
  }
`

export async function fetchBooks(order = "asc") {
  try {
    // Determine the sorting order
    const sortOrder = order === "asc" ? "Year:asc" : "Year:desc"

    // Pass the sorting parameter
    const variables = { sort: [sortOrder] }

    // Fetch data from the GraphQL API
    const data = await fetchGraphQL(BOOKS_QUERY, variables)

    // Return the books or an empty array if no data
    return data?.books || []
  } catch (error) {
    console.error("Error fetching books:", error.message)
    return []
  }
}
