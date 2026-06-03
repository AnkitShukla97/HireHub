import React, { ReactNode, ChangeEvent, MouseEvent } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search jobs...",
  value,
  onChange,
  onSearch,
  children,
}): ReactNode => {
  return (
    <div>
      {children || (
        <>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <button onClick={onSearch}>Search</button>
        </>
      )}
    </div>
  );
};

export default SearchBar;
