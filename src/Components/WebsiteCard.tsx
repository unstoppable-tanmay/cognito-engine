/* eslint-disable @next/next/no-img-element */
import { website } from "@prisma/client";
import Link from "next/link";
import React from "react";

const WebsiteCard = ({ website }: { website: website }) => {
  function extractDomainName(url: string) {
    try {
      const parsedUrl = new URL(url);
      const hostnameParts = parsedUrl.hostname.split(".");
      // Check if the hostname has subdomains
      if (hostnameParts.length > 2) {
        // Extract the second part of the hostname
        return hostnameParts[1];
      } else {
        // Return the full hostname
        return parsedUrl.hostname;
      }
    } catch (error) {
      console.error("Invalid URL:", url);
      return null;
    }
  }

  function formatPath(url: string) {
    try {
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname
        .split("/")
        .filter((segment) => segment !== ""); // Remove empty segments
      return `${parsedUrl.origin} > ${pathSegments.join(" > ")}`;
    } catch (error) {
      console.error("Invalid URL:", url);
      return null;
    }
  }

  return (
    <Link href={website.url} target="_blank">
      <div className="w-full flex flex-col gap-1.5">
        <div className="headerSec flex gap-2 items-center">
          <img
            src={website.ogImage}
            alt=""
            className="w-9 aspect-square rounded-full bg-gray-500"
          />
          <div className="details flex flex-col gap-1">
            <div className="name text-lg font-medium">
              {extractDomainName(website.url)}
            </div>
            <div className="path text-xs font-medium text-white/50">
              {formatPath(website.url)}
            </div>
          </div>
        </div>
        <div className="heading text-xl font-normal">{website.title}</div>
        <div className="desc text-sm text-white/60 line-clamp-2">
          {website.description || "no description provided"}
        </div>
      </div>
    </Link>
  );
};

export default WebsiteCard;
