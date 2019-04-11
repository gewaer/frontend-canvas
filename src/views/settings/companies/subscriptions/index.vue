<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="subscriptions-plans">
            <div v-if="subscriptionHasEnded" class="card-yellow d-flex">
                <i class="fa fa-exclamation-triangle m-r-10" aria-hidden="true"/>
                Your subscription has ended. Please purchase a new subscription plan.
            </div>
            <div class="generic_price_table">
                <section v-if="plans.length" class="container">
                    <plans
                        :plans="plans"
                        :selected-plan="planData.stripe_plan"
                        :selected-frecuency="selectedFrecuency"
                        :show-modal="!showBilligInfo"
                        @changesubscription="handleSubscription"
                    />
                </section>
                <p class="text-center mt-2 mb-4">Our prices exclude VAT, GST, or any other taxes that may be applicable in your region.</p>
                <div v-if="plans.length" class="container">
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-block btn-primary" @click="displayBilligInfo">{{ showBilligInfo ? 'Hide' : 'Show' }} Billing Details</button>
                        </div>
                    </div>
                    <div v-if="showBilligInfo" class="row mt-4">
                        <div class="col">
                            <div class="payment-details m-t-20">
                                <plan-frecuencies
                                    :plan="selectedPlan"
                                    :selected-frecuency="selectedFrecuency.type"
                                    show-redeem
                                    @selectbillingtype="selectFrequency"/>
                                <order-details
                                    :plan="selectedPlan"
                                    :frecuency="selectedFrecuency"
                                />
                                <h5>Contact</h5>
                                <div class="row contact">
                                    <div class="col">
                                        <div class="card">
                                            <div class="card-block">
                                                <div class="row">
                                                    <div class="col-12 col-md">
                                                        <div class="form-group">
                                                            <label for="first-name">First name</label>
                                                            <input
                                                                v-validate="'required:true|alpha_spaces|min:2'"
                                                                id="first-name"
                                                                v-model="contact.contact_first_name"
                                                                data-vv-as="contact first name"
                                                                data-vv-name="contact first name"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="First name">
                                                            <span class="text-danger">{{ errors.first("contact first name") }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md">
                                                        <div class="form-group">
                                                            <label for="last-name">Last name</label>
                                                            <input
                                                                v-validate="'required:true|alpha_spaces|min:2'"
                                                                id="last-name"
                                                                v-model="contact.contact_last_name"
                                                                data-vv-as="contact last name"
                                                                data-vv-name="contact last name"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Last name">
                                                            <span class="text-danger">{{ errors.first("contact last name") }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-group">
                                                            <label for="company-name">Company name</label>
                                                            <input
                                                                v-validate="'required:true'"
                                                                id="company-name"
                                                                v-model="contact.contact_company"
                                                                data-vv-as="company name"
                                                                data-vv-name="company name"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Company name">
                                                            <span class="text-danger">{{ errors.first("company name") }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-group">
                                                            <label for="email-address">Email address</label>
                                                            <input
                                                                v-validate="'required:true|email'"
                                                                id="email-address"
                                                                v-model="contact.email"
                                                                data-vv-as="contact email address"
                                                                data-vv-name="contact email address"
                                                                type="email"
                                                                class="form-control"
                                                                placeholder="Email">
                                                            <span class="text-danger">{{ errors.first("contact email address") }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h5>Address</h5>
                                <div class="row address">
                                    <div class="col">
                                        <div class="card">
                                            <div class="card-block">
                                                <div class="row">
                                                    <div class="col-12 col-md">
                                                        <div class="form-group">
                                                            <label for="address">Address</label>
                                                            <input
                                                                v-validate="'required:true||min:2'"
                                                                id="address"
                                                                v-model="address.address"
                                                                data-vv-as="address"
                                                                data-vv-name="address"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Address">
                                                            <span class="text-danger">{{ errors.first("address") }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md">
                                                        <div class="form-group">
                                                            <label for="apt-suite">APT/SUITE</label>
                                                            <input
                                                                v-validate="'required:true|min:1'"
                                                                id="apt-suite"
                                                                v-model="address.suite"
                                                                data-vv-as="apt/suite"
                                                                data-vv-name="apt/suite"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="APT/SUITE">
                                                            <span class="text-danger">{{ errors.first("apt/suite") }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 col-md">
                                                        <div class="form-group">
                                                            <label for="city">City</label>
                                                            <input
                                                                v-validate="'required:true|min:3'"
                                                                id="city"
                                                                v-model="address.city"
                                                                data-vv-as="city"
                                                                data-vv-name="city"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="City">
                                                            <span class="text-danger">{{ errors.first("city") }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md">
                                                        <div class="form-group">
                                                            <label for="country">Country</label>
                                                            <input
                                                                v-validate="'required:true|min:3'"
                                                                id="country"
                                                                v-model="address.country"
                                                                data-vv-as="country"
                                                                data-vv-name="country"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Country">
                                                            <span class="text-danger">{{ errors.first("country") }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 col-md">
                                                        <div class="form-group">
                                                            <label for="state-province">State/Province</label>
                                                            <input
                                                                v-validate="'required:true|min:2'"
                                                                id="state-province"
                                                                v-model="address.state"
                                                                data-vv-as="state/province"
                                                                data-vv-name="state/province"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="State/Province">
                                                            <span class="text-danger">{{ errors.first("state/province") }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h5>Payment</h5>
                                <div class="row payment">
                                    <div class="col">
                                        <div class="card">
                                            <ul class="nav nav-tabs nav-tabs-simple" role="tablist" data-init-reponsive-tabs="dropdownfx">
                                                <li class="nav-item">
                                                    <a
                                                        class="active"
                                                        data-toggle="tab"
                                                        role="tab"
                                                        data-target="#credit-card"
                                                        href="#">CREDIT CARD</a>
                                                </li>
                                                <!-- <li class="nav-item">
                                                    <a
                                                        href="#"
                                                        data-toggle="tab"
                                                        role="tab"
                                                        data-target="#paypal">PAYPAL</a>
                                                </li> -->
                                            </ul>
                                            <div class="tab-content">
                                                <div id="credit-card" class="tab-pane active">
                                                    <credit-card ref="creditCard" @striped-card="setCardToken"/>
                                                </div>
                                                <!-- <div id="paypal" class="tab-pane ">
                                                    <div class="row">
                                                        <div class="card">
                                                            <div class="card-block">
                                                                <span>Start paying with PayPal</span>
                                                                <img src="/img/checkout-paypal.png" width="170">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row update-billing-details">
                                    <button :disabled="!planData.card_token" class="btn btn-block btn-primary" @click="verifyPlanPayment()">Update Billing Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { vueRouterMixins, vuexMixins } from "@/utils/mixins";

export default {
    name: "Subscriptions",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-apps-tabs" */ "@v/settings/companies/tabs"),
        CreditCard: () => import(/* webpackChunkName: "settings-companies-subscriptions-credit-card" */ "@c/credit-card"),
        OrderDetails: () => import(/* webpackChunkName: "settings-companies-subscriptions-order-details" */ "@v/settings/companies/subscriptions/order-details.vue"),
        Plans: () => import(/* webpackChunkName: "plans-component" */ "@c/plans"),
        PlanFrecuencies: () => import(/* webpackChunkName: "plans-frecuencies-component" */ "@c/plans/frecuencies")
    },
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
    mixins: [
        vueRouterMixins,
        vuexMixins
    ],
    data() {
        return {
            plans:[],
            contact:{
                contact_company:"",
                email:"",
                contact_first_name:"",
                contact_last_name:""
            },
            planData :{
                payment_style:"monthly",
                stripe_plan: "",
                stripe_id: "",
                card_token: ""
            },
            address:{
                address:"",
                city:"",
                country:"",
                state:"",
                suite:""
            },
            selectedFrecuency: {
                type:"pricing",
                title: "Monthly",
                price: "10",
                frecuency: "month"
            },
            showBilligInfo:false
        };
    },
    computed:{
        selectedPlan(){
            return this.plans.find(subcription => subcription.stripe_plan == this.planData["stripe_plan"]);
        },
        ...mapState({
            userData: state => state.User.data,
            defaultCompany: state => state.Company.data
        }),
        ...mapGetters( {
            isTrialSuscription: "Company/isTrialSubscription",
            subscriptionDays: "Company/subscriptionDaysLeft",
            subscriptionHasEnded: "Company/subscriptionHasEnded"
        })
    },
    watch:{
        showBilligInfo(current, oldVal){
            if(oldVal == true){
                this.planData.stripe_plan = this.defaultCompany.subscription.stripe_plan;
                this.planData.stripe_id = this.defaultCompany.subscription.stripe_id;
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        if( this.showBilligInfo){
            this.$refs.creditCard.clear();
        }
        next();
    },
    created(){
        this.initialize();
        if (this.subscriptionHasEnded) {
            this.showBilligInfo = true;
        }
    },
    methods: {
        initialize() {
            this.getPlans();
            this.getFormDefaultData();
        },
        getPlans(){
            axios({
                url: "/apps-plans?relationships=settings"
            }).then((response) => {
                this.handleAppPlans(response);
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        handleAppPlans(response){
            if(_.has(this.defaultCompany, "subscription")){
                this.planData.stripe_plan = this.defaultCompany.subscription.stripe_plan;
                this.planData.stripe_id = this.defaultCompany.subscription.stripe_id;
                // TODO get the payment frecuency
            }
            this.plans = response.data;
        },
        prepareData(jsonData) {
            let data = new FormData();
            Object.keys(jsonData).forEach((field) => {
                data.append(field, jsonData[field]);
            });
            return data;
        },
        setCardToken(stripeTokenId = null) {
            this.planData.card_token = stripeTokenId;
        },
        updateDefaultCompany(){
            const defaultCompany = this.$store.dispatch("Company/getData", null, { root: true });
            defaultCompany.then(res => this.$store.dispatch("Company/setData", res.data[0]));
        },
        handleSubscription(plan){
            if(this.subscriptionHasEnded || this.showBilligInfo){
                this.planData["stripe_plan"] = plan.stripe_plan;
                this.planData.stripe_id = plan.stripe_id;
            } else {
                this.changePlan(plan, true);
            }
        },
        changePlan(plan, showNotify = true){
            return new Promise((resolve) => {
                axios({
                    url: `/apps-plans/${plan.stripe_plan}`,
                    method: "PUT"
                }).then(() => {
                    this.planData.stripe_plan = plan.stripe_plan;
                    this.planData.stripe_id = plan.stripe_id;
                    if(showNotify){
                        this.updateDefaultCompany();
                        this.showSuccessNotify("Subscriptión updated successfully.");
                    }
                }).catch((error) => this.showErrorNotify(error))
                    .finally(() => resolve())
            });
        },

        verifyPlanPayment(){
            if(this.errors.items.length){
                let verificationMessage = this.errors.items[0].msg;
                let verificationTitle = `Please verify the ${this.errors.items[0].field}`;
                this.$notify({
                    title: verificationTitle,
                    text: verificationMessage,
                    type: "warn"
                });
            } else {
                this.confirmPaymentUpdate();
            }
        },
        confirmPaymentUpdate(){
            this.$validator.validate().then(result => {
                if (result) {
                    this.$modal.show("basic-modal", {
                        title:"Change Subcription!",
                        message:`Did you want to Update your Payment Methods ?`,
                        buttons: [{
                            title: "Accept",
                            class: "btn-primary",
                            handler: () => {
                                this.$modal.hide("basic-modal");
                                this.updatePlanPayment();
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
            });
        },
        async updatePlanPayment(){
            await this.changePlan(this.planData, false);

            const appPlan = {
                ...this.planData,
                ...this.address,
                ...this.contact};

            const data = this.prepareData(appPlan);

            axios({
                url: "/apps-plans",
                method: "PUT",
                data
            }).then(() => {
                this. updateDefaultCompany();
                this.$refs.creditCard.clear();
                this.showSuccessNotify("Payment Informatión updated successfully.");
            }).catch((error) => this.showErrorNotify(error))
        },
        showSuccessNotify(text = ""){
            this.$notify({
                title: "Success",
                text,
                type: "success"
            });
        },
        showErrorNotify(error){
            this.$notify({
                title: "Error",
                text: error.response.data.errors.message,
                type: "error"
            });
        },
        displayBilligInfo(){
            this.showBilligInfo = !this.showBilligInfo ;
        },
        selectFrequency(frecuencyType, frecuency){
            this.selectedFrecuency = frecuency;
            this.planData.payment_style = frecuencyType.toLowerCase();
        },
        getFormDefaultData(){
            const formKeys = {
                email : "email",
                contact_first_name : "firstname",
                contact_last_name : "lastname" };
            this.contact.contact_company =  this.defaultCompany.name;
            Object.keys(formKeys).forEach(key=> this.contact[key] = this.userData[formKeys[key]]);
        }
    }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700italic,700,900italic,900);
@import url(https://fonts.googleapis.com/css?family=Raleway:400,100,200,300,500,600,700,800,900);
@import url(https://fonts.googleapis.com/css?family=Raleway:400,100,200,300,500,600,700,800,900);
.subscriptions-plans {

    @media(max-width: 768px) {
        .container {
            padding-left: 5px;
            padding-right: 5px;
        }
    }

    .payment-details {
        // max-width: 1110px;
        margin: 0 auto;
        background-color: white;
        padding: 20px;

        @media(max-width: 768px) {
            padding: 0.5rem;
        }

        .payment-frecuency {
            .card-block {
                display: flex;
                align-items: center;
                padding: 15px;

                label {
                    display: flex;
                    flex-direction: column;
                    font-weight: bold;
                    margin-bottom: 0;
                    margin-left: 5px;
                }
            }
        }



        .contact, .address {
            .card-block {
                padding: 15px;
            }
        }

        .payment {
            #paypal {
                .card-block {
                    padding: 15px;
                    display: flex;
                    align-items: center;

                    img {
                        cursor: pointer;
                        margin-left: auto;
                    }
                }
            }
        }
    }

    .card-yellow {
        background: #fffcdc;
        border: 1px solid rgba(250, 195, 67, 0.64);
        box-shadow: 0px 1px 2px 0px rgba(38,41,44,0.08);
        padding: 15px;
        display: flex;
        align-items: center;
        margin-top: 15px;

        @media(max-width: 768px) {
            flex-direction: column;

            .final-price {
                margin-top: 20px;
                margin-left: initial !important;
            }
        }
    }

    .generic_price_table {
        background-color: #f0eded;
    }

    /*PRICE COLOR CODE START*/
    .generic_price_table .generic_content{
        background-color: #fff;
    }

    .generic_price_table .generic_content .generic_head_price{
        background-color: #f6f6f6;
    }

    .generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg{
        border-color: #e4e4e4 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #e4e4e4;
    }

    .generic_price_table .generic_content .generic_head_price .generic_head_content .head span{
        color: #525252;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .price .sign{
        color: #414141;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .price .currency{
        color: #414141;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .price .cent{
        color: #414141;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .month{
        color: #414141;
    }

    .generic_price_table .generic_content .generic_feature_list ul li{
        color: #a7a7a7;
    }

    .generic_price_table .generic_content .generic_feature_list ul li span{
        color: #414141;
    }
    .generic_price_table .generic_content .generic_feature_list ul li:hover{
        background-color: #E4E4E4;
        border-left: 5px solid var(--base-color);
    }

    .generic_price_table .generic_content .generic_price_btn a{
        border: 1px solid var(--base-color);
        color: var(--base-color);
        cursor: pointer;
    }

    .generic_price_table .generic_content.active .generic_head_price .generic_head_content .head_bg,
    .generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head_bg{
        border-color: var(--base-color) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) var(--base-color);
        color: #fff;
    }

    .generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head span,
    .generic_price_table .generic_content.active .generic_head_price .generic_head_content .head span{
        color: #fff;
    }

    .generic_price_table .generic_content:hover .generic_price_btn a,
    .generic_price_table .generic_content.active .generic_price_btn a{
        background-color: var(--base-color);
        color: #fff;
    }
    .generic_price_table{
        // margin: 50px 0 50px 0;
        padding: 50px 0;
        font-family: 'Raleway', sans-serif;
    }
    .row .table{
        padding: 28px 0;
    }

    /*PRICE BODY CODE START*/

    .generic_price_table .generic_content{
        overflow: hidden;
        position: relative;
        text-align: center;
    }

    .generic_price_table .generic_content .generic_head_price {
        margin: 0 0 20px 0;
    }

    .generic_price_table .generic_content .generic_head_price .generic_head_content{
        margin: 0 0 50px 0;
    }

    .generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg{
        border-style: solid;
        border-width: 90px 1411px 23px 399px;
        position: absolute;
    }

    .generic_price_table .generic_content .generic_head_price .generic_head_content .head{
        padding-top: 40px;
        position: relative;
        z-index: 1;
    }

    .generic_price_table .generic_content .generic_head_price .generic_head_content .head span{
        font-family: "Raleway",sans-serif;
        font-size: 28px;
        font-weight: 400;
        letter-spacing: 2px;
        margin: 0;
        padding: 0;
        text-transform: uppercase;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag{
        padding: 0 0 20px;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .price{
        display: block;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .price .sign{
        display: inline-block;
        font-family: "Lato",sans-serif;
        font-size: 28px;
        font-weight: 400;
        vertical-align: middle;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .price .currency{
        font-family: "Lato",sans-serif;
        font-size: 60px;
        font-weight: 300;
        letter-spacing: -2px;
        line-height: 60px;
        padding: 0;
        vertical-align: middle;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .price .cent{
        display: inline-block;
        font-family: "Lato",sans-serif;
        font-size: 24px;
        font-weight: 400;
        vertical-align: bottom;
    }

    .generic_price_table .generic_content .generic_head_price .generic_price_tag .month{
        font-family: "Lato",sans-serif;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 3px;
        vertical-align: bottom;
    }

    .generic_price_table .generic_content .generic_feature_list ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .generic_price_table .generic_content .generic_feature_list ul li{
        font-family: "Lato",sans-serif;
        font-size: 18px;
        padding: 15px 0;
        transition: all 0.3s ease-in-out 0s;
    }
    .generic_price_table .generic_content .generic_feature_list ul li:hover{
        transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        -ms-transition: all 0.3s ease-in-out 0s;
        -o-transition: all 0.3s ease-in-out 0s;
        -webkit-transition: all 0.3s ease-in-out 0s;

    }
    .generic_price_table .generic_content .generic_feature_list ul li .fa{
        padding: 0 10px;
    }
    .generic_price_table .generic_content .generic_price_btn{
        margin: 20px 0 32px;
    }

    .generic_price_table .generic_content .generic_price_btn a{
        border-radius: 50px;
        -moz-border-radius: 50px;
        -ms-border-radius: 50px;
        -o-border-radius: 50px;
        -webkit-border-radius: 50px;
        display: inline-block;
        font-family: "Lato",sans-serif;
        font-size: 18px;
        outline: medium none;
        padding: 12px 30px;
        text-decoration: none;
        text-transform: uppercase;
    }

    .generic_price_table .generic_content,
    .generic_price_table .generic_content:hover,
    .generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg,
    .generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head_bg,
    .generic_price_table .generic_content .generic_head_price .generic_head_content .head h2,
    .generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head h2,
    .generic_price_table .generic_content .price,
    .generic_price_table .generic_content:hover .price,
    .generic_price_table .generic_content .generic_price_btn a,
    .generic_price_table .generic_content:hover .generic_price_btn a{
        transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        -ms-transition: all 0.3s ease-in-out 0s;
        -o-transition: all 0.3s ease-in-out 0s;
        -webkit-transition: all 0.3s ease-in-out 0s;
    }
    @media (max-width: 320px) {
    }

    @media (max-width: 767px) {
        .generic_price_table .generic_content{
            margin-bottom:25px;
        }
    }
    @media (min-width: 768px) and (max-width: 991px) {
        .generic_price_table .col-md-3{
            float:left;
            width:50%;
        }

        .generic_price_table .col-md-4{
            float:left;
            width:50%;
        }

        .generic_price_table .generic_content{
            margin-bottom:25px;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
    }
    @media (min-width: 1200px) {
    }
    .generic_price_table_home{
        font-family: 'Raleway', sans-serif;
    }

    .text-center h1,
    .text-center h1 a{
        color: #7885CB;
        font-size: 30px;
        font-weight: 300;
        text-decoration: none;
    }
    .demo-pic{
        margin: 0 auto;
    }
    .demo-pic:hover{
        opacity: 0.7;
    }

    .generic_price_table_home ul{
        margin: 0 auto;
        padding: 0;
        list-style: none;
        display: table;
    }
    .generic_price_table_home li{
        float: left;
    }
    .generic_price_table_home li + li{
        margin-left: 10px;
        padding-bottom: 10px;
    }
    .generic_price_table_home li a{
        display: block;
        width: 50px;
        height: 50px;
        font-size: 0px;
    }
    .generic_price_table_home .blue{
        background: #3498DB;
        transition: all 0.3s ease-in-out 0s;
    }
    .generic_price_table_home .emerald{
        background: var(--base-color);
        transition: all 0.3s ease-in-out 0s;
    }
    .generic_price_table_home .grey{
        background: #7F8C8D;
        transition: all 0.3s ease-in-out 0s;
    }
    .generic_price_table_home .midnight{
        background: #34495E;
        transition: all 0.3s ease-in-out 0s;
    }
    .generic_price_table_home .orange{
        background: #E67E22;
        transition: all 0.3s ease-in-out 0s;
    }
    .generic_price_table_home .purple{
        background: #9B59B6;
        transition: all 0.3s ease-in-out 0s;
    }
    .generic_price_table_home .red{
        background: #E74C3C;
        transition:all 0.3s ease-in-out 0s;
    }
    .generic_price_table_home .turquoise{
        background: #1ABC9C;
        transition: all 0.3s ease-in-out 0s;
    }

    .generic_price_table_home .blue:hover,
    .generic_price_table_home .emerald:hover,
    .generic_price_table_home .grey:hover,
    .generic_price_table_home .midnight:hover,
    .generic_price_table_home .orange:hover,
    .generic_price_table_home .purple:hover,
    .generic_price_table_home .red:hover,
    .generic_price_table_home .turquoise:hover{
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        transition: all 0.3s ease-in-out 0s;
    }
    .generic_price_table_home .divider{
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        padding: 20px;
    }
    .generic_price_table_home .divider span{
        width: 100%;
        display: table;
        height: 2px;
        background: #ddd;
        margin: 50px auto;
        line-height: 2px;
    }
    .generic_price_table_home .itemname{
        text-align: center;
        font-size: 50px ;
        padding: 50px 0 20px ;
        border-bottom: 1px solid #ddd;
        margin-bottom: 40px;
        text-decoration: none;
        font-weight: 300;
    }
    .generic_price_table_home .itemnametext{
        text-align: center;
        font-size: 20px;
        padding-top: 5px;
        text-transform: uppercase;
        display: inline-block;
    }
    .generic_price_table_home .footer{
        padding:40px 0;
    }

    .price-heading{
        text-align: center;
    }
    .price-heading h1{
        color: #666;
        margin: 0;
        padding: 0 0 50px 0;
    }
    .demo-button {
        background-color: #333333;
        color: #ffffff;
        display: table;
        font-size: 20px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        margin-bottom: 50px;
        outline-color: -moz-use-text-color;
        outline-style: none;
        outline-width: medium ;
        padding: 10px;
        text-align: center;
        text-transform: uppercase;
    }
    .bottom_btn{
        background-color: #333333;
        color: #ffffff;
        display: table;
        font-size: 28px;
        margin: 60px auto 20px;
        padding: 10px 25px;
        text-align: center;
        text-transform: uppercase;
    }
    .demo-button:hover{
        background-color: #666;
        color: #FFF;
        text-decoration:none;

    }
    .bottom_btn:hover{
        background-color: #666;
        color: #FFF;
        text-decoration:none;
    }

}

</style>
