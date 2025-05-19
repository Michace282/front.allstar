import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/src/components/cluster.js';
import GmapCustomMarker from 'vue2-gmap-custom-marker'
//

Vue.component('gmap-cluster', GmapCluster)
Vue.component('gmap-custom-marker', GmapCustomMarker)

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyC-ew6H1Lfrj5erNaNZT_Ktf6dAJsIsJf4',
        libraries: 'places,drawing', // This is required if you use the Autocomplete plugin
    },
})


