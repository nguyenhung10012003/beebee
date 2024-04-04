import { Input } from '@/components/ui/input';

export function SearchBox() {
  return (
    <div>
      <Input
        type="search"
        placeholder="SearchBox..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
}