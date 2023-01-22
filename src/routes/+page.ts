import articles from '../database.json';
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
    return {articles};
};