import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const username = jwtDecode(token).sub;
      setUser(username);
    } else {
      router.replace("/login")
      return;
    }
  },[router])  
  return user;
}