import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    schLevelId: "",
    userLevel: "",
    password: "",
  });

  const navigate = useNavigate();

  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState("")

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      setMsg(res.data)
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Nur Media.</h1>
          <p>
            " Tanpa pengetahuan, tindakan tidak berguna dan pengetahuan tanpa tindakan adalah sia-sia. " - Abu Bakar
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          {
            msg &&
            <span>{msg}</span>
          }
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="School Level"
              name="schLevelId"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="User Level"
              name="userLevel"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
