import BaseModel from '~/models/BaseModel'

export default class Page extends BaseModel {
    static entity = 'Page'

    static fields() {
        return {
            ...super.fields(),
            type: this.string(''),
            template: this.string(''),
            title: this.string(''),
            status: this.number(1),
            sort_order: this.number(0),
            h1: this.string(''),
            slug: this.string(''),
            url: this.string(''),
            meta: this.attr(null),
            content: this.attr(null),
            fields: this.attr(null),

            breadcrumbs: this.attr(null),
        }
    }
}
