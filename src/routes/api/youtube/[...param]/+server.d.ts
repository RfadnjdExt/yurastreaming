interface VideoCollections {
    data: AdaptiveFormats[];
    expires: number;
    videos: {
        [key: string]: string;
    };
    xml: string;
};

export interface Collections {
    [key: string]: VideoCollections;
};

export interface AdaptiveFormats {
    itag: number;
    url: string;
    mimeType: string;
    bitrate: string;
    width: string;
    height: string;
    initRange: {
        start: string;
        end: string;
    };
    indexRange: {
        start: string;
        end: string;
    };
    lastModified: string;
    contentLength: string;
    quality: string;
    fps: string;
    qualityLabel: string;
    projectionType: string;
    averageBitrate: string;
    approxDurationMs: string;
};