import BaseModel from '~/models/BaseModel'

export default class Menu extends BaseModel {
    static entity = 'Menu'

    static fields() {
        return {
            ...super.fields(),
            position: this.string(''),
            lang: this.string(''),
            items: this.attr(null)
        }
    }
}
