'use client'; // 如果你用 Next.js App Router 且這是 client component

import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";

export default function CdPlayer() {

  const audioRef = useRef(null);
  const coverRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const angleRef = useRef(0); // 保留目前旋轉角度
  const [isPlaying, setIsPlaying] = useState(true);

  //audio autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // 自動播放（注意：某些瀏覽器需要使用者互動後才允許）
      audio.play().catch(() => {
        console.log("自動播放失敗，需使用者互動");
        setIsPlaying(false);
      });
    }
  }, []);

  // 控制動畫
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      animate();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  // 旋轉動畫邏輯
  const animate = () => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;

    // 每秒轉36度 = 10秒轉一圈
    angleRef.current += (36 * delta) / 1000; //轉速調整處

    if (coverRef.current) {
      coverRef.current.style.transform = `translate(-50%, -50%) rotate(${angleRef.current}deg)`;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  const messages = [
    "每週四晚上７點，﹁圭師傅好驚奇﹂就在恩米克斯電視台，期待與您在空中相見。",
    "原定本日播放之︻猜猜今晚幾點睡︼因不可抗力因素臨時取消，下次請早。",
    "希望垂直跑馬燈測試一次就成功！",
  ];

  // 直接在組件初始化時準備文字
  const displayText = [...messages, ...messages, ...messages].join('');

  return (
    <div className="w-full h-screen flex gap-8 bg-white justify-center items-center">
      
      {/* 跑馬燈 */}
      <div className="w-[6%] h-[100vh] bg-amber-300 overflow-hidden relative text-white 
      text-[36px] text-shadow-black/10 text-shadow-lg leading-none select-none">
        <div className="absolute animate-scrollCharacters">
          {displayText.split('').map((char, index) => (
            <div key={index} className="h-[44px] w-[100%] min-w-[44px] flex p-2 items-center justify-center">
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* cdPlayer */}
      <div className="w-[50%] h-full bg-gray-200 flex items-center justify-center select-none relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/cd-black.png"
            width={500}
            height={500}
            alt="cdPlayer"
          />
        </div>

        {/* 封面 */}
        <div
          ref={coverRef}
          onClick={togglePlay}
          className="absolute left-1/2 top-1/2"
          style={{ transform: 'translate(-50%, -50%) rotate(0deg)' }}
        >
          <Image
            src="/kyujin.jpg"
            className="rounded-full"
            width={300}
            height={300}
            alt="cdCoverImg"
          />
          
        </div>
        <audio ref={audioRef} src="/audio.mp3" loop />

      </div>

      {/* 台灣地圖 */}
      <div className="w-[38%] h-full bg-gray-400 flex justify-center items-center select-none">
        taiwan
      </div>
    </div>
  );
}
