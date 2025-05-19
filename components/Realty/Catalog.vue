<template>
    <div class="catalog">
        <div class="container" :key="$route.path">
            <div class="catalog__wrap">
                <div class="catalog__top">
                    <div class="catalog__meta">
                        <template v-if="meta">
                            <h1>{{ meta.page_head }}</h1>
                            <p>{{ meta.page_content }}</p>
                        </template>
                    </div>
                    <div class="wrap">
                        <LayoutsBreadcrumbs :breadcrumbs="breadcrumbs"/>
                        <form class="catalog__buttons">
                            <p class="catalog__before" v-if="paginate">{{ $t('catalog.results', {count: paginate.total}) }}</p>
                            <p class="catalog__before" v-else></p>
                            <div class="catalog__button-check-wrap">
                                <label class="catalog__button-check">
                                    <span class="text">{{ $t('filters.price') }}</span>
                                    <input
                                    name="radio"
                                    type="checkbox"
                                    class="catalog__button-check_inp"
                                    @click="e => setSort(e, 'price')"
                                    value="price_desc">
                                    <span class="checkmark"
                                    :class="{asc: this.request.sort === 'price_asc', desc: this.request.sort === 'price_desc'}"></span>
                                </label>
                            </div>
                            <div class="catalog__button-check-wrap">
                                <label class="catalog__button-check">
                                    <span class="text">{{ $t('filters.square') }}</span>
                                    <input
                                    name="radio"
                                    type="checkbox"
                                    class="catalog__button-check_inp"
                                    @click="e => setSort(e, 'area')"
                                    value="area_desc">
                                    <span class="checkmark"
                                    :class="{asc: this.request.sort === 'area_asc', desc: this.request.sort === 'area_desc'}"></span>
                                </label>
                            </div>
                            <div class="catalog__button-check-wrap">
                                <label class="catalog__button-check">
                                    <span class="text">{{ $t('filters.date') }}</span>
                                    <input
                                    name="radio"
                                    type="checkbox"
                                    class="catalog__button-check_inp"
                                    @click="e => setSort(e, 'date')"
                                    value="date_desc">
                                    <span class="checkmark"
                                    :class="{asc: this.request.sort === 'date_asc', desc: this.request.sort === 'date_desc'}"></span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="catalog__bottom">
                    <div class="catalog__map" id="map_wrapper" :class="{'open' :$store.getters['show_ui/getActiveMap'], 'map-full-size' : fullSizeMap}" @click="showMap">
                        <client-only v-if="!loading">
                            <a
                            :class="{ active: isDrawing }"
                            class="button"
                            @click="clickDrawingControl">
                            {{ $t('map.pick') }}
                        </a>
                        <a class="button button_2 active" @click="clearAll">
                            {{ $t('map.clear') }}
                        </a>
                        <a class="button button_show-map" :class="{'button_show-map_close' : fullSizeMap }" @click="openMapFullSize()"> </a>
                        <gmap-map ref="mapRef"
                        :center="center"
                        :zoom="13"
                        :options="options">
                        <template v-if="paginate">
                            <RealtyMap v-if="!model.is_closed" v-for="(model, index) in paginate.data" :key="`realty-info-${model.id}`" :model="model" :type="$route.params.deal_type"/>
                            <RealtyMapMarker v-for="(model, index) in paginate.data" :key="`realty-marker-${model.id}`" :index="index" :model="model" :type="$route.params.deal_type"/>
                        </template>
                    </gmap-map>
                </client-only>

            </div>

            <RealtyMapSlider v-if="windowWidth < 991 && paginate" :model="paginate.data" :class="{'open' :$store.getters['show_ui/getActiveMap']}" :type="$route.params.deal_type"></RealtyMapSlider>

            <div class="catalog__list" :class="{'map-open' :$store.getters['show_ui/getActiveMap']}">
              <template v-if="paginate">
                <RealtyThumbCatalog v-for="model in paginate.data" :key="`realty-catalog-${model.id}`" :model="model" :type="$route.params.deal_type"
                @center="setCenter(model)"/>
            </template>
            <el-skeleton
            v-else
            animated
            :count="6"
            class="catalog__list-wrapper"
            >
            <template slot="template">
                <div class="catalog__item">
                    <div class="catalog__image-wrapper">
                        <el-skeleton-item
                        variant="image"
                        style="width: 327px; height: 184px;"
                        />
                    </div>
                    <div class="catalog__item-content">
                        <div class="catalog__item-title">
                            <el-skeleton-item variant="h3"/>
                        </div>
                        <div class="catalog__text"><span>
                            <el-skeleton-item variant="text" style="width: 70%;"/>
                        </span></div>
                        <div class="catalog__subtext">
                            <el-skeleton-item variant="text" style="width: 45%;"/>
                        </div>
                        <div class="catalog__tags" style="margin-top: 10px">
                            <div style="width: 100%; margin-bottom: 5px;">
                                <el-skeleton-item variant="text" style="width: 30%; margin-right: 10px;"/>
                                <el-skeleton-item variant="text" style="width: 20%; margin-right: 10px;"/>
                            </div>
                            <div style="width: 100%; margin-bottom: 5px;">
                                <el-skeleton-item variant="text" style="width: 60%; margin-right: 15px;"/>
                            </div>
                        </div>
                        <div class="catalog__footer">
                            <div class="catalog__item-id">
                                <el-skeleton-item variant="h3" style="width: 55px"/>
                            </div>
                            <div class="catalog__price">
                                <el-skeleton-item variant="h1" style="width: 70px "/>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </el-skeleton>
    </div>
