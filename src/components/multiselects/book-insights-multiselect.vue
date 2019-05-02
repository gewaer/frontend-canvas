<template>
    <multiselect
        :searchable="true"
        :show-labels="false"
        :options="list"
        :loading="isLoading"
        :internal-search="false"
        :options-limit="300"
        class="multiselect-multiple-custom form-group-multiselect"
        @search-change="asyncFind"
        @open="preFecthList"
    >
        <slot slot="beforeList" name="beforeList" />
        <slot slot="afterList" name="afterList" />
        <template slot="option" slot-scope="props">
            <img v-if="hasCover(props)" :src="hasCover(props)" class="option__image">
            <div class="option__desc"><span class="option__title">{{ props.option[label] }}</span></div>
        </template>
    </multiselect>
</template>

<script>
import externalAxios from "axios";

export default {
    name: "AsyncMultiselect",
    props: {
        label: {
            type: String,
            required: true
        },
        endpoint: {
            type: String,
            required: true
        },
        // need to remove/refactor
        externalCall: {
            type: Boolean,
            default: false
        },
        // it's gone/need to refactor first
        excludeOptionId: {
            type: Number,
            default: null
        },
        debounceTime: {
            type: Number,
            default: 250
        },
        itemFetchAmount: {
            type: Number,
            required: true
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
            if (!query) {
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
                    "url": `https://www.hibooks.com/discover/audiobook/${element.short_url}` // should be on env?
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
        hasCover(props) {
            if (props.option.attachments && props.option.attachments.length) {
                return props.option.attachments[0].url;
            }
            return props.option.cover || props.option.cover_url;
        },

        defaultResponseHandler(response) {
            let newResponse = response;

        }
    }
}
</script>
