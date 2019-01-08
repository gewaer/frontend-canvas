<template>
    <tab-container>
        <div class="row">
            <div class="col">
                <transition name="fade" mode="out-in">
                    <component
                        :is="currentComponent"
                        :company="selectedCompany"
                        @getCompany="getCompany"
                        @changeView="changeView"
                        @companies="companies"
                        @form-fields="setFormFields"/>
                </transition>
            </div>
        </div>
    </tab-container>
</template>

<script>
import { vueRouterMixins } from "@/utils/mixins";
import TabContainer from "../tab-container";
import CompaniesCRUD from "./crud.vue";
import CompaniesList from "./list.vue";

export default {
    name: "SettingsCompaniesList",
    components: {
        CompaniesCRUD,
        CompaniesList,
        TabContainer
    },
    mixins: [
        vueRouterMixins
    ],
    data() {
        return {
            currentComponent: "CompaniesList",
            companies: [],
            selectedCompany: null,
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
        getCompany(id) {
            return axios(`/companies/${id}`).then(({ data }) => {
                this.selectedCompany = data;
                this.currentComponent = "CompaniesCRUD";
            })
        },

        changeView(view) {
            if (view == "CompaniesCRUD") {
                this.selectedCompany = {};
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

