<template>
    <div v-if="companiesList.length > 1" class="multi-rooftop">
        <multiselect
            :allow-empty="false"
            :options="companiesList"
            :searchable="false"
            :show-labels="false"
            :value="companyData"
            class="rooftop-select"
            label="name"
            @select="switchCompany"
        />
    </div>
</template>

<script>
/**
 * @NOTE value is used instead of v-model because we are reloading the page
 * and we do not need VueMultiselect to update anything for us.
 * See also: switchCompany()
 */
import { mapState } from "vuex";

export default {
    name: "CompaniesSwitcher",
    computed: {
        ...mapState({
            companiesList: state => state.Company.list,
            companyData: state => state.Company.data,
            userId: state => state.User.data && state.User.data.id
        })
    },
    methods: {
        switchCompany(company) {
            axios({
                url: `/users/${this.userId}`,
                method: "PUT",
                data: {
                    "default_company": company.id
                }
            }).then(() => {
                // Solution implemented for now until we can properly refresh all
                // of the user's and company's data through Vuex implementation.
                window.location.reload();
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.multi-rooftop {
    display: flex;
    align-items: center;
    padding: 0 15px;
    order: 4;
}

@media(max-width: 992px) {
    .multi-rooftop {
        padding: 0 5px;

        /deep/ .multiselect {
            .multiselect__content {
                position: fixed;
                width: 100%;
                left: 0;
                border: 0;
                margin-top: 10px;
            }
        }
    }
}
</style>
