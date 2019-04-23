<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">Create {{ currentResource.title }}</h4>
        <div class="card">
            <div class="card-block">
                <form class="resource-form" @submit.prevent="sendBookInsight" novalidate>
                    <div class="row">
                        <div class="col">
                            <h3 class="title">Book Basic Info</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-auto d-flex justify-content-center">
                            <book-cover :file="resourceForm.cover" @set-cover-image="setCoverImage" />
                        </div>
                        <div class="col-12 col-md">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>Title</label>
                                        <input
                                            v-model="resourceForm.title"
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
                                            v-model="resourceForm.short_summary"
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
                                <editor-component v-model="resourceForm.summary" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md">
                            <div class="form-group-multiselect">
                                <label>Book Authors</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="resourceForm.author"
                                    :options="authorsList"
                                    track-by="id"
                                    label="name"
                                    class="multiselect-multiple-custom"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="form-group-multiselect">
                                <label>Published Year</label>
                                <multiselect
                                    :show-labels="false"
                                    v-model="resourceForm.published_year"
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
                    <template v-for="(theme, index) in resourceForm.theme">
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
                        <div class="col">
                            <div class="form-group">
                                <label>About The Author</label>
                                <editor-component v-model="resourceForm.aboutTheAuthor" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md">
                            <div class="form-group-multiselect">
                                <label>Similiar Book Insights Titles</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="resourceForm.similiarBookInsights"
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
                                <label>Listen to the original audio book</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="resourceForm.listenOriginalBook"
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
                                    v-model="resourceForm.credits"
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
                                <editor-component v-model="resourceForm.media_references" />
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
                                    v-model="resourceForm.searchTerms"
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
                                    v-model="resourceForm.bisac1"
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
                                    v-model="resourceForm.bisac2"
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
                                    v-model="resourceForm.bisac3"
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
                                <editor-component v-model="resourceForm.disclaimer" />
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
                            <button class="btn btn-primary">Save</button>
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

export default {
    name: "CreateResource",
    components: {
        editorComponent,
        timePicker,
        bookCover
    },
    data() {
        return {
            currentResource: {},
            resourceForm: {
                cover: null,
                title: "",
                author: [],
                short_summary: "",
                summary: "",
                published_year: null,
                length: 0,
                theme: [
                    {
                        title: "",
                        audio: "",
                        body: ""
                    }
                ],
                aboutTheAuthor: "",
                similiarBookInsights: [],
                listenOriginalBook: [],
                media_references: "",
                credits: {},
                searchTerms: [],
                bisac1: "",
                bisac2: "",
                bisac3: "",
                disclaimer: "",
                thisCourse: ""
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
            return this.$route.name == "edit-resource";
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
                    HH: moment(`${moment.duration(this.resourceForm.length, "minutes").hours()}`, "hours").format("HH"),
                    mm: moment(`${moment.duration(this.resourceForm.length, "minutes").minutes()}`, "hours").format("HH")
                }
                return length;
            },
            set(value) {
                this.resourceForm.length = moment.duration(`${value.HH}:${value.mm}`, "minutes").asMinutes();
            }
        }
    },
    created() {
        this.setResource(this.$route.params.resource);
        this.isEditing && this.getData();
    },
    methods: {
        setResource(resourceName) {
            const resourceIndex = this.companyData.resources.findIndex(resource => {
                return resource.name == resourceName;
            });

            this.currentResource = this.companyData.resources[resourceIndex];
        },
        addTheme() {
            const theme = { title: "", audio: "", body: "" }
            this.resourceForm.theme.push(theme);
        },
        removeTheme(index) {
            this.resourceForm.theme.splice(index, 1);
        },
        setCoverImage(file) {
            this.resourceForm.cover = file;
        },
        getData() {
            axios({
                url: `/books-insight/${this.$route.params.id}`,
                method: "GET"
            }).then(response => {
                this.resourceForm = Object.assign({}, this.resourceForm, response.data)
            }).catch(error => {
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });

            // axios({
            //     url: "/authors",
            //     method: "GET"
            // }).then(response => {
            //     console.log(response);
            // }).catch(error => {
            //     console.log(error);
            // });

            // axios({
            //     url: "/courses",
            //     method: "GET"
            // }).then(response => {
            //     console.log(response);
            // }).catch(error => {
            //     console.log(error);
            // });

            // axios({
            //     url: "/themes",
            //     method: "GET"
            // }).then(response => {
            //     console.log(response);
            // }).catch(error => {
            //     console.log(error);
            // });
        },
        sendBookInsight() {
            const url = this.isEditing ? `/books-insight/${this.$route.params.id}` : "/books-insight/";
            const method = this.isEditing ? "PUT" : "POST";

            axios({
                url,
                method,
                data: this.resourceForm
            }).then(response => {
                console.log(response);
            }).catch(error => {
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        }
    }
}
</script>

<style lang="scss" src="./resource.scss" />
