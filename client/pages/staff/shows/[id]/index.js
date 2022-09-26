import { useEffect, useState } from "react";
import axios from "../../../../axios";

import LayoutStaff from "../../../../components/LayoutStaff";
import { useRouter } from "next/router";

import timeSlot from "../../../../store/time-slot";

const ShowDestailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [showDetails, setShowDetails] = useState();

  const fetchShowDetails = async () => {
    if (id) {
      try {
        const res = await axios.get(`/staff/show/${id}`);
        setShowDetails(res.data);
      } catch (err) {}
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [id]);

  return (
    <LayoutStaff>
      <div>
        <h1>Show Details</h1>
        {showDetails ? (
          <div>
            <ul>
              <li>Name:&nbsp;{showDetails.movie.name}</li>
              <br />
              <li> Description:&nbsp;{showDetails.movie.description}</li>
              <br />
              <li> Location:&nbsp;{showDetails.location.name}</li>
              <br />
              <li>
                {" "}
                Time:&nbsp;{timeSlot[showDetails.startSlot - 1].startTime}
                {" - "}
                {
                  timeSlot[showDetails.startSlot - 2 + showDetails.movie.length]
                    .endTime
                }
              </li>
            </ul>
            <br />
            <br />
            <br />
            {showDetails.location.seatDetail.map((data) => {
              return (
                <button
                  key={data.id}
                  disabled={data.isReserved}
                  style={{
                    marginRight: "10px",
                    padding: "6px",
                    backgroundColor: "#fff",
                  }}
                >
                  {data.id}
                </button>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </LayoutStaff>
  );
};

export default ShowDestailPage;
