import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './HotelMap.module.css';

delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface HotelMapProps {
  latitude: number;
  longitude: number;
  hotelName: string;
  location: string;
}

const HotelMap: React.FC<HotelMapProps> = ({ latitude, longitude, hotelName, location }) => {
  return (
    <div className={styles.mapContainer}>
      <h2 className={styles.sectionTitle}>Location</h2>
      <div className={styles.mapWrapper}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          className={styles.map}
          zoomControl={true}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <div className={styles.popupContent}>
                <strong>{hotelName}</strong>
                <br />
                {location}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className={styles.locationDetails}>
        <p className={styles.locationText}>{location}</p>
      </div>
    </div>
  );
};

export default HotelMap;
