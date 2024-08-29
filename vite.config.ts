import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { Connect, defineConfig, HttpProxy, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const getPostData = (req: Connect.IncomingMessage) => {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk.toString()
    })

    req.on('end', () => {
      if (!data) {
        resolve({})
      }

      resolve(JSON.parse(data))
    })
  })
}

const proxyLogger = (proxy: HttpProxy.Server) => {
  proxy.on('error', (err) => {
    console.log('proxy error', err)
  })

  proxy.on('proxyReq', async (proxyReq, req) => {
    const requestBody = await getPostData(req)
    console.log('requestBody', requestBody)
    console.log(
      'Sending Request:',
      req.method,
      req.url,
      ' => TO THE TARGET =>  ',
      proxyReq.method,
      proxyReq.protocol,
      proxyReq.host,
      proxyReq.path,
      JSON.stringify(proxyReq.getHeaders(), null, 2),
    )
  })

  proxy.on('proxyRes', (proxyRes, req) => {
    console.log(
      'Received Response from the Target:',
      proxyRes.statusCode,
      req.url,
      JSON.stringify(proxyRes.headers, null, 2),
    )
  })
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envDir = resolve('./env')
  const env = loadEnv(mode, envDir)
  console.log(env)
  return {
    plugins: [TanStackRouterVite(), react(), tsconfigPaths()],
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: env.VITE_API_URL,
    //       changeOrigin: true,
    //       configure: (proxy) => proxyLogger(proxy),
    //       rewrite: (path) => {
    //         console.log(path, path.replace(/^\/api/, ''))
    //         return env.VITE_API_URL + path.replace(/^\/api/, '')
    //       },
    //     },
    //   },
    // },
    envDir: envDir,
  }
})
