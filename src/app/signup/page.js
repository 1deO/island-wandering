"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [lastInvalidEmail, setLastInvalidEmail] = useState("");

  const isFormValid = name && gender && email && password;

  const handleNext = async () => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const pattern = /^.{6,}$/;
    if (!pattern.test(password)) {
    setPasswordError("密碼需至少6字");
    return;
    }

    const input = { name, gender, email, password };

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("uid", data.uid);
      router.push("/signup/step2");
    } else {
      const data = await res.json();
      if (data.errCode === "email-exists") {
        setLastInvalidEmail(email);
        setEmailError("此信箱已註冊，請使用其他信箱");
      } else {
        alert(data.error || "註冊失敗");
      }
    }
  };

  return (
    <div className="flex h-screen relative">
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <div className="bg-white text-black text-lg border border-black px-6 py-2 rounded-lg shadow hover:bg-black hover:text-white transition duration-300">返回首頁</div>
        </Link>
      </div>
      <div className="relative w-1/2 h-full">
        <Image
          src="/loginImage.png"
          alt="Login Illustration"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center min-h-screen">
        <div className="p-8 rounded w-3/4">
          <h2 className="text-2xl mb-3 text-primary-blue0 font-medium">
            登島註冊
          </h2>
          <div className="flex w-full items-center mb-6">
            <hr className="w-1/2 border-t-4 border-primary-blue2" />
            <hr className="w-1/2 border-t-4 border-gray-3" />
          </div>

          <form onSubmit={handleNext}>
            {/* 姓名 */}
            <div className="mb-4 flex items-center">
              <label htmlFor="name" className="w-20">
                暱稱
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-4 bg-gray-4 px-3 py-2 shadow-sm"
                placeholder="請輸入暱稱"
              />
            </div>

            {/* 性別 */}
            <div className="mb-4 flex">
              <label htmlFor="gender" className="w-20">性別</label>
              <div className="flex gap-4 justify-start">
                {["male", "female", "other"].map((value) => (
                  <label
                    key={value}
                    className="flex items-center gap-1 text-lg"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={value}
                      checked={gender === value}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    {value === "male"
                      ? "生理男"
                      : value === "female"
                        ? "生理女"
                        : "不透露"}
                  </label>
                ))}
              </div>
            </div>

            {/* 帳號 */}
            <div className="mb-4 flex items-center">
              <label htmlFor="email" className="w-20">
                帳號
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value !== lastInvalidEmail) {
                    setEmailError("");
                  }
                }}
                className={`mt-1 block w-full rounded-xl px-3 py-2 shadow-sm border ${
                  emailError
                    ? "border-red-500 bg-red-100 error"
                    : "border-gray-4 bg-gray-4"
                }`}
                placeholder="請輸入電子郵件"
              />
            </div>
            <p className="mb-2 text-sm text-danger">{emailError}</p>

            {/* 密碼 */}
            <div className="mb-2 flex items-center">
              <label htmlFor="password" className="w-20">
                密碼
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (
                    passwordError &&
                    /^.{6,}$/.test(e.target.value)
                  ) {
                    setPasswordError("");
                  }
                }}
                className={`mt-1 block w-full rounded-xl px-3 py-2 shadow-sm border ${
                  passwordError
                    ? "border-red-500 bg-red-100"
                    : "border-gray-4 bg-gray-4"
                }`}
                placeholder="至少長度6字"
              />
            </div>
            <p className="mb-2 text-sm text-danger">{passwordError}</p>

            <div className="flex justify-end gap-4 pt-6">
              <Link
                href="/login"
                className="px-5 border-2 border-gray-400 text-center py-2 rounded-lg text-primary-blue2 transition"
              >
                已有會員帳號？
              </Link>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-5 text-center py-2 rounded-lg text-white transition ${
                  isFormValid
                    ? "bg-orange-800 hover:bg-orange-400"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                註冊
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

