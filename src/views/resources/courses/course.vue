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
                            <label>
                                Book Insights feature in the Course
                            </label>
                            <custom-multiselect
                                id="title"
                                v-model="course.book_insights"
                                :endpoint="bookInsightsEndpoint"
                                :multiselect-props="bookInsightMultiselectProps"
                            />
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
                            <label>
                                Listen to Original Audio Books mentioned
                            </label>
                            <audiobook-multiselect
                                :debounce-time="200"
                                v-model="listenOriginalMentioned"
                            />
                        </div>
                        <div class="col-12 col-lg">
                            <label>
                                Other Courses
                            </label>
                            <custom-multiselect
                                id="title"
                                v-model="course.similar"
                                :endpoint="coursesEndpoint"
                                :exclude-option-id="$route.params.id"
                            />
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

export default {
    name: "Course",
    components: {
        bookCover: () => import(/* webpackChunkName: "book-cover" */ "@c/hibooks/book-cover/book-cover"),
        editorComponent: () => import(/* webpackChunkName: "editor-component" */ "@c/editor-component/editor-component"),
        customMultiselect: () => import(/* webpackChunkName: "custom-multiselect" */ "@c/custom-multiselect/custom-multiselect"),
        audiobookMultiselect: () => import(/* webpackChunkName: "audiobook-multiselect" */ "@c/audiobook-multiselect/audiobook-multiselect")
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
            listenOriginalMentioned: null,
            themesList: [],
            bookInsightMultiselectProps: {
                "multiple": true
            }
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
