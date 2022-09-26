import { useEffect, useState } from "react";
import axios from "../../../axios";

import LayoutAdmin from "../../../components/LayoutAdmin";
import Link from "next/link";

const StaffPage = () => {
  const [isLogin, setIsLogin] = useState(null);

  const [staffList, setStaffList] = useState([]);

  const fetchStaffList = async () => {
    try {
      const res = await axios.get("/admin/staff");
      setIsLogin(true);
      setStaffList(res.data);
    } catch (err) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);

  return (
    <LayoutAdmin>
      {isLogin ? (
        <div>
          <h1>Staff List</h1>

          <Link href={"/admin/staffs/create"}>
            <button>+</button>
          </Link>

          <ul>
            {staffList.map((data) => {
              return (
                <li key={data.id} style={{ margin: "20px" }}>
                  <Link href={`/admin/staffs/${data.id}`}>
                    <a>
                      Name:&nbsp;{data.name}
                      <br></br>
                      Email:&nbsp;{data.email}
                      <br></br>
                      Location:&nbsp;
                      {data.location ? data.location.name : "Didn't assign"}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          <span>Please </span> <Link href="/admin/login">Login</Link>
        </>
      )}
    </LayoutAdmin>
  );
};

export default StaffPage;
