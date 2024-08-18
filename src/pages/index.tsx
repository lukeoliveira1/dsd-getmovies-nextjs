import { Email, GitHub } from "@mui/icons-material";
import Logo from "/public/popcorn-logo.svg";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { baseAPI } from "@/services/api";

export default function Login() {
  const router = useRouter();

  const handleGithubLogin = async () => {
    const clientID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const callbackURL = `${process.env.NEXT_PUBLIC_GITHUB_CALLBACK}?provider=github`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${callbackURL}`;
  };

  const handleGoogleLogin = async () => {
    const clientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const callbackURL = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK;
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callbackURL}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const provider = urlParams.get("provider");

    if (code) {
      const fetchData = async () => {
        try {
          let response;

          if (provider === "github") {
            response = await baseAPI.post("/auth/dj-rest-auth/github/", {
              code: code,
            });
          } else {
            response = await baseAPI.post("/auth/dj-rest-auth/google/", {
              code: code,
            });
          }
          if (response?.status === 200 && response.data) {
            const access_token = response.data.key;
            document.cookie = `access_token=${access_token}; path=/; secure; samesite=strict`;
            router.push("/home");
          }
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

      <button
        onClick={handleGoogleLogin}
        className="w-36 h-12 bg-gray-50 mt-4 rounded-xl"
      >
        <Email sx={{ fontSize: 20, lineHeight: 20 }} />
        Gmail
      </button>
    </main>
  );
}
