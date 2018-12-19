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
                    <div class="row">

                        <div
                            v-for="plan in plans"
                            :key="plan.stripe_id"
                            class="col-md-4">

                            <!--PRICE CONTENT START-->
                            <div :class="plan.isSelected | selectedClass">

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
                                    <a @click.prevent.stop="setSubcrition(plan)" >Choose {{ plan.name }}</a>
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
            <div v-if="plans.length > 0" class="payment-details">
                <h5>Choose your billing frequency</h5>
                <div class="row payment-frecuency">
                    <div
                        v-for="billing in billingFrecuency"
                        :key="billing.type"
                        class="col-3">
                        <div class="card">
                            <div class="card-block">
                                <input
                                    :id="billing.type"
                                    :value="billing.type"
                                    v-model="data.form.frecuency_type"
                                    type="radio"
                                    name="payment-frecuency"
                                >
                                <label :for="billing.type">
                                    Pay {{ billing.title }}
                                    <small>${{ billing.price }} per seat per {{ billing.frecuency }}</small>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <h5>Order Details</h5>
                <div class="row order-details">
                    <div class="col">
                        <div class="card">
                            <div class="card-block">
                                <div class="selected-payment">
                                    <div class="d-flex flex-column">
                                        <strong>1 seat</strong>
                                        <small>Gold Plan {{ selectedFrecuency.title }}</small>
                                    </div>
                                    <div class="d-flex flex-column ml-auto text-right">
                                        <strong>${{ selectedFrecuency.price }}</strong>
                                        <small>every {{ selectedFrecuency.frecuency }}</small>
                                    </div>
                                </div>
                                <div class="d-flex m-t-10">
                                    <div>VAT</div>
                                    <strong class="ml-auto">$0</strong>
                                </div>
                                <div class="card-yellow">
                                    <div class="d-flex flex-column">
                                        <strong>Order Total</strong>
                                        <small>Gold Plan for 1 seat {{ selectedFrecuency.title }} payment in USD</small>
                                    </div>
                                    <div class="final-price">${{ selectedFrecuency.price }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                                id="first-name"
                                                type="text"
                                                class="form-control"
                                                placeholder="First name">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="last-name">Last name</label>
                                            <input
                                                id="last-name"
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
                                                id="company-name"
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
                                                id="email-address"
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
                                                type="text"
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
                                                    id="first-name-cc"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="First name">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="last-name-cc">Last name</label>
                                                <input
                                                    id="last-name-cc"
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
                                                    id="credit-card-number"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Credit Card number">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="cvv">CVV</label>
                                                <input
                                                    id="cvv"
                                                    type="text"
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
                                                    id="card-expiration-month"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Card expiration month">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="card-expiration-year">Card expiration year</label>
                                                <input
                                                    id="card-expiration-year"
                                                    type="text"
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
                    <button class="btn btn-block btn-primary">Update Billing Details</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "Subscriptions",
    filters:{
        getPrice(value){
            return value.split(".")[0];
        },
        formatSetting(value){
            let setting= value.split("-");
            return `<span>${setting[0]}</span> ${setting[1]}.`;
        },
        selectedClass(value = false){
            return value ?"generic_content active clearfix" : "generic_content clearfix";
        }
    },
    data() {
        return {
            data: {
                form:{
                    "frecuency_type":"pricing",
                    "stripe_id":"0"
                }
            },
            selectedCompany:{},
            plans:[],
            formOptions: {
                data: {
                    company: {
                        map: "default_company",
                        validations: "required"
                    },
                    email: {
                        validations: "required|email"
                    },
                    contactFirstName: {
                        map:"",
                        validations: "alpha"
                    },
                    contactLastName: {
                        map:"",
                        validations: "alpha"
                    },
                    address: {
                        validations: "alpha_spaces_field"
                    },
                    city: {
                        validations: "alpha_spaces_field"
                    },
                    country: {
                        validations: "alpha_spaces_field"
                    },
                    province: {
                        validations: "alpha_dash_field"
                    },
                    zipCode: {
                        validations: "number"
                    },
                    suite:{
                        validations: "alpha_dash_field"
                    },
                    cardFirstName:{
                        validations: "alpha"
                    },
                    cardLastName:{
                        validations: "alpha"
                    },
                    cardNumber:{
                        validations: "number"
                    },
                    cardCVC:{
                        validations: "number"
                    },
                    cardExpMonth:{
                        validations: "number"
                    },
                    cardExpYear:{
                        validations: "number"
                    }
                },
                endpoint: "apps-plans",
                submitLabel: "Sign Up",
                title: "Update Subscription"
            }
        };
    },
    computed:{
        selectedPlan(){
            return this.plans.filter(subcription => this.data.form["stripe_id"]== subcription.stripe_id)[0];
        },
        selectedFrecuency(){
            return this.billingFrecuency.filter(item => item.type== this.data.form.frecuency_type)[0];
        },
        billingFrecuency(){
            return[{
                type:"pricing",
                name:"payment-frecuency",
                title:"Monthly",
                price:this.selectedPlan.pricing || "10",
                frecuency:"month"
            }, {
                type:"pricing_anual",
                name:"payment-frecuency",
                title:"Annually",
                price:this.selectedPlan.pricing_anual || "100",
                frecuency:"year"
            }]
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
    },
    methods: {
        getPlans(){
            let plansUrl=`apps-plans?relationships=settings`;
            // let plansUrl=`companies?relationships=app`;
            axios({
                url: `/${plansUrl}`,
                method: "get"
            }).then((response) => {
                this.formatPlans(response);
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },

        formatPlans(response){
            let plans = [];

            let  subcriptions = _.cloneDeep(response.data);
            const selectetSubcriptionId  = _.has(this.companyData, "app.stripe_id") ? this.companyData.app.stripe_id : "monthly-10-2";

            this.data.form["stripe_id"] = selectetSubcriptionId;

            let selectedSubcription = _.cloneDeep(subcriptions.filter(plan => plan.stripe_id == selectetSubcriptionId)[0]);
            selectedSubcription.isSelected = true;
            selectedSubcription.selectedClass = "selected_subcription"

            plans = _.cloneDeep(subcriptions.filter(plan => plan.stripe_id != selectetSubcriptionId));

            plans.map((subcription)=>{
                subcription.isSelected = false
                subcription.selectedClass = "subcription"
                return subcription;
            });

            let centerOfArray = Math.floor(( plans.length /2));
            plans.splice(centerOfArray, 0, selectedSubcription);

            this.plans = _.cloneDeep(plans);
        },
        setSubcrition(plan = false){
            if(!plan){
                return ;
            }
            let  subcriptions = _.cloneDeep( this.plans);
            this.data.form["stripe_id"] = plan.stripe_id;
            subcriptions.map((subcription) =>{
                let isSelected = false;
                if(plan.stripe_id == subcription.stripe_id ){
                    isSelected = true;
                }
                subcription.isSelected=isSelected
                return subcription
            } );

            this.plans = subcriptions;
        },
        clearFormData(){}
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

