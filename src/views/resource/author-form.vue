<template>
    <form class="resource-form" novalidate @submit.prevent="sendAuthor">
        <div class="row">
            <div class="col">
                <div class="form-group form-group-default">
                    <label>Name</label>
                    <input
                        v-model="author.name"
                        class="form-control"
                        type="text"
                        name="author-name"
                    >
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label>About</label>
                    <editor-component v-model="author.about" />
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
import editorComponent from "./editor-component";

export default {
    name: "Authorform",
    components: {
        editorComponent
    },
    props: {
        isEditing: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isLoading: false,
            author: {
                name: "",
                about: ""
            }
        };
    },
    created() {
        this.isEditing && this.getData();
    },
    methods: {
        getData() {
            this.isLoading = true;

            axios({
                url: `/authors/${this.$route.params.id}`,
                method: "GET"
            }).then(response => {
                this.author = Object.assign({}, this.author, response.data)
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        sendAuthor() {
            this.isLoading = true;
            const url = this.isEditing ? `/authors/${this.$route.params.id}` : "/authors/";
            const method = this.isEditing ? "PUT" : "POST";

            axios({
                url,
                method,
                data: this.author
            }).then(response => {
                this.isLoading = false;
                console.log(response);
                this.$emit("author-saved");
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
