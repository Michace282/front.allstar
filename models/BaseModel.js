import {Model} from '@vuex-orm/core'

export default class BaseModel extends Model {
    static entity = 'BaseModel'

    static fields() {
        return {
            id: this.attr(null)
        }
    }
}
