<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">{{ isEditing ? 'Edit' : 'Create' }} Author</h4>
        <div class="card">
            <div class="card-block">
                <author-form :is-editing="isEditing" @author-saved="$router.push({ name: 'browse', params: { resource: 'authors' } })" />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Author",
    components: {
        authorForm: () => import(/* webpackChunkName: "author-form" */ "@c/hibooks/forms/author-form")
    },
    computed: {
        isEditing() {
            return this.$route.name.includes("edit");
        }
    }
}
</script>
