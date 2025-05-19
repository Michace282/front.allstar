export default {
    data(){
        return {
            windowWidth: 1920,
            windowHide: 1080,
        }
    },
    beforeMount()
    {
        this.$nextTick(() => {
            this.windowWidth = window.innerWidth
            this.windowHide = window.innerHeight
            window.addEventListener('resize', this.onResize)
            window.addEventListener('load', this.onResize)
        })
    },
    beforeDestroy()
    {
        window.removeEventListener('resize', this.onResize)
        window.removeEventListener('load', this.onResize)
    },
    methods: {
        onResize(){
            this.windowWidth = window.innerWidth
            this.windowHide = window.innerHeight
        },
    },
    computed: {
        BASE(){
            return process.env.BASE
        },
        API(){
            return process.env.API
        }
    }
}
