<script lang="ts">
    import videojs, { type VideoJsPlayer } from 'video.js';
    import 'video.js/dist/video-js.min.css'
    import 'videojs-http-source-selector';
    import 'videojs-contrib-quality-levels';

    // import 'dashjs';
    // import 'videojs-contrib-dash';
	import { onDestroy, onMount } from 'svelte';

    let player: VideoJsPlayer;

    onMount(() => {
        player = videojs('player', { fluid: true });
        player.ready(() => {
            if (!player) return;
            player.src({
                src: '/api/youtube/w7MsgsJGkPQ/manifest.mpd',
                type: 'application/dash+xml'
            });
            player.httpSourceSelector();
        });
    });

    onDestroy(() => {
        if (player) player.dispose();
    });
</script>
<style>
    @font-face {
        font-family: Poppins;
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local(Poppins Bold), local(Poppins-Bold), url(https://fonts.gstatic.com/s/poppins/v13/pxiByp8kv8JHgFVrLCz7V1g.woff) format(woff), url(https://fonts.gstatic.com/s/poppins/v13/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2) format(woff2);
    }
    * {
        box-sizing: border-box;
    }

    .mainWrapper::before {
        content: '';
        display: block;
        width: 100%;
        padding-top: 60px;
    }

    .mainWrapper::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 170px;
        height: 170px;
        border-radius: 0 0 0 200px;
        background: rgba(0,0,0,.02);
        z-index: -1;
    }

    header {
        padding: 0 20px;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 60px;
        background-color: #fefefe;
        color: #161617;
        z-index: 50;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,.07);
        transition: all .1s ease;
    }

    header .headerLeft {
        width: 175px;
        flex-shrink: 0;
        display: flex;
    }

    header #header-widget {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 0 0 23px;
        overflow: hidden;
    }

    header .widget {
        margin: auto 0;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
    }

    a {
        text-decoration: none;
    }

    header .header-inner a {
        color: inherit;
        transition: none;
    }

    img {
        display: block;
        position: relative;
        font-size: 10px;
        color: transparent;
    }

    header .header-inner img {
        max-width: 150px;
        max-height: 30px;
    }

    .mainSection {
        padding-left: 20px;
        padding-right: 20px;
        overflow: hidden;
        width: 100%;
        transition: all .1s ease;
    }

    .mainContainer {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .mainSection .mainArea {
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
    }

    .mainbar {
        width: 100%;
        padding: 0 0 50px;
    }

    main {
        padding: 40px 0 0;
        display: block;
        transition: all .1s ease;
    }

    main > * {
        margin-bottom: 60px;
    }

    .widget-title {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 25px;
    }

    .widget-title > * {
        font-size: inherit;
    }

    h3 {
        margin: 0;
        font-weight: 700;
        font-family: Poppins, sans-serif;
        color: #161617;
    }
</style>
<div class="mainWrapper" style="height: auto !important;">
    <header>
        <div class="headerLeft">
            <div id="header-widget">
                <div class="widget">
                    <div class="header-inner">
                        <a href="/">
                            <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjbvXvBf1H8AnWvTksSwrSRxxP0E2tT2qKNkD3IdLsYEmZ6a7vaWppQXv12BElgdL3EcSTB-C83c3-dufIfbMebheyJa5a4ehzi3qSvlR5R6hDa8z_YWzHMc9b2XZx5EY9y1PtXAfQ3XMKFS55_24bJW62QfRtaZrmQjAzEY84ZXSAGlnW14Ab0VLm2bg=w300" alt="Yurasu Fansub">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div style="height: auto !important;">
        <div class="mainSection" style="height: auto !important;">
            <div class="mainContainer mainArea" style="height: auto !important;">
                <div class="mainbar" style="height: auto !important; min-height: 0px !important;">
                    <main style="height: auto !important;">
                        <div>
                            <div>
                                <div class="widget-title">
                                    <h3>
                                        Latest Posts
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <video
                            autoplay
                            muted
                            id="player"
                            class="video-js"
                            controls
                            preload="auto"
                            poster="//vjs.zencdn.net/v/oceans.png">
                        <track kind="captions"/>
                        <p class="vjs-no-js">
                            To view this video please enable JavaScript, and consider upgrading to a
                            web browser that
                            <a href="https://videojs.com/html5-video-support/" target="_blank" rel="noreferrer">
                            supports HTML5 video
                            </a>
                        </p>
                        </video>
                    </main>
                </div>
            </div>
        </div>
    </div>
</div>