<template>
    <div class="create-resource">
        <author-modal />
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
                            <book-cover :file="bookInsight.cover" @set-cover-image="setCoverImage" />
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
                            <async-multiselect v-model="bookInsight.author" track-by="id" label="name">
                                <template slot="label">
                                    Book Authors
                                </template>
                                <template slot="beforeList" >
                                    <div class="add-author-button option__desc" @click="$modal.show('author-modal')">
                                        <i class="fa fa-plus" />Add author
                                    </div>
                                </template>
                                <template slot="afterList" >
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
                    <template v-for="(theme, index) in bookInsight.theme">
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
                                        <label>Audio</label>
                                        <input class="form-control" type="file">
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
                            <async-multiselect v-model="bookInsight.similiarBookInsights" track-by="id" label="title">
                                <template slot="label">
                                    Similiar Book Insights Titles
                                </template>
                            </async-multiselect>
                        </div>
                        <div class="col-12 col-md">
                            <div class="form-group-multiselect">
                                <label>Listen to the original audio book</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="bookInsight.listenOriginalBook"
                                    :options="episodesList"
                                    track-by="id"
                                    label="name"
                                    class="multiselect-multiple-custom"
                                >
                                    <template slot="tag" slot-scope="{ option, remove }">
                                        <span class="multiselect__tag">
                                            <span>{{ option.title }}</span>
                                            <i class="multiselect__tag-icon" @click.prevent="remove(option)" />
                                        </span>
                                    </template>
                                    <template slot="option" slot-scope="props"><img :src="props.option.cover" class="option__image">
                                        <div class="option__desc"><span class="option__title">{{ props.option.title }}</span><span class="option__small">{{ props.option.desc }}</span></div>
                                    </template>
                                </multiselect>
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="form-group-multiselect">
                                <label>Book Insight Credits</label>
                                <multiselect
                                    :show-labels="false"
                                    v-model="bookInsight.credits"
                                    :options="bookInsightCreditsList"
                                    track-by="id"
                                    label="name"
                                    class="multiselect-multiple-custom"
                                />
                            </div>
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
                            <div class="form-group-multiselect">
                                <label>Search Terms - Genre</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="bookInsight.categories"
                                    :options="authorsList"
                                    track-by="id"
                                    label="name"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-lg-6 col-xl">
                            <div class="form-group-multiselect">
                                <label>BISAC 1</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="bookInsight.bisac1"
                                    :options="authorsList"
                                    track-by="id"
                                    label="name"
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
                                    track-by="id"
                                    label="name"
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
                                    track-by="id"
                                    label="name"
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
                        <div class="col">
                            <div class="form-group form-group-default">
                                <label>Infographic</label>
                                <input class="form-control" type="file">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-right">
                            <button :disabled="isLoading" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import editorComponent from "./editor-component";
import timePicker from "vue2-timepicker";
import bookCover from "./book-cover.vue";
import moment from "moment";
import authorModal from "./author-modal";
import asyncMultiselect from "./async-multiselect";

export default {
    name: "BookInsight",
    components: {
        editorComponent,
        timePicker,
        bookCover,
        authorModal,
        asyncMultiselect
    },
    data() {
        return {
            isLoading: false,
            bookInsight: {
                title: "",
                short_summary: "",
                summary: "",
                published_year: null,
                length: 0,
                featured: false,
                media_references: "",
                disclaimer: "",
                // relationships
                cover: null,
                authors: [
                    {
                        id:null,
                        name:"",
                        about:""
                    }
                ],
                themes: [
                    {
                        id:null,
                        book_insight_id: null,
                        title: "",
                        body: "",
                        audio: {}
                    }
                ],
                similar: [
                    {
                        id:null,
                        title:"",
                        cover:""

                    }
                ],
                external_book: [ 
                    //es solo 1
                    {
                        id:null,
                        book_insight_id:null,
                        external_id: null,
                        title:"",
                        cover_url:"",
                        url:""
                    }
                ],
                credits: [
                    {
                        id:null,
                        name:""
                    }
                ],
                categories: [
                    {
                        id:null,
                        name:""
                    }
                ]
                // bisac1: "",
                // bisac2: "",
                // bisac3: "",
                // thisCourse: ""
            },
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
            episodesList: [
                {
                    id: 1,
                    title: "The Good Neighbor",
                    cover: "http://images.findawayworld.com/v1/image/cover/CD204403?height=220&width=220"
                },
                {
                    id: 2,
                    title: "A Matter of Trust",
                    cover: "http://images.findawayworld.com/v1/image/cover/CD041829?height=220&width=220"
                },
                {
                    id: 3,
                    title: "A Deadly Business",
                    cover: "http://images.findawayworld.com/v1/image/cover/CD057607?height=220&width=220"
                },
                {
                    id: 4,
                    title: "Hand of Fate",
                    cover: "http://images.findawayworld.com/v1/image/cover/CD031910?height=220&width=220"
                },
                {
                    id: 5,
                    title: "The Girl Who Was Supposed to Die",
                    cover: "http://images.findawayworld.com/v1/image/cover/CD040549?height=220&width=220"
                },
                {
                    id: 6,
                    title: "The Body in the Woods",
                    cover: "http://images.findawayworld.com/v1/image/cover/CD243094?height=220&width=220"
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
            ]
        };
    },
    computed: {
        ...mapState({
            companyData: state => state.Company.data
        }),
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
                    HH: moment(`${moment.duration(this.bookInsight.length, "minutes").hours()}`, "hours").format("HH"),
                    mm: moment(`${moment.duration(this.bookInsight.length, "minutes").minutes()}`, "hours").format("HH")
                }
                return length;
            },
            set(value) {
                this.bookInsight.length = moment.duration(`${value.HH}:${value.mm}`, "minutes").asMinutes();
            }
        }
    },
    created() {
        this.isEditing && this.getData();
    },
    methods: {
        addTheme() {
            const theme = { title: "", audio: "", body: "" }
            this.bookInsight.theme.push(theme);
        },
        removeTheme(index) {
            this.bookInsight.theme.splice(index, 1);
        },
        setCoverImage(file) {
            this.bookInsight.cover = file;
        },
        getData() {
            this.isLoading = true;

            axios({
                url: `/books-insight/${this.$route.params.id}`,
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
            const url = this.isEditing ? `/books-insight/${this.$route.params.id}` : "/books-insight/";
            const method = this.isEditing ? "PUT" : "POST";
            axios({
                url,
                method,
                data: this.bookInsight
            }).then(response => {
                this.isLoading = false;
                console.log(response);
                this.$router.push({ name: "browse", params: { resource: "book-insight" } });
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
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
    background-color: rgba(0,0,0,.07);
    cursor: pointer;
}

.add-author-button i {
    font-size: 12px;
    margin-right: 5px;
}

.add-author-button:hover {
    background-color: rgba(0,0,0,.10);
}
</style>


<style lang="scss" src="./resource.scss" />
