import SearchPage from "@/app/pages/SearchPage";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "../../../prisma/prisma";

const Page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  console.log(searchParams);
  if (!searchParams!.q) redirect("/");
  const query = searchParams!.q;
  const websites = await prisma.website.findMany({
    orderBy: {
      backLinks: "asc",
    //   loadTime: "asc",
    },
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { urlKeywords: { has: query } },
        { headings: { has: query } },
        { mainKeywords: { has: query } },
      ],
    },
  });
  const images = await prisma.image.findMany({
    where: {
      OR: [
        { siteTitle: { contains: query, mode: "insensitive" } },
        { altTag: { contains: query, mode: "insensitive" } },
      ],
    },
  });
  return (
    <SearchPage search={searchParams!.q} websites={websites} images={images} />
  );
};

export default Page;
