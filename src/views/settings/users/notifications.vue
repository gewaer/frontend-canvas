<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="row">
            <div class="col">
                <h5>Email notifications</h5>
                <div class="table-responsive">
                    <div id="condensedTable_wrapper" class="table table-hover table-condensed">
                        <table id="basicTable" class="table table-hover table-condensed dataTable no-footer">
                            <thead>
                                <th style="width:95%">Name</th>
                                <th style="width:5%">Status</th>
                            </thead>
                            <tbody>
                                <tr class="odd">
                                    <td class="v-align-middle">Lipsum Dolor sit amet</td>
                                    <td class="v-align-middle ">
                                        <input
                                            type="checkbox"
                                            data-init-plugin="switchery"
                                            data-color="primary"
                                            data-size="small"
                                            checked="checked"
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h5>Other notifications</h5>
                <div class="table-responsive">
                    <div id="condensedTable_wrapper" class="dataTables_wrapper no-footer">
                        <table id="basicTable" class="table table-hover table-condensed dataTable no-footer">
                            <thead>
                                <th style="width:95%">Name</th>
                                <th style="width:5%">Status</th>
                            </thead>
                            <tbody>
                                <tr class="odd">
                                    <td class="v-align-middle">Lipsum Dolor sit amet</td>
                                    <td class="v-align-middle ">
                                        <input
                                            type="checkbox"
                                            data-init-plugin="switchery"
                                            data-color="primary"
                                            data-size="small"
                                            checked="checked"
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import { vuexMixins } from "@/utils/mixins";

export default {
    name: "Notifications",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-users-tabs" */ "@v/settings/users/tabs")
    },
    mixins: [
        vuexMixins
    ]
};
</script>
