<template>
    <div class="row webhooks-section">
        <div class="col">
            <transition name="fade" mode="out-in">
                <component
                    :is="currentComponent"
                    @webhooksCRUD="webhooksCRUD"
                    @webhooksList="webhooksList"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import webhooksCRUD from "./crud.vue";
import webhooksList from "./list.vue";

export default {
    name: "Webhooks",
    components: {
        webhooksList,
        webhooksCRUD
    },
    data() {
        return {
            currentComponent: "webhooksList"
        };
    },
    methods: {
        webhooksCRUD() {
            this.currentComponent = "webhooksCRUD";
        },
        webhooksList() {
            this.currentComponent = "webhooksList";
        }
    }
};
</script>
