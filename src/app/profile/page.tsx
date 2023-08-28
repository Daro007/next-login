"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FontSizeChanger from "../components/FontSizeChanger";
import WelcomeMessage from "../components/WelcomeMessage";
import LanguageSelector from "../components/LanguageSelector";

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("Username");

  const [fontSize, setFontSize] = useState<number>(16);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);
    localStorage.setItem("fontSize", newSize.toString());
    // console.log("newSize", newSize);
    setFontSize(newSize);
  };

  const handleLanguageChange = (language: string) => {
    // const language = language;
    localStorage.setItem("selectedLanguage", language.toString());
    console.log("language", language);
    setSelectedLanguage(language);
  };

  useEffect(() => {
    const usernameLoggedIn = localStorage.getItem("usernameLoggedIn");
    const selectedLanguageFromStorage = localStorage.getItem("selectedLanguage");
    const fontSizeFromStorage = parseInt(localStorage.getItem("fontSize")!)
    setFontSize(fontSizeFromStorage);
    setSelectedLanguage(selectedLanguageFromStorage!);
    
    // console.log("usernameLoggedIn", usernameLoggedIn);
    if (usernameLoggedIn === "false") {
      router.push("/");
    }
    const username_from_storage = localStorage.getItem("username")
      ? (localStorage.getItem("username") as string)
      : "";
    setUsername(username_from_storage);
  }, []);

  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <WelcomeMessage selectedLanguage={selectedLanguage} username={username} fontSize={fontSize} />
          <LanguageSelector
            languages={['en', 'fr', 'de']} 
            selectedLanguage={selectedLanguage}
            onSelectLanguage={handleLanguageChange}
           />
          <br />
          <FontSizeChanger
            fontSizeOptions={[16, 20, 24]}
            selectedSize={fontSize}
            onChange={handleFontSizeChange}
          />
          <br />
          <button type="submit" className="btn btn-error">
            Delete account{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
