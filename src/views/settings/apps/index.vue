<template>
    <div class="apps-settings">
        <h4 class="section-title p-l-10">Settings</h4>
        <div class="card card-transparent">
            <div class="card-body no-padding">
                <div class="row">
                    <div class="col">
                        <div class="card flex-md-row">
                            <ul id="tab-3" class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white">
                                <li class="nav-item">
                                    <a :class="{active: tab == 'webhooks'}" href="#" @click="tab = 'webhooks'">Webhooks</a>
                                </li>
                                <li class="nav-item">
                                    <a :class="{active: tab == 'email-templates'}" href="#" @click="tab = 'email-templates'">Email Templates</a>
                                </li>
                            </ul>
                            <div class="tab-content bg-white">
                                <div id="user-profile" :class="{active: tab == 'webhooks'}" class="tab-pane">
                                    <app-webhooks />
                                </div>
                                <div id="email-templates" :class="{active: tab == 'email-templates'}" class="tab-pane">
                                    <email-templates />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import appWebhooks from "./webhooks/";
import emailTemplates from "./email-templates/";

export default {
    components: {
        appWebhooks,
        emailTemplates
    },
    data() {
        return {
            tab: "webhooks"
        }
    }
};
</script>

<style lang="scss" scoped>
.apps-settings {
    .card.flex-md-row {
        min-height: 400px;
    }
}
</style>

<style lang="scss" src="@/assets/scss/settings.scss"/>
