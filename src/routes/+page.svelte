<sveltekit:head>
    <title>Yurasu Streaming</title>
</sveltekit:head>
<script lang="ts">
    import '../styles.css';
    import date from 'date-and-time';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import type { PageData } from './$types';

    export let data: PageData;
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

    a {
        transition: all .1s ease;
        color: #005af0;
        text-decoration: none;
    }

    img {
        display: block;
        position: relative;
        font-size: 10px;
        color: transparent;
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

    .multipleItems .Blog .blog-posts {
        display: flex;
        flex-wrap: wrap;
    }

    .Blog article {
        background-color: #fefefe;
        margin: 0 0 20px;
        border-radius: 8px;
        box-shadow: 0 10px 20px 0 rgba(30,30,30,.07);
    }

    .multipleItems .Blog article {
        padding: 8px 8px 12px;
        margin-bottom: 12px;
        width: calc(50% - 5px);
        margin-right: 10px;
    }

    .Blog .post-thumbnail {
        margin-bottom: 15px;
    }

    .Blog .post-thumbnail a {
        position: relative;
        display: block;
        width: 100%;
        padding-top: 52.5%;
        background-color: #f7f9f8;
        border-radius: 6px;
        overflow: hidden;
    }

    .widget .post-thumb {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        max-width: none;
        max-height: 100%;
        transform: translate(-50%, -50%);
    }

    .Blog .post-label {
        line-height: 1.58em;
        margin-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .multipleItems .Blog .post-label {
        font-size: 10px;
    }

    .Blog .post-label > *::before {
        content: '#' attr(data-text);
    }

    h2 {
        margin: 0;
        font-weight: 700;
        font-family: Poppins, sans-serif;
        color: #161617;
    }

    .Blog .post-title {
        line-height: 1.62em;
    }

    .multipleItems .Blog .post-title {
        font-size: 85%;
    }

    .Blog .post-title a {
        color: inherit;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .Blog .post-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 12px;
        color: #48525c;
    }

    .multipleItems .Blog .post-info {
        font-size: 10px;
    }

    .Blog .post-info .post-header {
        width: calc(100% - 55px);
    }

    .Blog .post-info .post-header .post-timestamp {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .Blog .post-info .post-header .post-timestamp time::before {
        content: attr(data-text);
    }

    .mainSection .mainArea {
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
<div class="mainWrapper multipleItems" style="height: auto !important;">
    <Header></Header>
    <div style="height: auto !important;">
        <div class="mainSection" style="height: auto !important;">
            <div class="mainContainer mainArea" style="height: auto !important;">
                <div class="mainbar" style="height: auto !important; min-height: 0px !important;">
                    <main style="height: auto !important;">
                        <div>
                            <div class="widget Blog">
                                <div class="widget-title">
                                    <h3>
                                        Latest Posts
                                    </h3>
                                </div>
                                <div class="blog-posts">
                                    {#each data.articles as { articleTitle, format, source, thumbnail, timestamp, type, typeTitle }}
                                        {@const href = `/${type}/${format}/${source}/${typeTitle}`}
                                        <article>
                                            <div class="post-thumbnail">
                                                <a {href}>
                                                    <img class="post-thumb" src={`/drive${href}/${thumbnail}`} alt={articleTitle}>
                                                </a>
                                            </div>
                                            <div>
                                                <div>
                                                    <div class="post-label">
                                                        <a data-text={typeTitle} href="/"> </a>
                                                    </div>
                                                    <h2 class="post-title">
                                                        <a {href}>
                                                            {articleTitle}
                                                        </a>
                                                    </h2>
                                                    <div class="post-info">
                                                        <div class="post-header">
                                                            <div>
                                                                <div class="post-timestamp">
                                                                    <time data-text={date.format(new Date(timestamp), 'MMMM DD, YYYY')}></time>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</div>