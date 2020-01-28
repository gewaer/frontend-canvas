<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">
            Create {{ currentResource.title }}
        </h4>
        <div class="card">
            <div class="card-block">
                <form class="resource-form" novalidate />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "CreateResource",
    data() {
        return {
            currentResource: {}
        };
    },
    computed: {
        ...mapState({
            companyData: state => state.Company.data
        })
    },
    created() {
        this.setResource(this.$route.params.resource);
    },
    methods: {
        setResource(resourceName) {
            const resourceIndex = this.companyData.resources.findIndex(resource => {
                return resource.name == resourceName;
            });

            this.currentResource = this.companyData.resources[resourceIndex];
        }
    }
}
</script>
