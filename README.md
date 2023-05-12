# Book-Search
## Description
- This is a book search react application that originally used a REST API, and is now refactored to use graphQL API. You type in a book and it queries the api and returns books to the page.
## Details
- I used apollo server Apollo Server is an open-source, GraphQL server that's compatible with any GraphQL client.ding Apollo Client. The way the api is set up is to use types to define what kind of data the client can query. Mutations are also used to handle Updates, Creates, and Deletes. The challenge of this refactor was translating the two kinds of API's. Common ground was found in how they worked with mongoose database. That gave me a good foothold in knowing where to start.
## What i learned
- I learned how to set up the mutations and queries that work with the type defs to work with the mongoose database to achieve predictable results from the api.
## link to deployent
- https://graphql-book-search.herokuapp.com/
