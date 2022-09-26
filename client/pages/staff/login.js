import { useRouter } from "next/router";
import LayoutStaff from "../../components/LayoutStaff";
import axios from "../../axios";
import { useState } from "react";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFail, setIsLoginFail] = useState(false);
  const login = async () => {
    try {
      const body = { email, password };
      const res = await axios.post("/staff/login", body);

      localStorage.setItem("token", res.data.token);
      router.push("/staff");
    } catch (err) {
      setIsLoginFail(true);
    }
  };
  return (
    <LayoutStaff>
      <h2>Staff Login</h2>
      <div className="input-container">
        <div className="label-input">email: </div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>

      <div className="input-container">
        <div className="label-input">password: </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      <button onClick={login}>Login</button>

      {isLoginFail ? (
        <div className="wrong-input">Incorrect email or password.</div>
      ) : (
        <div></div>
      )}

      <style jsx>{`
        .input-container {
          margin-bottom: 10px;
          display: flex;
        }
        .label-input {
          width: 100px;
        }
        .wrong-input {
          margin-top: 10px;
          color: red;
        }
      `}</style>
    </LayoutStaff>
  );
};

export default Login;
