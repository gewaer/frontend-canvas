<template>
    <div class="row email-templates-section">
        <div class="col">
            <transition name="fade" mode="out-in">
                <component
                    :is="currentComponent"
                    @emailTemplatesForm="() => currentComponent = 'emailTemplatesForm'"
                    @emailTemplatesList="() => currentComponent = 'emailTemplatesList'"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import emailTemplatesForm from "./form.vue";
import emailTemplatesList from "./list.vue";

export default {
    name: "EmailTemplates",
    components: {
        emailTemplatesForm,
        emailTemplatesList
    },
    data() {
        return {
            currentComponent: "emailTemplatesList"
        };
    }
}
</script>
