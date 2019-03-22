<template>
    <dropdown class="app-switcher">
        <template slot="btn">
            <span class="app-mode">A1</span>
            <a class="grid-box" />
        </template>
        <ul slot="body">
            <li>
                <a href="#" target="_blank">
                    <span class="app-mode mode">A1</span>
                    <p>Application 1</p>
                </a>
            </li>
            <li>
                <a href="#" target="_blank">
                    <span class="app-mode mode">A2</span>
                    <p>Application 2</p>
                </a>
            </li>
        </ul>
    </dropdown>
</template>

<script>
export default {
    name: "AppSwitcher"
}
</script>

<style lang="scss" scoped>
.app-switcher {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 30px;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    order: 2;

    .grid-box {
        background: url('/img/icons/top_tray.png') no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;
        background-position: -41px center;
        margin-left: 15px;
        width: 14px;
        height: 14px;
        padding: 0;
        display: block;
    }

    .bp-dropdown__body {
        border-radius: 0;
        text-align: center;
        box-shadow: 0 0 0 1px rgba(98,98,98,.2);
        margin-top: 0;

        li {
            padding: 5px 10px;

            a {
                display: flex;
                align-items: center;

                p {
                    color: var(--base-color);
                    margin-bottom: 0;
                    margin-left: 10px;
                }
            }
        }
    }

    .app-mode {
        color: var(--base-color);
        font-size: 12px !important;
        font-weight: bolder;
        line-height: 26px;
        display: block;
        border:2px solid var(--base-color);
        text-align: center;
        height: 30px;
        width: 30px;
    }

    .dropdown-menu {
        min-width: 250px;

        .dropdown-item {
            padding: 5px 20px;

            a {
                display: flex;
                align-items: center;

                p {
                    margin-bottom: 0;
                    margin-left: 10px;
                }
            }
        }
    }
}

@media(max-width: 992px) {
    .app-switcher {
        order: 1;
        margin-right: initial;
        padding: 0 10px;

        #app-grid {
            position: absolute;
            left: 0;
            margin: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: none;
        }
    }
}
</style>
