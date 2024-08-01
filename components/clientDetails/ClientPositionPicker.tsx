import React, { FunctionComponent, useEffect, useState } from "react";
import { Marker, Popup, TileLayer, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import Panel from "@/components/Panel";
import api from "@/utils/api";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import { toast } from "react-toastify";
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

const ClientPositionPicker: FunctionComponent<{ clientId: number }> = ({ clientId }) => {
  const { data: clientDetails, isLoading, refetch } = useClientDetails(clientId);
  const [position, setPosition] = useState<[number, number]>(undefined);

  useEffect(() => {
    if (clientDetails?.gps_position.length == 2) {
      setPosition([
        parseFloat(clientDetails.gps_position[0]),
        parseFloat(clientDetails.gps_position[1]),
      ]);
    }
  }, [clientDetails?.gps_position]);

  useEffect(() => {
    if (position != null && !isLoading) {
      setPosition(position);
    }
  }, [position]);

  const handleClientUpdatePosition = () => {
    if (!position) toast.error("Selecteer een locatie");
    api
      .post(`/clients/${clientId}/gps/update`, {
        latitude: position[0].toString(),
        longitude: position[1].toString(),
      })
      .then(() => {
        toast.success("Locatie is succesvol bijgewerkt");
        refetch();
      })
      .catch((e) => {
        toast.error("Er is een fout opgetreden bij het updaten van de locatie");
      });
  };

  const center: [number, number] =
    clientDetails?.gps_position.length == 2
      ? [parseFloat(clientDetails.gps_position[0]), parseFloat(clientDetails.gps_position[1])]
      : Amsterdam;

  if (isLoading || !clientDetails) return null;
  return (
    <Panel
      title={"Locatie"}
      sideActions={
        <button
          onClick={handleClientUpdatePosition}
          className="dark:bg-slate-900 px-4 py-2 rounded-lg bg-gray-3 dark:text-white text-slate-800 "
        >
          Opslaan
        </button>
      }
    >
      <MapContainer className={"w-full h-100"} center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerOnPosition position={position} setPosition={setPosition} />
      </MapContainer>
    </Panel>
  );
};

const MarkerOnPosition = ({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) => {
  useMapEvents({
    click(event) {
      setPosition([event.latlng.lat, event.latlng.lng]);
    },
  });

  if (!position) return null;

  return <Marker icon={icon} position={position} />;
};

export default ClientPositionPicker;
