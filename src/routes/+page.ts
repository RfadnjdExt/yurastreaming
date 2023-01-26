import articles from '$lib/database.json';
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
    return {articles};
};