import axios from 'axios';
import { create } from 'xmlbuilder2';
import type { IncomingMessage } from 'http';
import type { RequestHandler } from "./$types";
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import type { AdaptiveFormats, Collections } from './+server.d';

const collections: Collections = {};

export const GET: RequestHandler = async ({ params, request }) => {
    const config = { headers: { cookie: 'VISITOR_INFO1_LIVE=GxSnjYVTTb8; SID=SAhHIowUIYGoWpt7XzfV_jHf2o0E6mkogvgdYbeCQDhq4dmyV8wZCWEaFWEgjbqAn8btuw.; __Secure-1PSID=SAhHIowUIYGoWpt7XzfV_jHf2o0E6mkogvgdYbeCQDhq4dmyFtAbrjJDxg1ma9J95Ypaow.; __Secure-3PSID=SAhHIowUIYGoWpt7XzfV_jHf2o0E6mkogvgdYbeCQDhq4dmyVBRgDw6kJCdQw3S-JWV4Sg.; HSID=ATnOMUifgVgJV_VIY; SSID=Afc3lrftfDEqM0TS8; APISID=YXcFW4flzdVFxZ1s/A6DxytpG_MF2sm_ZZ; SAPISID=JLKG8koiQDw0E8Hx/Av03csFr6lPovp5v4; __Secure-1PAPISID=JLKG8koiQDw0E8Hx/Av03csFr6lPovp5v4; __Secure-3PAPISID=JLKG8koiQDw0E8Hx/Av03csFr6lPovp5v4; LOGIN_INFO=AFmmF2swRAIfSnE2N4vNDDQZg4ty590ruarhrl6LabQ_yl7MrA5LAAIhANSK1Zk1HlfynTJAruhfXTJ8iiODePusNjDVx9JRZphF:QUQ3MjNmejJEZ1hqS0xlM0x1N1ZwQlBNZnBydi00TFEydHlPUVJaWVNaTk8wRUQ4WWtwR0FvODBrX0V5bVZWMHJFYlJYRVlaeWlnYlV2Wl9GaVo1aG5pWnYycm1yaEljLVdSQ1Zka1MzTE1vT3pvYVluZGpVWmFxeUdBWjVtWG9QU2pIM1doRnVOZDN3QmJmN1NHalZLS3gycmZGZl9IUDdR; _gcl_au=1.1.1435250310.1673444801; PREF=tz=Asia.Jakarta&autoplay=true; DEVICE_INFO=ChxOekU0TnpjNE1qZzNOVGcwTmpJeE9URTJOZz09EPHEgJ4GGPHEgJ4G; YSC=r6ItlbL6nak; SIDCC=AIKkIs1korRQioY46Lgbh1BN7WoUnPiSyLi0PRhCoJ8dHKehpBTEE7Y-GD66I0_KnrbD3n8eFQ; __Secure-1PSIDCC=AIKkIs2DuC8geCJthHg82seLmgmxzU4H3nAwoJIkbMej8QKyiR2_VB4QhqrSh0Etlnwm7m4XqRA; __Secure-3PSIDCC=AIKkIs2rgG6JUGxoCsOSTDpzGGMr2s2bsBzgc2D1-D2Ru21UIlzblsL2IPYn7sYOsaeTAkLwPFg' } };
    const { param } = params;

    const [id, itag] = param.split('/');

    if (!(id in collections) || Date.now() > collections[id].expires) {
        const response = await axios.get<string>(`https://www.youtube.com/watch?v=${id}&feature=youtu.be`, config);
        const matchedData = response.data.match(/"adaptiveFormats":\s*(.+?)},"playbackTracking":\s*{/);
        if (!matchedData) return new Response();
        const [, destructuredMatch] = matchedData;
        const parsedData: AdaptiveFormats[] = JSON.parse(destructuredMatch);
        const [firstReference] = parsedData;
        const expire = new URL(firstReference.url).searchParams.get('expire');
        if (!expire) return new Response();
        collections[id] = {
            data: parsedData,
            expires: Number(expire) * 1000,
            videos: {},
            xml: ''
        };
        const duration = `PT${Number(firstReference.approxDurationMs) / 1000}S`;
        const period = create({ encoding: 'UTF-8', version: '1.0' }).ele('MPD', { mediaPresentationDuration: duration, minBufferTime: 'PT100S', profiles: 'urn:webm:dash:profile:webm-on-demand:2012', type: 'static', xmlns: 'urn:mpeg:DASH:schema:MPD:2011', 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance', 'xsi:schemaLocation': 'urn:mpeg:DASH:schema:MPD:2011' }).ele('Period', { duration, id: '0', start: 'PT0S' });

        const videoAdaptationSet = period.ele('AdaptationSet', { bitstreamSwitching: 'true', id: '0', subsegmentAlignment: 'true', subsegmentStartsWithSAP: '1' });
        const audioAdaptationSet = period.ele('AdaptationSet', { id: '1', subsegmentAlignment: 'true', subsegmentStartsWithSAP: '1' });
        
        parsedData.forEach(({ averageBitrate, bitrate, height, indexRange, initRange, itag, mimeType, url, width }, index) => {
            const matchedMimeType = mimeType.match(/(.+?); codecs=\"(.+?)\"/);
            if (!matchedMimeType) return;
            const [, parsedMimeType, codecs] = matchedMimeType;
            function setAdaptationSet(adaptationSet: XMLBuilder) {
                const representation = adaptationSet.ele('Representation', { bandwidth: averageBitrate, codecs, height, id: index, mimeType: parsedMimeType, width });
                representation.ele('BaseURL').txt(`/api/youtube/${id}/${itag}`);
                representation.ele('SegmentBase', { indexRange: `${indexRange.start}-${indexRange.end}` }).ele('Initialization', { range: `${initRange.start}-${initRange.end}` });
            };
            if (parsedMimeType.startsWith('video')) setAdaptationSet(videoAdaptationSet)
            else setAdaptationSet(audioAdaptationSet);
            collections[id].videos[itag] = url;
        });
        collections[id].xml = period.end({ prettyPrint: true });

    };

    if (itag === 'manifest.mpd') return new Response(collections[id].xml)
    else {
        const range = request.headers.get('range');
        const headers: {[key: string]: string} = { ...config.headers };
        console.log(headers)

        if (range) headers['range'] = range;
        const response = await axios.get(collections[id].videos[itag], { headers, responseType: 'stream' });
        console.log(response);
        return new Response(response.request, { headers: { ...Object(response.headers), 'cache-control': 'no-store' }, status: response.status });
    };
};