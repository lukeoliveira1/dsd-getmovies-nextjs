import { GitHub } from "@mui/icons-material";
import Logo from "/public/popcorn-logo.svg";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { baseAPI } from "@/services/api";

export default function Login() {
  const router = useRouter();

  const handleGithubLogin = async () => {
    const clientID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const callbackURL = process.env.NEXT_PUBLIC_GITHUB_CALLBACK;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${callbackURL}`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const fetchData = async () => {
        try {
          const response = await baseAPI.post("/auth/dj-rest-auth/github/", {
            code: code,
          });

          const access_token = response.data;
          localStorage.setItem("access_token", access_token.token);

          router.push("/home");
        } catch (error) {
          console.error("Erro ao fazer a requisição:", error);
        }
      };
      fetchData();
    } else {
      console.error("Authorization code not found in URL.");
    }
  }, []);

  return (
    <main className="bg-gradient-to-r from-red-800 to-red-600 h-[100vh] flex flex-col items-center justify-center">
      <Image src={Logo} width={195} height={195} alt="logo" />

      <h1 className="uppercase text-[31px] text-white font-bold mt-[26px]">
        Login GetMovies
      </h1>

      <button
        onClick={handleGithubLogin}
        className="w-36 h-12 bg-gray-50 mt-4 rounded-xl"
      >
        <GitHub sx={{ fontSize: 20, lineHeight: 20 }} />
        Github
      </button>
    </main>
  );
}
