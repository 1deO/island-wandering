"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GoogleAuth from "../../app/component/GoogleAuth"
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
// import firebaseApp from "../../app/database/auth";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
//   const auth = getAuth(firebaseApp);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("請輸入帳號與密碼");
      return;
    }
     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const idToken = await userCredential.user.getIdToken();

//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: idToken }),
//       });

//       if (res.ok) {
//         window.location.href = "/";
//       } else {
//         setErrorMessage("登入失敗，請稍後再試。");
//       }
//     } catch (error) {
//       if (error.code === "auth/invalid-credential") {
//         setErrorMessage("無效的帳號或密碼，請重新輸入。");
//       } else {
//         setErrorMessage(`登入錯誤：${error.message}`);
//       }
//     }
//   };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex h-screen bg-gray-100 relative">
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <div className="bg-white text-black text-lg border border-black px-6 py-2 rounded-lg shadow hover:bg-black hover:text-white transition duration-300">返回首頁</div>
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-center min-h-screen">
        <div className="p-8 rounded w-3/4">
          <h2 className="text-2xl mb-4 text-primary-blue0 font-bold">
            島民登入
          </h2>
          <div className="flex w-full items-center mb-6">
            <hr className="w-1/2 border-t-4 border-primary-blue2" />
            <hr className="w-1/2 border-t-4 border-gray-3" />
          </div>
          <GoogleAuth />
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
              <label htmlFor="email" className="block mb-1 w-20">
                帳號
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full rounded-xl border border-gray-4 bg-gray-4 px-3 py-2 shadow-sm"
                placeholder="請輸入電子郵件"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-2 flex items-center">
              <label htmlFor="password" className="block mb-1 w-20">
                密碼
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full rounded-xl border border-gray-4 bg-gray-4 px-3 py-2 shadow-sm"
                placeholder="請輸入您的密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <p className="mb-2 text-sm text-danger">{errorMessage}</p>
            )}

            <div className="flex justify-end gap-4 pt-6">
              <Link
                href="/signup"
                className="px-4 border-2 border-gray-400 text-center py-2 rounded-lg text-black transition"
              >
                還未有帳號？
              </Link>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-5 text-center py-2 rounded-lg text-black transition ${
                  isFormValid
                    ? "bg-yellow-400 hover:bg-primary-blue1"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                立即登入
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative w-1/2 h-full">
        <Image
          src="/loginImage.png"
          alt="Login Illustration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
