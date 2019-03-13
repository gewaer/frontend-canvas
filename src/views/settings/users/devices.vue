<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="row">
            <div class="col">
                <h5>
                    Devices
                </h5>
                <div class="table-responsive">
                    <vuetable
                        ref="DevicesList"
                        :append-params="appendParams"
                        :fields="branchesFields"
                        :http-fetch="getTableData"
                        api-url="/devices"
                        class="table table-hover table-condensed"
                        pagination-path="">
                        <template slot="actions" slot-scope="props">
                            <button
                                class="btn btn-danger m-l-5"
                                @click="confirmDelete(props.rowData.id)">
                                <i class="fa fa-trash" aria-hidden="true" />
                            </button>
                        </template>
                    </vuetable>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import { mapState } from "vuex";
import { vuexMixins, listMixins } from "@/utils/mixins";

export default {
    name: "UserDevices",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-users-tabs" */ "@v/settings/users/tabs")
    },
    mixins: [
        vuexMixins,
        listMixins
    ],
    data() {
        return {
            branchesFields: [{
                name: "source_username",
                sortField: "source_username",
                width: "30%"
            }, {
                name: "actions",
                title: "Actions"
            }],
            appendParams:{
                format: "true",
                q: "(is_deleted:0)"
            },
            defaultImage: "https://mctekk.com/images/logo-o.svg",
            isEditable: true,
            isLoading: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.User.data
        })

    },
    methods: {
        confirmDelete(deviceId) {
            // change for swal or any other
            if (confirm("are you sure?")) {
                this.detachDevice(deviceId)
            }
        },
        detachDevice(id) {
            if (this.isLoading ) {
                return
            }
            this.isLoading = true;
            axios({
                url: `/v1/users/${this.user.id}/devices/${id}/detach`,
                method: "POST"
            }).then(() => {
                this.$notify({
                    title: "Deleted",
                    text: "The Device has been deleted",
                    type: "success"
                });
                this.$refs.DevicesList.reload();
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            })
        }
    }
};
</script>
