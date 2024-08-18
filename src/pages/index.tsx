import { Google, GitHub } from "@mui/icons-material";
import Logo from "/public/popcorn-logo.svg";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "@/context/userContext";
import AuthService from "@/services/auth";

import Cookies from "universal-cookie";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const { setUser } = useUserContext();

  useEffect(() => {
    const state = router.query.state as string;

    if (router.query.code) {
      const authService = new AuthService();
      if (state === "github") {
        authService
          .loginByGithub(router.query.code as string)
          .then((response) => {
            if (response && response.accessToken) {
              const cookies = new Cookies();
              cookies.set("accessToken", response.accessToken, { path: "/" });
              setUser(response.user);
              router.push("/home");
            }
          });
      } else {
        authService
          .loginByGoogle(router.query.code as string)
          .then((response) => {
            if (response && response.accessToken) {
              const cookies = new Cookies();
              cookies.set("accessToken", response.accessToken, { path: "/" });
              setUser(response.user);
              router.push("/home");
            }
          });
      }
    }
  }, [router.query]);

  return (
    <main className="bg-gradient-to-r from-red-800 to-red-600 h-[100vh] flex flex-col items-center justify-center">
      <Image src={Logo} width={195} height={195} alt="logo" />

      <h1 className="uppercase text-[31px] text-white font-bold mt-[26px]">
        Login GetMovies
      </h1>

      <div className="flex w-80 justify-around">
        <Link
          style={{ width: "100%", textDecoration: "none" }}
          href={process.env.NEXT_PUBLIC_GITHUB_LOGIN_URL as string}
        >
          <button className="w-36 h-12 bg-gray-50 mt-4 rounded-xl flex justify-around items-center p-6">
            <GitHub sx={{ fontSize: 20, lineHeight: 20 }} />
            Github
          </button>
        </Link>

        <Link
          style={{ width: "100%", textDecoration: "none" }}
          href={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL as string}
        >
          <button className="w-36 h-12 bg-gray-50 mt-4 rounded-xl flex justify-around items-center p-6">
            <Google sx={{ fontSize: 20, lineHeight: 20 }} />
            Google
          </button>
        </Link>
      </div>
    </main>
  );
}
