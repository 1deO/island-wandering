'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import YouTube from 'react-youtube';

function DraggableCover({ isPlaying, togglePlay, position, currentArea, hasStarted }) {
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
      className={`cursor-pointer ${isPlaying && hasStarted ? 'animate-spin-slow' : ''}`}
    >
      <Image
        src="/south.png"
        className="rounded-full"
        width={currentArea === 'taiwan' ? 150 : 360}
        height={currentArea === 'taiwan' ? 150 : 360}
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [coverPosition, setCoverPosition] = useState({ x: '45%', y: '90%' });
  const [currentArea, setCurrentArea] = useState('taiwan');
  const [showYoutubePlayer, setShowYoutubePlayer] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentCity, setCurrentCity] = useState('taipei');

  const taipeiVideos = [
    'iV8JDbtXZm4', // 台北的天空
    '9plPMDcD4dU', // 台北的街頭
    'i3Cp6Mbj78w', // 台北的夜
  ];

  const taichungVideos = [
    'Xgjny7YFMD4', // 鹿港小鎮
    'djJxsJkbMq0', // 台中市市政府
    'vHwjYICfXwI', // 新竹風
  ];

  const kaohsiungClickVideos = [
    'IscwD0kENpA', //宇宙人：來去高雄
    'gBSTVxE0t6o', // 芒果醬：愛河
    '6Cyaef8Zozw', // 黃明志【出去走走】
  ];

  const handleTaipeiClick = () => {
    setCurrentCity('taipei');
    setShowYoutubePlayer(true);
    setCurrentVideoIndex(0);
  };

  const handleTaichungClick = () => {
    setCurrentCity('taichung');
    setShowYoutubePlayer(true);
    setCurrentVideoIndex(0);
  };

  const handleKaohsiungClick = () => {
    setCurrentCity('kaohsiung');
    setShowYoutubePlayer(true);
    setCurrentVideoIndex(0);
  };

  const handleVideoEnd = () => {
    const currentVideos = currentCity === 'taipei' ? taipeiVideos : 
                         currentCity === 'taichung' ? taichungVideos :
                         kaohsiungClickVideos;
    if (currentVideoIndex < currentVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setShowYoutubePlayer(false);
      setCurrentVideoIndex(0);
    }
  };

  const [currentVideo, setCurrentVideo] = useState(null);
  const [musicList, setMusicList] = useState([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await fetch('/api/music');
        const data = await response.json();
        if (data.musicList) {
          setMusicList(data.musicList);
        }
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
    // 每5分鐘更新一次數據
    const interval = setInterval(fetchMusicData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const videoReady = (event) => {
    setCurrentVideo(event.target);
  }

  const play = () => {
    if(currentVideo) {
      currentVideo.playVideo();
    }
  }

  const pause = () => {
    if(currentVideo) {
      currentVideo.pauseVideo();
    }
  }


  const handleDragEnd = (event) => {
    const { over } = event;

    if (over) {
      if (over.id === 'cd-player') {
        setCurrentArea('player');
        setCoverPosition({ x: '27%', y: '27.5%' });
        setHasStarted(false);
        setIsPlaying(false);
      } else if (over.id === 'taiwan') {
        setCurrentArea('taiwan')
        setCoverPosition({ x: '45%', y: '90%' });
        if (isPlaying) {
          togglePlay();
        }
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
    setHasStarted(true);
  };

  const messages = [
    "本日推薦單曲︽國境之南︾，來自電影︽海角七號︾，由嚴云農作詞，范逸臣演唱。榮獲第４５屆金馬獎最佳原創電影歌曲。歌詞創作靈感來自電影︽海角七號︾，故事背景即位於臺灣南端的恆春，描寫跨越時代的愛情記憶。",
    "敬請鎖定︻島嶼漫遊︼，帶你用耳朵旅行，一起聽見島的心跳。",
  ];

  const displayText = [...messages, ...messages, ...messages].join('');

  return (
    <div className="w-full h-screen flex gap-6 bg-gradient-to-br from-yellow-100 via-yellow-400 to-orange-400 justify-center items-center">
      {/* 跑馬燈 */}
      <div className="w-[6%] min-w-[56px] h-[100vh] overflow-hidden relative text-white ml-5
      text-[36px] px-1 font-bold text-shadow-black text-shadow-lg leading-none select-none justify-center items-center">
        <div className="absolute animate-scrollCharacters">
          {displayText.split('').map((char, index) => (
            <div key={index} className="h-[44px] w-[44px] flex items-center justify-center overflow-hidden box-border">
              <div className="w-full h-full flex items-center justify-center">
              {char}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* cdPlayer */}
      <DndContext onDragEnd={handleDragEnd}>
        <DroppableArea 
          id="cd-player" 
          className="w-[50%] h-full flex items-center justify-center select-none relative overflow-hidden"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150">
            <Image
              src="/cd-black.png"
              width={1000}
              height={1000}
              alt="cdPlayer"
            />
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 z-[50]">
              <div className="bg-gray-600 w-[15px] h-[140px] transform -rotate-45 origin-bottom rounded-2xl"></div>
            </div>
          </div>
          {currentArea === 'player' && ( //player
            <DraggableCover 
              isPlaying={isPlaying} 
              togglePlay={togglePlay} 
              position={coverPosition}
              currentArea={currentArea}
              hasStarted={hasStarted}
            />
          )}
          <div className="hidden">
            {musicList.length > 0 && (
              <YouTube 
                videoId={musicList[currentMusicIndex]?.videoId}
                onReady={videoReady}
                opts={{
                  playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    rel: 0,
                    loop: 1,
                  },
                }}
              />
            )}
        </div>
        </DroppableArea>

      {/* 台灣地圖 */}
        <DroppableArea 
          id="taiwan" 
          className="w-[38%] h-full bg-[url('/taiwan.png')] bg-cover bg-center flex justify-center items-center select-none relative"
        >
          {currentArea === 'taiwan' && (
            <DraggableCover 
              isPlaying={isPlaying} 
              togglePlay={togglePlay} 
              position={coverPosition}
              currentArea={currentArea}
              hasStarted={hasStarted}
            />
          )}
          {/* 三個圖片 */}
          {/* 台北 */}
          <div 
            className="absolute top-[2%] left-[50%] w-[300px] h-[300px] cursor-pointer"
            onClick={handleTaipeiClick}
          >
            <Image src="/taipei.png" alt="台北" width={150} height={150} />
          </div>
          <div 
          className="absolute top-[25%] left-[20%] w-[300px] h-[300px] cursor-pointer"
          onClick={handleTaichungClick}>
            <Image src="/wind.png" alt="台中" width={150} height={150} />
          </div>
          <div className="absolute top-[55%] left-[15%] w-[300px] h-[300px] cursor-pointer"
           onClick={handleKaohsiungClick}>
            <Image src="/temple.png" alt="高雄" width={150} height={150} />
          </div>

          {showYoutubePlayer && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md z-[9999] flex items-center justify-center animate-fadeIn">
              <div className="relative w-[800px] h-[450px] bg-gradient-to-br from-orange-900 to-yellow-800 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-700">
                <button 
                  className="absolute -top-16 right-0 text-white text-xl bg-orange-500 hover:bg-yellow-500 px-6 py-3 rounded-full transition-all duration-300 hover:scale-110 flex items-center gap-2 shadow-lg"
                  onClick={() => setShowYoutubePlayer(false)}
                >
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="p-6">
                  <YouTube
                    videoId={currentCity === 'taipei' ? taipeiVideos[currentVideoIndex] : 
                           currentCity === 'taichung' ? taichungVideos[currentVideoIndex] :
                           kaohsiungClickVideos[currentVideoIndex]}
                    opts={{
                      width: '100%',
                      height: '400px',
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                      },
                    }}
                    onEnd={handleVideoEnd}
                    className="rounded-xl shadow-2xl"
                  />
                </div>
                {/* 控制面板 */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
                  <button 
                    onClick={() => setCurrentVideoIndex(prev => (prev > 0 ? prev - 1 : currentCity === 'taipei' ? taipeiVideos.length - 1 : currentCity === 'taichung' ? taichungVideos.length - 1 : kaohsiungClickVideos.length - 1))}
                    className="bg-orange-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-110 flex items-center gap-2 shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                   
                  </button>
                  <div className="bg-white/95 backdrop-blur-sm px-12 py-3 rounded-full text-gray-800 font-medium shadow-lg">
                    第 {currentVideoIndex + 1} 首 / 共 {currentCity === 'taipei' ? taipeiVideos.length : 
                                                      currentCity === 'taichung' ? taichungVideos.length :
                                                      kaohsiungClickVideos.length} 首
                  </div>
                  <button 
                    onClick={() => setCurrentVideoIndex(prev => (prev < (currentCity === 'taipei' ? taipeiVideos.length - 1 : currentCity === 'taichung' ? taichungVideos.length - 1 : kaohsiungClickVideos.length - 1) ? prev + 1 : 0))}
                    className="bg-orange-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-110 flex items-center gap-2 shadow-lg"
                  >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </DroppableArea>
      </DndContext>
    </div>
  );
}