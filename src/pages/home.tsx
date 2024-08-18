import { useEffect, useState } from "react";
import Logo from "/public/popcorn-logo.svg";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Person, Logout } from "@mui/icons-material";
import Cookies from "universal-cookie";
import { useUserContext } from "@/context/userContext";
import AuthService from "@/services/auth";

export default function Home() {
  const router = useRouter();
  const [searchContent, setSearchContent] = useState("");
  const { user, setUser } = useUserContext();

  function handleSearch() {
    router.push(`movie/${searchContent}`);
  }

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("accessToken");
    setUser({
      email: "",
      first_name: "",
      last_name: "",
      pk: 0,
      username: "",
    });
    Router.push("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookies = new Cookies();
        const token = cookies.get("accessToken");
        const authService = new AuthService();

        if (token) {
          authService.getUser(token).then((response) => {
            if (response) {
              setUser(response);
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <main className="bg-gradient-to-r from-red-800 to-red-600 h-screen flex flex-col items-center justify-center">
      <div className="w-full flex justify-end mr-72">
        <div className="w-1/4 flex items-center p-4 bg-white shadow-lg rounded-lg">
          <Person
            sx={{ fontSize: 40, lineHeight: 40 }}
            className="text-blue-600 mr-4"
          />
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-gray-800 mb-1">
              {user.username}
            </p>
            <p className="text-lg text-gray-600">{user.first_name}</p>
            {user.last_name && (
              <p className="text-lg text-gray-600">{user.last_name}</p>
            )}
            <p className="text-lg text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mr-72">
        <button
          onClick={handleLogout}
          className="w-36 h-12 bg-gray-50 mt-4 rounded-xl"
        >
          <Logout sx={{ fontSize: 20, lineHeight: 20 }} />
          Sair
        </button>
      </div>
      <Image src={Logo} width={195} height={195} alt="logo" />

      <h1 className="uppercase text-[31px] text-white font-bold mt-2 ">
        GetMovies
      </h1>

      <input
        type="text"
        className="mt-[69px] p-[10px] px-[32px] w-[80%] rounded-xl text-[31px]"
        placeholder="Digite o nome do filme"
        onChange={(e) => setSearchContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (!searchContent.trim()) {
              alert("Campo não preenchido");
            } else {
              handleSearch();
            }
          }
        }}
      />
    </main>
  );
}
