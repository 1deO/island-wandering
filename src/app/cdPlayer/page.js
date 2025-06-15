'use client';

import React, { useState, useRef } from 'react';
import Image from "next/image";
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

function DraggableCover({ isPlaying, togglePlay, position, currentArea }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: 'cd-cover' });
  const [isDragging, setIsDragging] = useState(false);

  const style = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    transform: 'translate(-50%, -50%)',
    zIndex: 99,
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging && currentArea === 'player') {
      togglePlay();
    }
    setIsDragging(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`cursor-pointer ${isPlaying ? 'animate-spin-slow' : ''}`}
    >
      <Image
        src="/kyujin.jpg"
        className="rounded-full"
        width={360}
        height={360}
        alt="cdCoverImg"
        draggable="true"
      />
    </div>
  );
}

function DroppableArea({ id, children, className }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}

export default function CdPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [coverPosition, setCoverPosition] = useState({ x: '50%', y: '50%' });
  const [currentArea, setCurrentArea] = useState('taiwan');

  const handleDragEnd = (event) => {
    const { over } = event;

    if (over) {
      if (over.id === 'cd-player') {
        setCurrentArea('player');
        setCoverPosition({ x: '27%', y: '22.5%' });
        if (!isPlaying) {
          togglePlay();
        }
      } else if (over.id === 'taiwan') {
        setCurrentArea('taiwan');
        setCoverPosition({ x: '50%', y: '50%' });
        if (isPlaying) {
          togglePlay();
        }
      }
    }
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
    "每週四晚上７點，﹁圭師傅好驚奇﹂就在恩米克斯電視台，期待與您在空中相會。",
    "原定本日播放之︻猜猜今晚幾點睡︼因不可抗力因素臨時取消，下次請早睡。",
    "︻大展鴻圖︼銀龍魚親手提筆字，阿叔都點頭，有料。",
  ];

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
      <DndContext onDragEnd={handleDragEnd}>
        <DroppableArea 
          id="cd-player" 
          className="w-[50%] h-full bg-gray-200 flex items-center justify-center select-none relative overflow-hidden"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150">
            <Image
              src="/cd-black.png"
              width={1000}
              height={1000}
              alt="cdPlayer"
            />
          </div>
          {currentArea === 'player' && ( //player
            <DraggableCover 
              isPlaying={isPlaying} 
              togglePlay={togglePlay} 
              position={coverPosition}
              currentArea={currentArea}
            />
          )}
          <audio ref={audioRef} src="/audio.mp3" loop />
        </DroppableArea>

        {/* 台灣地圖 */}
        <DroppableArea 
          id="taiwan" 
          className="w-[38%] h-full bg-gray-400 flex justify-center items-center select-none relative"
        >
          {currentArea === 'taiwan' && (
            <DraggableCover 
              isPlaying={isPlaying} 
              togglePlay={togglePlay} 
              position={coverPosition}
              currentArea={currentArea}
            />
          )}
        </DroppableArea>
      </DndContext>
    </div>
  );
}
