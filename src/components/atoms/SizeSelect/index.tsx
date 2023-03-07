import React from 'react';

export type Sizes =
  | 'XS'
  | 'S'
  | 'M'
  | 'L';

interface SizeSelectProps {
  listSize: Sizes[];
  nameListSize: string;
  onClickSelectSize?: (e: string) => void;
}

const SizeSelect: React.FC<SizeSelectProps> = ({
  listSize,
  nameListSize,
  onClickSelectSize,
}) => (
  <div className="a-sizeSelect">
    {listSize.map((item, index) => (
      <div
        key={`a-sizeSelect-${index.toString()}`}
        className="a-sizeSelect_item"
      >
        <input
          key={`a-sizeSelect-${index.toString()}`}
          name={nameListSize}
          type="radio"
          id={`item-${index.toString()}`}
          onClick={() => onClickSelectSize && onClickSelectSize(item)}
        />
        <span className="a-sizeSelect_item_title">{item}</span>
      </div>
    ))}
  </div>
);

export default SizeSelect;
