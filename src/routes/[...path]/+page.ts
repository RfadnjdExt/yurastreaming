import type { PageLoad } from "../$types";
import articles from '$lib/database.json';

export const load: PageLoad = ({ params }) => {
    const { path } = params as { path: string }
    const [type, format, source, typeTitle, episode] = path.split('/')
    const article = articles.find(v => v.type === type && v.format === format && v.source === source && v.typeTitle === typeTitle && v.episode == episode)!
    return {
        article
    }
};