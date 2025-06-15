"use client"
import Image from "next/image";
import CircularText from "./component/CircularText"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const enter = ()=>{
    router.push('/')
  }
  return (
    <>
      <div className="h-screen w-screen bg-[url('/bg.png')] bg-cover flex items-end p-14 relative">
      <Link href="/login">
        <div className="absolute top-4 right-10 bg-white text-black text-xl border border-black px-4 py-2 rounded-lg shadow hover:bg-black hover:text-white transition duration-300">島民登入</div>
      </Link>
        <Image src="/title.png" width={800} height={800} alt="pic"></Image>
        <div className="absolute bottom-32 right-32" onClick={enter}>
          <CircularText text=" Explore Taiwan Music" textColor="white" />
        </div>
      </div>
    </>
  );
}
