<template>
    <modal
        name="author-modal"
        height="auto"
    >
        <div class="author-modal">
            <h3>Add author</h3>
            <author-form @author-saved="$modal.hide('author-modal')" />
        </div>
    </modal>
</template>

<script>
import authorForm from "./author-form";

export default {
    name: "AuthorModal",
    components: {
        authorForm
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
