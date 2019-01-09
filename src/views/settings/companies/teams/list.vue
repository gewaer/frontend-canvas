<template>
    <div>
        <h5>
            Teams
            <button class="btn btn-primary" @click="teamsCRUD">New team</button>
        </h5>
        <div class="table-responsive">
            <table class="table table-hover table-condensed">
                <thead>
                    <tr>
                        <th style="width:15%">Name</th>
                        <th style="width:15%">Lead</th>
                        <th style="width:15%">Description</th>
                        <th style="width:45%">Users</th>
                        <th style="width:10%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="v-align-middle semi-bold">Team Test</td>
                        <td class="v-align-middle semi-bold">User 1</td>
                        <td class="v-align-middle semi-bold"/>
                        <td class="v-align-middle semi-bold">User 1, User 2, User 3, User 4, User 5</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"/></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">Team Test</td>
                        <td class="v-align-middle semi-bold">User 1</td>
                        <td class="v-align-middle semi-bold"/>
                        <td class="v-align-middle semi-bold">User 1, User 2, User 3, User 4, User 5</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"/></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">Team Test</td>
                        <td class="v-align-middle semi-bold">User 1</td>
                        <td class="v-align-middle semi-bold"/>
                        <td class="v-align-middle semi-bold">User 1, User 2, User 3, User 4, User 5</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        teamsCRUD() {
            this.$emit("changeView", "TeamsCRUD");
        }
    }
}
</script>
