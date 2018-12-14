<template>
    <div class="row">
        <div class="col">
            <transition name="fade" mode="out-in">
                <component
                    :is="currentComponent"
                    :company="selectedCompany"
                    @getCompany="getCompany"
                    @changeView="changeView"
                    @companies="companies"/>
            </transition>
        </div>
    </div>
</template>

<script>
import CompaniesCRUD from "./crud.vue";
import CompaniesList from "./list.vue";

export default {
    components: {
        CompaniesCRUD,
        CompaniesList
    },
    data() {
        return {
            currentComponent: "CompaniesList",
            companies: [],
            selectedCompany: null,
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

