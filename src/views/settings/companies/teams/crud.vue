<template>
    <div>
        <h5 class="form-title">{{ title }}</h5>
        <div class="row">
            <div class="col-12 m-b-20">
                <div class="row">
                    <div class="col-12 col-lg-6 col-xl-7">
                        <div class="form-group required">
                            <label>Name</label>
                            <input class="form-control" type="text">
                        </div>
                        <div class="form-group required">
                            <label>Team lead</label>
                            <multiselect
                                :show-labels="false"
                                :options="['User 1', 'User 2', 'User 3']"
                            />
                        </div>
                        <div class="form-group required">
                            <label>Team Description</label>
                            <input class="form-control" type="text">
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-5">
                        <div class="row users-list">
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 1</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 2</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 3</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 4</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 5</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 1</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 2</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 3</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 4</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 5</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 1</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 2</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 3</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 4</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 5</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 1</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 2</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 3</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 4</label>
                            </div>
                            <div class="checkbox col-6 col-sm-4">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">User 5</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-xl d-flex justify-content-end mt-2">
                <button class="btn btn-danger m-r-10" @click="teamsList">Cancel</button>
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        save() {
            // Save logic
            this.teamsList();
        },
        teamsList() {
            this.$emit("changeView", "TeamsList");
        }
    }
}
</script>

<style lang="scss" scoped>
.users-list {
    height: 226px;
    border: 1px solid rgba(0,0,0,.07);
    padding: 20px;
    padding-top: 10px;
    overflow-y: auto;
}

.checkbox+.checkbox {
    margin-top: 10px;
}
</style>
