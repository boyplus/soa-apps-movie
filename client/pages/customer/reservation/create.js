import { useEffect, useState } from "react";
import axios from "../../../axios";

import LayoutCustomer from "../../../components/LayoutCustomer";
import { useRouter } from "next/router";

import formatDate from "../../../hooks/formateDate";
import timeSlot from "../../../store/time-slot";

const CreateReservationPage = () => {
  const router = useRouter();
  const dateNow = new Date();
  const [dateSelect, setDateSelect] = useState(formatDate(dateNow));
  const [locationList, setLocationList] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState();
  const [showList, setShowList] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState();
  const [seatDetails, setSeatDetails] = useState([]);
  const [selectedSeatList, setSelectedSeatList] = useState([]);
  const [isFailCreate, setIsFailCreate] = useState(false);

  const onDateChange = (event) => {
    setDateSelect(event.target.value);
  };

  const onSelectLocation = (event) => {
    setSelectedLocationId(event.target.value);
  };

  const isSelectedSeat = (id) => {
    for (var i = 0; i < selectedSeatList.length; i++) {
      if (selectedSeatList[i] === id) return true;
    }
    return false;
  };

  const fetchShowDetails = async () => {
    if (selectedShowId) {
      try {
        const res = await axios.get(`/util/show/${selectedShowId}`);
        setSeatDetails(res.data.location.seatDetail);

        setSelectedSeatList([]);
      } catch (err) {}
    }
  };

  const fetchShowList = async () => {
    if (dateSelect && selectedLocationId) {
      try {
        const res = await axios.get("/util/show", {
          params: {
            date: dateSelect,
            locationId: selectedLocationId,
          },
        });
        setShowList(res.data);
        setSelectedShowId(res.data[0].id);
      } catch (err) {}
    }
  };

  const fetchLocationList = async () => {
    try {
      const res = await axios.get("/util/location");
      setLocationList(res.data);
      setSelectedLocationId(res.data[0].id);
    } catch (err) {}
  };

  const onCreateReservation = async () => {
    try {
      const res = await axios.post("/customer/reservation", {
        showId: selectedShowId,
        seatId: selectedSeatList,
      });
      router.replace("/customer/reservation");
    } catch (err) {
      setIsFailCreate(true);
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [selectedShowId]);

  useEffect(() => {
    fetchShowList();
    setSelectedSeatList([]);
    setSeatDetails([]);
    setSelectedShowId(0);
  }, [dateSelect, selectedLocationId]);

  useEffect(() => {
    fetchLocationList();
  }, []);

  return (
    <LayoutCustomer>
      <div>
        <h1>Buy Ticket</h1>

        <select onChange={onSelectLocation} value={selectedLocationId}>
          {locationList.map((data) => {
            return (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>

        <br />
        <br />
        <br />
        <input type="date" value={dateSelect} onChange={onDateChange} />
        <br />
        <br />
        <br />

        {showList.map((data) => {
          return (
            <button
              key={data.id}
              style={
                selectedShowId === data.id
                  ? {
                      marginRight: "10px",
                      padding: "6px",
                      backgroundColor: "#333",
                      color: "white",
                    }
                  : {
                      marginRight: "10px",
                      padding: "6px",
                      backgroundColor: "#fff",
                    }
              }
              onClick={() => {
                setSelectedShowId(data.id);
              }}
            >
              {data.movie.name}
              <br />
              {timeSlot[data.startSlot - 1].startTime}
              {" - "}
              {timeSlot[data.startSlot - 2 + data.movie.length].endTime}
            </button>
          );
        })}
        <br />
        <br />
        <br />

        {seatDetails.map((data) => {
          return (
            <button
              key={data.id}
              disabled={data.isReserved}
              style={
                isSelectedSeat(data.id)
                  ? {
                      marginRight: "10px",
                      padding: "6px",
                      backgroundColor: "#fde",
                    }
                  : {
                      marginRight: "10px",
                      padding: "6px",
                      backgroundColor: "#fff",
                    }
              }
              onClick={() => {
                if (!selectedSeatList.find((element) => element === data.id)) {
                  var temp = [...selectedSeatList];
                  temp.push(data.id);
                  setSelectedSeatList(temp);
                } else {
                  for (var i = 0; i < selectedSeatList.length; i++) {
                    if (selectedSeatList[i] === data.id) {
                      var temp = [...selectedSeatList];
                      temp.splice(i, 1);
                      setSelectedSeatList(temp);
                    }
                  }
                }
              }}
            >
              {data.id}
            </button>
          );
        })}

        <br />
        <br />
        <br />

        <button onClick={onCreateReservation}>Buy</button>

        <br></br>
        <br></br>
        <br></br>

        {isFailCreate ? (
          <div
            style={{
              color: "red",
            }}
          >
            Fail to buy the ticket.
          </div>
        ) : (
          <></>
        )}
      </div>
    </LayoutCustomer>
  );
};

export default CreateReservationPage;
