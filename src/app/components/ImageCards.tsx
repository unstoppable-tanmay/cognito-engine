/* eslint-disable @next/next/no-img-element */
import { image } from "@prisma/client";
import Link from "next/link";
import React from "react";

const ImageCards = ({ image }: { image: image }) => {
  return (
    <Link href={image.siteURL} target="_blank">
      <div className="flex flex-col gap-2">
        <img
          src={image.imageUrl}
          alt={image.altTag}
          className="w-[clamp(150px,300px,90vw)] rounded-xl aspect-[1/.7] bg-black"
        />
        <div className="title font-lg">{image.siteTitle}</div>
      </div>
    </Link>
  );
};

export default ImageCards;
