import React from 'react';
import SearchIcon from './icons/SearchIcon';

export default function SearchButton() {
  return (
    <button className='bg-zinc-700 inline-block h-full aspect-square text-center'>
      <SearchIcon />
    </button>
  );
}
