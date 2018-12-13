<template>
<div class="unsaved-changes">
    <div class="row modal-header">
        <div class="col d-flex align-items-center">
            <h5>Unsaved Changes</h5>
            <a class="ml-auto" href="#" @click="$modal.hide('unsaved-changes-modal')">x</a>
        </div>
    </div>
    <div class="row modal-body">
        <div class="col">
            <div class="row m-b-20">
                <div class="col-12"><strong class="text-warning">Warning: </strong>The following changes have not been saved and will be lost unless they are saved:</div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="section-title">Title</div>
                    <ul>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                    </ul>
                </div>
                <div class="col-6">
                    <div class="section-title">Title</div>
                    <ul>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                    </ul>
                </div>
                <div class="col-6">
                    <div class="section-title">Title</div>
                    <ul>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                    </ul>
                </div>
                <div class="col-6">
                    <div class="section-title">Title</div>
                    <ul>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                        <li>Lorem Ipsum is simply dummy</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="row modal-footer">
        <div class="col">
            <button class="btn btn-block">Discard</button>
        </div>
        <div class="col">
            <button class="btn btn-block btn-primary">Cancel</button>
        </div>
    </div>
</div>
</template>

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
