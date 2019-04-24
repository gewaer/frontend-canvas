<template>
    <div class="form-group-multiselect">
        <label>
            <slot name="label" />
        </label>
        <multiselect
            :value="value"
            :searchable="true"
            :show-labels="false"
            :multiple="true"
            :options="list"
            :loading="isLoading"
            :internal-search="false"
            :options-limit="300"
            :track-by="trackBy"
            :label="label"
            class="multiselect-multiple-custom"
            @input="emitNewValue"
            @search-change="asyncFind"
        >
            <slot slot="beforeList" name="beforeList" />
            <slot slot="afterList" name="afterList" />
            <!-- <template slot="tag" slot-scope="{ option, remove }">
                <span class="multiselect__tag">
                    <span>{{ option[label] }}</span>
                    <i class="multiselect__tag-icon" @click.prevent="remove(option)" />
                </span>
            </template> -->
            <template slot="option" slot-scope="props">
                <img v-if="props.option.cover" :src="props.option.cover" class="option__image">
                <div class="option__desc"><span class="option__title">{{ props.option[label] }}</span></div>
            </template>
        </multiselect>
    </div>
</template>

<script>
export default {
    name: "AsyncMultiselect",
    props: {
        value: {
            type: null,
            required: true
        },
        trackBy: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        endpoint: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isLoading: false,
            list: [

            ]
            // listClone: [
            //     {
            //         id: 1,
            //         title: "The Good Neighbor",
            //         cover: "http://images.findawayworld.com/v1/image/cover/CD204403?height=220&width=220"
            //     },
            //     {
            //         id: 2,
            //         title: "A Matter of Trust",
            //         cover: "http://images.findawayworld.com/v1/image/cover/CD041829?height=220&width=220"
            //     },
            //     {
            //         id: 3,
            //         title: "A Deadly Business",
            //         cover: "http://images.findawayworld.com/v1/image/cover/CD057607?height=220&width=220"
            //     },
            //     {
            //         id: 4,
            //         title: "Hand of Fate",
            //         cover: "http://images.findawayworld.com/v1/image/cover/CD031910?height=220&width=220"
            //     },
            //     {
            //         id: 5,
            //         title: "The Girl Who Was Supposed to Die",
            //         cover: "http://images.findawayworld.com/v1/image/cover/CD040549?height=220&width=220"
            //     },
            //     {
            //         id: 6,
            //         title: "The Body in the Woods",
            //         cover: "http://images.findawayworld.com/v1/image/cover/CD243094?height=220&width=220"
            //     }
            // ]
        };
    },
    methods: {
        asyncFind(query) {
            this.isLoading = true;
            this.fetchList(query).then(response => {
                this.list = response.data;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                this.$notify({
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        fetchList(query) {
            return axios({
                url: `/${this.endpoint}?q=(${this.label}:${query})`,
                method: "GET"
            });
        },
        emitNewValue(event) {
            this.$emit("input", event);
        }
    }
}
</script>
