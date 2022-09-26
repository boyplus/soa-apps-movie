import { useEffect, useState } from "react";
import axios from "../../axios";

import LayoutStaff from "../../components/LayoutStaff";
import Link from "next/link";

const StaffPage = () => {
  const [isLogin, setIsLogin] = useState(null);

  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/staff/profile");
      setIsLogin(true);
      setProfile(res.data);
    } catch (err) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <LayoutStaff>
      {isLogin ? (
        <div>
          <h1>Profile</h1>
          <p>
            Name:&nbsp;{profile.name}
            <br />
            Email:&nbsp;{profile.email}
            <br />
            Location:&nbsp;{profile.location ? profile.location.name : ""}
          </p>
        </div>
      ) : (
        <>
          <span>Please </span> <Link href="/staff/login">Login</Link>
        </>
      )}
    </LayoutStaff>
  );
};

export default StaffPage;
