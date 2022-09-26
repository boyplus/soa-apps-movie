import { useEffect, useState } from "react";
import axios from "../../../axios";

import LayoutAdmin from "../../../components/LayoutAdmin";
import Link from "next/link";

const LocationPage = () => {
  const [locationList, setLocationList] = useState([]);

  const fetchLocationList = async () => {
    try {
      const res = await axios.get("/util/location");
      setLocationList(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchLocationList();
  }, []);

  return (
    <LayoutAdmin>
      <div>
        <h1>Location List</h1>

        <Link href={"/admin/locations/create"}>
          <button>+</button>
        </Link>

        <ul>
          {locationList.map((data) => {
            return (
              <li key={data.id} style={{ margin: "20px" }}>
                <Link href={`/admin/locations/${data.id}`}>
                  <a>
                    Name:&nbsp;{data.name}
                    <br></br>
                    Addres:&nbsp;{data.address}
                    <br></br>
                    Phone:&nbsp;{data.phone}
                    <br></br>
                    Seat:&nbsp;{data.seat}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </LayoutAdmin>
  );
};

export default LocationPage;
