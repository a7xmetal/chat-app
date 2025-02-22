import { useState } from "react";
import { GenderCheckBox } from "./GenderCheckBox";
import { NavLink } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
   const [inputs, setInputs] = useState({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
   });

   const handleGenderChange = (gender) => {
      setInputs({ ...inputs, gender });
   };

   const { signup, loading } = useSignup();

   const handeSubmit = async (e) => {
      e.preventDefault();
      // console.log(inputs);
      await signup(inputs);
   };
   return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
         <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
               SignUp
               <span className="text-blue-500">ChatApp</span>
            </h1>

            <form onSubmit={handeSubmit}>
               <div>
                  <label className="label p-2">
                     <span className="text-base label-text">Fullname</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Enter Fullname"
                     className="w-full input input-bordered h-10"
                     value={inputs.fullName}
                     onChange={(e) =>
                        setInputs({ ...inputs, fullName: e.target.value })
                     }
                  />

                  <label className="label p-2">
                     <span className="text-base label-text">Username</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Enter username"
                     className="w-full input input-bordered h-10"
                     value={inputs.username}
                     onChange={(e) =>
                        setInputs({ ...inputs, username: e.target.value })
                     }
                  />

                  <label className="label p-2">
                     <span className="text-base label-text">Password</span>
                  </label>
                  <input
                     type="password"
                     placeholder="Enter Password"
                     className="w-full input input-bordered h-10"
                     value={inputs.password}
                     onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                     }
                  />

                  <label className="label p-2">
                     <span className="text-base label-text">
                        Confirm Password
                     </span>
                  </label>
                  <input
                     type="password"
                     placeholder=" Confirm Password"
                     className="w-full input input-bordered h-10"
                     value={inputs.confirmPassword}
                     onChange={(e) =>
                        setInputs({
                           ...inputs,
                           confirmPassword: e.target.value,
                        })
                     }
                  />
               </div>

               {/* Gender checkbox goes here */}
               <GenderCheckBox
                  onCheckBoxChange={handleGenderChange}
                  selectedGender={inputs.gender}
               />
               <NavLink
                  to="/login"
                  className="text-sm hover-underline hover:text-blue-600 mt-2 inline-block"
               >
                  Already have an account?
               </NavLink>
               <div>
                  <button
                     className="btn btn-block btn-sm mt-2 btn-primary"
                     disabled={loading}
                  >
                     {loading ? (
                        <span className="loading loading-spinner"></span>
                     ) : (
                        "Sign Up"
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default SignUp;
