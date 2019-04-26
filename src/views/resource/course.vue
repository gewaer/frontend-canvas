<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">{{ isEditing ? 'Edit' : 'Create' }} Course</h4>
        <div class="card">
            <div class="card-block">
                <form class="resource-form" novalidate @submit.prevent="sendCourse">
                    <div class="row">
                        <div class="col-12 col-md-auto d-flex justify-content-center">
                            <book-cover :file="course.attachments[0] ? course.attachments[0].url : 'https://www.hibooks.com/img/cover-placeholder.jpg'" @set-cover-image="sendFile($event, 'cover')" />
                        </div>
                        <div class="col-12 col-md">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>Minicourse</label>
                                        <input
                                            v-model="course.title"
                                            class="form-control"
                                            type="text"
                                            name="title">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group form-group-default">
                                        <label>Subheading</label>
                                        <input
                                            v-model="course.subheading"
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
                                <label>At a glance</label>
                                <editor-component v-model="course.summary" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg">
                            <async-multiselect
                                v-model="course.book_insights"
                                :endpoint="bookInsightsEndpoint"
                                track-by="id"
                                label="title">
                                <template slot="label">
                                    Book Insights feature in the Course
                                </template>
                            </async-multiselect>
                        </div>
                        <div class="col-12 col-lg">
                            <div class="form-group-multiselect">
                                <label>Episodes</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="course.themes"
                                    :options="themesList"
                                    track-by="id"
                                    label="title"
                                    class="multiselect-multiple-custom"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg">
                            <async-multiselect
                                v-model="listenOriginalMentioned"
                                :external-call="true"
                                :disabled="true"
                                track-by="id"
                                label="title"
                                endpoint="https://staging-api.hibooks.com/v2/browse/section/audiobooks">
                                <template slot="label">
                                    Listen to Original Audio Books mentioned
                                </template>
                            </async-multiselect>
                        </div>
                        <div class="col-12 col-lg">
                            <async-multiselect
                                v-model="course.similar"
                                :endpoint="coursesEndpoint"
                                :exclude-option-id="Number($route.params.id)"
                                track-by="id"
                                label="title">
                                <template slot="label">
                                    Other Courses
                                </template>
                            </async-multiselect>
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
import bookCover from "./book-cover.vue";
import editorComponent from "./editor-component";
import asyncMultiselect from "./async-multiselect";

export default {
    name: "Course",
    components: {
        bookCover,
        editorComponent,
        asyncMultiselect
    },
    data() {
        return {
            isLoading: false,
            bookInsightsEndpoint: "/book-insights",
            coursesEndpoint: "/courses",
            course: {
                featured: 0,
                title: "",
                subheading: "",
                summary: "",
                attachments: [],
                themes: [],
                book_insights: [],
                similar: []
            },
            listenOriginalMentioned: [],
            themesList: []
        };
    },
    computed: {
        isEditing() {
            return this.$route.name.includes("edit");
        }
    },
    watch: {
        "course.book_insights": function(newVal){
            this.getBookInsightsThemes(newVal);
        }
    },
    created() {
        this.isEditing && this.getData();
    },
    methods: {
        getBookInsightsThemes(selectedBookInsights) {
            let originalBooks = [];
            let themes = [];
            selectedBookInsights.forEach(bookInsight => {
                if (bookInsight.external_book) {
                    const originalBookObj = {
                        title: bookInsight.external_book.title,
                        id: bookInsight.external_book.id
                    }
                    originalBooks.push(originalBookObj);
                }

                bookInsight.themes.forEach(theme => {
                    const themeObj = {
                        title: theme.title,
                        id: theme.id
                    };
                    themes.push(themeObj);
                });
            });
            this.listenOriginalMentioned = originalBooks;
            this.themesList = themes;
        },
        sendFile(file, field) {
            let formData = new FormData();
            formData.append("file", file);
            formData.append("system_modules_id", 4);
            formData.append("field", field);

            axios.post("filesystem",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(response => {
                this.course.uploadedFiles = response.data;
            }).catch(() => {
                this.$notify({
                    text: `Something went wrong uploading the cover image`,
                    type: "error"
                });
            });
        },
        getData() {
            this.isLoading = true;

            axios({
                url: `/courses/${this.$route.params.id}`,
                method: "GET"
            }).then(response => {
                this.course = Object.assign({}, this.course, response.data)
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        sendCourse() {
            this.isLoading = true;
            const url = this.isEditing ? `/courses/${this.$route.params.id}` : "/courses";
            const method = this.isEditing ? "PUT" : "POST";

            axios({
                url,
                method,
                data: this.course
            }).then(() => {
                this.isLoading = false;
                this.$router.push({ name: "browse", params: { resource: "courses" } });
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
