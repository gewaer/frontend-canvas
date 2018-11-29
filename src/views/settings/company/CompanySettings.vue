<template>
<div class="company-settings">
    <h4 class="section-title p-l-10">Company Settings </h4>
    <company-settings />
</div>
</template>

<script>
import companySettings from '@/views/users/settings/company-settings';

export default {
    components: {
       companySettings,
    }
};
</script>
