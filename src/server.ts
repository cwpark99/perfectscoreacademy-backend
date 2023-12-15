import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  interface User {
    id: String
    name: String
    type: UserType
    isActive: Boolean

    createdAt: Time
    updatedAt: Time
  }

  type Student implements User {
    id: String
    name: String
    type: UserType
    isActive: Boolean
    
    createdAt: Time
    updatedAt: Time

    availableHours: Int
  }
  
  type Teacher implements User {
    id: String
    name: String
    type: UserType
    isActive: Boolean

    createdAt: Time
    updatedAt: Time


  }

  type Class {
    classType: ClassType
    teacher: Teacher
    students: [Student]
    
    startsAt: Time
    endsAt: Time
  }

  enum ClassType {
    PRIVATE
    GROUP
    ONLINE
  }


  

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    students: [Student]
    teachers: [Teacher]
    classes: [Class]
  }

  type Mutation {
    studentCreate: Student
    studentUpdate: Student
    teacherUpdate: Teacher
    classUpdate: Class
  }
`;



const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  // Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      students: () => books,
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);