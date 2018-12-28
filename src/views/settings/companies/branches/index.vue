<template>
    <div class="row">
        <div class="col">
            <transition name="fade" mode="out-in">
                <component
                    :is="currentComponent"
                    :branch="selectedBranch"
                    @getBranch="getBranch"
                    @changeView="changeView"/>
            </transition>
        </div>
    </div>
</template>

<script>
import BranchesCrud from "./crud.vue";
import BranchesList from "./list.vue";

export default {
    components: {
        BranchesCrud,
        BranchesList
    },
    data() {
        return {
            currentComponent: "BranchesList",
            views: {
                crud: "BranchesCrud",
                list: "BranchesList"
            },
            selectedBranch: null,
            isEditable: true
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {

        getUsers() {
            axios("/users").then(({data}) => {
                this.users = data;
            })
        },
        getBranch(id) {
            return axios(`/companies-branches/${id}`).then(({ data }) => {
                this.selectedBranch = data;
                this.currentComponent = this.views.crud;
            })
        },

        changeView(view) {
            if (view == this.views.crud) {
                this.selectedBranch = {};
            }
            this.currentComponent = view;
        }
    }
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

