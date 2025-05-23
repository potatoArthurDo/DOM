import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Link } from "react-router-dom";

function Form({ route, method }) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const initialFormData = Object.freeze({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [userData, updateUserData] = useState(initialFormData);
  const handlechange = (e) => {
    updateUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else if (method === "register") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="background">
      {method === "login" ? (
        <form
          onSubmit={handleSubmit}
          className="custom-gradient w-[30vw] h-[50vh] flex flex-col  items-center border border-blue-50 rounded-md "
        >
          {/* <h1>{name}</h1> */}
          <input
            className=" mt-25 my-2 h-[12%] w-[60%] px-4 py-2 rounded-md border border-gray-700 bg-blue-500 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
          />

          <input
            className="my-2 w-[60%] h-[12%] px-4 py-2 rounded-md border border-gray-700 bg-blue-500 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
            className="text-white bg-red-100 w-[50%] py-1 m-2 rounded-md border border-blue-50 cursor-pointer hover:ring-1 hover:ring-yellow-100 "
            type="submit"
          >
            {name}
          </button>
          <div className="m-2">
            <Link className="text-gray-100">Forgot password?</Link>
            <br />
            <Link className="text-white " to="/register">
              Sign up
            </Link>
          </div>
        </form>
      ) : (
        <div className="register-form">
          <form
            onSubmit={handleSubmit}
            className="custom-gradient w-[30vw] h-[60vh] flex flex-col items-center border border-blue-50 rounded-md"
          >
            <h1 className="text-white text-xl my-2">{name}</h1>

            <input
              className="mt-2 my-2 h-[12%] w-[60%] px-4 py-2 rounded-md border border-gray-700 bg-blue-500 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-50"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Username"
              name="username"
            />

            <input
              className="my-2 h-[12%] w-[60%] px-4 py-2 rounded-md border border-gray-700 bg-blue-500 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-50"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <input
              className="my-2 h-[12%] w-[60%] px-4 py-2 rounded-md border border-gray-700 bg-blue-500 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-50"
              type="password"
              placeholder="Re-enter Password"
            />

            <button
              className="text-white bg-red-100 w-[50%] py-1 m-2 rounded-md border border-blue-50 cursor-pointer hover:ring-1 hover:ring-yellow-100"
              type="submit"
            >
              {name}
            </button>

            <div className="m-2">
              <Link className="text-white" to="/login">
                Already have an account?
              </Link>
            </div>
          </form>

          {/* <form onSubmit={handleSubmit} className="form-container-register" >
          <h1>{name}</h1>
          <input
            className="form-input-register"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
          />

          <input
            className="form-input-register"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            className="form-input-register"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </form> */}
        </div>
      )}
    </div>
  );
}

export default Form;
