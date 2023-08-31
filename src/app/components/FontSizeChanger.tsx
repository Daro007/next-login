import React from 'react';

interface FontSizeChangerProps {
  fontSizeOptions: number[];
  selectedSize: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FontSizeChanger: React.FC<FontSizeChangerProps> = ({ fontSizeOptions, selectedSize, onChange }) => {
  return (
    <div>
      <label>Select your greeting´s font size: </label>
      <select value={selectedSize} onChange={onChange}>
        {fontSizeOptions.map(size => (
          <option key={size} value={size}>{size}px</option>
        ))}
      </select>
    </div>
  );
};

export default FontSizeChanger;
