const cors = require('cors');
const path = require('path');
const express = require('express');
const { create } = require('xmlbuilder2');
const { default: axios } = require('axios');

const app = express();
const collections = {};

app.use(cors());
app.use(express.static('public'));

app.get('/', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/youtube/:id/:itag', async (req, res) => {
    const config = { headers: { cookie: 'VISITOR_INFO1_LIVE=GxSnjYVTTb8; SID=SAhHIowUIYGoWpt7XzfV_jHf2o0E6mkogvgdYbeCQDhq4dmyV8wZCWEaFWEgjbqAn8btuw.; __Secure-1PSID=SAhHIowUIYGoWpt7XzfV_jHf2o0E6mkogvgdYbeCQDhq4dmyFtAbrjJDxg1ma9J95Ypaow.; __Secure-3PSID=SAhHIowUIYGoWpt7XzfV_jHf2o0E6mkogvgdYbeCQDhq4dmyVBRgDw6kJCdQw3S-JWV4Sg.; HSID=ATnOMUifgVgJV_VIY; SSID=Afc3lrftfDEqM0TS8; APISID=YXcFW4flzdVFxZ1s/A6DxytpG_MF2sm_ZZ; SAPISID=JLKG8koiQDw0E8Hx/Av03csFr6lPovp5v4; __Secure-1PAPISID=JLKG8koiQDw0E8Hx/Av03csFr6lPovp5v4; __Secure-3PAPISID=JLKG8koiQDw0E8Hx/Av03csFr6lPovp5v4; LOGIN_INFO=AFmmF2swRAIfSnE2N4vNDDQZg4ty590ruarhrl6LabQ_yl7MrA5LAAIhANSK1Zk1HlfynTJAruhfXTJ8iiODePusNjDVx9JRZphF:QUQ3MjNmejJEZ1hqS0xlM0x1N1ZwQlBNZnBydi00TFEydHlPUVJaWVNaTk8wRUQ4WWtwR0FvODBrX0V5bVZWMHJFYlJYRVlaeWlnYlV2Wl9GaVo1aG5pWnYycm1yaEljLVdSQ1Zka1MzTE1vT3pvYVluZGpVWmFxeUdBWjVtWG9QU2pIM1doRnVOZDN3QmJmN1NHalZLS3gycmZGZl9IUDdR; _gcl_au=1.1.1435250310.1673444801; PREF=tz=Asia.Jakarta&autoplay=true; DEVICE_INFO=ChxOekU0TnpjNE1qZzNOVGcwTmpJeE9URTJOZz09EPHEgJ4GGPHEgJ4G; SIDCC=AIKkIs1-FbRFvx7_lAZyiYDp9EztgbH7SvjvqBORESxiFikfWvRqSEAalvy6YKMbvsOtkpp5Wg; __Secure-1PSIDCC=AIKkIs1QzxANE23gOJB4a6Obn9-gFPg3BLc8DX0TGnFRUVoMV9epDU6TmzR33P8_X8kIjbM-dnQ; __Secure-3PSIDCC=AIKkIs1Too4U-1okbVaDpFZ5Psu4G8k-t4oGdHwXy7rInmGWqNYI64hb0skzijmXh2gTlSGFI8o' } };
    const { id, itag } = req.params;

    if (!(id in collections) || Date.now() > collections[id].expires) {
        const response = await axios.get(`https://www.youtube.com/watch?v=${id}&feature=youtu.be`, config);
        const matchedData = response.data.match(/"adaptiveFormats":\s*(.+?)},"playbackTracking":\s*{/);
        const [, destructuredMatch] = matchedData;
        const parsedData = JSON.parse(destructuredMatch);
        const [firstReference] = parsedData;
        const expire = new URL(firstReference.url).searchParams.get('expire');
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
            function setAdaptationSet(adaptationSet) {
                const representation = adaptationSet.ele('Representation', { bandwidth: averageBitrate, codecs, height, id: index, mimeType: parsedMimeType, width });
                representation.ele('BaseURL').txt(`/youtube/${id}/${itag}`);
                representation.ele('SegmentBase', { indexRange: `${indexRange.start}-${indexRange.end}` }).ele('Initialization', { range: `${initRange.start}-${initRange.end}` });
            };
            if (parsedMimeType.startsWith('video')) setAdaptationSet(videoAdaptationSet)
            else setAdaptationSet(audioAdaptationSet);
            collections[id].videos[itag] = url;
        });
        collections[id].xml = period.end({ prettyPrint: true });
    };

    if (itag === 'manifest.mpd') {
        res.setHeader('Content-Type', 'application/dash+xml');
        return res.send(collections[id].xml)
    }
    else {
        const headers = { ...config.headers };
        Object.keys(req.headers).forEach((v) => {
            if (v === 'host') return;
            headers[v] = req.headers[v];
        });
        console.log(collections[id].videos['137'])
        const response = await axios.get(collections[id].videos[itag], { headers, responseType: 'stream' });
        Object.keys(response.headers).forEach((v) => res.setHeader(v, response.headers[v]));
        res.status(response.status)
        res.setHeader('Cache-Control', 'no-store');
        response.data.on('data', chunks => res.write(chunks));
        response.data.on('end', () => res.end());
    };
});

app.listen(function () {
    console.log(this.address().port)
});