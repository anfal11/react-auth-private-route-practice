/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Form submitted!", email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);

        e.target.reset();
        Swal.fire(
          'Good job!',
          'You are now logged in!',
          'success'
        )
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        {
          error.message &&
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "This email is not registered!",
              footer: `<a href='/register'>Please register </a><span> or log in with Google.</span>`,
            });
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then(result => {
      console.log(result.user);
      navigate("/");
      Swal.fire(
        'Good job!',
        'You are now logged in with google!',
        'success'
      )
    })
    .catch (error => {
      console.log(error.message);
    })
  }

  

  return (
    <div>
      <h1 className="text-4xl text-center font-extrabold mb-10">
        {" "}
        Log In Here{" "}
      </h1>
      <form className="text-sm mt-10" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div>
            <div className="w-96">
              <label className="mb-3 font-medium text-gray-700 mr-1 ml-4">
                Enter Your Email:
              </label>
              <input
                type="email"
                name="email"
                className="w-60 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none mb-4"
                aria-label="Input"
                placeholder="Your Email"
              />
            </div>
            <div className="w-96">
              <label className="mb-3 font-medium text-gray-700 mr-4 ml-4">
                Your Password:
              </label>
              <input
                type="password"
                name="password"
                className="w-60 mb-3 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                aria-label="Input"
                placeholder="Enter Your Password"
              />
              <label className="mb-3 font-medium text-gray-700 mr-4 ml-4 flex justify-center">
                Forget your password?{" "}
                <a href="#" className="text-blue-500">
                  {" "}
                  Click here
                </a>
              </label>
            </div>

            <div className="w-96 flex justify-center">
              <button
                type="submit"
                className="w-60 mt-4 xt-button py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white bg-violet-500 transition hover:text-white hover:bg-violet-800"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>

      <p className="mt-2 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-violet-600">
          Register here
        </Link>
      </p>
      <div>
      <p className="mt-2 text-center">Or sign in with <button onClick={handleGoogleSignIn}><FcGoogle className="flex justify-center"></FcGoogle> </button></p>
      </div>
    </div>
  );
};

export default Login;
