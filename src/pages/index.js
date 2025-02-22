import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
        if (token) {
          router.replace("/todolist")    
        }
  }, [router])
  return (
    <div className="bg-gray-900 min-h-[100svh] flex justify-center items-center">
      <div className="text-white font-serif font-semibold">
        <h1 className="">Welcome to todolist app.</h1>
        <h1 className="">Please <Link className="text-blue-500 font-normal" href={"/login"}>Login</Link> to continue.</h1>
      </div>
    </div>
  );
}
