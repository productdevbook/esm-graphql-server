import { buildApp } from './app.js'

const app = buildApp()

app
  .listen({
    port: 3000,
  })
  .then((serverUrl) => {
    app.log.info(`GraphQL API located at ${serverUrl}/graphql`)
  })
  .catch((err) => {
    app.log.error(err)
    process.exit(1)
  })
