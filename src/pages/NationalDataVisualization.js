import React from "react";
import DeckGL, { HexagonLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import { PathLayer } from "@deck.gl/layers";
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {Box, Container} from "@material-ui/core";
import {Book} from "@material-ui/icons";

export class LayeredMap extends React.Component {
    render() {

        const layer = [
            new HeatmapLayer({
                id: "heatmapLayer",
                data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json',
                getPosition: d => d.COORDINATES,
                getWeight: d => d.SPACES,
                radiusPixels: 25
            }),

            new HexagonLayer({
                id: "hex",
                data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json',
                pickable: true,
                extruded: true,
                radius: 200,
                getColorWeight: d => d.SPACES,
                getElevationWeight: d => d.SPACES,
                getPosition: d => d.COORDINATES,
                elevationScale: 4,
                opacity: .7,
            })
        ];

        return (
            <Box width="100" height="90vh">
                <DeckGL style={{position: 'relative'}}
                        initialViewState={{
                            longitude: -122.4194,
                            latitude: 37.7749,
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