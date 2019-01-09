<template>
    <modal
        :adaptive="true"
        :scrollable="true"
        :click-to-close="false"
        :delay="1000"
        name="after-signup-wizard"
        height="auto"
        width="900"
    >
        <form-wizard class="wizard-component" shape="tab" color="var(--base-color)">
            <h2 slot="title">This will replace a title</h2>
            <tab-content title="Step 1" icon="fa fa-cog">
                <h1>Step 1</h1>
            </tab-content>
            <tab-content title="Step 2" icon="fa fa-cog">
                <h1>Step 2</h1>
            </tab-content>
            <tab-content title="Step 3" icon="fa fa-cog">
                <h1>Step 3</h1>
            </tab-content>
            <template slot="footer" slot-scope="props">
                <div class="wizard-footer-left">
                    <wizard-button
                        v-if="props.activeTabIndex && !props.isLastStep"
                        :style="props.fillButtonStyle"
                        @click.native="props.prevTab()"
                    >
                        Previous
                    </wizard-button>
                </div>
                <div class="wizard-footer-right">
                    <wizard-button
                        v-if="!props.isLastStep"
                        :style="props.fillButtonStyle"
                        class="wizard-footer-right"
                        @click.native="props.nextTab()"
                    >
                        Next
                    </wizard-button>
                    <wizard-button
                        v-else
                        :style="props.fillButtonStyle"
                        class="wizard-footer-right finish-button"
                        @click.native="$modal.hide('after-signup-wizard')"
                    >
                        {{ props.isLastStep ? 'Done' : 'Next' }}
                    </wizard-button>
                </div>
            </template>
        </form-wizard>
    </modal>
</template>

<script>
export default {
    name: "AfterSignupWizard",
    components: {
        FormWizard: () => import(/* webpackChunkName: "form-wizard-form" */ "vue-form-wizard").then(({ FormWizard }) => FormWizard),
        TabContent: () => import(/* webpackChunkName: "form-wizard-tab-content" */ "vue-form-wizard").then(({ TabContent }) => TabContent),
        WizardButton: () => import(/* webpackChunkName: "form-wizard-wizard-button" */ "vue-form-wizard").then(({ WizardButton }) => WizardButton)
    }
}
</script>

<style lang="scss">

</style>
