"use client";

import React from "react";
import Link from "next/link";
import Main from "../../components/Main/Main";
import PetRater from "../../components/PetRater";

export default function MainPage() {
  return (
    <Main>
      <div className="flex flex-col items-center justify-center py-8 px-6 gap-6">
        <PetRater />
      </div>
    </Main>
  );
}
