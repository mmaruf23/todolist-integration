import { register } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState();

  async function handleRegister(e) {
  e.preventDefault();

    const payload = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }

    const res = await register(payload);
    console.log(res);  
    if (res.status == 200) {
      alert("register success")
      router.push("/login");
    } else {
      console.log(res.status);
      setErrorMessage(res.error?.response?.data.data || res.response?.data.data || res.message)
    }
  }

  return (
    <div className="bg-gray-900 min-h-[100svh] text-white">
      <div className="flex justify-center p-7">
        <svg className="size-12 border rounded-xl p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z" /></svg>
      </div>
      <h1 className="text-2xl font-light text-center">Sign up to <span className="line-through">GitHub</span> TodoList</h1>

      <div className="flex flex-col items-center justify-center mt-5">
        <form onSubmit={handleRegister} className="border border-gray-600 bg-gray-800 w-[360px] p-5 rounded-lg">
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username">Username</label>
            <input name="username" id="username" className="bg-gray-900 border border-gray-600 rounded p-1" type="text" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email">Email address</label>
            <input name="email" id="email" className="bg-gray-900 border border-gray-600 rounded p-1" type="text" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <label htmlFor="password">New Password</label>
            </div>
            <input name="password" id="password" className="bg-gray-900 border border-gray-600 rounded p-1" type="password" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <label htmlFor="password">Re-type password</label>
            </div>
            <input className="bg-gray-900 border border-gray-600 rounded p-1" type="password" placeholder="Tidak usah deh" disabled/>
          </div>
          <div className="flex justify-center items-center bg-green-600 rounded py-1">
            <button type="submit" className="font-semibold w-full h-full">Sign Up</button>
          </div>
        </form>
        <div className="border mt-4 border-gray-600 w-[360px] h-24 rounded-lg flex flex-col items-center justify-center gap-2">
          <p className="text-red-500">{errorMessage}</p>
          <a className="text-blue-500 font-semibold" href="">Sign up with Google</a>
          <p className="">Already have an account? <Link href={"/login"} className="text-blue-500">Login</Link></p>
        </div>
      </div>
    </div>
  );
};
