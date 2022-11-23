/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import React from "react";
export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest): ImageResponse {
  try {
    const todayDate = new Date();

    const { searchParams } = new URL(req.url);

    const qsYear = searchParams.has("year")
      ? searchParams.get("year")
      : todayDate.getFullYear();
    const qsMonth = searchParams.has("month")
      ? searchParams.get("month")
      : todayDate.getMonth() + 1;
    const qsDay = searchParams.has("day")
      ? searchParams.get("day")
      : todayDate.getDate();

    const gameImage = `https://assets.darraghoriordan.com/doodleai/${qsYear}/${qsMonth}/${qsDay}/00001.png`;

    const response = new ImageResponse(
      (
        <div
          tw={`flex flex-col items-center py-15 px-20 mx-auto`}
          style={{
            width: "1200px",
            height: "630px",
            backgroundColor: "#121213",
          }}
        >
          <div tw="flex mb-10 grow  text-white">
            <p tw="p-0 m-0 text-center text-7xl">💡 doodle : ai</p>
          </div>
          <div tw="flex justify-between items-center shrink w-full">
            <div tw="w-1/2 flex">
              <img
                alt="doodle ai game"
                src={gameImage}
                tw="rounded-lg shadow-lg"
                width={400}
                height={400}
              />
            </div>

            <div tw="w-1/2  text-white text-center text-7xl">
              Can you guess what the AI has drawn?
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
    return response;
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
