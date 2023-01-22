<script lang="ts">
    import '../../styles.css'
    import date from 'date-and-time';
	import type { PageData } from "./$types";

    export let data: PageData;
    const { article } = data;
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

    .mainWrapper:after {
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
        transition: all .1s ease;
        color: #005af0;
        text-decoration: none;
    }

    header .header-inner a {
        color: inherit;
        transition: none;
    }

    img {
        display: block;
        position: relative;
        max-width: 100%;
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

    .widget {
        margin-bottom: 50px;
    }

    .singleItem .Blog {
        padding: 0 5px;
    }

    .Blog .breadcrumbs {
        display: flex;
        align-items: center;
        margin: 0 0 8px;
        font-size: 11px;
        font-weight: 700;
        font-family: Poppins, sans-serif;
        color: #767676;
    }

    .Blog .breadcrumbs > * {
        flex-shrink: 0;
    }

    .Blog .breadcrumbs > *:not(:last-child)::after {
        content: '\203A';
        margin: 0 7px 0 4px;
        font-size: 13px;
        line-height: 16px;
    }

    .Blog .breadcrumbs > .title-link {
        flex-shrink: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #767676;
    }

    .Blog article {
        display: block;
    }

    .Blog .post {
        margin: 0;
        padding: 0;
        box-shadow: none;
        background: transparent;
        border-radius: 0;
    }

    .Blog .post .post-headline {
        margin-bottom: 3rem;
    }

    h1 {
        font-weight: 700;
        font-family: Poppins, sans-serif;
        color: #161617;
    }

    .Blog .post h1 {
        line-height: 1.3em;
    }

    .Blog .post .post-title {
        font-size: 22px;
        margin: 0;
    }

    .Blog .post-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        color: #48525c;
    }

    .Blog .post .post-info {
        margin-top: 30px;
        font-size: 85%;
        position: relative;
        flex-wrap: wrap;
    }

    .Blog .post .post-info .post-header {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .Blog .post .post-info .post-authorImage {
        flex-shrink: 0;
        width: 46px;
        height: 46px;
        margin-right: 18px;
        padding: 4px;
        border-radius: 50%;
        position: relative;
    }

    .Blog .post .post-info .post-authorIcon {
        width: 50px;
        z-index: 2;
        position: absolute;
        left: -2px;
        bottom: -2px;
    }

    svg {
        vertical-align: middle;
    }

    svg.line {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1;
    }

    .Blog .post .post-info .post-authorIcon svg {
        width: 100%;
        height: 50%;
        stroke: #005af0;
    }

    .Blog .post .post-info .post-authorImage img {
        border-radius: 50%;
    }

    .Blog .post .post-info .post-author {
        font-size: inherit;
        font-family: Poppins, sans-serif;
        font-weight: 700;
        color: #48525c;
        margin-right: 18px;
        flex-shrink: 0;
        line-height: 1.58em;
    }

    .Blog .post-info .post-author .post-authorName {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .Blog .post .post-info .post-author .post-authorName {
        max-width: 120px;
    }

    .Blog .post .post-info .post-authorName::before {
        content: attr(data-text);
        font-weight: 400;
        font-family: 'Nunito Sans', sans-serif;
        display: block;
        margin-bottom: 2px;
    }

    .Blog .post-info .post-author .post-authorName > *:before {
        content: attr(data-text);
    }

    .Blog .post .post-info .post-published {
        margin-right: 0;
        font-size: inherit;
        font-family: Poppins, sans-serif;
        font-weight: 700;
        color: #48525c;
        flex-shrink: 0;
        line-height: 1.58em;
    }

    .Blog .post-info .post-header .post-timestamp {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .Blog .post .post-info .post-header .post-timestamp {
        max-width: 120px;
    }

    .Blog .post .post-info .post-header .post-timestamp:before {
        content: attr(data-update);
        font-weight: 400;
        font-family: 'Nunito Sans', sans-serif;
        display: block;
        margin-bottom: 2px;
    }

    .Blog .post-info .post-header .post-timestamp time:before {
        content: attr(data-text);
    }
</style>
<div class="mainWrapper singleItem" style="height: auto !important;">
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
                        <div style="height: auto !important;">
                            <div class="widget Blog" style="height: auto !important;">
                                <div style="height: auto !important;">
                                    <div class="breadcrumbs">
                                        <div>
                                            <a href="/">
                                                <span>
                                                    {article?.typeTitle}
                                                </span>
                                            </a>
                                        </div>
                                        <div class="title-link">
                                            <span>
                                                {article?.articleTitle}
                                            </span>
                                        </div>
                                    </div>
                                    <article class="post" style="height: auto !important;">
                                        <div>
                                            <div class="post-headline">
                                                <h1 class="post-title">
                                                    {article?.articleTitle}
                                                </h1>
                                                <div class="post-info">
                                                    <div class="post-header">
                                                        <div class="post-authorImage">
                                                            <div class="post-authorIcon">
                                                                <svg class="line" viewBox="0 0 106 57">
                                                                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                                                                </svg>
                                                            </div>
                                                            <img src="//4.bp.blogspot.com/-f6TI8kISZMA/YrBQ0EhJY_I/AAAAAAAAANo/y7kONUlxOuUvSEBPealv0M1Hqsw7JmvzwCK4BGAYYCw/w50-h50-p-k-no-nu/lumi.jpg" alt="Lumi">
                                                        </div>
                                                        <div class="post-author">
                                                            <span class="post-authorName" data-text="Author">
                                                                <span data-text="Lumi"></span>
                                                            </span>
                                                        </div>
                                                        <div class="post-published">
                                                            <div class="post-timestamp" data-update="Published">
                                                                <time data-text={date.format(new Date(article?.timestamp), 'MMMM DD, YYYY')}></time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="post-entry"></div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>
</div>