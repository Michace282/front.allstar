import BaseModel from '~/models/BaseModel'

export default class Filter extends BaseModel {
    static entity = 'Filter'

    static fields() {
        return {
            ...super.fields(),
            name: this.string(''),
            name_front: this.string(''),
            slug: this.string(''),
            from: this.string(''),
            morph: this.string(''),
            sort_order: this.number(0),
            attribute_id: this.string(''),
            realty_column: this.string(''),
            to: this.string(''),
            type: this.string(''),
            deal_type: this.attr([]),
            realty_type: this.attr([]),
            langs: this.attr([]),
            position: this.string(null).nullable(),
            is_main: this.boolean(false),
            fake_values: this.attr(null),
        }
    }
}
