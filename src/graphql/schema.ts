import path from 'path'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'
import { buildTypeDefsAndResolvers } from 'type-graphql'

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
export async function SchemaGenerator() {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [path.join(__dirname, 'resolver', '!(*.test).{js,ts}')],
    emitSchemaFile: true,
  })

  const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })
  return schema
}

