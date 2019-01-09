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
                                        :class="{active: tab == 'info'}"
                                        href="#"
                                        name="info"
                                        @click.prevent="tab = 'info'"
                                    >
                                        Company Info
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: tab == 'companies'}"
                                        href="#"
                                        name="companies"
                                        @click.prevent="tab = 'companies'"
                                    >
                                        Companies
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: tab == 'branches'}"
                                        href="#"
                                        name="branches"
                                        @click.prevent="tab = 'branches'"
                                    >
                                        Branches
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: tab == 'users'}"
                                        href="#"
                                        name="users"
                                        @click.prevent="tab = 'users'"
                                    >
                                        Users
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: tab == 'teams'}"
                                        href="#"
                                        name="teams"
                                        @click.prevent="tab = 'teams'"
                                    >
                                        Teams
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: tab == 'roles'}"
                                        href="#"
                                        name="roles"
                                        @click.prevent="tab = 'roles'"
                                    >
                                        Roles
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: tab == 'subscriptions'}"
                                        href="#"
                                        name="subscriptions"
                                        @click.prevent="tab = 'subscriptions'"
                                    >
                                        Subscriptions
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content bg-white">
                                <div id="company-info" :class="{active: tab == 'info'}" class="tab-pane">
                                    <company-profile/>
                                </div>
                                <div id="companies" :class="{active: tab == 'companies'}" class="tab-pane">
                                    <companies-list/>
                                </div>
                                <div id="branches" :class="{active: tab == 'branches'}" class="tab-pane">
                                    <company-branches/>
                                </div>
                                <div id="users-list" :class="{active: tab == 'users'}" class="tab-pane" >
                                    <company-users/>
                                </div>
                                <div id="teams-list" :class="{active: tab == 'teams'}" class="tab-pane" >
                                    <company-teams/>
                                </div>
                                <div id="roles-list" :class="{active: tab == 'roles'}" class="tab-pane">
                                    <company-roles/>
                                </div>
                                <div id="subscriptions-list" :class="{active: tab == 'subscriptions'}" class="tab-pane">
                                    <company-subscriptions/>
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
import CompanyProfile from "./profile";
import CompaniesList from "./companies/";
import CompanyBranches from "./branches/";
import CompanyUsers from "./users/";
import CompanyTeams from "./teams/";
import CompanyRoles from "./roles/";
import CompanySubscriptions from "./subscriptions";

export default {
    components: {
        CompanyProfile,
        CompaniesList,
        CompanyBranches,
        CompanyUsers,
        CompanyTeams,
        CompanyRoles,
        CompanySubscriptions
    },
    data() {
        return {
            tab: "info"
        }
    },
    watch: {
        tab(tab) {
            history.pushState({}, null, `${this.$route.path}?tab=${tab}`);
        }
    },
    mounted() {
        if (this.$route.query.tab) {
            this.tab = this.$route.query.tab;
        }
    }
};
</script>

<style lang="scss" src="@/assets/scss/settings.scss"/>
