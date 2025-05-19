import BaseModel from '~/models/BaseModel'

export default class Setting extends BaseModel {
    static entity = 'Setting'

    static fields() {
        return {
            ...super.fields(),
            key: this.string(''),
            value: this.attr(null),
            active: this.number(1)
        }
    }
}
