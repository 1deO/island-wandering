// google 登入範例程式碼
// 別忘記到 auth 頁面新增服務提供商

"use client"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useState } from "react";
import firebaseApp from "../firebase/config";

export default function Auth() {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);

  const auth = getAuth(firebaseApp);
  auth.useDeviceLanguage();

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user, token, credential);
      setUser(user);
    }).catch((error) => {
      console.log(error);
    });
  }
  
  return (
    <div className="w-full h-screen">
      <h3>User: {user?.displayName}</h3>
      <button onClick={() => {
        signIn();
      }}>Sign In</button>
    </div>
  );
}