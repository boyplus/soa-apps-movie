import { useEffect, useState } from "react";
import axios from "../../../axios";

import LayoutStaff from "../../../components/LayoutStaff";
import Link from "next/link";

import formatDate from "../../../hooks/formateDate";
import timeSlot from "../../../store/time-slot";

const ShowPage = () => {
  const dateNow = new Date();
  const [isLogin, setIsLogin] = useState(false);
  const [dateSelect, setDateSelect] = useState(formatDate(dateNow));
  const [showList, setShowList] = useState([]);

  const onDateChange = (event) => {
    setDateSelect(event.target.value);
  };

  const fetchShowSlot = async () => {
    try {
      const res = await axios.get("/staff/show", {
        params: {
          date: dateSelect,
        },
      });
      setShowList(res.data);
      setIsLogin(true);
    } catch (err) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    fetchShowSlot();
  }, [dateSelect]);

  return (
    <LayoutStaff>
      {isLogin ? (
        <div>
          <h1>Show List</h1>

          <Link href={"/staff/shows/create"}>
            <button>+</button>
          </Link>
          <br />
          <br />
          <br />
          <input type="date" value={dateSelect} onChange={onDateChange} />
          <br />
          <br />
          <ul>
            {showList.map((data) => {
              return (
                <li key={data.id}>
                  <Link href={`/staff/shows/${data.id}`}>
                    <a>
                      Name:&nbsp;{data.movie.name}
                      {/* <br />
                      Description:&nbsp;{data.movie.description} */}
                      <br />
                      Location:&nbsp;{data.location.name}
                      <br />
                      Time:&nbsp;{timeSlot[data.startSlot - 1].startTime}
                      {" - "}
                      {timeSlot[data.startSlot - 2 + data.movie.length].endTime}
                      <br />
                      <br />
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          <span>Please </span> <Link href="/staff/login">Login</Link>
        </>
      )}
    </LayoutStaff>
  );
};

export default ShowPage;
