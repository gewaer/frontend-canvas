<template>
    <modal
        :draggable="true"
        :adaptive="true"
        :scrollable="true"
        name="unsaved-changes"
        height="auto"
        @before-open="beforeOpen"
    >
        <div class="unsaved-changes">
            <div class="row modal-header">
                <div class="col d-flex align-items-center">
                    <h5>Unsaved Changes</h5>
                    <a class="ml-auto" href="#" @click="$modal.hide('unsaved-changes')">x</a>
                </div>
            </div>
            <div class="row modal-body">
                <div class="col">
                    <div class="row m-b-20">
                        <div class="col-12"><strong class="text-warning">Warning: </strong>The following changes have not been saved and will be lost unless they are saved:</div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <ul>
                                <li v-for="(error, index) in errors.items" :key="'error-' + index">
                                    {{ error.field | capitalize }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row modal-footer">
                <div v-for="(button, index) in buttons" :key="'button-' + index" class="col">
                    <button :class="button.class" class="btn btn-block" @click="button.handler">{{ button.title }}</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    name: "UnsavedChangesModal",
    data() {
        return {
            buttons: []
        }
    },
    methods: {
        beforeOpen(event) {
            this.buttons = event.params.buttons;
        }
    }
}
</script>

<style lang="scss" scoped>
.unsaved-changes {
    .modal-header {
        h5 {
            color: var(--base-color);
            margin: 0;
        }
    }

    .section-title {
        font-weight: 700;
    }
}
</style>
