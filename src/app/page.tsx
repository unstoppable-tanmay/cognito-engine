"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSpeechToText from "react-hook-speech-to-text";

import { FaArrowRight } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";

export default function Home() {
  const search = () => {};
  const [searchQuery, setSearchQuery] = React.useState("");
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
    // router.push(`/search?q=${searchQuery}`);
  }, [interimResult]);
  return (
    <main className="bg-[#141414] flex items-center justify-center p-6 flex-col w-screen h-screen relative overflow-hidden">
      {/* Page Header */}
      <div className="name font-bold text-[clamp(70px,8vw,100px)] text-white/5 tracking-wider -mt-[clamp(70px,8vw,100px)] select-none">
        Khoj
      </div>
      {/* SearchBar */}
      <div className="searchbar flex items-center px-4 py-3 gap-4 rounded-full w-[clamp(270px,500px,90vw)] bg-[#262626]/90 z-[1000]">
        <RiSearchLine size={21} className="cursor-pointer" />
        <input
          type="text"
          name=""
          id=""
          value={searchQuery}
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
        {searchQuery && !isRecording && (
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
    </main>
  );
}
