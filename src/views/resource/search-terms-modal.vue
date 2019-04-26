<template>
    <modal
        name="search-terms-modal"
        height="auto"
    >
        <div class="search-terms-modal">
            <h3>Add search term</h3>
            <search-terms-form @search-term-saved="searchTermSaved" />
        </div>
    </modal>
</template>

<script>
import searchTermsForm from "./search-terms-form";

export default {
    name: "AuthorModal",
    components: {
        searchTermsForm
    },
    methods: {
        searchTermSaved() {
            this.$emit("search-term-saved");
            this.$modal.hide("search-terms-modal");
        }
    }
}
</script>
<style lang="scss">
.search-terms-modal {
    h3 {
        padding: 0 25px;
        margin: 0;
        padding-top: 20px;
    }
}
</style>
