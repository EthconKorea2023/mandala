import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import Inventories from "~~/components/inventories";

const Home: NextPage = () => {
  return (
    <>
      <Inventories />
    </>
  );
};

export default Home;
