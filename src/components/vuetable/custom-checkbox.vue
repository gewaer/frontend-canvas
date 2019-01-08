<template>
    <th 
        v-if="isHeader"
        class="vuetable-th-component-checkbox"
    >
        <div class="checkbox check-success">
            <input
                :id="`vuetable-checkbox-${id}`"
                :checked="isAllItemsInCurrentPageSelected()"
                type="checkbox"
                @change="toggleAllCheckbox($event)">
            <label :for="`vuetable-checkbox-${id}`"/>
        </div>
    </th>

    <td 
        v-else
        class="vuetable-td-component-checkbox"
    >
        <div class="checkbox check-success">
            <input
                :id="`vuetable-checkbox-${id}`"
                :checked="isSelected(rowData)"
                type="checkbox"
                @change="toggleCheckbox(rowData, $event)">
            <label :for="`vuetable-checkbox-${id}`"/>
        </div>
    </td>
</template>
<script>
import VuetableFieldCheckboxMixin from "vuetable-2/src/components/VuetableFieldCheckboxMixin";

export default {
    name: "VuetableFieldCheckbox",
    mixins: [VuetableFieldCheckboxMixin],
    computed: {
        id() {
            return this.uids();
        }
    }
}

</script>
