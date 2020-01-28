<template>
    <div class="unsaved-changes">
        <div class="row modal-header">
            <div class="col d-flex align-items-center">
                <h5>Unsaved Changes</h5>
            </div>
        </div>
        <div class="row modal-body">
            <div class="col">
                <div class="row m-b-20">
                    <div class="col-12">
                        <strong class="text-warning">Warning: </strong>The following changes have not been saved and will be lost unless they are saved:
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <ul>
                            <li v-for="(data, field) in fields" :key="'error-' + field">
                                {{ getFieldAlias(field) | capitalize }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row modal-footer">
            <div v-for="(button, index) in buttons" :key="'button-' + index" class="col">
                <button :class="button.class" class="btn btn-block" @click="button.handler">
                    {{ button.title }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UnsavedChangesModal",
    props: {
        buttons: {
            type: Array,
            required: true
        },
        fields: {
            type: Object,
            required: true
        }
    },
    methods: {
        getFieldAlias(field) {
            const alias = document.querySelector(`[name="${field}"]`);

            return alias && alias.dataset.vvAs || field;
        }
    }
}
</script>

<style lang="scss" scoped>
.unsaved-changes {
    .modal-header {
        padding: 1.5rem 2rem;

        h5 {
            color: var(--base-color);
            margin: 0;
            font-weight: 600;
        }
    }

    .modal-body {
        padding: 2rem;;
    }

    .modal-footer {
        padding: 1.5rem 2rem;
    }

    .section-title {
        font-weight: 700;
    }
}
</style>
