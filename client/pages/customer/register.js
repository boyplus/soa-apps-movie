import { useRouter } from "next/router";
import LayoutCustomer from "../../components/LayoutCustomer";
import axios from "../../axios";
import { useState } from "react";

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegisterFail, setIsRegisterFail] = useState(false);

  const register = async () => {
    try {
      const body = { email, password, name };
      const res = await axios.post("/customer/register", body);

      router.push("/customer/login");
    } catch (err) {
      setIsRegisterFail(true);
    }
  };

  const login = () => {
    router.push("/customer/login");
  };

  return (
    <LayoutCustomer>
      <h2>Customer Register</h2>
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

      <div className="input-container">
        <div className="label-input">name: </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>

      <button onClick={register}>Register</button>

      <br></br>
      <br></br>
      <br></br>

      <button onClick={login}>Login Instead</button>

      {isRegisterFail ? (
        <div className="wrong-input">Fail to register.</div>
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
    </LayoutCustomer>
  );
};

export default Register;
