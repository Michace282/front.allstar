import BaseModel from '~/models/BaseModel'

export default class Block extends BaseModel {
    static entity = 'Block'

    static fields() {
        return {
            ...super.fields(),
            template: this.string(''),
            status: this.number(1),
            data: this.attr(null),
        }
    }
}
