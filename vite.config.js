import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			manifest: {
				name: 'サウンドボード',
				description: '自由に効果音を流せるアプリ',
				theme_color: '#fff',
				start_url: '/',
				display: 'standalone',
				lang: 'ja-jp',
				icons: [
					{
						src: 'icon_512.png',
						sizes: '512x512',
						type: 'image/png'
					}, {
						src: 'icon_128.png',
						sizes: '128x128',
						type: 'image/png'
					}
				]
			},
			devOptions: { enabled: true }
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname, './src')
		}
	},
})
