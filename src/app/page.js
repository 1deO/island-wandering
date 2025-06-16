"use client"
import Image from "next/image";
import CircularText from "./CircularText"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const enter = ()=>{
    router.push('/')
  }
  // YouTube 播放器選項
  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: '-juq36IACEI'
    },
  };

  // YouTube
  const onReady = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(50);
    event.target.playVideo();
    setIsMusicPlaying(true);
  };

  // 播放器錯誤
  const onError = (error) => {
    console.error('YouTube Player Error:', error);
  };

  // 切換音樂播放狀態
  const toggleMusic = () => {
    if (playerRef.current) {
      if (isMusicPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // 停止音樂
  const stopMusic = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
      setIsMusicPlaying(false);
    }
  };
  return (
    <>
      <div className="h-screen w-screen bg-[url('/bg.png')] bg-cover flex items-end p-14 relative">
      <Link href="/login">
        <div className="absolute top-4 right-10 bg-white text-black text-xl border border-black px-4 py-2 rounded-lg shadow hover:bg-black hover:text-white transition duration-300">島民登入</div>
      </Link>
        <Image src="/title.png" width={800} height={800} alt="pic"></Image>
        <Link href='/cdPlayer'>
          <div className="absolute bottom-32 right-32" onClick={enter}>
            <CircularText text=" Explore Taiwan Music" textColor="white" />
          </div>
        </Link>
      </div>
    </>
  );
}
