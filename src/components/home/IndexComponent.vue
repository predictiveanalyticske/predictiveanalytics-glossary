<template>
    <vk-grid class="uk-child-width-1-1">
        <div>
            <navbar></navbar>
        </div>
        <div>
        </div>
    </vk-grid>
</template>

<script>
    import navbar from './headers/NavbarComponent'

    export default {
        name: "index",
        components: {
            navbar,
        },
        data () {
            return {
                data: {},
            }
        },

    }
</script>