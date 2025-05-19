import {Model} from '@vuex-orm/core'

export default class Pagination extends Model {
    static entity = 'Pagination'
    static fields() {
        return {
            id: this.attr(null).nullable(),
            ids: this.attr(null).nullable(),
            current_page: this.number(0),
            first_page_url: this.string('').nullable(),
            from: this.number(0),
            last_page: this.number(0),
            last_page_url: this.string('').nullable(),
            links: this.attr([]),
            next_page_url: this.string('').nullable(),
            path: this.string('').nullable(),
            per_page: this.number(0),
            prev_page_url: this.string('').nullable(),
            to: this.number(0),
            total: this.number(0)
        }
    }
}
