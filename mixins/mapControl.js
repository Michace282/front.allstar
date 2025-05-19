import Realty from '@/models/Realty'
import Request from '@/models/Request'

export default {
    data: () => ({
        isDrawing: false,
        parcelleHeig: [],
        parcelleJson: [],
        polyLine: null,
        polygon: undefined,
        mousePressed: null,
        earthRadius: 6378137.0,

        map: null,
        center: {
            lat: 50.409369,
            lng: 30.544327,
        },
        options: {
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false,
            styles: [
                {
                    featureType: 'poi',
                    stylers: [{visibility: 'off'}],
                },
                {
                    featureType: 'transit.station.bus',
                    stylers: [{visibility: 'off'}],
                },
            ],
        },
    }),
    computed: {
        request(){
            return Request.query().first()
        }
    },
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth
        },
        clickDrawingControl()
        {
            !this.isDrawing ? this.drawingModeOn() : this.drawingModeOff()
        },
        drawingModeOn()
        {
            this.isDrawing = true
            this.map.setOptions({
                draggable: false,
                draggableCursor: 'url("/image/pencil-cursor.png"), auto',
            })
            Realty.update({
                where: model => model.id,
                data: {
                    is_show: false,
                },
            })
            this.parcelleHeig = []
            this.polyLine.setMap(null)
            this.polygon.setMap(null)

            this.listenersManage()

            this.polygon.setEditable(false)
            this.polygon.setDraggable(false)
        },
        clearAll()
        {
            this.isDrawing = false
            this.parcelleHeig = []
            this.parcelleJson = []
            this.polyLine.setMap(null)
            this.polygon.setMap(null)
            this.request.geo = this.parcelleJson
            this.request.$save()
            this.$nuxt.$emit('search')
        },
        drawingModeOff()
        {
            this.isDrawing = false
            this.map.setOptions({
                draggable: true,
                draggableCursor:
                    'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
            })
            this.request.geo = this.parcelleJson
            this.request.$save()
            this.$nuxt.$emit('search')
            this.listenersManage()
        },
        listenersManage()
        {
            const config = [
                {
                    el: document.getElementById('map_wrapper'),
                    eventName: 'mousedown',
                    handle: this.startDraw,
                    listener: null,
                    dom: true,
                },
                {
                    el: document.getElementById('map_wrapper'),
                    eventName: 'mouseup',
                    handle: this.stopDraw,
                    listener: null,
                    dom: true,
                },
                {
                    el: this.map,
                    eventName: 'mousemove',
                    handle: this.processDraw,
                    listener: null,
                    dom: false,
                },
            ]
            config.forEach((obj) => {
                if(obj.dom){
                    obj.listener = obj.el[
                        this.isDrawing ? 'addEventListener' : 'removeEventListener'
                        ](obj.eventName, obj.handle)
                } else if(this.isDrawing){
                    obj.listener = google.maps.event.addListener(
                        obj.el,
                        obj.eventName,
                        obj.handle,
                    )
                } else {
                    google.maps.event.removeListener(obj.listener)
                    obj.listener = null
                }
            })
        },
        startDraw()
        {
            this.mousePressed = true
            this.polyLine.setPath(this.parcelleHeig)
            this.polyLine.setMap(this.map)
        },
        stopDraw()
        {
            this.mousePressed = false
            this.polygon.setPath(this.parcelleHeig)

            this.polygon.douglasPeucker(360.0 / (2.0 * Math.PI * this.earthRadius))
            let vertices = this.polygon.getPath()
            for(let i = 0; i < vertices.getLength(); i++) {
                let xy = vertices.getAt(i)
                this.parcelleJson.push(
                    new google.maps.LatLng(xy.lat(), xy.lng()).toJSON(),
                )
            }
            this.polygon.setEditable(false)
            this.polygon.setDraggable(false)
            this.polygon.setMap(this.map)
            this.polyLine.setMap(null)
            this.drawingModeOff()
        },
        processDraw(evt)
        {
            if(!this.mousePressed) return
            let latLng = evt.latLng
            this.polyLine.getPath()
                .push(latLng)
            this.parcelleHeig.push(
                new google.maps.LatLng(latLng.lat(), latLng.lng()),
            )
        }
    },
}
