/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSpeechToText from "react-hook-speech-to-text";

import { FaArrowRight, FaImage } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { image, website } from "@prisma/client";
import WebsiteCard from "@/Components/WebsiteCard";
import ImageCards from "@/Components/ImageCards";
import { CgWebsite } from "react-icons/cg";
import { MdImage } from "react-icons/md";
import { TiImage } from "react-icons/ti";

const SearchPage = ({
  search,
  websites,
  images,
}: {
  search: string;
  websites: website[];
  images: image[];
}) => {
  const [searchQuery, setSearchQuery] = React.useState(search);
  const [website, setWebsite] = useState(true);
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
    <main className="text-white bg-[#141414] w-full min-h-screen overflow-y-scroll overflow-x-hidden p-6 flex flex-col gap-4 items-center ">
      <div className="header flex gap-4 items-center justify-center w-[clamp(250px,70%,1000px)]">
        <div className="logo font-semibold text-2xl hidden sm:flex">Khoj</div>
        <div className="searchbar flex items-center px-4 py-3 gap-4 rounded-full flex-1 bg-[#262626]/90 z-[1000]">
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
      </div>
      <div className="choose flex w-[clamp(280px,70%,1000px)]">
        <div
          onClick={(e) => setWebsite(true)}
          className="websites select-none flex-1 flex gap-1 items-center justify-center py-1.5 rounded-full hover:bg-white/5 duration-300 cursor-pointer"
        >
          Websites <CgWebsite />
        </div>
        <div
          onClick={(e) => setWebsite(false)}
          className="images select-none flex-1 flex gap-1 items-center justify-center py-1.5 rounded-full hover:bg-white/5 duration-300 cursor-pointer"
        >
          Images <TiImage size={21} className="mt-1" />
        </div>
      </div>
      <div className="devider w-screen h-[1px] bg-white/10"></div>
      {website ? (
        websites.length ? (
          <div className="ans w-[clamp(270px,900px,90vw)] flex flex-col gap-12">
            {websites.map((website) => (
              <WebsiteCard website={website} key={website.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center w-[clamp(270px,700px,90vw)] text-4xl text-white/30 text-center">
            May Our Spider Not Reached Yet 🕷
          </div>
        )
      ) : images.length ? (
        <div className="ans w-[clamp(270px,1000px,90vw)] justify-center flex flex-row gap-5 flex-wrap">
          {images.map((image) => (
            <ImageCards image={image} key={image.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center w-[clamp(270px,700px,90vw)] text-4xl text-white/30 text-center">
          May Our Spider Not Reached Yet 🕷
        </div>
      )}
    </main>
  );
};

export default SearchPage;
