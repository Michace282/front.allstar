import Pagination from '@/models/Pagination'
import Realty from '@/models/Realty'

export default class RealtyPagination extends Pagination {
    static entity = 'RealtyPagination'
    static fields() {
        return {
            ...super.fields(),
            data: this.hasManyBy(Realty, 'ids'),
        }
    }
}
