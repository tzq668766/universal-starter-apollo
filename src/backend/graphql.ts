import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

const Schema = `
  type Author {
    firstName: String!
    lastName: String!
  }

  type Query {
    author: Author
  }

  schema {
    query: Query
  }
`;

const Resolvers = {
  Query: {
    author() {
      return {
        firstName: 'Kamil',
        lastName: 'Kisiela'
      };
    }
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

export function GraphQL() {
  return apolloExpress({
    schema: executableSchema
  });
}

export function GraphiQL() {
  return graphiqlExpress({
    endpointURL: '/graphql'
  });
}
