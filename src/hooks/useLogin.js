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

export const useAdmin = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const role = jwtDecode(token).role;
      if (role !== 'ADMIN') {
        alert('User tidak tidak memilik hak akses!');
        router.replace('/todolist');
      }
    }
  }, [router]);
}

export const useIsAdmin = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const role = jwtDecode(token).role;
      setIsAdmin(role == "ADMIN");
    }
  }, [router]);
  
  return isAdmin;
};

export const useToken = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    const local = localStorage.getItem("token")
    if (local) {
      setToken(local);
    }
  }, [])

  return token;
}