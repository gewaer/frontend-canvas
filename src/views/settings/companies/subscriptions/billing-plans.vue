<template>
    <div class="container">
        <!--BLOCK ROW START-->
        <div class="row" >
            <div
                v-for="plan in plans"
                :key="plan.stripe_id"
                class="col">

                <!--PRICE CONTENT START-->
                <div :class="['generic_content', selectedPlan == plan.stripe_id ? 'active' : '', 'clearfix']">

                    <!--HEAD PRICE DETAIL START-->
                    <div class="generic_head_price clearfix">

                        <!--HEAD CONTENT START-->
                        <div class="generic_head_content clearfix">

                            <!--HEAD START-->
                            <div class="head_bg"/>
                            <div class="head">
                                <span>{{ plan.name }}</span>
                            </div>
                            <!--//HEAD END-->

                        </div>
                        <!--//HEAD CONTENT END-->

                        <!--PRICE START-->
                        <div class="generic_price_tag clearfix">
                            <span class="price">
                                <span class="sign">$</span>
                                <span class="currency">{{ plan[selectedFrecuency.type] | getPrice }} </span>
                                <span class="cent">.00</span>
                                <span class="month">/{{ selectedFrecuency.frecuency }}</span>
                            </span>
                        </div>
                        <!--//PRICE END-->

                    </div>
                    <!--//HEAD PRICE DETAIL END-->

                    <!--FEATURE LIST START-->
                    <div class="generic_feature_list">
                        <ul v-if="plan.settings.length">
                            <li
                                v-for="planSetting in plan.settings"
                                :key="planSetting.key"
                            >
                                <span> {{ planSetting.value }}</span> {{ planSetting.key | formatSetting }}
                            </li>
                        </ul>
                    </div>
                    <!--//FEATURE LIST END-->

                    <!--BUTTON START-->
                    <div class="generic_price_btn clearfix">
                        <a @click.prevent.stop="changeSubscription(plan)" >Try {{ plan.name }}</a>
                    </div>
                    <!--//BUTTON END-->

                </div>
                <!--//PRICE CONTENT END-->

            </div>

        </div>
        <!--//BLOCK ROW END-->

    </div>
</template>

<script>
export default {
    name: "BilligPlans",
    filters: {
        getPrice(value){
            let isNumber = _.isNumber(Number(value));
            let data = 0;
            if(value && isNumber){
                data =  value.split(".")[0];
            }
            return data;
        },
        formatSetting(value){
            return _.startCase(value);
        }
    },
    props: {
        plans:{
            required:true,
            type: Array
        },
        selectedPlan: {
            type: String | Number,
            default:0
        },
        selectedFrecuency: {
            required:true,
            type: Object
        }
    },
    methods: {
        changeSubscription(plan){
            this.$modal.show("basic-modal", {
                title:"Change Subcription!",
                message:`Did you want to Update your Subcription?`,
                buttons: [{
                    title: "Accept",
                    class: "btn-primary",
                    handler: () => {
                        this.$modal.hide("basic-modal");
                        this.$emit("changePlan", plan.stripe_id);
                    }
                }, {
                    title: "Cancel",
                    class: "btn-danger",
                    handler: () => {
                        this.$modal.hide("basic-modal");
                    }
                }]
            });
        }
    }
}
</script>
