import { useState } from "react";
import Logo from "/public/popcorn-logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [searchContent, setSearchContent] = useState("");

  function handleSearch() {
    router.push(`movie/${searchContent}`);
  }

  return (
    <main className="bg-gradient-to-r from-red-800 to-red-600 h-[100vh] flex flex-col items-center justify-center">
      <Image src={Logo} width={195} height={195} alt="logo" />

      <h1 className="uppercase text-[31px] text-white font-bold mt-[26px]">
        GetMovies
      </h1>

      <input
        type="text"
        className="mt-[69px] p-[10px] px-[32px] w-[80%] rounded-full text-[31px]"
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
