import React from "react";
import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";
import { PathLayer } from "@deck.gl/layers";
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {Box, Container} from "@material-ui/core";
import {Book} from "@material-ui/icons";
// data needed for overlay here
// const data = [{
//     name: "random-name",
//     color: [101, 147, 245],
//     path:[[-74.00578, 40.713067],
//         [-74.004577, 40.712425],
//         [-74.003626, 40.713650],
//         [-74.002666, 40.714243],
//         [-74.002136, 40.715177],
//         [-73.998493, 40.713452],
//         [-73.997981, 40.713673],
//         [-73.997586, 40.713448],
//         [-73.99256, 40.713863]]}
// ]

const dataset = [
    {COORDINATES: [-74.00578, 40.713067], WEIGHT: 10},
    {COORDINATES: [-74.004577, 40.712425], WEIGHT: 5},
    {COORDINATES: [-74.003626, 40.713650], WEIGHT: 15},
    {COORDINATES: [-73.997981, 40.713673], WEIGHT: 8},
    {COORDINATES: [-73.99256, 40.713863], WEIGHT: 20}
];

export class LayeredMap extends React.Component {
    render() {
// below, add whatever layers you need to overlay on your map
//         const layer = [
//             new PathLayer({
//                 id: "path-layer",
//                 data,
//                 getWidth: data => 7,
//                 getColor: data => data.color,
//                 widthMinPixels: 7
//             })
//         ];

        const layer = [
            new HeatmapLayer({
                id: "heatmapLayer",
                data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json',
                getPosition: d => d.COORDINATES,
                radiusPixels: 25
            })
        ];

        return (
            <Box width="100" height="90vh">
        {/*        <DeckGL style={{position: 'relative'}}*/}
        {/*            initialViewState={{*/}
        {/*                longitude: -74.006,*/}
        {/*                latitude: 40.7128,*/}
        {/*                zoom: 12*/}
        {/*            }}*/}
        {/*            height="100%"*/}
        {/*        width="100%"*/}
        {/*        controller={true}*/}
        {/*        layers={layer} // layer here*/}
        {/*    >*/}
        {/*        <StaticMap*/}
        {/*            mapStyle="mapbox://styles/mapbox/streets-v11"*/}
        {/*            mapboxApiAccessToken="pk.eyJ1Ijoic2hhbnRvOSIsImEiOiJja3N6eHh3NXIxcTNhMndsZzc0dmtvZzBqIn0.mLVlMcoA4RODtkY4cfzRpQ"*/}
        {/*    />*/}
        {/*</DeckGL>*/}
                <DeckGL style={{position: 'relative'}}
                        initialViewState={{
                            longitude: -74.00578,
                            latitude: 40.713067,
                            zoom: 12
                        }}
                        height="100%"
                        width="100%"
                        controller={true}
                        layers={layer} // layer here
                >
                    <StaticMap
                        mapStyle="mapbox://styles/mapbox/dark-v10"
                        mapboxApiAccessToken="pk.eyJ1Ijoic2hhbnRvOSIsImEiOiJja3N6eHh3NXIxcTNhMndsZzc0dmtvZzBqIn0.mLVlMcoA4RODtkY4cfzRpQ"
                    />
                </DeckGL>
    </Box>
    )
    }
}

export default LayeredMap;