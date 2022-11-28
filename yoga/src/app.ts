import '@abraham/reflection'
import { createYoga } from 'graphql-yoga'
import fastify, {
  FastifyReply,
  FastifyRequest,
  RouteHandlerMethod,
} from 'fastify'
import { useGraphQLModules } from '@envelop/graphql-modules'
import { createApplication } from 'graphql-modules'
import { basicModule } from './modules/basic/index.js'

export function createGraphQLApp() {
  return createApplication({
    modules: [basicModule],
  })
}

export function createGraphQLHandler(): RouteHandlerMethod {
  const graphQLServer = createYoga<{
    req: FastifyRequest
    reply: FastifyReply
  }>({
    logging: true,
    plugins: [useGraphQLModules(createGraphQLApp())],
  })

  return async (req, reply) => {
    const response = await graphQLServer.handleNodeRequest(req, {
      req,
      reply,
    })
    response.headers.forEach((value, key) => {
      reply.header(key, value)
    })

    reply.status(response.status)

    reply.send(response.body)

    return reply
  }
}

export function buildApp() {
  const app = fastify({ logger: true })

  app.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: createGraphQLHandler(),
  })

  return app
}
