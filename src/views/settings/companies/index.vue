<template>
    <div class="company-settings">
        <h4 class="section-title p-l-10">Settings</h4>
        <div class="card card-transparent">
            <div class="card-body no-padding">
                <div class="row">
                    <div class="col">
                        <div class="card flex-md-row">
                            <ul id="tab-3" class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white">
                                <li class="nav-item">
                                    <a 
                                        href="#" 
                                        class="active" 
                                        data-toggle="tab" 
                                        data-target="#company-info">Company Info</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" data-toggle="tab" data-target="#companies">Companies</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" data-toggle="tab" data-target="#users-list">Users</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" data-toggle="tab" data-target="#roles-list">Roles</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" data-toggle="tab" data-target="#subscriptions-list">Subscriptions</a>
                                </li>
                            </ul>
                            <div class="tab-content bg-white">
                                <div id="company-info" class="tab-pane active">
                                    <company-info :company="company"/>
                                </div>
                                <div id="companies" class="tab-pane">
                                    <companies-list :companies="companies"/>
                                </div>
                                <div id="users-list" class="tab-pane">
                                    <company-users />
                                </div>
                                <div id="roles-list" class="tab-pane">
                                    <company-roles />
                                </div>
                                <div id="subscriptions-list" class="tab-pane">
                                    <company-subscriptions />
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
import {mapState} from "vuex";
import {cloneDeep} from "lodash"
import companyInfo from "./info";
import companiesList from "./companies";
import companyUsers from "./users";
import companyRoles from "./roles";
import companySubscriptions from "./subscriptions";

export default {
    components: {
        companyInfo,
        companiesList,
        companyUsers,
        companyRoles,
        companySubscriptions
    },
    data() {
        return {
            company: {}
        }
    },
    computed: {
        ...mapState("Company", {
            companies: state => state.list,
            defaultCompany: state => state.data
        })
    },
    watch: {
        userData() {
            this.company = cloneDeep(this.defaultCompany);
        }
    },

    mounted() {
        this.company = cloneDeep(this.defaultCompany);
    }
};
</script>

<style lang="scss" src="@/assets/scss/settings.scss"/>
