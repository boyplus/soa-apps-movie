import { useState } from "react";
import axios from "../../../axios";

import LayoutAdmin from "../../../components/LayoutAdmin";
import { useRouter } from "next/router";

const CreateStaffPage = () => {
  const router = useRouter();
  const [locationName, setLocationName] = useState();
  const [locationAddress, setLocationAddress] = useState();
  const [locationPhone, setLocationPhone] = useState();
  const [locationSeat, setLocationSeat] = useState();
  const [isFailCreate, setIsFailCreate] = useState(false);

  const onNameChanged = (event) => {
    setLocationName(event.target.value);
  };
  const onAddressChanged = (event) => {
    setLocationAddress(event.target.value);
  };
  const onPhoneChanged = (event) => {
    setLocationPhone(event.target.value);
  };
  const onSeatChanged = (event) => {
    setLocationSeat(event.target.value);
  };

  const onCreateLocation = async () => {
    try {
      const res = await axios.post("/admin/location", {
        name: locationName,
        address: locationAddress,
        phone: locationPhone,
        seat: locationSeat,
      });
      router.replace("/admin/locations");
    } catch (err) {
      setIsFailCreate(true);
    }
  };

  return (
    <LayoutAdmin>
      <div>
        <h1>Create Location</h1>

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
        <p>Seat</p>
        <input type="number" value={locationSeat} onChange={onSeatChanged} />
        <br></br>
        <br></br>
        <button onClick={onCreateLocation}>Create</button>

        <br></br>
        <br></br>
        <br></br>

        {isFailCreate ? (
          <div
            style={{
              color: "red",
            }}
          >
            Fail to create the location.
          </div>
        ) : (
          <></>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default CreateStaffPage;
