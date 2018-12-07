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
                                        :class="{active: isActive('info')}"
                                        href="#"
                                        name="info"
                                        @click="setTab">Company Info</a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: isActive('companies')}"
                                        href="#"
                                        name="companies"
                                        @click="setTab">Companies</a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: isActive('users')}"
                                        href="#"
                                        name="users"
                                        @click="setTab">Users</a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: isActive('roles')}"
                                        href="#"
                                        name="roles"
                                        @click="setTab">Roles</a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        :class="{active: isActive('subscriptions')}"
                                        href="#"
                                        name="subscriptions"
                                        @click="setTab">Subscriptions</a>
                                </li>
                            </ul>
                            <div class="tab-content bg-white">
                                <div id="company-info" :class="{active: isActive('info')}" class="tab-pane">
                                    <company-info/>
                                </div>
                                <div id="companies" :class="{active: isActive('companies')}" class="tab-pane">
                                    <companies-list/>
                                </div>
                                <div id="users-list" :class="{active: isActive('users')}" class="tab-pane" >
                                    <company-users />
                                </div>
                                <div id="roles-list" :class="{active: isActive('roles')}" class="tab-pane">
                                    <company-roles />
                                </div>
                                <div id="subscriptions-list" :class="{active: isActive('subscriptions')}" class="tab-pane">
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
import companyInfo from "./info";
import companiesList from "./list";
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
            tab: "info"
        }
    },
    methods: {
        setTab(event) {
            this.tab = event.target.name;
        },
        isActive(tabName) {
            return this.tab == tabName;
        }
    }
};
</script>

<style lang="scss" src="@/assets/scss/settings.scss"/>
