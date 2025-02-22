import { useLogin } from "@/hooks/useLogin";
import { login } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();
  const user = useLogin();

  useEffect(() => {
    if (user) {
      router.replace("/todolist")
    }
  }, [user, router])

  async function handleLogin(event) {
    event.preventDefault();

    const payload = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    const res = await login(payload);
    if (res.status == 200) {
      router.push("/todolist");
      localStorage.setItem("token",res.data.token);
      console.log("token tersimpan");
      
    } else {
      console.log(res);
      setErrorMessage(res.error?.response?.data.data || res.response?.data.data || res.message);
    }
  }

  

  return (
    <div className="bg-gray-900 min-h-[100svh] text-white">
      <div className="flex justify-center p-7">
        <svg className="size-12 border rounded-xl p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z" /></svg>
      </div>
      <h1 className="text-2xl font-light text-center">Sign in to <span className="line-through">GitHub</span> TodoList</h1>

      <div className="flex flex-col items-center justify-center mt-5">
        <form onSubmit={handleLogin} className="border border-gray-600 bg-gray-800 w-[360px] p-5 rounded-lg">
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username">Username <span className="line-through">or email address</span></label>
            <input name="username" id="username" className="bg-gray-900 border border-gray-600 rounded p-1" type="text" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <label htmlFor="password">Password</label>
              <p className="text-blue-500">Forgot password?</p>
            </div>
            <input name="password" id="password" className="bg-gray-900 border border-gray-600 rounded p-1" type="password" />
          </div>
          <div className="flex justify-center items-center bg-green-600 rounded py-1">
            <button type="submit" className="font-semibold w-full h-full">Sign In</button>
          </div>
        </form>
        <div className="border mt-4 border-gray-600 w-[360px] min-h-24 rounded-lg flex flex-col items-center justify-center gap-2 py-2">
          <p className="text-red-500">{errorMessage}</p>
          <a className="text-blue-500 font-semibold" href="">Sign in with a passkey</a>
          <p className="">New to Todolist? <Link href={"/register"} className="text-blue-500">Create an account</Link></p>
        </div>
      </div>
    </div>
  )
};
