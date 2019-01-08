<template>
    <tab-container>
        <div class="row">
            <div class="col">
                <transition name="fade" mode="out-in">
                    <component
                        :is="currentComponent"
                        :branch="selectedBranch"
                        @getBranch="getBranch"
                        @changeView="changeView"
                        @form-fields="setFormFields"/>
                </transition>
            </div>
        </div>
    </tab-container>
</template>

<script>
import { vueRouterMixins } from "@/utils/mixins";
import TabContainer from "../tab-container";
import BranchesCrud from "./crud.vue";
import BranchesList from "./list.vue";

export default {
    name: "SettingsCompaniesBranches",
    components: {
        BranchesCrud,
        BranchesList,
        TabContainer
    },
    mixins: [
        vueRouterMixins
    ],
    data() {
        return {
            currentComponent: "BranchesList",
            views: {
                crud: "BranchesCrud",
                list: "BranchesList"
            },
            selectedBranch: null,
            isEditable: true,
            crudFormFields: {}
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
            this.crudFormFields = {};
            this.currentComponent = view;
        },

        setFormFields(formFields) {
            this.crudFormFields = formFields;
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

