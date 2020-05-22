<template>
    <timeline-view/>
</template>

<script>
    import timeline from 'timeline-vuejs'

    export default {
        name: "timeline",
        components: {
            "timeline-view": timeline
        },
        props: ["items"],
        data () {
            return {
                messageWhenNoItems: 'There arent items',
            }
        }
    }
</script>