import { useEffect, useState } from "react";
import Head from "next/head";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/Container";
import PetSitterForm from "@/components/forms/pet-sitter";

export default function NearbyVet() {
  return (
    <>
      <Head>
        <title>Schedule Pet Sitting</title>
      </Head>
      <div>
        <Header />

        <div class=" bg-white pt-8 py-12">
          <h1 class="mb-10 text-center text-2xl font-bold">Pet Sitter</h1>
          <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <PetSitterForm />
          </div>
        </div>
      </div>
    </>
  );
}
