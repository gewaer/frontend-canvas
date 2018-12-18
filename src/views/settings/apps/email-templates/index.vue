d<template>
    <div class="row email-templates-section">
        <div class="col">
            <transition name="fade" mode="out-in">
                <component
                    :is="currentComponent"
                    @emailTemplatesCRUD="emailTemplatesCRUD"
                    @emailTemplatesList="emailTemplatesList"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import emailTemplatesCRUD from "./crud.vue";
import emailTemplatesList from "./list.vue";

export default {
    name: "EmailsTemplates",
    components: {
        emailTemplatesCRUD,
        emailTemplatesList
    },
    data() {
        return {
            currentComponent: "emailTemplatesList"
        };
    },
    methods: {
        emailTemplatesCRUD() {
            this.currentComponent = "emailTemplatesCRUD";
        },
        emailTemplatesList() {
            this.currentComponent = "emailTemplatesList";
        }
    }
}
</script>
