<template>
    <div class="select is-block" :class="{ 'is-danger': !!error }">
        <select class="is-fullwidth" :id="item.label | slugify" :name="item.label | slugify" :required="item.isRequired !== false" @change="updateValue" @blur="updateValue">
            <option v-if="item.placeholder" disabled="disabled" selected="selected" value="">{{ item.placeholder }}</option>
            <option v-for="(option, index) in item.options" :value="option.value || option.text || option" :selected="option.selected" :key="index">{{ option.text || option }}</option>
        </select>
    </div>
</template>

<script>
import fieldsMixin from '@/mixins/fields'

export default {
  name: 'Select',
  mixins: [ fieldsMixin ],
  mounted () {
    const optionSelected = this.item.options && this.item.options.find(x => typeof x === 'object' && x.selected)
    this.$parent.value = optionSelected
      ? optionSelected.value || optionSelected.text
      : undefined
  }
}
</script>

<style>
.is-fullwidth {
    width: 100%;
}
</style>
