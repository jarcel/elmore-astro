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
      Slides {
        __typename
        ... on ComponentSlidesTagline {
          Content
        }
        ... on ComponentSlidesReview {
          Content
          PublicationImage {
            url
          }
          Credit
        }
        ... on ComponentSlidesCharacter {
          Name
          Content
          CharacterImage {
            url
          }
        }
        ... on ComponentSlidesAdaptation {
          adaptation {
            Title
            slug
          }
          Content
          AdaptationImage {
            url
          }
        }
      }
      Adaptation {
        Type
        adaptation {
          Title
          Year
          slug
        }
      }
      NextBooks {
        books {
          Title
          slug
          PrimaryColor
          FooterImage {
            url
          }
        }
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
