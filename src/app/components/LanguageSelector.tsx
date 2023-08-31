import React from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onSelectLanguage }) => {
  return (
    <div>
      <label>Select your greeting´s language: </label>
      <select value={selectedLanguage} onChange={(e) => onSelectLanguage(e.target.value)}>
        {languages.map(language => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
