import { useEffect, useState } from "react";
import axios from "../../axios";

import LayoutCustomer from "../../components/LayoutCustomer";
import Link from "next/link";

const CustomerPage = () => {
  const [isLogin, setIsLogin] = useState(null);

  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/customer/profile");
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
    <LayoutCustomer>
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
          <span>Please </span> <Link href="/customer/login">Login</Link>
        </>
      )}
    </LayoutCustomer>
  );
};

export default CustomerPage;
