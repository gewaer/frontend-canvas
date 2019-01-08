<template>
    <div class="row branch-general-information">
        <div class="col-12 m-b-20">
            <h5> {{ title }}</h5>
            <div class="row">
                <div class="col-6 col-md">
                    <div class="form-group form-group-default required">
                        <label>Name</label>
                        <input
                            v-validate="'required:true|min:2'"
                            v-model="branchData.name"
                            class="form-control"
                            type="text"
                            name="name">
                        <span class="text-danger"> {{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Address</label>
                        <input
                            v-validate="'required:true|min:2'"
                            v-model="branchData.address"
                            class="form-control"
                            type="text"
                            data-vv-as="branch address"
                            name="branch-address">
                        <span class="text-danger"> {{ errors.first('branch-address') }}</span>
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Zip Code</label>
                        <input
                            v-validate="'required:true|numeric|min:2'"
                            v-model="branchData.zipcode"
                            class="form-control"
                            type="text"
                            data-vv-as="zip code"
                            name="zipcode">
                        <span class="text-danger"> {{ errors.first('zipcode') }}</span>
                    </div>

                    <div class="form-group form-group-default">
                        <label>Email</label>
                        <input
                            v-validate="'required|email'"
                            v-model="branchData.email"
                            class="form-control"
                            name="email"
                            type="email">
                        <span class="text-danger"> {{ errors.first('email') }}</span>
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Phone</label>
                        <input
                            v-validate="'required|numeric'"
                            v-model="branchData.phone"
                            class="form-control"
                            data-vv-as="phone number"
                            name="phone"
                            type="tel">
                        <span class="text-danger"> {{ errors.first('phone') }}</span>
                    </div>
                </div>

                <div class="col-6 m-b-20"/>

            </div>

        </div>

        <div class="col-12 col-xl d-flex justify-content-end mt-2">
            <button :disabled="isLoading" class="btn btn-danger m-r-10" @click="triggerCancel">Cancel</button>
            <button :disabled="isLoading || !hasChanged" class="btn btn-primary" @click="save()"> Save </button>
        </div>
    </div>
</template>

<script>
import { vueCrudMixins } from "@/utils/mixins";

export default {
    name: "BranchCrud",
    mixins: [
        vueCrudMixins
    ],
    props: {
        branch: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            isLoading: false,
            branchData: {},
            selectedLanguage: null
        }
    },

    computed:{
        title() {
            if (!this.branch.id) {
                return "Add branch";
            } else {
                return "Edit branch";
            }
        },

        hasChanged() {
            return !_.isEqual(this.branchData, this.branch);
        }
    },

    watch: {
        branch() {
            this.setBranch();
        }
    },

    created() {
        this.setBranch();
    },

    methods: {
        setBranch() {
            this.branchData = _.clone(this.branch);
        },

        save() {
            let url;
            let method;

            if (!this.branchData.id) {
                url = "/companies-branches";
                method = "POST";
            } else {
                url = `/companies-branches/${this.branchData.id}`;
                method = "PUT";
            }

            this.$validator.validate().then(result => {
                if (result) {
                    this.sendRequest(url, method);
                }
            })

        },
        sendRequest(url, method) {
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;

            axios({
                url,
                method,
                data: this.branchData
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "The Branch information has been changed",
                    type: "success"
                });
                this.$emit("changeView", "branchesList");
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            });
        },

        cancel() {
            this.$emit("changeView", "branchesList");
        }
    }
};
</script>

<style lang="scss">
.branch-general-information {
    margin: 20px 15px;
    .profile-image-container {
        display: flex;
        flex-direction: column;
        width: 160px;
        margin: 0 auto;
        margin-bottom: 15px;

        .profile-image {
            width: 160px;
            height: 160px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(230, 230, 230, 0.7);
        }

        label {
            width: 100%;
            border-radius: 0;
        }

        input[type='file'] {
            display: none;
        }
    }
}
</style>
