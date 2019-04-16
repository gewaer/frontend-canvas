<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">Create {{ currentResource.title }}</h4>
        <div class="card">
            <div class="card-block">
                <form class="resource-form" novalidate>
                    <div class="row">
                        <div class="col">
                            <h3 class="title">Book Basic Info</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <div class="cover-upload">
                                <img id="logo" src="http://images.findawayworld.com/v1/image/cover/CD203924?height=220&width=220" class="img-fluid">
                                <input type="file">
                            </div>
                        </div>
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>Title</label>
                                        <input v-model="resourceForm.title" class="form-control" type="text" name="title">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>One Liner</label>
                                        <input v-model="resourceForm.one_liner" class="form-control" type="text" name="title">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>At A Glance</label>
                                <quill-editor ref="atAGlanceEditor" v-model="resourceForm.at_a_glance" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group-multiselect">
                                <label>Published Year</label>
                                <multiselect
                                    :show-labels="false"
                                    v-model="resourceForm.published_year"
                                    :options="yearsList"
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group-time">
                                <label>Duration</label>
                                <time-picker v-model="resourceForm.duration" :hide-clear-button="false" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <template v-for="(author, index) in resourceForm.authors">
                            <div :key="index" :class="(resourceForm.authors.length <= 3) ? 'col' : 'col-4'">
                                <div class="form-group-multiselect">
                                    <label>Book Author {{ index + 1 }}</label>
                                    <i @click="removeAuthor(index)" v-if="index != 0" class="fas fa-times remove-author" />
                                    <multiselect
                                        :searchable="true"
                                        :show-labels="false"
                                        v-model="resourceForm.authors[index]"
                                        :options="authorsList"
                                    />
                                </div>
                            </div>
                        </template>
                        <div class="col" @click="addAuthor">
                            <div class="add-author">
                                Add author <i class="fas fa-plus-circle" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h3 class="title">Themes</h3>
                        </div>
                    </div>
                    <template v-for="(theme, index) in resourceForm.themes">
                        <div :key="index" class="theme">
                            <div class="row">
                                <div class="col">
                                    <h3>Theme {{ index + 1 }} <i v-if="index != 0" class="fas fa-times" @click="removeTheme(index)" /></h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>Title</label>
                                        <input v-model="theme.title" class="form-control" type="text">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>Subheading</label>
                                        <input v-model="theme.sub_header" class="form-control" type="text">
                                    </div>
                                </div>
                                <div class="col">
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
                                        <quill-editor ref="themeBody" v-model="theme.body" />
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
                                <quill-editor ref="aboutTheAuthor" v-model="resourceForm.aboutTheAuthor" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <template v-for="(bookInsight, index) in resourceForm.similiarBookInsights">
                            <div :key="index" :class="(resourceForm.similiarBookInsights.length <= 3) ? 'col' : 'col-4'">
                                <div class="form-group-multiselect">
                                    <label>Similiar Book Insights Title {{ index + 1 }}</label>
                                    <i v-if="index != 0" class="fas fa-times remove-author" @click="removeSimilarBook(index)" />
                                    <multiselect
                                        :searchable="true"
                                        :show-labels="false"
                                        v-model="resourceForm.similiarBookInsights[index]"
                                        :options="authorsList"
                                    />
                                </div>
                            </div>
                        </template>
                        <div class="col" @click="addSimilarBook">
                            <div class="add-author">
                                Add Similiar Book Insight <i class="fas fa-plus-circle" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group form-group-default">
                                <label>Listen to the original audio book</label>
                                <input v-model="resourceForm.listenOriginalBook" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group form-group-default">
                                <label>Media References</label>
                                <input v-model="resourceForm.mediaReferences" class="form-control" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Book Insight Credits</label>
                                <quill-editor ref="bookInsightCredits" v-model="resourceForm.bookInsightCredits" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group-multiselect">
                                <label>Search Terms - Genre</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="resourceForm.searchTerms"
                                    :options="authorsList"
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group-multiselect">
                                <label>BISAC 1</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="resourceForm.bisac1"
                                    :options="authorsList"
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group-multiselect">
                                <label>BISAC 2</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="resourceForm.bisac2"
                                    :options="authorsList"
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group-multiselect">
                                <label>BISAC 3</label>
                                <multiselect
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="resourceForm.bisac3"
                                    :options="authorsList"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Disclaimer</label>
                                <quill-editor ref="disclaimer" v-model="resourceForm.disclaimer" />
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
                        <div class="col">
                            <div class="form-group form-group-default">
                                <label>This Course</label>
                                <input v-model="resourceForm.thisCourse" class="form-control" type="text">
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
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import timePicker from "vue2-timepicker";

