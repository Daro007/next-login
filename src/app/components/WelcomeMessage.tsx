import React, { useState } from 'react';
// import LanguageSelector from './LanguageSelector';

interface WelcomeMessageProps {
  selectedLanguage: string;
  username: string;
  fontSize: number;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ selectedLanguage, username, fontSize }) => {
//   const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLanguage);

  const translations: Record<string, string> = {
    en: `Welcome ${username}!`,
    fr: `Bienvenue  ${username}!`,
    de: `Willkommen ${username}!`
  };

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold" style={{ fontSize: `${fontSize}px` }}>{translations[selectedLanguage]}</h1>
      {/* <LanguageSelector
        languages={['en', 'fr', 'de']} 
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      /> */}
    </div>
  );
};

export default WelcomeMessage;
