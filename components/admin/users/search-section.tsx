import { Card, CardContent } from "@/components/ui/card";
import { SearchInput } from "@/components/ui/input";
import SearchBar from "@/components/ui/search-bar";

interface FilterSectionProps {
  setSearch: (input: string) => void;
  search?: string;
}

export default function FilterSection({ setSearch ,search}: FilterSectionProps) {
  return (
   <SearchBar setSearch={setSearch} search={search}/>
  );
}
