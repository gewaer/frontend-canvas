<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">{{ isEditing ? 'Edit' : 'Create' }} Course</h4>
        <div class="card">
            <div class="card-block">
                <form class="resource-form" novalidate @submit.prevent="sendCourse">
                    <div class="row">
                        <div class="col-12 col-md-auto d-flex justify-content-center">
                            <book-cover :file="course.cover" @set-cover-image="setCoverImage" />
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
                            <div class="form-group-multiselect">
                                <label>Book Insights feature in the Course</label>
                                <multiselect
                                    v-model="course.bookInsightsFeatureInThisCourse"
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    :options="episodesList"
                                    :loading="isLoading"
                                    :internal-search="false"
                                    :options-limit="300"
                                    track-by="id"
                                    label="title"
                                    class="multiselect-multiple-custom"
                                    @search-change="asyncFind"
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
                        <div class="col-12 col-lg">
                            <div class="form-group-multiselect">
                                <label>Episodes</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="course.episodes"
                                    :options="episodesList"
                                    track-by="id"
                                    label="title"
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
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg">
                            <div class="form-group-multiselect">
                                <label>Listen to Original Audio Books mentioned</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="course.listenOriginalMentioned"
                                    :options="episodesList"
                                    track-by="id"
                                    label="title"
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
                        <div class="col-12 col-lg">
                            <div class="form-group-multiselect">
                                <label>Other Courses</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="course.otherCourses"
                                    :options="episodesList"
                                    track-by="id"
                                    label="title"
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
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>More Info</label>
                                <editor-component v-model="course.more_info" />
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
import bookCover from "./book-cover.vue";
import editorComponent from "./editor-component";

export default {
    name: "Course",
    components: {
        bookCover,
        editorComponent
    },
    data() {
        return {
            isLoading: false,
            course: {
                cover: null,
                title: "",
                subheading: "",
                summary: "",
                episodes: [],
                bookInsightsFeatureInThisCourse: [],
                listenOriginalMentioned: [],
                otherCourses: [],
                more_info: ""
            },
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
            episodesListClone: [
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
            ]
        };
    },
    computed: {
        isEditing() {
            return this.$route.name.includes("edit");
        }
    },
    created() {
        this.isEditing && this.getData();
    },
    methods: {
        setCoverImage(file) {
            this.course.cover = file;
        },
        asyncFind(query) {
            this.isLoading = true;
            this.ajaxFindEpisodes(query).then(response => {
                this.episodesList = response;
                this.isLoading = false;
            })
        },
        ajaxFindEpisodes(query) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const list = this.episodesListClone.filter((episode) => {
                        return episode.title.match(new RegExp( query, "i" ));
                    })
                    resolve(list);
                }, 1000)
            })
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
            const url = this.isEditing ? `/courses/${this.$route.params.id}` : "/courses/";
            const method = this.isEditing ? "PUT" : "POST";

            axios({
                url,
                method,
                data: this.course
            }).then(response => {
                this.isLoading = false;
                console.log(response);
                this.$router.push({ name: "browse", params: { resource: "course" } });
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
