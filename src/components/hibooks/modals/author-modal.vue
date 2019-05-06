<template>
    <modal
        name="author-modal"
        height="auto"
    >
        <div class="author-modal">
            <h3>Add author</h3>
            <author-form @author-saved="authorSaved" />
        </div>
    </modal>
</template>

<script>

export default {
    name: "AuthorModal",
    components: {
        authorForm: () => import(/* webpackChunkName: "author-form" */ "@c/hibooks/forms/author-form")
    },
    methods: {
        authorSaved() {
            this.$emit("author-saved");
            this.$modal.hide("author-modal");
        }
    }
}
</script>
<style lang="scss">
.author-modal {
    h3 {
        padding: 0 25px;
        margin: 0;
        padding-top: 20px;
    }
}
</style>
