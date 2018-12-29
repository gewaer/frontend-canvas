<template>
    <div>
        <label class="radio" v-for="(x, index) in item.items" :key="index" :for="x.text || x | slugify">
            <input :id="x.text || x | slugify" :name="item.label | slugify" :value="x.value || x.text || x" v-model="value" :type="item.type" :required="item.isRequired !== false" :class="{ 'is-danger': !!error }" @input="updateValue" @change="updateValue" @blur="updateValue"/>
            <span class="checkboxLabel">{{ x.text || x }}</span>
        </label>
    </div>
</template>

<script>
import fieldsMixin from '@/mixins/fields'

export default {
  name: 'Radio',
  mixins: [ fieldsMixin ],
  data: () => ({
    value: []
  }),
  methods: {
    updateValue () {
      this.$emit('input', this.value)
    }
  },
  mounted () {
    try {
      const { value, text } = this.item.items.find(({ checked }) => checked)

      this.value = value || text
      this.$parent.value = value || text
    } catch (error) {}
  }
}
</script>

<style scoped>
.radio {
    margin-right: 1rem;
}

.radio .checkboxLabel {
    margin-left: 0.5rem;
}

.radio + .radio {
    margin-left: inherit;
}
</style>
