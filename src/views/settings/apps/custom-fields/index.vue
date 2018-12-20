<template>
    <div class="row custom-fields-settings">
        <div class="col">
            <transition name="fade" mode="out-in">
                <component
                    :is="currentComponent"
                    @customFieldsCRUD="customFieldsCRUD"
                    @customFieldsList="customFieldsList"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import customFieldsList from "./list.vue";
import customFieldsCRUD from "./crud.vue";

export default {
    components: {
        customFieldsList,
        customFieldsCRUD
    },
    data() {
        return {
            currentComponent: "customFieldsList"
        };
    },
    methods: {
        customFieldsCRUD() {
            this.currentComponent = "customFieldsCRUD";
        },
        customFieldsList() {
            this.currentComponent = "customFieldsList";
        }
    }
}
</script>
