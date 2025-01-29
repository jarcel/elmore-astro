import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

const BOOK_QUERY = gql`
  query Book($slug: String!) {
    books(filters: { slug: { eq: $slug } }) {
      Title
      Publisher
      Year
      slug
      BookCovers {
        url
      }
      Characters {
        Name
      }
      Genres {
        Name
      }
      Synopsis
      Locations {
        Name
      }
      PrimaryColor
      BillboardImage {
        url
      }
      BillboardImageMobile {
        url
      }
    }
  }
`

export async function fetchBook(slug) {
  try {
    const variables = { slug }
    const data = await fetchGraphQL(BOOK_QUERY, variables)

    if (!data?.books) return null

    const book = data.books[0]

    return book
  } catch (error) {
    console.error("Error fetching book:", error.message)
    return null
  }
}
