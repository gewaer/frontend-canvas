<template>
    <div class="create-resource">
        <h1>sfd</h1>
    </div>
</template>

<script>
export default {
    name: "CreateResource",
    data() {
        return {
            currentResource: {}
        };
    },
    created(){
        this.setResource();
    },
    methods: {
        setResource() {
            const resourceIndex = this.companyData.resources.findIndex(resource => {
                return resource.name == resourceName;
            });

            this.currentResource = this.companyData.resources[resourceIndex];
        }
    }
}
</script>
