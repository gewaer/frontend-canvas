<template>
    <multiselect
        :value="value"
        :searchable="true"
        :show-labels="false"
        :options="list"
        :loading="isLoading"
        :internal-search="false"
        :options-limit="25"
        v-bind="multiselectProps"
        class="multiselect-multiple-custom form-group-multiselect"
        @search-change="asyncFind"
        @input="(event) => $emit('input', event)"
    >
        <slot slot="beforeList" name="beforeList" />
        <slot slot="afterList" name="afterList" />
        <template slot="option" slot-scope="props">
            <div class="option__desc"><span class="option__title">{{ props.option[id] }}</span></div>
        </template>
    </multiselect>
</template>

<script>

export default {
    name: "CustomMultiselect",
    props: {
        value: {
            type: Object|Array|String|Number,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        endpoint: {
            type: String,
            required: true
        },
        excludeOptionId: {
            type: String,
            default: ""
        },
        debounceTime: {
            type: Number,
            default: 250
        },
        multiselectProps: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isLoading: false,
            list: [],
            currentPage: 0
        };
    },
    created() {
        this.asyncFind = _.debounce(this.searchList, this.debounceTime);
        this.fetchList()
    },
    methods: {
        searchList(searchQuery) {
            this.isLoading = true;
            return axios({
                url: `${this.endpoint}?q=(${this.id}:%${searchQuery}%)&limit=${this.optionsLimit}`,
                method: "GET"
            }).then(response => {
                this.list = response.data;
            }).catch(error => {
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            })
        },
        fetchList() {
            this.isLoading = true;
            return axios({
                url: `${this.endpoint}?&limit=${this.optionsLimit}`,
                method: "GET"
            }).then((response) => {
                if (this.excludeOptionId) {
                    this.list = this.excludeOption(response.data)
                } else {
                    this.list = response.data;
                }
            }).catch((error) => {
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            });
        },
        excludeOption(list) {
            const newList = list.filter((item) => {
                return item.id !== this.excludeOptionId
            });
            return newList;
        }
    }
}
</script>
