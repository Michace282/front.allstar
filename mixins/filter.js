import Request from '@/models/Request'

export default {
    computed: {
        titles(){
            let res = []
            if(this.filter && this.request && this.request.filters[this.filter.slug]){
                let values = this.filter.fake_values.filter(value => this.request.filters[this.filter.slug].indexOf(value.id) !== -1)
                if(values){
                    values.forEach((value)=>{
                        res.push(value.title || value.name)
                    })
                }
            }
            return res.join(', ')
        },
        request(){
            return Request.query().first()
        }
    },
    beforeMount() {
        if(this.request && !this.request.filters[this.filter.slug]){
            this.setValue([])
        }
    },
    methods: {
        setValue(value)
        {
            let filters = JSON.parse(JSON.stringify(this.request.filters))
            filters[this.filter.slug] = value
            this.request.filters = filters
            this.request.$save()
        },

    }
}
