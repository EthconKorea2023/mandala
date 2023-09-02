"use client";

import dynamic from "next/dynamic";
import type { NextPage } from "next";

const Root = dynamic(() => import("~~/components/root"), { ssr: false });

// import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
// import { MetaHeader } from "~~/components/MetaHeader";
// import Inventories from "~~/components/inventories";

const Home: NextPage = () => {
  return <Root />;
};

export default Home;
