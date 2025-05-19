import BaseModel from '~/models/BaseModel'

export default class Request extends BaseModel {
    static entity = 'Request'

    static fields() {
        return {
            ...super.fields(),
            code: this.string(''),
            locale: this.string('ru'),
            page: this.number(1),
            deal_type: this.string('rent'),
            realty_type: this.string('apartment'),
            sort: this.string('date_desc'),
            filters: this.attr({}),
            geo: this.attr([]),
        }
    }

    setValue(props, value)
    {
        this[props] = value
    }

    getValue(props)
    {
        return this[props]
    }
}
