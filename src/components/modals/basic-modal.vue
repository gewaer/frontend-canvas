<template>
    <modal
        :draggable="true"
        :adaptive="true"
        :scrollable="true"
        name="basic-modal"
        height="auto"
        @before-open="beforeOpen"
        @before-close="beforeClose"
    >
        <div class="basic-modal">
            <div class="row modal-header">
                <div class="col d-flex align-items-center">
                    <h5>{{ title }}</h5>
                    <a class="ml-auto" href="#" @click="$modal.hide('basic-modal')">x</a>
                </div>
            </div>
            <div class="row modal-body">
                <div class="col">
                    <div slot="container" class="row  m-b-20">
                        <div class="col-12" v-html="message" />
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
    </modal>
</template>

<script>

export default {
    name: "BasicModal",
    data() {
        return {
            buttons: [],
            title:"",
            message:""
        }
    },
    methods: {
        beforeOpen(event) {
            this.buttons = event.params.buttons;
            this.title = event.params.title || "";
            this.message = event.params.message || " Are you Sure?";
        },
        beforeClose() {
            this.buttons = [];
            this.title = "";
            this.message = "";
        }
    }
}
</script>

<style lang="scss" scoped>
.basic-modal {
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
