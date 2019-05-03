<template>
    <multiselect
        :value="value"
        :searchable="true"
        :show-labels="false"
        :options="searchResults.length ? searchResults : audiobooks"
        :loading="isLoading"
        :internal-search="false"
        :options-limit="searchResults.length ? searchResults.length : audiobooks.length"
        label="title"
        class="multiselect-multiple-custom form-group-multiselect"
        @search-change="asyncFind"
        @open="preFecthList"
        @close="() => { searchResults = [] }"
        @input="(event) => { $emit('input', event) }"
    >
        <template slot="afterList">
            <div v-if="searchTerm" class="load-more-button option__desc" @click="fetchNext">
                <i class="fa fa-plus" />Load More
            </div>
        </template>

        <template slot="option" slot-scope="props">
            <img
                v-if="props.option.cover_url"
                :title="props.option.title"
                :src="props.option.cover_url | resizeCoverUrl(40, 38)"
                class="option__image">
            <div :title="props.option.title" class="option__desc"><span class="option__title">{{ props.option.title }}</span></div>
        </template>
    </multiselect>
</template>

<script>

export default {
    name: "AudiobookMultiselect",
    props: {
        value: {
            type: Object,
            default: null
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
            audiobooks: [],
            searchResults: [],
            endpoint: process.env.VUE_APP_HIBOOKS_API,
            currentPage: 0,
            searchTerm: ""
        };
    },
    methods: {
        preFecthList() {
            this.currentPage = 0;
            if (this.audiobooks.length) {
                return;
            }
            this.fetchAudiobooks();
        },
        asyncFind: _.debounce(function(query) { // eslint-disable-line
            const page = 0;
            this.searchTerm = query;
            if (!query) {
                return;
            }
            this.searchAudiobooks(query, page);
        }, 250),
        searchAudiobooks(query, page) {
            this.isLoading = true;
            return axios(({
                url: `${this.endpoint}/browse/section/audiobooks:search:${query}?page=${page}`,
                method: "GET"
            })).then((response) => {
                let audiobooksSearchResult = this.handleResponse(response);
                let newAudiobooks = [...this.searchResults];

                if (!this.searchResults.length) {
                    this.searchResults = audiobooksSearchResult;
                }

                newAudiobooks.push.apply(newAudiobooks, audiobooksSearchResult);
                this.searchResults = newAudiobooks;
            }).catch(error => {
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            });
        },
        fetchAudiobooks() {
            this.isLoading = true;
            axios({
                url: `${this.endpoint}/browse/section/audiobooks`,
                method: "GET"
            }).then(response => {
                const handledResponse = this.handleResponse(response);
                this.audiobooks = handledResponse;
                return handledResponse;
            }).finally(() => {
                this.isLoading = false;
            });
        },
        handleResponse(response) {
            const filteredResponse = response.data.map(element => {
                return {
                    "id": element.id,
                    "title": element.title,
                    "cover_url": element.cover_url,
                    "url": element.cover_url
                }
            });
            return filteredResponse;
        },
        fetchNext() {
            if (this.searchResults.length < 20) {
                return;
            }
            this.currentPage += 1;
            this.searchAudiobooks(this.searchTerm, this.currentPage);
        }
    }
}
</script>

<style scoped>
.load-more-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-top: 1px solid rgba(0,0,0,.07);
    background-color: var(--secondary-color);
    cursor: pointer;
}

.load-more-button i {
    font-size: 12px;
    margin-right: 5px;
}
</style>
