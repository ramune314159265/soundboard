import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import viteOgp from 'vite-plugin-open-graph'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			manifest: {
				name: 'サウンドボード',
				description: '自由に効果音を流せるアプリ',
				theme_color: '#fff',
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
		}),
		viteOgp({
			basic: {
				title: 'サウンドボード',
				type: 'website',
				image: 'https://ramune314159265.github.io/soundboard/icon_128.png',
				description: '自由に効果音を流せるアプリ',
				url: 'https://ramune314159265.github.io/soundboard/',
				locale: 'ja_JP'
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname, './src')
		}
	},
})
