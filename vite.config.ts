import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/drive': {
				target: 'https://hidden-field-da35.yurasubs.workers.dev',
				changeOrigin: true,
				rewrite(path) {
					return path.replace(/^\/drive/, '')
				},
			}
		}
	}
};

export default config;
