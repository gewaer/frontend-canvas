<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="row email-templates-section">
            <div class="col">
                <h5>
                    Email Templates
                    <router-link :to="{ name: 'settingsAppsEmailTemplatesForm' }" class="btn btn-primary">Create</router-link>
                </h5>
                <div class="table-responsive">
                    <table v-if="list.length" class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th style="width:50%">Template name</th>
                                <th style="width:10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="v-align-middle semi-bold">Lorem Ipsum dolor sit</td>
                                <td class="v-align-middle semi-bold">
                                    <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                    <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else>
                        There are not email templates. Create one.
                    </p>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
export default {
    name: "List",
    components: {
        TabsMenu: () => import(/* webpackChunkName: "settings-apps-tabs" */ "@v/settings/apps/tabs"),
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container")
    },
    data() {
        return {
            list: []
        }
    }
}
</script>
