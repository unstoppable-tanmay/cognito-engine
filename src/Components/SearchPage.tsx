"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSpeechToText from "react-hook-speech-to-text";

import { FaArrowRight } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";

const SearchPage = ({ search }: { search: string }) => {
  const [searchQuery, setSearchQuery] = React.useState(search);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: false,
    useLegacyResults: false,
  });
  const router = useRouter();

  useEffect(() => {
    setSearchQuery(interimResult!);
  }, [interimResult]);

  return (
    <main className="text-white bg-[#141414] w-full min-h-screen overflow-y-scroll overflow-x-hidden p-6 flex flex-col gap-4 items-center ">
      <div className="header flex gap-4 items-center justify-between w-[clamp(280px,70%,1000px)]">
        <div className="logo font-semibold text-2xl">Khoj</div>
        <div className="searchbar flex items-center px-4 py-3 gap-4 rounded-full w-[clamp(270px,700px,90vw)] bg-[#262626]/90 z-[1000]">
          <RiSearchLine size={21} className="cursor-pointer" />
          <input
            type="text"
            name=""
            id=""
            value={searchQuery!}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/search?q=${searchQuery}`);
              }
            }}
            disabled={isRecording}
            placeholder={isRecording ? "Listining..." : "Search with khoj"}
            className="outline-none flex-1 bg-transparent border-none placeholder:text-white/20 min-w-[50px]"
          />
          {searchQuery && (
            <FaArrowRight
              onClick={(e) => {
                router.push(`/search?q=${searchQuery}`);
              }}
              size={15}
              className="cursor-pointer"
            />
          )}
          <IoMdMic
            onClick={() => {
              if (!isRecording) startSpeechToText();
            }}
            size={21}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="devider w-screen h-[1px] bg-white/10"></div>
      <div className="ans w-[clamp(270px,700px,90vw)] flex flex-col gap-3"></div>
    </main>
  );
};

export default SearchPage;
