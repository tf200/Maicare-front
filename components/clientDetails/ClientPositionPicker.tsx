import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Marker,
  Popup,
  TileLayer,
  MapContainer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import Panel from "@/components/Panel";
const icon = L.icon({
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,

  iconSize: [20, 36], // size of the icon
  shadowSize: [25, 32], // size of the shadow
  iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
  shadowAnchor: [10, 40], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const Amsterdam: [number, number] = [52.3676, 4.9041];

const ClientPositionPicker: FunctionComponent = (props) => {
  return (
    <Panel title={"Locatie"}>
      <MapContainer
        className={"w-full h-100"}
        center={Amsterdam}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerOnPosition />
      </MapContainer>
    </Panel>
  );
};

const MarkerOnPosition = () => {
  const [position, setPosition] = useState<[number, number]>(null);

  useMapEvents({
    click(event) {
      setPosition([event.latlng.lat, event.latlng.lng]);
    },
  });

  if (!position) return null;

  return <Marker icon={icon} position={position} />;
};

export default ClientPositionPicker;
