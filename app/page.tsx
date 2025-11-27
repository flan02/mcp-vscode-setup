"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("retro"); // 'retro' or 'girly'

  const toggleTheme = () => {
    setTheme(theme === "retro" ? "girly" : "retro");
  };

  const isRetro = theme === "retro";

  return (
    <div
      className={`flex min-h-screen items-center justify-center font-sans transition-colors duration-500 ${isRetro ? "bg-black font-mono" : "bg-pink-50 font-serif"
        }`}
    >
      <main
        className={`relative flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-24 px-8 sm:px-16 transition-colors duration-500 ${isRetro ? "bg-black" : "bg-white"
          }`}
      >
        <button
          onClick={toggleTheme}
          className={`absolute top-8 right-8 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${isRetro
            ? "bg-green-500 text-black hover:bg-green-400"
            : "bg-pink-500 text-white hover:bg-pink-400"
            }`}
        >
          Switch Style
        </button>

        <Image
          className={isRetro ? "invert" : ""}
          src={
            isRetro
              ? "/joystick-8bits.png"
              : "/rose.png"
          }
          alt={isRetro ? "8-bit Joystick" : "Elegant Flower"}
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1
            className={`text-3xl font-semibold leading-10 tracking-tight ${isRetro
              ? "text-green-400 animate-pulse"
              : "text-pink-800"
              }`}
          >
            {isRetro ? "PRESS START" : "Bloom with Style"}
          </h1>
          <p
            className={`max-w-md text-lg leading-8 ${isRetro ? "text-green-400" : "text-zinc-600"
              }`}
          >
            {isRetro
              ? "Your 8-bit adventure begins now. Choose your path."
              : "Discover a world of elegance and charm. Your journey awaits."}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            href="#"
            className={`flex h-12 w-full items-center justify-center rounded-md px-5 transition-colors md:w-[158px] ${isRetro
              ? "border-2 border-dashed border-green-400 text-green-400 hover:bg-green-900"
              : "bg-pink-500 text-white hover:bg-pink-600 rounded-full"
              }`}
          >
            {isRetro ? "Level 1" : "Explore"}
          </a>
          <a
            href="#"
            className={`flex h-12 w-full items-center justify-center rounded-md border border-solid px-5 transition-colors md:w-[158px] ${isRetro
              ? "border-green-400/50 text-green-400/70 hover:bg-green-900/50"
              : "border-pink-200 text-pink-500 hover:bg-pink-100 rounded-full"
              }`}
          >
            {isRetro ? "High Scores" : "Gallery"}
          </a>
          <a
            href="/movies"
            className={`flex h-12 w-full items-center justify-center rounded-md border border-solid px-5 transition-colors md:w-[158px] ${isRetro
              ? "border-green-400/50 text-green-400/70 hover:bg-green-900/50"
              : "border-pink-200 text-pink-500 hover:bg-pink-100 rounded-full"
              }`}
          >
            Movies
          </a>
        </div>
      </main>
    </div>
  );
}
