<template>
    <div>
        <v-progress-circular indeterminate :size="80" :active="loading" :width="8" color="primary"></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: 'LNLLoader',
    props: {
        loading: Boolean,
        required: true
    }
};
</script>