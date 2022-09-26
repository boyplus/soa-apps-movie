import { useEffect, useState } from "react";
import axios from "../../../../axios";

import LayoutAdmin from "../../../../components/LayoutAdmin";
import Link from "next/link";
import { useRouter } from "next/router";

const StaffIdPage = () => {
  const [isLogin, setIsLogin] = useState(null);
  const [staff, setStaff] = useState();
  const [staffName, setStaffName] = useState();
  const [staffEmail, setStaffEmail] = useState();
  const [isFailDelete, setIsFailDelete] = useState(false);
  const [isFailUpdate, setIsFailUpdate] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const fetchStaff = async () => {
    if (id) {
      try {
        const res = await axios.get(`/admin/staff/${id}`);
        setIsLogin(true);
        setStaff(res.data);
        setStaffName(res.data.name);
        setStaffEmail(res.data.email);
      } catch (err) {
        setIsLogin(false);
      }
    }
  };

  const onNameChanged = (event) => {
    setStaffName(event.target.value);
  };

  const onEmailChanged = (event) => {
    setStaffEmail(event.target.value);
  };

  const onDeleteStaff = async () => {
    if (id) {
      try {
        const res = await axios.delete(`/admin/staff/${id}`);
        router.replace("/admin/staffs");
      } catch (err) {
        setIsFailDelete(true);
        setIsFailUpdate(false);
      }
    }
  };

  const onUpdateStaff = async () => {
    if (id) {
      try {
        const res = await axios.patch(`/admin/staff/${id}`, {
          name: staffName,
          email: staffEmail,
        });
        router.replace("/admin/staffs");
      } catch (err) {
        setIsFailUpdate(true);
        setIsFailDelete(false);
      }
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [id]);

  return (
    <LayoutAdmin>
      {isLogin ? (
        <div>
          <h1>Staff Details</h1>
          <p>Name</p>
          <input type="text" value={staffName} onChange={onNameChanged} />
          <br></br>
          <br></br>
          <p>Email</p>
          <input type="text" value={staffEmail} onChange={onEmailChanged} />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button onClick={onDeleteStaff}>Delete</button>
          <br></br>
          <br></br>
          <button onClick={onUpdateStaff}>Save Change</button>
          <br></br>
          <br></br>
          {isFailDelete ? (
            <div
              style={{
                color: "red",
              }}
            >
              Fail to delete the staff.
            </div>
          ) : (
            <></>
          )}
          {isFailUpdate ? (
            <div
              style={{
                color: "red",
              }}
            >
              Fail to update the staff information.
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          <span>Please </span> <Link href="/admin/login">Login</Link>
        </>
      )}
    </LayoutAdmin>
  );
};

export default StaffIdPage;
