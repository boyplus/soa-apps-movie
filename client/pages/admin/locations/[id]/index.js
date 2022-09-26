import { useEffect, useState } from "react";
import axios from "../../../../axios";

import LayoutAdmin from "../../../../components/LayoutAdmin";
import { useRouter } from "next/router";

const LocationIdPage = () => {
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState();
  const [locationAddress, setLocationAddress] = useState();
  const [locationPhone, setLocationPhone] = useState();
  const [isFailUpdate, setIsFailUpdate] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const fetchLocation = async () => {
    if (id) {
      try {
        const res = await axios.get(`/util/location/${id}`);
        setLocation(res.data);

        setLocationName(res.data.name);
        setLocationAddress(res.data.address);
        setLocationPhone(res.data.phone);
      } catch (err) {}
    }
  };

  const onNameChanged = (event) => {
    setLocationName(event.target.value);
  };
  const onAddressChanged = (event) => {
    setLocationAddress(event.target.value);
  };
  const onPhoneChanged = (event) => {
    setLocationPhone(event.target.value);
  };

  const onUpdateLocation = async () => {
    if (id) {
      try {
        const res = await axios.patch(`/admin/location/${id}`, {
          name: locationName,
          address: locationAddress,
          phone: locationPhone,
        });
        router.replace("/admin/locations");
      } catch (err) {
        setIsFailUpdate(true);
      }
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [id]);

  return (
    <LayoutAdmin>
      <div>
        <h1>Location Details</h1>

        <p>Name</p>
        <input type="text" value={locationName} onChange={onNameChanged} />
        <p>Address</p>
        <input
          type="text"
          value={locationAddress}
          onChange={onAddressChanged}
        />
        <p>Phone</p>
        <input type="text" value={locationPhone} onChange={onPhoneChanged} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={onUpdateLocation}>Save Change</button>
        <br></br>
        <br></br>
        {isFailUpdate ? (
          <div
            style={{
              color: "red",
            }}
          >
            Fail to update the location information.
          </div>
        ) : (
          <></>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default LocationIdPage;
