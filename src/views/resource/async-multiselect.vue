<template>
    <div class="form-group-multiselect">
        <label>
            <slot name="label" />
        </label>
        <multiselect
            :value="value"
            :searchable="true"
            :show-labels="false"
            :multiple="singleSelect ? false : true"
            :options="list"
            :loading="isLoading"
            :internal-search="false"
            :options-limit="300"
            :track-by="trackBy"
            :label="label"
            :disabled="disabled"
            class="multiselect-multiple-custom"
            @input="emitNewValue"
            @search-change="asyncFind"
            @close="preFecthList"
        >
            <slot slot="beforeList" name="beforeList" />
            <slot slot="afterList" name="afterList" />
            <template slot="option" slot-scope="props">
                <img v-if="props.option.cover || props.option.cover_url" :src="props.option.cover || props.option.cover_url" class="option__image">
                <div class="option__desc"><span class="option__title">{{ props.option[label] }}</span></div>
            </template>
        </multiselect>
    </div>
</template>

<script>
import externalAxios from "axios";

export default {
    name: "AsyncMultiselect",
    props: {
        value: {
            type: null,
            required: true
        },
        trackBy: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        endpoint: {
            type: String,
            required: true
        },
        externalCall: {
            type: Boolean,
            default: false
        },
        singleSelect: {
            type: Boolean,
            default: false
        },
        excludeOptionId: {
            type: Number,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
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
            if(this.externalCall) {
                externalAxios({
                    url: this.endpoint,
                    method: "GET"
                }).then(response => {
                    this.list = this.filterExternalResponse(response);
                });
            } else {
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
            }
        },
        asyncFind: _.debounce(function(query) { // eslint-disable-line
            if (query == "") {
                return;
            }
            this.isLoading = true;
            this.fetchList(query).then(response => {
                if (this.externalCall) {
                    this.list = this.filterExternalResponse(response);
                } else {
                    this.list = response.data;
                }
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        }, 250),
        fetchList(query) {
            if(this.externalCall) {
                return externalAxios({
                    url: `${this.endpoint}:search:${query}?page=0`,
                    method: "GET"
                })
            } else {
                return axios({
                    url: `${this.endpoint}?q=(${this.label}:%${query}%)`,
                    method: "GET"
                });
            }
        },
        filterExternalResponse(response) {
            const filteredResponse = response.data.map(element => {
                return {
                    "external_id": element.id,
                    "title": element.title,
                    "cover_url": element.cover_url,
                    "url": `https://www.hibooks.com/discover/audiobook/${element.short_url}`
                }
            });

            return filteredResponse;
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
