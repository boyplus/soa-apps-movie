import { useEffect, useState } from "react";
import axios from "../../axios";

import LayoutAdmin from "../../components/LayoutAdmin";
import Link from "next/link";

const AdminPage = () => {
  const [isLogin, setIsLogin] = useState(null);

  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/admin/profile");
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
    <LayoutAdmin>
      {isLogin ? (
        <div>
          <h1>Profile</h1>
          <p>
            Name:&nbsp;{profile.name}
            <br />
            Email:&nbsp;{profile.email}
            <br />
          </p>
        </div>
      ) : (
        <>
          <span>Please </span> <Link href="/admin/login">Login</Link>
        </>
      )}
    </LayoutAdmin>
  );
};

export default AdminPage;
