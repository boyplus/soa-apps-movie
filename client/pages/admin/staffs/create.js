import { useEffect, useState } from "react";
import axios from "../../../axios";

import LayoutAdmin from "../../../components/LayoutAdmin";
import { useRouter } from "next/router";

const CreateStaffPage = () => {
  const router = useRouter();
  const [locationList, setLocationList] = useState([]);
  const [staffEmail, setStaffEmail] = useState();
  const [staffPassword, setStaffPassword] = useState();
  const [staffName, setStaffName] = useState();
  const [isFailCreate, setIsFailCreate] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(-1);

  const onEmailChanged = (event) => {
    setStaffEmail(event.target.value);
  };
  const onPasswordChanged = (event) => {
    setStaffPassword(event.target.value);
  };
  const onNameChanged = (event) => {
    setStaffName(event.target.value);
  };

  const onSelectLocation = (event) => {
    setSelectedLocationId(event.target.value);
  };

  const onCreateStaff = async () => {
    try {
      const res = await axios.post("/admin/staff", {
        name: staffName,
        email: staffEmail,
        password: staffPassword,
        locationId: selectedLocationId,
      });
      router.replace("/admin/staffs");
    } catch (err) {
      setIsFailCreate(true);
    }
  };

  const fetchLocationList = async () => {
    try {
      const res = await axios.get("/util/location");
      setLocationList(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    if (!(locationList.length === 0)) {
      setSelectedLocationId(locationList[0].id);
    }
  }, [locationList]);

  useEffect(() => {
    fetchLocationList();
  }, []);

  return (
    <LayoutAdmin>
      <div>
        <h1>Create Staff</h1>

        <p>Email</p>
        <input type="text" value={staffEmail} onChange={onEmailChanged} />
        <p>Password</p>
        <input
          type="password"
          value={staffPassword}
          onChange={onPasswordChanged}
        />
        <p>Name</p>
        <input type="text" value={staffName} onChange={onNameChanged} />
        <br></br>
        <br></br>

        <select onChange={onSelectLocation}>
          {locationList.map((data) => {
            return (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>

        <br></br>
        <br></br>

        <button onClick={onCreateStaff}>Create</button>

        <br></br>
        <br></br>
        <br></br>

        {isFailCreate ? (
          <div
            style={{
              color: "red",
            }}
          >
            Fail to create the staff.
          </div>
        ) : (
          <></>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default CreateStaffPage;