</div>
<div class="catalog__notes">
    <IconWarning></IconWarning>
    <span> {{ $t('catalog.notes') }} </span>
</div>
<div class="catalog__paginate" v-if="paginate && paginate.data.length">
    <el-pagination
    layout="prev, pager, next"
    :current-page="paginate.current_page"
    @current-change="page"
    :page-size="paginate.per_page"
    :total="paginate.total">
</el-pagination>
</div>
</div>
</div>
</div>
</template>

<script>
    import RealtyPagination from '~/models/RealtyPaginate'
    import Filter from '@/models/Filter'
    import Request from '@/models/Request'
    import mapControl from '@/mixins/mapControl'
    import variables from '@/mixins/variables'

    export default {
        name: 'Catalog',
        watchQuery: true,
        props: {
            meta: Object,
        },
        mixins: [
            mapControl,
            variables,
        ],
        data: () => ({
            loading: true,
            fullSizeMap: false,

        }),
        created()
        {
            this.$nuxt.$on('centerCenterMap', index => {
                this.setCenter(this.paginate.data[index])
            })
        },
        beforeDestroy()
        {
            RealtyPagination.deleteAll()
            this.$nuxt.$off('centerCenterMap')
        },
        methods: {
            showMap()
            {
                this.$store.commit('show_ui/setActiveMap', true)
            },
            toggleFilters()
            {
                this.$store.commit('show_ui/setActiveFilters', true)
            },
            setCenter(model)
            {
                if(this.map){
                    this.map.setCenter(model.position)
                    model.show()
                }
            },
            async setSort(e, sort)
            {
                if(this.request.sort === `${sort}_asc`){
                    this.request.sort = `${sort}_desc`
                } else {
                    this.request.sort = `${sort}_asc`
                }
                await this.request.$save()
                this.loading = true
                this.cleanRealtyPagination()
                this.queryEalty()
                this.$nextTick(() => {
                    window.scrollTo(0, 0)
                    setTimeout(() => {
                        this.loading = false
                    }, 200)
                })
            },
            cleanRealtyPagination() {
              RealtyPagination.create({
                current_page: 1,
                data: [],
                first_page_url: '',
                from: 0,
                last_page: 0,
                last_page_url: '',
                next_page_url: '',
                path: '',
                per_page: 0,
                links: [],
                prev_page_url: '',
                to: 0,
                total: 0
            })
          },
          async page(page)
          {
            this.loading = true
            await this.$nextTick(async () => {
                this.request.page = page
                await this.request.$save()

                this.cleanRealtyPagination()
                this.queryEalty()
                await this.$router.push({
                    query: {
                        ...this.$route.query,
                        page,
                    },
                })
                this.$nextTick(() => {
                    window.scrollTo(0, 0)
                })
                setTimeout(() => {
                    this.loading = false
                }, 900)
            })
        },
        queryEalty()
        {
            return this.$axios.$post(`${process.env.API}/ealty`, this.request)
            .then((data) => {
               RealtyPagination.create({data})
               .finally(() => {this.loading = false})
           })
        },
        openMapFullSize()
        {
            this.fullSizeMap = !this.fullSizeMap;
            setTimeout(() => {
                document.getElementById('map_wrapper').classList.remove('loading');
        // Trigger Google Maps resize event
                if (this.map) {
                    google.maps.event.trigger(this.map, 'resize');
                }
            }, 100);

        },
    },
    async fetch()
    {
        this.request.page = (this.$route.query.page ?? 1)
        this.request.deal_type = [this.$route.params.deal_type]
        this.request.realty_type = [this.$route.params.realty_type]
        await this.request.$save()
    },
    mounted()
    {
        Promise.all([
            this.queryEalty(),
        ])
        let interval = setInterval(() => {
            if(this.map === null && this.$refs.mapRef){
                this.$refs.mapRef.$mapPromise.then((map) => {
                    this.map = map
                    clearInterval(interval)

                    const control_minus = document.createElement('div')
                    control_minus.classList.add('map-control', 'map-control_minus')
                    google.maps.event.addDomListener(control_minus, 'click', () => {
                        map.setZoom(map.getZoom() - 1)
                    })
                    const control_plus = document.createElement('div')
                    control_plus.classList.add('map-control', 'map-control_plus')
                    google.maps.event.addDomListener(control_plus, 'click', () => {
                        map.setZoom(map.getZoom() + 1)
                    })
                    const controls = document.createElement('div')
                    controls.className = 'map-control__wrapper'

                    controls.appendChild(control_minus)

                    controls.appendChild(control_plus)

                    controls.index = 1
                    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controls)
                    this.polyLine = new google.maps.Polyline({
                        strokeColor: '#F77100',
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                    })
                    this.polygon = new google.maps.Polygon({
                        strokeColor: '#F77100',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#F77100',
                        fillOpacity: 0.35,
                        editable: true,
                        draggable: true,
                        geodesic: false,
                    })
                    document.getElementById('map_wrapper')
                    .classList
                    .remove('loading')
                    google.maps.Polygon.prototype.douglasPeucker = function(tolerance) {
                        let res = null
                        tolerance = tolerance * Math.pow(2, 20 - map.getZoom())
                        if(this.getPath() && this.getPath()
                         .getLength()){
                            const points = this.getPath()
                        .getArray()
                        const Line = function(p1, p2) {
                            this.p1 = p1
                            this.p2 = p2
                            this.distanceToPoint = function(point) {
                                let m =
                                (this.p2.lat() - this.p1.lat()) /
                                (this.p2.lng() - this.p1.lng()),
                                b = this.p1.lat() - m * this.p1.lng(),
                                d = []
                                d.push(
                                    Math.abs(point.lat() - m * point.lng() - b) /
                                    Math.sqrt(Math.pow(m, 2) + 1),
                                    )
                                d.push(
                                    Math.sqrt(
                                        Math.pow(point.lng() - this.p1.lng(), 2) +
                                        Math.pow(point.lat() - this.p1.lat(), 2),
                                        ),
                                    )
                                d.push(
                                    Math.sqrt(
                                        Math.pow(point.lng() - this.p2.lng(), 2) +
                                        Math.pow(point.lat() - this.p2.lat(), 2),
                                        ),
                                    )
                                return d.sort((a, b) => a - b)[0]
                            }
                        }
                        const douglasPeucker = function(points, tolerance) {
                            if(points.length <= 2){
                                return [points[0]]
                            }
                            let returnPoints = [],
                            line = new Line(points[0], points[points.length - 1]),
                            maxDistance = 0,
                            maxDistanceIndex = 0,
                            p
                            for(let i = 1; i <= points.length - 2; i++) {
                                const distance = line.distanceToPoint(points[i])
                                if(distance > maxDistance){
                                    maxDistance = distance
                                    maxDistanceIndex = i
                                }
                            }
                            if(maxDistance >= tolerance){
                                p = points[maxDistanceIndex]
                                line.distanceToPoint(p, true)
                                returnPoints = returnPoints.concat(
                                    douglasPeucker(points.slice(0, maxDistanceIndex + 1), tolerance),
                                    )
                                returnPoints = returnPoints.concat(
                                    douglasPeucker(
                                        points.slice(maxDistanceIndex, points.length),
                                        tolerance,
                                        ),
                                    )
                            } else {
                                p = points[maxDistanceIndex]
                                line.distanceToPoint(p, true)
                                returnPoints = [points[0]]
                            }
                            return returnPoints
                        }
                        res = douglasPeucker(points, tolerance)
                        res.push(points[points.length - 1])
                        this.setPath(res)
                    }
                    return this
                }
            })
}
}, 500)
},
computed: {
    request()
    {
        return Request.query()
        .first()
    },
    paginate()
    {
        return RealtyPagination.query()
        .with(['data'])
        .first()
    },
    breadcrumbs()
    {
        let url = `/${this.$route.params.realty_type}-${this.$route.params.deal_type}-kiev`
        return [
            {
                title: this.$t(`catalog.${this.$route.params.realty_type}-${this.$route.params.deal_type}`),
                url,
            },
        ]
    },
},
}
</script>

<style scoped>

    @media (min-width:968px) {
        .map-full-size .vue-map {
            width: 70vw
            !important;
        }
    }
    @media (max-width:968px) {
        .map-full-size .vue-map {
            width: 97vw
            !important;
        }
    }
</style>
