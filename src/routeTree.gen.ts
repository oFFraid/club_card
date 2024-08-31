/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as ForbiddenImport } from './routes/forbidden'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthProfileImport } from './routes/_auth/profile'
import { Route as AuthCardTemplatesImport } from './routes/_auth/card-templates'
import { Route as AuthUsersIndexImport } from './routes/_auth/users/index'
import { Route as AuthCardsIndexImport } from './routes/_auth/cards/index'
import { Route as AuthUsersUserIdEditImport } from './routes/_auth/users/$userId.edit'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ForbiddenRoute = ForbiddenImport.update({
  path: '/forbidden',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthProfileRoute = AuthProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthRoute,
} as any)

const AuthCardTemplatesRoute = AuthCardTemplatesImport.update({
  path: '/card-templates',
  getParentRoute: () => AuthRoute,
} as any)

const AuthUsersIndexRoute = AuthUsersIndexImport.update({
  path: '/users/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthCardsIndexRoute = AuthCardsIndexImport.update({
  path: '/cards/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthUsersUserIdEditRoute = AuthUsersUserIdEditImport.update({
  path: '/users/$userId/edit',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/forbidden': {
      id: '/forbidden'
      path: '/forbidden'
      fullPath: '/forbidden'
      preLoaderRoute: typeof ForbiddenImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_auth/card-templates': {
      id: '/_auth/card-templates'
      path: '/card-templates'
      fullPath: '/card-templates'
      preLoaderRoute: typeof AuthCardTemplatesImport
      parentRoute: typeof AuthImport
    }
    '/_auth/profile': {
      id: '/_auth/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthProfileImport
      parentRoute: typeof AuthImport
    }
    '/_auth/cards/': {
      id: '/_auth/cards/'
      path: '/cards'
      fullPath: '/cards'
      preLoaderRoute: typeof AuthCardsIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/users/': {
      id: '/_auth/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof AuthUsersIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/users/$userId/edit': {
      id: '/_auth/users/$userId/edit'
      path: '/users/$userId/edit'
      fullPath: '/users/$userId/edit'
      preLoaderRoute: typeof AuthUsersUserIdEditImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthCardTemplatesRoute,
    AuthProfileRoute,
    AuthCardsIndexRoute,
    AuthUsersIndexRoute,
    AuthUsersUserIdEditRoute,
  }),
  ForbiddenRoute,
  LoginRoute,
  RegisterRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/forbidden",
        "/login",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/card-templates",
        "/_auth/profile",
        "/_auth/cards/",
        "/_auth/users/",
        "/_auth/users/$userId/edit"
      ]
    },
    "/forbidden": {
      "filePath": "forbidden.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_auth/card-templates": {
      "filePath": "_auth/card-templates.tsx",
      "parent": "/_auth"
    },
    "/_auth/profile": {
      "filePath": "_auth/profile.tsx",
      "parent": "/_auth"
    },
    "/_auth/cards/": {
      "filePath": "_auth/cards/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/users/": {
      "filePath": "_auth/users/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/users/$userId/edit": {
      "filePath": "_auth/users/$userId.edit.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
