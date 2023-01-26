import axios from "axios";
import type { AxiosResponse } from "axios";
import type { RequestEvent } from "@sveltejs/kit";

export interface DriveFile {
    path?: string;
    name: string;
    id: string;
    mimeType: string;
    parents: string[];
};

interface Collection {
    authorization: { [key: string]: string };
    tokenExpire: number;
    cachedFiles: DriveFile[];
};

interface Token {
    access_token: string;
    expires_in: number;
};

interface FileList {
    files: DriveFile[];
};

const collection: Collection = {
    authorization: {},
    tokenExpire: 0,
    cachedFiles: []
};

async function fetchAccessToken() {
    if (collection.tokenExpire > Date.now()) return;
    const data = new URLSearchParams({
        client_id: '319308281902-bnth9o87f5l73o0edk8j7ich5uhhvcd3.apps.googleusercontent.com',
        client_secret: 'QSNSrM5cEPFc2bQ9kelh7W0F',
        grant_type: 'refresh_token',
        refresh_token: '1//0g0PwBjfMk3gOCgYIARAAGBASNwF-L9Ir8fX2K_gTTSOla0_H9lBPpaXlVlRI7ImdAOX6B2OVWyqahTqXWlm3kZNX-NKi5ZjWFls'
    });
    const response = await axios.post<Token>('https://www.googleapis.com/oauth2/v4/token', data);
    collection.authorization = { authorization: `Bearer ${response.data.access_token}` };
    collection.tokenExpire = Date.now() + response.data.expires_in * 1000;
};

async function _ls(parent: string, paths: string[] | never[] = []) {
    const params = new URLSearchParams({
        fields: 'files(id, name, mimeType, parents)',
        includeItemsFromAllDrives: 'true',
        q: `'${parent}' in parents and trashed = false`,
        supportsAllDrives: 'true',
    });
    await fetchAccessToken();
    const response: AxiosResponse<FileList> = await axios.get(`https://www.googleapis.com/drive/v3/files?${params}`, { headers: { ...collection.authorization } });
    const files = response.data.files;
    collection.cachedFiles.push(...files.map((item) => ({ path: [...paths, item.name].join('/'), ...item })));
    return files;
};

async function fetchData(raw: string[] | undefined, req?: RequestEvent): Promise<DriveFile[] | void | Response> {
    const path: string[] = [];
    let parent = '1rxmjcewD5H3s6IwQ3uXuWuViN9d5jQHB';

    if (!raw) return collection.cachedFiles.filter(val => val.parents.includes(parent));
    let item = collection.cachedFiles.find(val => raw.join('/') === val.path);

    if (!item) {
        for (const str of raw) {
            item = collection.cachedFiles.find(val => str === val.name);

            if (!item) {
                await _ls(parent, path);
                path.push(str);

                item = collection.cachedFiles.find(val => path.join('/') === val.path);
                if (!item) {
                    break;
                }
            
                parent = item.id;
                continue;
            };
            parent = item.id;
        };
    };

    if (item?.mimeType === 'application/vnd.google-apps.folder') {
        let filtered = collection.cachedFiles.filter(val => val.parents.includes(item?.id!));
        if (filtered.length === 0) await _ls(item.id, path);

        filtered = collection.cachedFiles.filter(val => val.parents.includes(item?.id!));
        return new Response(JSON.stringify(filtered, null, 4), { status: 200 });
    };

    const params = new URLSearchParams({ alt: 'media' });
    
    let res = await axios.get(`https://www.googleapis.com/drive/v3/files/${item?.id}?${params}`, { headers: { range: req ? req.request.headers.get('range'): null, ...collection.authorization }, responseType: 'stream' });
    // let res = await fetch(`https://www.googleapis.com/drive/v3/files/${item?.id}?${params}`, { headers: { ...collection.authorization, Range: req?.request.headers.get('Range')! } })
    return new Response(res.data, { headers: Object(res.headers) });
};

export async function GET(req: RequestEvent) {
    collection.cachedFiles = [...new Set(collection.cachedFiles)];
    const { path } = req.params;

    return await fetchData(path?.split('/'), req);
};