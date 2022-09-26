import { useEffect, useState } from "react";
import axios from "../../../axios";

import LayoutCustomer from "../../../components/LayoutCustomer";
import Link from "next/link";

import timeSlot from "../../../store/time-slot";

const ReservationPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [reservationList, setReservationList] = useState([]);
  const onFetchReservation = async () => {
    try {
      const res = await axios.get("/customer/reservation");
      setReservationList(res.data);

      setIsLogin(true);
    } catch (err) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    onFetchReservation();
  }, []);

  return (
    <LayoutCustomer>
      {isLogin ? (
        <div>
          <h1>Your Ticket</h1>

          <Link href={"/customer/reservation/create"}>
            <button>+</button>
          </Link>

          <ul>
            {reservationList.map((data) => {
              return (
                <li key={data.id} style={{ margin: "20px" }}>
                  Ticket ID:&nbsp;{data.id}
                  <br></br>
                  Movie:&nbsp;{data.show.movie.name}
                  <br></br>
                  Location:&nbsp;{data.show.location.name}
                  <br></br>
                  Seat:&nbsp;{data.seatId}
                  <br></br>
                  Date:&nbsp;{data.show.startDate}
                  <br></br>
                  Time:&nbsp;{timeSlot[data.show.startSlot - 1].startTime}
                  {" - "}
                  {
                    timeSlot[data.show.startSlot - 2 + data.show.movie.length]
                      .endTime
                  }
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          <span>Please </span> <Link href="/customer/login">Login</Link>
        </>
      )}
    </LayoutCustomer>
  );
};

export default ReservationPage;
