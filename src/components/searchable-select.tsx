import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { api_url } from "@/lib/config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";

interface ApiResponse<T> {
  data: T[];
}

interface SearchableSelectProps<
  T extends Record<string, unknown>,
  V extends keyof T
> {
  path: string;
  displayKey: keyof T;
  valueKey: V;
  onValueChange?: (value: T[V]) => void;
  value?: T[V];
}

const SearchableSelect = <
  T extends Record<string, unknown>,
  V extends keyof T
>({
  path,
  displayKey,
  valueKey,
  onValueChange,
  value,
}: SearchableSelectProps<T, V>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: apiResponse, isLoading } = useQuery<ApiResponse<T>>({
    queryKey: ["search", path, debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return { data: [] };
      const response = await fetch(
        `${api_url}${path}?search=${debouncedQuery}`
      );
      return await response.json();
    },
    enabled: debouncedQuery.length > 0,
  });

  // Fetch the selected item when the component mounts or value changes
  const { data: selectedItemData } = useQuery<ApiResponse<T>>({
    queryKey: ["item", path, value],
    queryFn: async () => {
      if (!value) return { data: [] };
      const response = await fetch(`${api_url}${path}/${value}`);
      return await response.json();
    },
    enabled: !!value,
  });

  // Update selectedItem when selectedItemData changes
  useEffect(() => {
    if (selectedItemData?.data?.[0]) {
      setSelectedItem(selectedItemData.data[0]);
    }
  }, [selectedItemData]);

  const items = apiResponse?.data || [];

  const handleItemSelect = (itemValue: string) => {
    const item = items.find((d) => String(d[valueKey]) === itemValue);
    if (item) {
      setSelectedItem(item);
      if (onValueChange) {
        // Pass just the value, not the whole item
        onValueChange(item[valueKey] as T[V]);
      }
    }
  };

  return (
    <div className="flex w-full gap-2">
      <div
        style={{ width: debouncedQuery.length === 0 ? "100%" : "50%" }}
        className="duration-300"
      >
        <Input
          type="text"
          placeholder="Search..."
          className="w-full border p-2 rounded mb-1"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          width: debouncedQuery.length === 0 ? "0px" : "50%",
          display: debouncedQuery.length === 0 ? "none" : "block",
        }}
        className="duration-300"
      >
        <Select
          value={value ? String(value) : undefined}
          onValueChange={handleItemSelect}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an item">
              {selectedItem
                ? String(selectedItem[displayKey])
                : "Select an item"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectGroup>
              {isLoading ? (
                <div className="p-2">Loading...</div>
              ) : items.length > 0 ? (
                items.map((item, index) => (
                  <SelectItem key={index} value={String(item[valueKey])}>
                    {String(item[displayKey])}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2">No results found</div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchableSelect;
