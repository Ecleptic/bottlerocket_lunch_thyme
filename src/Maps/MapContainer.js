import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import React, { Component } from "react"

export class MapContainer extends Component {
    state = {
        showingInfoWindow: true,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })

    onMapClicked = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {
        return (
            <Map
                style={{
                    height: "300px",
                    padding: "0",
                    margin: "0",
                    position: "relative"
                }}
                className={"map"}
                google={this.props.google}
                initialCenter={{
                    lat: this.props.lat,
                    lng: this.props.lng
                }}
                center={{
                    lat: this.props.lat,
                    lng: this.props.lng
                }}
                zoom={16}
            >
                <Marker
                    name={this.props.info.name}
                    position={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }}
                    onClick={this.onMarkerClick}
                />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <h2>{this.state.selectedPlace.name}</h2>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)
