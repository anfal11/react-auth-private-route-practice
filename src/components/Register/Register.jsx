import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
    const {createUser, emailVerification} = useContext(AuthContext);
    
    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log("user registered!", name, email, password);

        // create user in firebase
        createUser(email, password)
        .then (result => {
          console.log(result.user);
          Swal.fire(
            'Good job!',
            'Your account is created now!',
            'success'
          )
          emailVerification (email)
          .then(() => {
            if (result.user.emailVerified){
              Swal.fire(
                'Good job!',
                'Please check your email for verification!',
                'success'
              )
            } else {
              Swal.fire(
                'Good job!',
                'Please verify your email!',
                'success'
              )
            }
          })
          .catch (error => {
            console.log(error.message);
          })
        
        })
        .catch (error => {
            console.log(error.message);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'This email has already registered!',
              footer: `<a href='/login'>Please log in </a><span> or create a new account.</span>`
            })
        })
    }

    return (

        <div>
      <h1 className="text-4xl text-center font-extrabold mb-10">
        {" "}
        Register Here{" "}
      </h1>
      <form className="text-sm mt-10" onSubmit={handleRegister}>
        <div className="flex justify-center">
          <div>
            <div className="w-96">
              <label className="mb-3 font-medium text-gray-700 mr-1 ml-4">
                Enter Your Name:
              </label>
              <input
                type="text"
                name="name"
                className="w-60 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none mb-4"
                aria-label="Input"
                placeholder="Your Name" 
              />
            </div>
            <div className="w-96">
              <label className="mb-3 font-medium text-gray-700 mr-1 ml-4">
                Enter Your Email:
              </label>
              <input
                type="email"
                name="email"
                className="w-60 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none mb-4"
                aria-label="Input"
                placeholder="Your Email" required
              />
            </div>
            <div className="w-96">
              <label className="mb-3 font-medium text-gray-700 mr-4 ml-4">
                Your Password:
              </label>
              <input
                type="password"
                name="password" required
                className="w-60 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                aria-label="Input"
                placeholder="Enter Your Password"
              />
            </div>

            <div className="w-96 flex justify-center">
              <button
                type="submit"
                className="w-60 mt-4 xt-button py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white bg-violet-500 transition hover:text-white hover:bg-violet-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <p className="mt-2 text-center">Already have an account? <Link to="/login" className="text-violet-600">Sign In</Link></p>
    </div>
    );
};

export default Register;