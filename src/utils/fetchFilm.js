import { gql } from "graphql-request"
import { fetchGraphQL } from "./fetchGraphQL"

const ADAPTATION_QUERY = gql`
  query Adaptations($slug: String!, $year: Int!) {
    # Fetch the current adaptation
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

    # Fetch the next three adaptations after this one
    nextAdaptations: adaptations(
      filters: { Year: { gt: $year } } # Get adaptations after the current one's year
      pagination: { pageSize: 3 } # Only get the next 3
      sort: "Year:asc" # Ensure they're the next ones in chronological order
    ) {
      Title
      slug
      Year
      FooterImage {
        url
      }
    }
  }
`

export async function fetchFilm(slug) {
  try {
    // First, fetch the adaptation to get its Year
    const initialData = await fetchGraphQL(
      gql`
        query GetYear($slug: String!) {
          adaptations(filters: { slug: { eq: $slug } }) {
            Year
          }
        }
      `,
      { slug }
    )

    if (!initialData?.adaptations?.length) return null

    const filmYear = initialData.adaptations[0].Year

    // Now fetch the film + next 3 adaptations
    const variables = { slug, year: filmYear }
    const data = await fetchGraphQL(ADAPTATION_QUERY, variables)

    if (!data?.adaptations) return null

    return {
      film: data.adaptations[0],
      nextAdaptations: data.nextAdaptations || [],
    }
  } catch (error) {
    console.error("Error fetching adaptation:", error.message)
    return null
  }
}
