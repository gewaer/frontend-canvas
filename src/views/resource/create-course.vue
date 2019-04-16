<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">Create Course</h4>
        <div class="card">
            <div class="card-block">
                <form class="resource-form" novalidate>
                    <div class="row">

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
                                        <label>Minicourse</label>
                                        <input
                                            v-model="course.minicourse"
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
                                <quill-editor ref="description" v-model="course.at_a_glance" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
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
                        <div class="col">
                            <div class="form-group form-group-default">
                                <label>Read this Minicourse</label>
                                <input
                                    v-model="course.readThisMinicourse"
                                    class="form-control"
                                    type="text"
                                    name="title">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group form-group-default">
                                <label>Infographic</label>
                                <input class="form-control" type="file">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group form-group-default">
                                <label>Bonus Material</label>
                                <input
                                    v-model="course.bonus_material"
                                    class="form-control"
                                    type="text"
                                    name="title">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>More Info</label>
                                <quill-editor ref="description" v-model="course.more_info" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group-multiselect">
                                <label>Book Insights feature in the Course</label>
                                <multiselect
                                    :searchable="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    v-model="course.bookInsightsFeatureInThisCourse"
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
                        <div class="col">
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
                        <div class="col">
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
                    <!-- <div class="row">
                        <div class="form-group-multiselect">
                            <label>Search Terms - Genre</label>
                            <multiselect
                                :show-labels="false"
                                :multiple="true"
                                v-model="resourceForm.searchTerms"
                                :options="authorsList"
                            />
                        </div>
                    </div> -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
    name: "CreateResource",
    components: {
        quillEditor
    },
    data() {
        return {
            course: {
                minicourse: "",
                subheading: "",
                at_a_glance: "",
                readThisMinicourse: "",
                episodes: [],
                bookInsightsFeatureInThisCourse: [],
                listenOriginalMentioned: [],
                otherCourses: [],
                more_info: "",
                bonus_material: ""
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
            ]
        };
    },
    methods: {
        addEpisode() {
            this.course.episodes.push("");
        },
        removeEpisode(index) {
            this.course.episodes.splice(index, 1);
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
