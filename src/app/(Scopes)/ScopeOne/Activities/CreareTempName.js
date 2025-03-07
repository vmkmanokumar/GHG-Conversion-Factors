"use client";
import React, { useState } from "react";
import { useScopeOne } from "../Context/ScopeOneContext";

export default function CreateTempName() {
   const {
      selectedFuels,
      templatecontent, settemplatecontent
    } = useScopeOne();

    console.log("temp name page",selectedFuels)


  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[500px] mx-auto mt-10 p-6 rounded-xl shadow-lg min-h-[200px]">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Enter Template Name</h1>

      <input
        type="text"
        placeholder="Template Name"
        className="w-full px-4 py-2 border rounded-md text-lg focus:outline-none focus:border-emerald-500"
        value={templatecontent}
        onChange={(e) => settemplatecontent(e.target.value)}
      />
    </div>
  );
}
