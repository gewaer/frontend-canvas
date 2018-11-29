<template>
<div class="user-settings">
    <h4 class="section-title p-l-10">Settings</h4>
    <users-settings />
    <!-- <company-settings /> -->
</div>
</template>

<script>
import usersSettings from './users-settings';

export default {
    components: {
       usersSettings
    }
};
</script>
<style lang="scss">
.user-settings {
    .tab-content,
    .cs-wrapper,
    .cs-select {
        width: 100%;
        max-width: initial;
    }

    .col {
        padding-left: 5px;
        padding-right: 5px;
    }

    h5 {
        border-bottom: 1px solid rgba(230, 230, 230, 0.7);
        padding-bottom: 10px;
        margin-bottom: 20px;
        margin-top: 0;
        color: var(--base-color);
        display: flex;

        button {
            padding: 3px 17px;
            display: flex;
            margin-left: auto;
        }
    }

    .table-responsive {
        margin-bottom: 20px;

        thead {
            background-color: rgba(230, 230, 230, 0.7);
            // color: white !important;
        }
    }

    @media(max-width: 768px) {
        .card.flex-md-row {
            .nav-tabs-simple {
                display: flex;
                align-items: center;
                flex-direction: row;
                border-bottom: 1px solid rgba(0,0,0,.1);
            }

            .nav-tabs-simple > li > a::after {
                left: 0;
                width: 0 !important;
                height: 3px !important;
                top: initial !important;
            }

            .nav-tabs-simple > li > a:hover::after, .nav-tabs-simple > li > a.active::after {
                width: 100% !important;
            }

            .nav-tabs ~ .tab-content {
                border-left: 0;
            }
        }
    }
}
</style>
