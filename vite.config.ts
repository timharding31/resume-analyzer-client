import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const userConfig: UserConfig = {
    plugins: [react()],
    css: {
      modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCase',
        generateScopedName: '[local]__[hash:base64:2]'
      }
    }
  }

  if (mode !== 'production') {
    userConfig.server = {
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true
        }
      }
    }
  }

  return userConfig
})
