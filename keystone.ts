/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/
import { config } from '@keystone-6/core';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    db: {
      provider: 'postgresql',
      url: `postgres://${process.env.USER}@localhost:5432/la-macarena-keystone-db`,
      idField: { kind: 'autoincrement' },
    },
    server: {
      // Port and cors config
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      cors: {
        origin: ['http://localhost:3000', 'https://la-macarena.vercel.app', 'https://la-macarena-pgm-nicolascnudde.vercel.app'],
        credentials: true,
      },
      // Create a health check endpoint that will be available for the cloud app platform to check on the app's health.
      healthCheck: {
        path: '/my-health-check',
        data: () => ({
          status: 'healthy',
          timestamp: Date.now(),
          uptime: process.uptime(),
        }),
      },
    },
    // GraphQL config for getting data through queries and mutations
    graphql: {
      playground: true,
      apolloConfig: {
        introspection: true,
      },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    images: {
      upload: 'local',
      local: {
        storagePath: 'public/images',
        baseUrl: '/images',
      },
    },
  })
);
