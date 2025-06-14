'use client'; // 如果你用 Next.js App Router 且這是 client component

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import cdReaderImg from "@/../public/cd-black.png";

export default function CdPlayer() {

  const messages = [
    "每週四晚上７點，﹁圭師傅好可愛﹂就在恩米克斯電視台，期待與您在空中相見。",
    "原定播放之︻猜猜今晚幾點睡︼因不可抗力因素臨時取消，下次請早。",
    "希望垂直跑馬燈測試一次就成功！",
  ];

  // 直接在組件初始化時準備文字
  const displayText = [...messages, ...messages, ...messages].join('');

  return (
    <div className="w-full h-screen flex gap-8 bg-white justify-center items-center">
      {/* 跑馬燈 */}
      <div className="w-[6%] h-[100vh] bg-amber-300 overflow-hidden relative text-white text-[36px] text-shadow-black/10 text-shadow-lg leading-none">
        <div className="absolute animate-scrollCharacters">
          {displayText.split('').map((char, index) => (
            <div key={index} className="h-[44px] w-[88px] flex items-center justify-center">
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* cdPlayer */}
      <div className="w-[50%] h-full bg-gray-200 items-center">
      <Image
        src="/profile.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      </div>

      {/* 台灣地圖 */}
      <div className="w-[38%] h-full bg-gray-400 flex items-center">
        taiwan
      </div>
    </div>
  );
}
