import { useEffect, useState } from "react";
import axios from "../../../axios";

import LayoutStaff from "../../../components/LayoutStaff";
import { useRouter } from "next/router";

import formatDate from "../../../hooks/formateDate";
import timeSlot from "../../../store/time-slot";

const CreateShowPage = () => {
  const router = useRouter();
  const dateNow = new Date();
  const [dateSelect, setDateSelect] = useState(formatDate(dateNow));
  const [showSlotReserved, setShowSlotReserved] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [isFailCreate, setIsFailCreate] = useState(false);

  const onDateChange = (event) => {
    setDateSelect(event.target.value);
  };

  const onSelectMovie = (event) => {
    setSelectedMovieId(event.target.value);
  };

  const onSelectSlot = (event) => {
    setSelectedSlot(event.target.value);
  };

  const fetchShowSlot = async () => {
    try {
      const res = await axios.get("/staff/show/slot", {
        params: {
          date: dateSelect,
        },
      });
      setShowSlotReserved(res.data);
      var index = 0;
      while (res.data[index].isReserved) {
        index += 1;
      }
      setSelectedSlot(res.data[index].id);
    } catch (err) {}
  };

  const fetchMovieList = async () => {
    try {
      const res = await axios.get("/util/movie");
      setMovieList(res.data);
      setSelectedMovieId(res.data[0].id);
    } catch (err) {}
  };

  const onCreateShow = async () => {
    try {
      const res = await axios.post("/staff/show", {
        movieId: parseInt(selectedMovieId),
        startSlot: parseInt(selectedSlot),
        startDate: dateSelect,
      });
      router.replace("/staff/shows");
    } catch (err) {
      setIsFailCreate(true);
    }
  };

  useEffect(() => {
    fetchShowSlot();
  }, [dateSelect]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <LayoutStaff>
      <div>
        <h1>Create Show</h1>

        <div
          style={{ display: "flex", flexDirection: "row", columnGap: "200px" }}
        >
          <div>
            <select onChange={onSelectMovie} value={selectedMovieId}>
              {movieList.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {data.length}&nbsp;slots
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

            <select onChange={onSelectSlot} value={selectedSlot}>
              {timeSlot.map((data, index) => {
                if (showSlotReserved[index]) {
                  if (!showSlotReserved[index].isReserved) {
                    return (
                      <option key={index} value={showSlotReserved[index].id}>
                        {data.startTime}
                      </option>
                    );
                  }
                }
              })}
            </select>

            <br />
            <br />
            <br />

            <button onClick={onCreateShow}>Create</button>
          </div>
          <div>
            {timeSlot.map((data, index) => {
              if (showSlotReserved[index]) {
                if (showSlotReserved[index].isReserved) {
                  return (
                    <div key={index}>
                      {data.startTime}
                      {" - "}
                      {data.endTime}&nbsp;&nbsp;&nbsp;&nbsp;
                      {showSlotReserved[index].movie.name}
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      {data.startTime}
                      {" - "}
                      {data.endTime}
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>

        {isFailCreate ? (
          <div
            style={{
              color: "red",
            }}
          >
            Fail to create the show.
          </div>
        ) : (
          <></>
        )}
      </div>
    </LayoutStaff>
  );
};

export default CreateShowPage;
