import { useStore } from "@/app/store";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";

const libraries = ["places"];

const GoogleAutocomplete = () => {
  const { fields, fieldsChange } = useStore();
  const [mapCenter, setMapCenter] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBaIJr8CHXwczff6Y90YjupUOzHYbL3xDo",
    libraries,
  });

  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const mapOptions = useMemo(
    () => ({
      mapId: "b181cac70f27f5e6",
      disableDefaultUI: false,
      clickableIcons: true,
    }),
    []
  );

  const handleAutocompleteLoad = (auto) => {
    setAutocomplete(auto);
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        alert("No details available for this location.");
        return;
      }

      const location = place.geometry.location;
      const formatted_address = place.formatted_address;
      const placeName = place.name;
      const vicinity = place.vicinity;

      fieldsChange({
        direction: formatted_address || "",
        placeName: placeName || "",
        vicinity: vicinity || "",
      });
      setMapCenter({
        lat: location.lat(),
        lng: location.lng(),
      });
    } else {
      alert("Please enter a valid address.");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Autocomplete
        onLoad={handleAutocompleteLoad}
        onPlaceChanged={handlePlaceChanged}
        options={{ componentRestrictions: { country: "us" } }}
      >
        <input
          type="text"
          placeholder="Enter Property Address"
          className="border w-full py-2 px-4 rounded font-bold placeholder:text-gray-500"
          defaultValue={fields.direction}
        />
      </Autocomplete>
      {mapCenter && (
        <GoogleMap
          center={mapCenter}
          zoom={15}
          mapContainerClassName="w-full h-96"
          options={mapOptions}
          onLoad={onMapLoad}
        >
          <Marker
            position={mapCenter}
            icon={{
              url: "/green-dot.png",
              scaledSize: new window.google.maps.Size(25, 25),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        </GoogleMap>
      )}
    </>
  );
};

export default GoogleAutocomplete;
