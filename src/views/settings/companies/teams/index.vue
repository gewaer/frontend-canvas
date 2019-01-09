<template>
    <div class="row">
        <div class="col">
            <transition name="fade" mode="out-in">
                <component
                    :is="currentComponent"
                    @changeView="changeView"/>
            </transition>
        </div>
    </div>
</template>

<script>
import TeamsCRUD from "./crud.vue";
import TeamsList from "./list.vue";

export default {
    components: {
        TeamsCRUD,
        TeamsList
    },
    data() {
        return {
            currentComponent: "TeamsList"
        }
    },
    methods: {
        changeView(view) {
            this.currentComponent = view;
        }
    }
};
</script>
