<style>
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

    header .header-inner a {
        color: inherit;
        transition: none;
    }

    header .header-inner img {
        max-width: 150px;
        max-height: 30px;
    }
</style>
<header>
    <div class="headerLeft">
        <div id="header-widget">
            <div class="widget">
                <div class="header-inner">
                    <a href="/">
                        <img src="/api/drive/yurasubs23.png" alt="Yurasu Fansub">
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>