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
import api from "@/utils/api";
import { useClientDetails } from "@/utils/clients/getClientDetails";
const icon = L.icon({
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,

  iconSize: [20, 36],
  shadowSize: [25, 32],
  iconAnchor: [10, 40],
  shadowAnchor: [10, 40],
  popupAnchor: [-3, -76],
});

const Amsterdam: [number, number] = [52.37161673882133, 4.891405105590821];

const ClientPositionPicker: FunctionComponent<{clientId: number}> = ({clientId}) => {

  return (
    <Panel title={"Locatie"}>
      <MapContainer
        className={"w-full h-100"}
        center={Amsterdam}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerOnPosition clientId={clientId} />
      </MapContainer>
    </Panel>
  );
};

const MarkerOnPosition = ({clientId}: {clientId: number}) => {
  const { data: clientDetails, isLoading, refetch } = useClientDetails(clientId)
  const [position, setPosition] = useState<[number, number]>(null);

  useEffect(() => {
    if (clientDetails?.gps_position.length == 2)
    {
      setPosition([
        parseFloat(clientDetails.gps_position[0]), 
        parseFloat(clientDetails.gps_position[1])
      ])
    }
  }, [clientDetails?.gps_position])

  useMapEvents({
    click(event) {
      setPosition([event.latlng.lat, event.latlng.lng]);
      api.post(`/clients/${clientId}/gps/update`, {
        latitude: event.latlng.lat.toString(),
        longitude: event.latlng.lng.toString()
      }).then(() => {
        refetch() // clear the cache
      })
    },
  });

  if (!position || isLoading) return null;

  return <Marker icon={icon} position={position} />;
};

export default ClientPositionPicker;
