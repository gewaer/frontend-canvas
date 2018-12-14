<template>
    <div class="home">
        <h4 class="section-title p-l-10">Dashboard</h4>
        <div class="row section">
            <div class="col">
                <div class="card padding-20">
                    <div class="card-title">
                        Test 1
                    </div>
                    <button class="btn btn-primary" @click="openUnsavedChangesModal">Unsaved changes modal</button>
                    <div class="card-body">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card padding-20">
                    <div class="card-title">
                        Test 2
                    </div>
                    <div class="card-body">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card padding-20">
                    <div class="card-title">
                        Test 3
                    </div>
                    <div class="card-body">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
        </div>
        <div class="row section">
            <div class="col">
                <div class="card padding-20">
                    <div class="card-title">
                        Test 4
                    </div>
                    <div class="card-body">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card padding-20">
                    <div class="card-title">
                        Test 5
                    </div>
                    <div class="card-body">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    components: {
        unsavedChanges
    },
    methods: {
        openUnsavedChangesModal() {
            this.$modal.show("unsaved-changes-modal");
        }
    }
};
</script>
