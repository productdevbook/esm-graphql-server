import '@abraham/reflection';

import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import {buildSchema, printSchema} from 'graphql'
import Fastify from "fastify";
import cors from "@fastify/cors";

import fastifyApollo, { fastifyApolloDrainPlugin, fastifyApolloHandler } from "@as-integrations/fastify";
import { MyContext, myContextFunction } from "./context.js";
import { writeFile } from 'fs';
import { SchemaGenerator } from './graphql/schema.js';



// The GraphQL schema
// const typeDefs = `#graphql
//   type Query {
//     hello: String
//     test: String
//   }
// `;

// A map of functions which return data for the schema.
// const resolvers = {
//   Query: {
//     hello: (context:any) => {
//       return 'aaa' 
//     },
//     test: () => 'world',
//   },
// };

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
  
// });

// const fileData = printSchema(schema);

// writeFile('schema.graphql', fileData, error => {
//   // handle error
// });
const schema = await SchemaGenerator()


const fastify = await Fastify({logger: true});

const apollo = new ApolloServer<MyContext>({
  schema: applyMiddleware(schema),
  plugins: [fastifyApolloDrainPlugin(fastify)],

});

await apollo.start();

await fastify.register(cors);

// fastify.post("/graphql", fastifyApolloHandler(apollo, {
// 	context: myContextFunction,
// }))
fastify.route({
  url: "/graphql",
  method: ["POST", "OPTIONS", "GET"],
  handler: fastifyApolloHandler(apollo, {context: myContextFunction}),
});


// app.route({
//   url: '/graphql',
//   method: ['GET', 'POST', 'OPTIONS'],
//   handler: async (req, reply) => {
//     const response = await graphQLServer.handleNodeRequest(req, {
//       req,
//       reply,
//     })
//     for (const [name, value] of response.headers) {
//       reply.header(name, value)
//     }

//     reply.status(response.status)

//     reply.send(response.body)

//     return reply
//   },
// })


await fastify.listen({
  port: 4000,
});

console.log(`🚀 Server ready at http://localhost:4000`);