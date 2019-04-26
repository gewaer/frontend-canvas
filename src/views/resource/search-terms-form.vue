<template>
    <form class="resource-form" novalidate @submit.prevent="sendSearchTerm">
        <div class="row">
            <div class="col">
                <div class="form-group form-group-default">
                    <label>Name</label>
                    <input
                        v-model="searchTerm.name"
                        class="form-control"
                        type="text"
                        name="author-name"
                    >
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col text-right">
                <button class="btn btn-primary">Save</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: "SearchTermsForm",
    props: {
        isEditing: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isLoading: false,
            searchTerm: {
                name: ""
            },
            rolsList: [
                {
                    id: 1,
                    name: "Writer"
                },
                {
                    id: 2,
                    name: "Editor"
                },
                {
                    id: 3,
                    name: "Producer"
                },
                {
                    id: 4,
                    name: "Narrator"
                }
            ]
        };
    },
    created() {
        this.isEditing && this.getData();
    },
    methods: {
        getData() {
            this.isLoading = true;

            axios({
                url: `/categories/${this.$route.params.id}`,
                method: "GET"
            }).then(response => {
                this.searchTerm = Object.assign({}, this.searchTerm, response.data)
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        sendSearchTerm() {
            this.isLoading = true;
            const url = this.isEditing ? `/categories/${this.$route.params.id}` : "/categories";
            const method = this.isEditing ? "PUT" : "POST";

            axios({
                url,
                method,
                data: this.searchTerm
            }).then(() => {
                this.isLoading = false;
                this.$emit("search-term-saved");
                this.$notify({
                    text: "Search term saved successfully",
                    type: "success"
                });
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        }
    }
}
</script>
