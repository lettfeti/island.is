/*
// server.ts
import { initTracing } from '@island.is/infra-tracing'
import http from 'http'

initTracing('web')
const startServer = async (nextApp, { port = 3200 }) => {
  const handle = nextApp.getRequestHandler()
  await nextApp.prepare()
  const server = http.createServer((req, res) => {
    handle(req, res)
  })
  return new Promise((resolve, reject) => {
    server.listen(port, (error) => {
      throw new Error('SERCVER!!!')
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

export { startServer }
*/

const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
