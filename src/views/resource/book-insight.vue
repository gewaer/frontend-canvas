<template>
    <div class="create-resource">
        <author-modal @author-saved="$refs.authorsMultiselect.preFecthList()" />
        <search-terms-modal @search-term-saved="$refs.searchTermsMultiselect.preFecthList()" />
        <h4 class="section-title p-l-10">{{ isEditing ? 'Edit' : 'Create' }} Book Insight</h4>
        <div class="card">
            <div class="card-block">
                <form class="resource-form" novalidate @submit.prevent="sendBookInsight">
                    <div class="row">
                        <div class="col">
                            <h3 class="title">Book Basic Info</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-auto d-flex justify-content-center">
                            <book-cover :file="bookInsight.attachments[0] ? bookInsight.attachments[0].url : 'https://www.hibooks.com/img/cover-placeholder.jpg'" @set-cover-image="sendFile($event, 'cover')" />
                        </div>
                        <div class="col-12 col-md">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>Title</label>
                                        <input
                                            v-model="bookInsight.title"
                                            class="form-control"
                                            type="text"
                                            name="title">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>One Liner</label>
                                        <input
                                            v-model="bookInsight.short_summary"
                                            class="form-control"
                                            type="text"
                                            name="title">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>At A Glance</label>
                                <editor-component v-model="bookInsight.summary" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md">
                            <label>
                                Book Authors
                            </label>
                            <async-multiselect
                                id="name"
                                ref="authorsMultiselect"
                                v-model="bookInsight.author"
                                :endpoint="authorsEndpoint"
                                track-by="id"
                            >
                                <template slot="beforeList" >
                                    <div class="add-author-button option__desc" @click="$modal.show('author-modal')">
                                        <i class="fa fa-plus" />Add author
                                    </div>
                                </template>
                            </async-multiselect>
                        </div>
                        <div class="col-12 col-md">
                            <div class="form-group-multiselect">
                                <label>Published Year</label>
                                <multiselect
                                    :show-labels="false"
                                    v-model="bookInsight.published_year"
                                    :options="yearsList"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="form-group-time">
                                <label>Duration</label>
                                <time-picker v-model="bookInsightLength" :hide-clear-button="false" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h3 class="title">Themes</h3>
                        </div>
                    </div>
                    <template v-for="(theme, index) in bookInsight.themes">
                        <div :key="index" class="theme">
                            <div class="row">
                                <div class="col">
                                    <h3>Theme {{ index + 1 }} <i v-if="index != 0" class="fas fa-times" @click="removeTheme(index)" /></h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md">
                                    <div class="form-group form-group-default">
                                        <label>Title</label>
                                        <input v-model="theme.title" class="form-control" type="text">
                                    </div>
                                </div>
                                <div class="col-12 col-md">
                                    <div class="form-group form-group-default">
                                        <label>Audio: {{ theme.attachments[0] ? theme.attachments[0].name : '' }}</label>
                                        <input class="form-control" type="file" @change="sendFile($event.target.files[0], 'theme', index)">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label>Body</label>
                                        <editor-component v-model="theme.body" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="row">
                        <div class="col" @click="addTheme">
                            <div class="add-author">
                                Add theme <i class="fas fa-plus-circle" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h3 class="title">Book Extras</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md">
                            <label>
                                Similar Book Insights Titles
                            </label>
                            <async-multiselect
                                id="title"
                                :value="bookInsight.similar"
                                :endpoint="bookInsightsEndpoint"
                                track-by="id"
                            />
                        </div>
                        <div class="col-12 col-md">
                            <label>
                                Listen to the original audio book
                            </label>
                            <audiobook-multiselect
                                :debounce-time="200"
                                :value="bookInsight.external_book"
                                :multiple="true"
                                track-by="id"
                            />
                        </div>
                        <div class="col-12 col-md">
                            <label>
                                Book Insight Credits
                            </label>
                            <async-multiselect
                                id="title"
                                :value="bookInsight.credits"
                                :single-select="true"
                                :endpoint="collaboratorsEndpoint"
                                track-by="external_id"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Media References</label>
                                <editor-component v-model="bookInsight.media_references" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg-6 col-xl">
                            <label>
                                Search Terms - Genre
                            </label>
                            <async-multiselect
                                id="name"
                                ref="searchTermsMultiselect"
                                v-model="bookInsight.categories"
                                :endpoint="categoriesEndpoint"
                                track-by="id"
                            >
                                <template slot="beforeList" >
                                    <div class="add-author-button option__desc" @click="$modal.show('search-terms-modal')">
                                        <i class="fa fa-plus" />Add search term
                                    </div>
                                </template>
                            </async-multiselect>
                        </div>
                        <div class="col-12 col-lg-6 col-xl">
                            <div class="form-group-multiselect">
                                <label>BISAC 1</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="bookInsight.bisac1"
                                    :options="authorsList"
                                    label="name"
                                    track-by="id"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-lg-6 col-xl">
                            <div class="form-group-multiselect">
                                <label>BISAC 2</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="bookInsight.bisac2"
                                    :options="authorsList"
                                    label="name"
                                    track-by="id"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-lg-6 col-xl">
                            <div class="form-group-multiselect">
                                <label>BISAC 3</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="bookInsight.bisac3"
                                    :options="authorsList"
                                    label="name"
                                    track-by="id"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Disclaimer</label>
                                <editor-component v-model="bookInsight.disclaimer" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-right">
                            <button :disabled="isLoading" :title="isLoading ? 'Processing, wait a moment...' : ''" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// TODO: lazy loaaad
