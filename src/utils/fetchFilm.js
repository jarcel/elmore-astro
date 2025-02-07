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
      SeriesLength
      Developed
      Episodes
      NextFilms {
        films {
          Title
          slug
          FooterImage {
            url
          }
        }
      }
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
    const data = await fetchGraphQL(ADAPTATION_QUERY, { slug })
    if (!data || !data.adaptations || data.adaptations.length === 0) {
      return null
    }
    const film = data.adaptations[0]

    return {
      film,
      nextFilms: film.NextFilms?.films || [],
    }
  } catch (error) {
    console.error("Error fetching adaptation:", error.message)
    return null
  }
}
