import SearchPage from "@/Components/SearchPage";
import { redirect } from "next/navigation";
import React from "react";

const Page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  console.log(searchParams);
  if (!searchParams!.q) redirect("/");
  return <SearchPage search={searchParams!.q} />;
};

export default Page;
