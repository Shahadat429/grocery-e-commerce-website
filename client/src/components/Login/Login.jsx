import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, NavLink, Outlet, useNavigate } from "react-router"
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {

      const { data } = await axios.post(`/api/user/${state}`, formData );

      if (data.success) {
        toast.success("Logged in successfully");
        navigate('/');
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }


    } catch (error) {
      toast.error("Invalid credentials");
    }


  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={() => setShowUserLogin(false)}
        className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative z-40 w-80 sm:w-[352px] bg-white rounded-xl border border-gray-200 px-8 py-10 text-center">
        <h1 className="text-[var(--color-primary)] text-3xl font-medium">
          User <span className="text-gray-600">{state === "login" ? "Login" : "Sign up"}</span>
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Please {state === "login" ? "sign in" : "create an account"} to continue
        </p>

        {/* Name (Signup only) */}
        {state === "register" && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-6 w-full border border-gray-300 px-4 py-2 
            outline-[var(--color-primary)]"/>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-4 w-full border border-gray-300 px-4 py-2 
          outline-[var(--color-primary)]"/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-4 w-full border border-gray-300 px-4 py-2 
          outline-[var(--color-primary)]"/>

        {state === "login" && (
          <p className="text-right text-sm text-[var(--color-primary)] mt-3 cursor-pointer">
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className="mt-5 w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition 
          text-white py-2 rounded-full cursor-pointer">
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="mt-4 text-sm text-gray-400 cursor-pointer">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-[var(--color-primary)] ml-1">Click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
