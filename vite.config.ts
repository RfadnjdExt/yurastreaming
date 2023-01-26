import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/favicon.ico': {
				target: '/api/drive/favicon.ico'
			},
			'/api/drive': {
				target: 'https://hidden-field-da35.yurasubs.workers.dev',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api\/drive/, '')
			}
		}
	}
};

export default config;