import editorComponent from "./editor-component";
import timePicker from "vue2-timepicker";
import bookCover from "./book-cover.vue";
import moment from "moment";
import authorModal from "./author-modal";
import searchTermsModal from "./search-terms-modal";
import asyncMultiselect from "./async-multiselect";
import audiobookMultiselect from  "@c/multiselects/audiobook-multiselect";

export default {
    name: "BookInsight",
    components: {
        editorComponent,
        timePicker,
        bookCover,
        authorModal,
        searchTermsModal,
        asyncMultiselect,
        audiobookMultiselect
    },
    data() {
        return {
            isLoading: false,
            bookInsightsEndpoint: "/book-insights",
            authorsEndpoint: "/authors",
            categoriesEndpoint: "/categories",
            collaboratorsEndpoint: "/collaborators",
            bookInsight: {
                title: "",
                short_summary: "",
                summary: "",
                published_year: null,
                length: 0,
                featured: 0,
                media_references: "",
                disclaimer: "",
                authors: [],
                themes: [],
                similar: [],
                external_book: {},
                credits: [],
                categories: [],
                attachments: []
                // bisac1: "",
                // bisac2: "",
                // bisac3: "",
                // thisCourse: ""
            },
            filesToAssociate: [],
            authorsList: [
                {
                    id: 1,
                    name: "Author 1"
                },
                {
                    id: 2,
                    name: "Author 2"
                },
                {
                    id: 3,
                    name: "Author 3"
                }
            ],
            bookInsightCreditsList: [
                {
                    id: 1,
                    name: "Gabriel Mara"
                },
                {
                    id: 2,
                    name: "Daniel Reichl"
                }
            ],
            fileSystem: {
                attachments: 3,
                themes: 5
            },
            associateFileSystem: []
        };
    },
    computed: {
        isEditing() {
            return this.$route.name.includes("edit");
        },
        yearsList() {
            const currentYear = new Date().getFullYear();
            const years = [];
            let startYear = startYear || 1650;
            while (startYear <= currentYear) {
                years.push(startYear += 1);
            }

            return years;
        },
        bookInsightLength: {
            get() {
                const length = {
                    HH: moment(`${moment.duration(Number(this.bookInsight.length), "minutes").hours()}`, "hours").format("HH"),
                    mm: moment(`${moment.duration(Number(this.bookInsight.length), "minutes").minutes()}`, "hours").format("HH")
                }
                return length;
            },
            set(value) {
                this.bookInsight.length = moment.duration(`${value.HH}:${value.mm}`, "minutes").asMinutes();
            }
        }
    },
    created() {
        this.isEditing && this.getBookInsight();
    },
    methods: {
        // TODO: global
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
        addTheme() {
            const theme = { id: "", title: "", audio: "", body: "", attachments: "" }
            this.bookInsight.themes.push(theme);
        },
        removeTheme(index) {
            this.bookInsight.themes.splice(index, 1);
        },
        sendFile(file, field, index) {
            this.isLoading = true;
            const systemModuleId = field == "cover" ? this.fileSystem.attachments : this.fileSystem.themes;

            let formData = new FormData();
            formData.append("file", file);
            formData.append("system_modules_id", systemModuleId);
            formData.append("field", field);

            axios.post("filesystem",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(response => {
                if (field == "cover") {
                    this.bookInsight.uploadedFiles = response.data;
                } else {
                    this.bookInsight.themes[index].uploadedFiles = response.data;
                }
                this.isLoading = false;
            }).catch(() => {
                this.isLoading = false;
                this.$notify({
                    text: `Something went wrong uploading the cover image`,
                    type: "error"
                });
            });
        },
        getBookInsight() {
            this.isLoading = true;
            axios({
                url: `${this.bookInsightsEndpoint}/${this.$route.params.id}`,
                method: "GET"
            }).then(response => {
                this.bookInsight = Object.assign({}, this.bookInsight, response.data);
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        sendBookInsight() {
            this.isLoading = true;
            const url = this.isEditing ? `${this.bookInsightsEndpoint}/${this.$route.params.id}` : this.bookInsightsEndpoint;
            const method = this.isEditing ? "PUT" : "POST";
            axios({
                url,
                method,
                data: this.bookInsight
            }).then(() => {
                this.isLoading = false;
                this.$router.push({ name: "browse", params: { resource: "book-insights" } });
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        hasCover(props) {
            if (props.option.attachments && props.option.attachments.length) {
                return props.option.attachments[0].url;
            }
            return props.option.cover || props.option.cover_url;
        }
    }
}
</script>

<style>
.add-author-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-top: 1px solid rgba(0,0,0,.07);
    background-color: var(--secondary-color);
    cursor: pointer;
}

.add-author-button i {
    font-size: 12px;
    margin-right: 5px;
}
</style>


<style lang="scss" src="./resource.scss" />
