import BaseModel from '~/models/BaseModel'

export default class Admin extends BaseModel {
    static entity = 'Admin'

    static fields() {
        return {
            ...super.fields(),
            name: this.string(''),
            image: this.string(''),
            sort_order: this.number(0),
            email: this.string(''),
            phones: this.attr([]),
            position:this.string(''),
            speakable_langs: this.attr([]),
            main_admin: this.number(0),
            langs_text: this.string(''),
            phones_text: this.string('')
        }
    }
}
