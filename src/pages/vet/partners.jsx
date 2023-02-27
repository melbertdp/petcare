import Head from "next/head";
import { Header } from "@/components/layout/Header";
import VetPartners from "@/components/vetParners/list";

import vetList from "@/data/vetlist.json";

export default function NearbyVet() {
  return (
    <>
      <Head>
        <title>Book online consultation</title>
      </Head>
      <div>
        <Header />

        <div class=" bg-white pt-8">
          <h1 class="mb-10 text-center text-2xl font-bold">Our Vet Parners</h1>
          <div class="overflow-hidden pt-1 pb-20 sm:py-1 lg:pb-32 xl:pb-36">
            <VetPartners vetList={vetList} />
          </div>
        </div>
      </div>
    </>
  );
}
