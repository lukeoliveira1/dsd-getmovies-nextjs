import { useState } from "react";
import Logo from "/public/popcorn-logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Logout } from "@mui/icons-material";

export default function Home() {
  const router = useRouter();
  const [searchContent, setSearchContent] = useState("");

  function handleSearch() {
    router.push(`movie/${searchContent}`);
  }

  const handleLogout = () => {
    document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    router.push("/");
  };

  return (
    <main className="bg-gradient-to-r from-red-800 to-red-600 h-screen flex flex-col items-center justify-center">
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
