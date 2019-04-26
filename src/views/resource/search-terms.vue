<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">{{ isEditing ? 'Edit' : 'Create' }} Search Term</h4>
        <div class="card">
            <div class="card-block">
                <search-terms-form :is-editing="isEditing" @search-term-saved="$router.push({ name: 'browse', params: { resource: 'search-terms' } })" />
            </div>
        </div>
    </div>
</template>

<script>
import searchTermsForm from "./search-terms-form";

export default {
    name: "SearchTerms",
    components: {
        searchTermsForm
    },
    computed: {
        isEditing() {
            return this.$route.name.includes("edit");
        }
    }
}
</script>
