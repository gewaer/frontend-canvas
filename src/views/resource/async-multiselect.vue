<template>
    <multiselect
        :searchable="true"
        :show-labels="false"
        :options="list"
        :loading="isLoading"
        :internal-search="false"
        :options-limit="list.length"
        class="multiselect-multiple-custom form-group-multiselect"
        @search-change="asyncFind"
        @open="preFecthList"
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
    name: "AsyncMultiselect",
    props: {
        value: {
            type: null,
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
        // it's gone/need to refactor first
        excludeOptionId: {
            type: Number,
            default: null
        },
        debounceTime: {
            type: Number,
            default: 250
        }
    },
    data() {
        return {
            isLoading: false,
            list: []
        };
    },
    created() {
        this.preFecthList();
    },
    methods: {
        preFecthList() {
            axios({
                url: `${this.endpoint}`,
                method: "GET"
            }).then(response => {
                if (this.excludeOptionId) {
                    this.list = this.excludeOption(response.data)
                } else {
                    this.list = response.data;
                }
            });
        },
        asyncFind: _.debounce(function(query) { // eslint-disable-line
            if (!query) {
                return;
            }
            this.isLoading = true;
            this.fetchList(query).then(response => {
                this.list = response.data;
            }).catch(error => {
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            })
        }, 250),
        fetchList(query) {
            return axios({
                url: `${this.endpoint}?q=(${this.id}:%${query}%)`,
                method: "GET"
            });
        },
        excludeOption(list) {
            const optionIndex = list.findIndex(option => {
                return Number(option.id) == Number(this.excludeOptionId)
            });
            list.splice(optionIndex, 1);
            return list;
        },
        emitNewValue(event) {
            this.$emit("input", event);
        }
    }
}
</script>
