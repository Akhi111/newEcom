import { useState } from "react";
import logoImg from "..//assets/image.png";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <section className=" container w-full px-2 mx-auto bg-yellow-100">
      <div className=" my-4 mx-auto w-full max-w-lg rounded p-4 bg-red-300">
        <img
          src={logoImg}
          alt="logoImg"
          className="mx-auto mb-4 object-cover w-12 h-12"
        />
        <p className=" text-xl font-semibold text-center">
          {"India's"} last minute app
        </p>
        <p className=" text-lg font-semibold text-center mb-4 ">Login</p>
        <form className=" grid">
          <div className=" grid mb-2 mx-auto">
            <label htmlFor="name" className="">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoFocus
              className="rounded"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div className=" grid mb-2 mx-auto">
            <label htmlFor="email" className="">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoFocus
              className="rounded"
            />
          </div>

          <div className=" grid mb-2 mx-auto">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              className=" rounded"
            />
          </div>
          <div className=" flex justify-center pb-4">
            <button
              type="submit"
              className=" bg-slate-600 p-2 rounded text-white"
            >
              Login
            </button>
          </div>
          <div className=" flex justify-center">
            <p className=" text-neutral-400 text-xs">
              By continuing, you agree to our Terms of service & Privacy policy
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
