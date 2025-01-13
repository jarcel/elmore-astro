import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient(import.meta.env.STRAPI_API_URL, {
  headers: {
    Authorization: `Bearer ${import.meta.env.STRAPI_API_TOKEN}`,
  },
})

/**
 * A reusable function to fetch data from a GraphQL API.
 *
 * @param {string} query - The GraphQL query string.
 * @param {object} [variables={}] - Variables to pass to the query.
 * @returns {Promise<object|null>} - The data from the GraphQL API, or null on failure.
 */

export async function fetchGraphQL(query, variables = {}) {
  try {
    const data = await client.request(query, variables)
    return data
  } catch (error) {
    console.error("GraphQL Request Error:", error.message)
    return null
  }
}
