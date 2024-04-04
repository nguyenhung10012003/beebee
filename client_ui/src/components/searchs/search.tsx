import { SearchIcon } from 'lucide-react';

export default function Search({
                                 keySearch,
                                 setKeySearch,
                                 boxClassName,
                                 inputClassName,
                                 buttonClassName,
                                 iconClassname,
                                 placeholder,
                               }: {
  keySearch: string;
  setKeySearch: (key: string) => void;
  boxClassName: string;
  inputClassName: string;
  iconClassname: string;
  buttonClassName?: string;
  placeholder?: string;
}) {
  return (
    <div className={boxClassName}>
      <SearchIcon className={iconClassname} />
      <input
        type="text"
        value={keySearch}
        onChange={(e) => setKeySearch(e.target.value)}
        className={inputClassName}
        placeholder={placeholder}
      />
      {buttonClassName && <button className={buttonClassName}>Search</button>}
    </div>);
}