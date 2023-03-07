import React from 'react';

import mapModifiers from 'utils/functions';

export type Colors =
  | 'black'
  | 'cadmiumGreen';

interface ColorSelectProps {
  listColor: Colors[];
  nameListColor: string;
  handleSelectColor?: (e: string) => void;
}

const ColorSelect: React.FC<ColorSelectProps> = ({
  listColor,
  nameListColor,
  handleSelectColor,
}) => (
  <div className="a-colorSelect">
    {listColor.map((item, index) => (
      <input
        key={`a-colorSelect-${index.toString()}`}
        className={mapModifiers('a-colorSelect_item', item)}
        name={nameListColor}
        type="radio"
        id={`item-${index.toString()}`}
        onClick={() => handleSelectColor && handleSelectColor(item)}
      />
    ))}
  </div>
);

export default ColorSelect;
