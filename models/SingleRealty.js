import Realty from '~/models/Realty'

export default class SingleRealty extends Realty {
    static entity = 'SingleRealty'

    static fields()
    {
        return {
            ...super.fields(),
            user_id: this.attr(null),
            front_attribute_table: this.attr(null),
        }
    }
}
