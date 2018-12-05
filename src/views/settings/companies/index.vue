<template>
<div class="card card-transparent">
    <div class="card-body no-padding">
    <div class="row">
        <div class="col">
            <div class="card flex-md-row">
                <ul class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white" id="tab-3">
                    <li class="nav-item">
                        <a href="#" class="active" data-toggle="tab" data-target="#company-info">Company Info</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-toggle="tab" data-target="#companies">Companies</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-toggle="tab" data-target="#users-list">Users</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-toggle="tab" data-target="#subscriptions-list">Subscriptions</a>
                    </li>
                </ul>
                <div class="tab-content bg-white">
                    <div class="tab-pane active" id="company-info">
                        <company-info :company="company"/>
                    </div>
                    <div class="tab-pane" id="companies">
                        <companies-list :companies="companies"/>
                    </div>
                    <div class="tab-pane" id="users-list">
                        <company-users />
                    </div>
                    <div class="tab-pane" id="subscriptions-list">
                        <company-subscriptions />
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
import companySubscriptions from "./subscriptions";

export default {
    components: {
        companyInfo,
        companiesList,
        companyUsers,
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