export default {
    name: "CreateResource",
    components: {
        quillEditor,
        timePicker
    },
    data() {
        return {
            currentResource: {},
            resourceForm: {
                title: "",
                authors: [""],
                one_liner: "",
                at_a_glance: "",
                published_year: "",
                duration: {
                    HH: "00",
                    mm: "00"
                },
                themes: [
                    {
                        title: "",
                        sub_header: "",
                        audio: "",
                        body: ""
                    }
                ],
                aboutTheAuthor: "",
                similiarBookInsights: [""],
                listenOriginalBook: "",
                mediaReferences: "",
                bookInsightCredits: "",
                searchTerms: [],
                bisac1: "",
                bisac2: "",
                bisac3: "",
                disclaimer: "",
                thisCourse: ""
            },
            authorsList: ["Author 1", "Author 2", "Author 3"]
        };
    },
    computed: {
        ...mapState({
            companyData: state => state.Company.data
        }),
        yearsList() {
            const currentYear = new Date().getFullYear();
            const years = [];
            let startYear = startYear || 1980;
            while (startYear <= currentYear) {
                years.push(startYear += 1);
            }

            return years;
        }
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
        },
        addAuthor() {
            this.resourceForm.authors.push("");
        },
        addTheme() {
            const theme = { title: "", sub_header: "", audio: "", body: "" }
            this.resourceForm.themes.push(theme);
        },
        addSimilarBook() {
            this.resourceForm.similiarBookInsights.push("");
        },
        removeAuthor(index) {
            this.resourceForm.authors.splice(index, 1);
        },
        removeTheme(index) {
            this.resourceForm.themes.splice(index, 1);
        },
        removeSimilarBook(index) {
            this.resourceForm.similiarBookInsights.splice(index, 1);
        }
    }
}
</script>

<style lang="scss">
.create-resource {
    .resource-form {
        padding: 25px;

        .row [class*=col] {
            padding-left: 5px !important;
            padding-right: 5px !important;
        }

        .title {
            font-size: 22px;
            margin-top: 0;
            border-bottom: 1px solid  var(--base-color);
            margin-bottom: 20px;
            padding-bottom: 10px;
            color:  var(--base-color);
            font-weight: normal;
        }

        label {
            text-transform: capitalize;
            font-size: 13px;
        }

        .cover-upload {
            position: relative;
            width: 133px;

            input {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
                width: 100%;
            }
        }

        .add-author {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--base-color);
            min-height: 50px;
            height: calc(100% - 25px);
            cursor: pointer;
            margin-bottom: 25px;
            font-size: 16px;
            color: var(--base-color);

            i {
                font-size: 20px;
                margin-left: 5px;
            }
        }

        .form-group, .form-group-multiselect {
            margin-bottom: 25px;
        }

        .form-group-multiselect {
            .remove-author {
                position: absolute;
                cursor: pointer;
                right: 10px;
                top: 3px;
                opacity: .5;
                color: red;
            }
        }

        .form-group-time {
            label {
                margin-bottom: 0;
            }

            .time-picker {
                width: 100%;

                input {
                    width: 100%;
                }
            }
        }

        .theme {
            border: 1px dashed rgba(0,0,0,.07);
            padding: 20px;

            h3 {
                font-size: 20px;
                font-weight: normal;
                opacity: .7;
                margin-top: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;

                i {
                    cursor: pointer;
                    opacity: .5;
                    color: red;
                }
            }

            .quill-editor {
                background-color: white;
            }

            &:nth-child(odd) {
                background-color: rgba(185, 185, 185, 0.07);
            }
        }
    }
}
</style>
