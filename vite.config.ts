import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/favicon.ico': {
				target: '/api/drive/favicon.ico'
			}
		}
	}
};

export default config;
