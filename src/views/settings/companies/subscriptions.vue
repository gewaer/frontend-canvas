<template>
    <div class="subscriptions-plans">
        <div v-show="companyData.app.subscriptions_id" class="card-yellow d-flex">
            <i class="fa fa-exclamation-triangle m-r-10" aria-hidden="true"/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper ligula odio, id tristique lacus faucibus et. Fusce dictum est nec aliquet ultrices. Duis et pellentesque mauris.
        </div>
        <div id="generic_price_table">
            <section>
                <div class="container">

                    <!--BLOCK ROW START-->
                    <div v-if="plans.length > 0" class="row" >

                        <div
                            v-for="plan in plans"
                            :key="plan.stripe_id"
                            class="col-md-4">

                            <!--PRICE CONTENT START-->
                            <div :class="['generic_content', selectedPlan.stripe_id == plan.stripe_id ? 'active' : '', 'clearfix']">

                                <!--HEAD PRICE DETAIL START-->
                                <div class="generic_head_price clearfix">

                                    <!--HEAD CONTENT START-->
                                    <div class="generic_head_content clearfix">

                                        <!--HEAD START-->
                                        <div class="head_bg"/>
                                        <div class="head">
                                            <span>{{ plan.name }}}</span>
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
                                            v-html="$options.filters.formatSetting(planSetting.value)">
                                            {</li>
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
            </section>
            <p class="text-center">Our prices exclude VAT, GST, or any other taxes that may be applicable in your region.</p>
            <div v-show="!showBilligInfo" class="row update-billing-details">
                <button class="btn btn-block btn-primary" @click="displayBilligInfo">Show Billing Details</button>
            </div>
            <div v-if="showBilligInfo" class="payment-details">
                <billing-frecuencies :plan="selectedPlan" @selectfrequency="selectFrequency"/>
                <h5>Contact</h5>
                <div class="row contact">
                    <div class="col">
                        <div class="card">
                            <div class="card-block">
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="first-name">First name</label>
                                            <input
                                                v-validate="'required,alpha_spaces,min:2'"
                                                id="first-name"
                                                v-model="contact.contactFirstName"
                                                data-vv-as="first name"
                                                data-vv-name="first name"
                                                type="text"
                                                class="form-control"
                                                placeholder="First name">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="last-name">Last name</label>
                                            <input
                                                v-validate="'required,alpha_spaces,min:2'"
                                                id="last-name"
                                                v-model="contact.contactLastName"
                                                data-vv-as="last name"
                                                data-vv-name="last name"
                                                type="text"
                                                class="form-control"
                                                placeholder="Last name">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="company-name">Company name</label>
                                            <input
                                                v-validate="'required,alpha_spaces,min:2'"
                                                id="company-name"
                                                v-model="contact.contactCompany"
                                                data-vv-as="company name"
                                                data-vv-name="company name"
                                                type="text"
                                                class="form-control"
                                                placeholder="Company name">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="email-address">Email address</label>
                                            <input
                                                v-validate="'required|email'"
                                                id="email-address"
                                                v-model="contact.email"
                                                data-vv-as="email address"
                                                data-vv-name="email address"
                                                type="email"
                                                class="form-control"
                                                placeholder="Email">
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
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="address">Address</label>
                                            <input
                                                id="address"
                                                v-model="address.address"
                                                data-vv-as="address"
                                                data-vv-name="address"
                                                type="text"
                                                class="form-control"
                                                placeholder="Address">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="apt-suite">APT/SUITE</label>
                                            <input
                                                id="apt-suite"
                                                v-model="address.suite"
                                                data-vv-as="apt/suite"
                                                data-vv-name="apt/suite"
                                                type="text"
                                                class="form-control"
                                                placeholder="APT/SUITE">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="city">City</label>
                                            <input
                                                id="city"
                                                v-model="address.city"
                                                data-vv-as="city"
                                                data-vv-name="city"
                                                type="text"
                                                class="form-control"
                                                placeholder="City">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="country">Country</label>
                                            <input
                                                id="country"
                                                v-model="address.country"
                                                data-vv-as="country"
                                                data-vv-name="country"
                                                type="text"
                                                class="form-control"
                                                placeholder="Country">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="state-province">State/Province</label>
                                            <input
                                                id="state-province"
                                                v-model="address.province"
                                                data-vv-as="state/province"
                                                data-vv-name="state/province"
                                                type="text"
                                                class="form-control"
                                                placeholder="State/Province">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="zip-postal">Zip/Postal</label>
                                            <input
                                                id="zip-postal"
                                                v-model="address.zipCode"
                                                data-vv-as="zip/postal"
                                                data-vv-name="zip/postal"
                                                type="number"
                                                class="form-control"
                                                placeholder="Zip/Postal">
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
                        <div class="card card-borderless">
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
                                    <div class="row">
                                        <div class="col text-center m-b-20">
                                            <img src="/img/credit-cards-row.jpg">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="first-name-cc">First name</label>
                                                <input
                                                    v-validate="'required,alpha_spaces,min:2'"
                                                    id="first-name-cc"
                                                    data-vv-as="first name"
                                                    data-vv-name="first name"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="First name">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="last-name-cc">Last name</label>
                                                <input
                                                    v-validate="'required,alpha_spaces,min:2'"
                                                    id="last-name-cc"
                                                    data-vv-as="last name"
                                                    data-vv-name="last name"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Last name">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="credit-card-number">Credit Card number</label>
                                                <input
                                                    v-validate="'required,credit_card'"
                                                    id="credit-card-number"
                                                    data-vv-as="credit card"
                                                    data-vv-name="credit card"
                                                    type="number"
                                                    class="form-control"
                                                    placeholder="Credit Card number">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="cvv">CVV</label>
                                                <input
                                                    v-validate="'required,numeric,length:3'"
                                                    id="cvv"
                                                    data-vv-as="cvv"
                                                    data-vv-name="cvv"
                                                    type="number"
                                                    class="form-control"
                                                    placeholder="CVV">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="card-expiration-month">Card epiration month</label>
                                                <input
                                                    v-validate="'requeried,numeric,min_value:01,max_value:12'"
                                                    id="card-expiration-month"
                                                    data-vv-as="card expiration month"
                                                    data-vv-name="card expiration month"
                                                    type="number"
                                                    class="form-control"
                                                    placeholder="Card expiration month">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="card-expiration-year">Card expiration year</label>
                                                <input
                                                    v-validate="'requeried,numeric,min_value:01,max_value:99'"
                                                    id="card-expiration-year"
                                                    data-vv-as="card expiration year"
                                                    data-vv-name="card expiration year"
                                                    type="number"
                                                    class="form-control"
                                                    placeholder="Card expiration year">
                                            </div>
                                        </div>
                                    </div>
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
                    <button class="btn btn-block btn-primary" @click="createAppPlan()">Update Billing Details</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import billingFrecuencies from "./billing-frequency.vue"
export default {
    name: "Subscriptions",
    components:{billingFrecuencies},
    filters:{
        getPrice(value){
            return value.split(".")[0];
        },
        formatSetting(value){
            let setting= value.split("-");
            return `<span>${setting[0]}</span> ${setting[1]}.`;
        }
    },
    data() {
        return {
            plans:[],
            contact:{
                contactCompany:"",
                email:"",
                contactFirstName:"",
                contactLastName:""
            },
            planData :{
                "frecuency_type":"pricing",
                "stripe_id":"0"
            },
            address:{
                address:"",
                city:"",
                country:"",
                province:"",
                zipCode:"",
                suite:""
            },
            payment: {
                cardFirstName:"",
                cardLastName:"",
                cardNumber:"",
                cardCVC:"",
                cardExpMonth:"",
                cardExpYear:""
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
            return this.plans.find(subcription => subcription.stripe_id == this.planData["stripe_id"]);
        },
        ...mapState("User", {
            userData: state => state.data
        }),
        ...mapState("Company", {
            companyData: state => state.data
        })
    },
    beforeRouteLeave(to, from, next) {
        this.clearFormData();
        next();
    },
    created(){
        this.getPlans();
        this.getFormDefaultData();
    },
    methods: {
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
            if(_.has(this.companyData, "app")){
                this.planData["stripe_id"] = this.companyData.app["stripe_id"];
                let subcription = this.companyData.app["subscriptions_id"];
                this.showBilligInfo = !!(subcription == 0) ;
            }
            this.plans = response.data;
        },
        prepareData(formData) {
            const data = new FormData();
            Object.keys(formData).forEach((field) => {
                let apiField = field;
                data.append(apiField, formData[field]);
            });
            return data;
        },
        updateAppPlan(){
            //this.$modal.show("hello-world");
        },
        changePlan(planId){
            axios({
                url: `/apps-plans/${planId}`,
                method: "PUT"
            }).then(() => {
                this.planData["stripe_id"] =planId;
                this.$store.commit("Company/getData", null, { root: true });
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        createAppPlan(){
            const appPlan ={...this.planData,
                ... this.payment,
                ... this.address,
                ...this.contact};

            const data = this.prepareData(appPlan);
            axios({
                url: "/apps-plans",
                method: "POST",
                data
            }).then(() => {
                this.$store.commit("Company/getData", null, { root: true });
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        changeSubscription(plan){
            /// show modal confirmation here
            this.changePlan(plan["stripe_id"]);
        },
        displayBilligInfo(){
            this.showBilligInfo = !this.showBilligInfo ;
        },
        selectFrequency(frecuencyType, frecuency){
            this.selectedFrecuency=frecuency;
            this.planData["frecuency_type"] = frecuencyType;
        },
        clearFormData(){
            let formKeys=[
                "cardFirstName",
                "cardLastName",
                "cardNumber",
                "cardCVC",
                "cardExpMonth",
                "cardExpYear"
            ];
            formKeys.forEach(key=>  this.payment[key] = "");
        },
        getFormDefaultData(){
            let formKeys={
                email : "email",
                contactFirstName : "firstname",
                contactLastName : "lastname" };
            this.contact["contactCompany"]=   this.companyData.name;
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
    .payment-details {
        max-width: 1110px;
        margin: 0 auto;
        background-color: white;
        padding: 20px;

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

        .order-details {
            .card-block {
                padding: 20px;

                .selected-payment {
                    display: flex;
                    border-bottom: 1px dashed rgba(0,0,0,.125);
                    padding-bottom: 10px;
                }

                .final-price {
                    margin-left: auto;
                    font-size: 28px;
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
    }

    #generic_price_table {
        background-color: #f0eded;
    }

    /*PRICE COLOR CODE START*/
    #generic_price_table .generic_content{
        background-color: #fff;
    }

    #generic_price_table .generic_content .generic_head_price{
        background-color: #f6f6f6;
    }

    #generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg{
        border-color: #e4e4e4 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #e4e4e4;
    }

    #generic_price_table .generic_content .generic_head_price .generic_head_content .head span{
        color: #525252;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .price .sign{
        color: #414141;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .price .currency{
        color: #414141;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .price .cent{
        color: #414141;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .month{
        color: #414141;
    }

    #generic_price_table .generic_content .generic_feature_list ul li{
        color: #a7a7a7;
    }

    #generic_price_table .generic_content .generic_feature_list ul li span{
        color: #414141;
    }
    #generic_price_table .generic_content .generic_feature_list ul li:hover{
        background-color: #E4E4E4;
        border-left: 5px solid var(--base-color);
    }

    #generic_price_table .generic_content .generic_price_btn a{
        border: 1px solid var(--base-color);
        color: var(--base-color);
    }

    #generic_price_table .generic_content.active .generic_head_price .generic_head_content .head_bg,
    #generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head_bg{
        border-color: var(--base-color) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) var(--base-color);
        color: #fff;
    }

    #generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head span,
    #generic_price_table .generic_content.active .generic_head_price .generic_head_content .head span{
        color: #fff;
    }

    #generic_price_table .generic_content:hover .generic_price_btn a,
    #generic_price_table .generic_content.active .generic_price_btn a{
        background-color: var(--base-color);
        color: #fff;
    }
    #generic_price_table{
        // margin: 50px 0 50px 0;
        padding: 50px 0;
        font-family: 'Raleway', sans-serif;
    }
    .row .table{
        padding: 28px 0;
    }

    /*PRICE BODY CODE START*/

    #generic_price_table .generic_content{
        overflow: hidden;
        position: relative;
        text-align: center;
    }

    #generic_price_table .generic_content .generic_head_price {
        margin: 0 0 20px 0;
    }

    #generic_price_table .generic_content .generic_head_price .generic_head_content{
        margin: 0 0 50px 0;
    }

    #generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg{
        border-style: solid;
        border-width: 90px 1411px 23px 399px;
        position: absolute;
    }

    #generic_price_table .generic_content .generic_head_price .generic_head_content .head{
        padding-top: 40px;
        position: relative;
        z-index: 1;
    }

    #generic_price_table .generic_content .generic_head_price .generic_head_content .head span{
        font-family: "Raleway",sans-serif;
        font-size: 28px;
        font-weight: 400;
        letter-spacing: 2px;
        margin: 0;
        padding: 0;
        text-transform: uppercase;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag{
        padding: 0 0 20px;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .price{
        display: block;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .price .sign{
        display: inline-block;
        font-family: "Lato",sans-serif;
        font-size: 28px;
        font-weight: 400;
        vertical-align: middle;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .price .currency{
        font-family: "Lato",sans-serif;
        font-size: 60px;
        font-weight: 300;
        letter-spacing: -2px;
        line-height: 60px;
        padding: 0;
        vertical-align: middle;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .price .cent{
        display: inline-block;
        font-family: "Lato",sans-serif;
        font-size: 24px;
        font-weight: 400;
        vertical-align: bottom;
    }

    #generic_price_table .generic_content .generic_head_price .generic_price_tag .month{
        font-family: "Lato",sans-serif;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 3px;
        vertical-align: bottom;
    }

    #generic_price_table .generic_content .generic_feature_list ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }

    #generic_price_table .generic_content .generic_feature_list ul li{
        font-family: "Lato",sans-serif;
        font-size: 18px;
        padding: 15px 0;
        transition: all 0.3s ease-in-out 0s;
    }
    #generic_price_table .generic_content .generic_feature_list ul li:hover{
        transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        -ms-transition: all 0.3s ease-in-out 0s;
        -o-transition: all 0.3s ease-in-out 0s;
        -webkit-transition: all 0.3s ease-in-out 0s;

    }
    #generic_price_table .generic_content .generic_feature_list ul li .fa{
        padding: 0 10px;
    }
    #generic_price_table .generic_content .generic_price_btn{
        margin: 20px 0 32px;
    }

    #generic_price_table .generic_content .generic_price_btn a{
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

    #generic_price_table .generic_content,
    #generic_price_table .generic_content:hover,
    #generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg,
    #generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head_bg,
    #generic_price_table .generic_content .generic_head_price .generic_head_content .head h2,
    #generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head h2,
    #generic_price_table .generic_content .price,
    #generic_price_table .generic_content:hover .price,
    #generic_price_table .generic_content .generic_price_btn a,
    #generic_price_table .generic_content:hover .generic_price_btn a{
        transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        -ms-transition: all 0.3s ease-in-out 0s;
        -o-transition: all 0.3s ease-in-out 0s;
        -webkit-transition: all 0.3s ease-in-out 0s;
    }
    @media (max-width: 320px) {
    }

    @media (max-width: 767px) {
        #generic_price_table .generic_content{
            margin-bottom:75px;
        }
    }
    @media (min-width: 768px) and (max-width: 991px) {
        #generic_price_table .col-md-3{
            float:left;
            width:50%;
        }

        #generic_price_table .col-md-4{
            float:left;
            width:50%;
        }

        #generic_price_table .generic_content{
            margin-bottom:75px;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
    }
    @media (min-width: 1200px) {
    }
    #generic_price_table_home{
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

    #generic_price_table_home ul{
        margin: 0 auto;
        padding: 0;
        list-style: none;
        display: table;
    }
    #generic_price_table_home li{
        float: left;
    }
    #generic_price_table_home li + li{
        margin-left: 10px;
        padding-bottom: 10px;
    }
    #generic_price_table_home li a{
        display: block;
        width: 50px;
        height: 50px;
        font-size: 0px;
    }
    #generic_price_table_home .blue{
        background: #3498DB;
        transition: all 0.3s ease-in-out 0s;
    }
    #generic_price_table_home .emerald{
        background: var(--base-color);
        transition: all 0.3s ease-in-out 0s;
    }
    #generic_price_table_home .grey{
        background: #7F8C8D;
        transition: all 0.3s ease-in-out 0s;
    }
    #generic_price_table_home .midnight{
        background: #34495E;
        transition: all 0.3s ease-in-out 0s;
    }
    #generic_price_table_home .orange{
        background: #E67E22;
        transition: all 0.3s ease-in-out 0s;
    }
    #generic_price_table_home .purple{
        background: #9B59B6;
        transition: all 0.3s ease-in-out 0s;
    }
    #generic_price_table_home .red{
        background: #E74C3C;
        transition:all 0.3s ease-in-out 0s;
    }
    #generic_price_table_home .turquoise{
        background: #1ABC9C;
        transition: all 0.3s ease-in-out 0s;
    }

    #generic_price_table_home .blue:hover,
    #generic_price_table_home .emerald:hover,
    #generic_price_table_home .grey:hover,
    #generic_price_table_home .midnight:hover,
    #generic_price_table_home .orange:hover,
    #generic_price_table_home .purple:hover,
    #generic_price_table_home .red:hover,
    #generic_price_table_home .turquoise:hover{
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        transition: all 0.3s ease-in-out 0s;
    }
    #generic_price_table_home .divider{
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        padding: 20px;
    }
    #generic_price_table_home .divider span{
        width: 100%;
        display: table;
        height: 2px;
        background: #ddd;
        margin: 50px auto;
        line-height: 2px;
    }
    #generic_price_table_home .itemname{
        text-align: center;
        font-size: 50px ;
        padding: 50px 0 20px ;
        border-bottom: 1px solid #ddd;
        margin-bottom: 40px;
        text-decoration: none;
        font-weight: 300;
    }
    #generic_price_table_home .itemnametext{
        text-align: center;
        font-size: 20px;
        padding-top: 5px;
        text-transform: uppercase;
        display: inline-block;
    }
    #generic_price_table_home .footer{
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

