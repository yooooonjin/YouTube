import YoutubeIcon from './ui/icons/YoutubeIcon';
import SearchButton from './ui/SearchButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function SearchHeader() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    if (text.trim().length === 0) return;
    setText(text);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };
  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);

  return (
    <header className='flex p-4 border-b border-zinc-600'>
      <Link to={'/'} className='flex items-center'>
        <YoutubeIcon />
        <h1 className=' text-lg font-bold ml-2'>Youtube</h1>
      </Link>
      <form className='w-full text-end md:text-center' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search'
          onChange={handleChange}
          value={text}
          className='bg-black  w-[50%]  p-3 text-sm'
        />
        <SearchButton />
      </form>
    </header>
  );
}
