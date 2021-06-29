import { AutoSuggestInput, AutoSuggestInputProps } from 'jexity-app/components/auto-suggest/AutoSuggestInput';
import { SearchIcon } from 'jexity-app/icons/SearchIcon';
import React, { FC, useEffect, useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export interface GlobalSearchBarProps extends AutoSuggestInputProps {
  placeholder?: string;
  onChange: (v: string) => void;
}

const GlobalSearchBar: FC<GlobalSearchBarProps> = ({ placeholder, onChange, defaultSuggestions, ...other }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const debouncedOnChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  useEffect(() => {
    onChange(globalFilter);
  }, [globalFilter]); // eslint-disable-line

  return (
    <AutoSuggestInput
      value={searchInput}
      placeholder={placeholder}
      leftIcon={<SearchIcon color="gray.600" />}
      onChange={(value) => {
        setSearchInput(value);
        debouncedOnChange(value);
      }}
      defaultSuggestions={defaultSuggestions}
      {...other}
    />
  );
};

export default GlobalSearchBar;
