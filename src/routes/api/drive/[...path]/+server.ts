import type { RequestEvent } from "@sveltejs/kit";

export async function GET(req: RequestEvent) {
    const { default: axios } = await import('axios')
    const response = await axios.get(`https://hidden-field-da35.yurasubs.workers.dev/${req.params.path}`, { responseType: 'stream' })
    return new Response(response.data)
}