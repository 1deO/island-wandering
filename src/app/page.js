"use client"
import Image from "next/image";
import CircularText from "./Component/CircularText"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const enter = ()=>{
    router.push('/')
  }
  return (
    <>
    <div className="h-screen w-screen bg-[url('/bg.png')] bg-cover flex items-end p-14 relative">
      <Image src="/title.png" width={800} height={800} alt="pic"></Image>
      <div className="absolute bottom-32 right-32" onClick={enter}>
        <CircularText text=" Explore Taiwan Music" textColor="white" />
      </div>
    </div>
   
    </>
  );
}
