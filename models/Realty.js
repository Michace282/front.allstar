import BaseModel from '~/models/BaseModel'

export default class Realty extends BaseModel
{
    static entity = 'Realty'

    static fields()
    {
        return {
            ...super.fields(),
            state: this.boolean(true),
            is_closed: this.boolean(true),
            lng: this.string('')
                     .nullable(),
            lat: this.string('')
                     .nullable(),
            area: this.string('')
                      .nullable(),
            house_number: this.string('').nullable(),
            house_year: this.string('')
                            .nullable(),
            type: this.string('')
                      .nullable(),
            name: this.string('')
                      .nullable(),
            info: this.string('')
                      .nullable(),
            video: this.string('')
                       .nullable(),
            slug: this.string('')
                      .nullable(),
            is_show: this.boolean(false),
            is_sale: this.number(0),
            is_rent: this.number(0),
            is_sale_hot: this.number(0),
            is_rent_hot: this.number(0),
            without_fees: this.number(0),
            show_watermark: this.boolean(true),
            rent_price: this.number(0),
            sale_price: this.number(0),
            broker_rent_fee: this.number(0),
            broker_sale_fee: this.number(0),
            utilities_fee: this.number(0),
            parking_fee: this.number(0),
            rooms_count: this.string('')
                             .nullable(),
            front_images: this.attr([]),
            front_documents: this.attr([]),
            front_attribute_features: this.attr([]),
            front_district_name: this.string('')
                                     .nullable(),
            front_subways: this.attr([])
                                   .nullable(),
            front_complex_name: this.string('')
                                    .nullable(),
            front_business_name: this.string('')
                                     .nullable(),
            security_deposit: this.number(0),
            front_security_deposit: this.string(''),
            h1: this.attr(null),
            meta: this.attr(null),
            content: this.attr(null),
        }
    }

    get front_rent_price()
    {
        return `$${this.rent_price.toLocaleString('ru-RU')}`
    }

    get front_sale_price()
    {
        return `$${this.sale_price.toLocaleString('ru-RU')}`
    }

    get front_map_rent_price()
    {
        return `$${this.rounder(this.rent_price, 1).toLocaleString('ru-RU')}`
    }

    get front_map_sale_price()
    {
        return `$${this.rounder(this.sale_price, 1).toLocaleString('ru-RU')}`
    }

    get link_sale()
    {
        return `/${this.type}-sale-kiev/${this.slug}`
    }

    get link_rent()
    {
        return `/${this.type}-rent-kiev/${this.slug}`
    }

    get position()
    {
        return {
            lng: Number(this.lng),
            lat: Number(this.lat),
        }
    }

    get front_price_per_area_sale()
    {
        return `$${(Math.round(this.sale_price / this.area)).toLocaleString('ru-RU')}`
    }

    get front_price_per_area_rent()
    {
        return `$${(Math.round(this.rent_price / this.area)).toLocaleString('ru-RU')}`
    }

    show()
    {

        Realty.update({
                  where: model => model.id,
                  data: {
                      is_show: false,
                  },
              })
              .then(() => {
                  this.is_show = !this.is_show
                  this.$save()
              })


    }

    rounder(num, digits)
    {
        const lookup = [
            {
                value: 1,
                symbol: '',
            },
            {
                value: 1e3,
                symbol: 'K',
            },
            {
                value: 1e6,
                symbol: 'M',
            },
            {
                value: 1e9,
                symbol: 'G',
            },
            {
                value: 1e12,
                symbol: 'T',
            },
            {
                value: 1e15,
                symbol: 'P',
            },
            {
                value: 1e18,
                symbol: 'E',
            },
        ]
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
        var item = lookup.slice()
                         .reverse()
                         .find(function(item) {
                             return num >= item.value
                         })
        return item ? (num / item.value).toFixed(digits)
                                        .replace(rx, '$1') + item.symbol : '0'
    }

}
