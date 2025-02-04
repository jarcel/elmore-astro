import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

const ADAPTATION_QUERY = gql`
  query Adaptations($slug: String!) {
    adaptations(filters: { slug: { eq: $slug } }) {
      Title
      slug
      Type
      Synopsis
      Director
      Writers
      Starring
      Year
      Studio
      Runtime
      BillboardImage {
        url
      }
      BillboardImageMobile {
        url
      }
      FooterImage {
        url
      }
      Posters {
        url
      }
      SourceMaterial {
        Type
        book {
          slug
          Title
        }
      }
      Slides {
        __typename
        ... on ComponentSlidesReview {
          Content
          PublicationImage {
            url
          }
          Credit
        }
        ... on ComponentSlidesBook {
          book {
            slug
            Title
            PrimaryColor
            Synopsis
          }
        }
      }
    }
  }
`

export async function fetchFilm(slug) {
  try {
    const variables = { slug }
    const data = await fetchGraphQL(ADAPTATION_QUERY, variables)

    if (!data?.adaptations) return null

    const film = data.adaptations[0]
    return film
  } catch (error) {
    console.error("Error fetching book:", error.message)
    return null
  }
}
