import { Card, CardContent } from "@/components/ui/card";
import { SearchInput } from "@/components/ui/input";

interface SearchBarProps {
  setSearch: (input: string) => void;
  search?: string;
  className?: string;
}

export default function SearchBar({
  setSearch,
  search,
  className,
  ...props
}: SearchBarProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <SearchInput
              value={search}
              placeholder="Search users..."
              className="pl-10"
              onChange={(e) => setSearch(e.target.value)}
              {...props}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
