import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, type Category } from "@/data/all-activities";
import { ActivityStatus } from "./StatusBadge";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: Category;
  onCategoryChange: (value: Category) => void;
  selectedStatus: ActivityStatus | "all";
  onStatusChange: (value: ActivityStatus | "all") => void;
}

const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
}: FilterBarProps) => {
  const hasActiveFilters = selectedCategory !== "All" || selectedStatus !== "all" || searchQuery !== "";

  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b-2 py-8 transition-all duration-300"
      style={{
        borderImage: "linear-gradient(90deg, hsl(var(--primary) / 0.3), transparent 50%, hsl(var(--primary) / 0.3)) 1",
        boxShadow: "0 4px 16px hsl(var(--foreground) / 0.05)",
      }}
    >
      <div className="container px-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Prominent Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search initiatives..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              style={{
                boxShadow: searchQuery ? "0 0 0 3px hsl(var(--primary) / 0.1)" : "none",
              }}
            />
          </div>
          
          {/* Custom Styled Dropdowns */}
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full lg:w-[240px] h-12 border-2 hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-popover/95 backdrop-blur-xl border-2">
              {categories.map((category) => (
                <SelectItem 
                  key={category} 
                  value={category}
                  className="focus:bg-primary/10 focus:text-primary"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={(value) => onStatusChange(value as ActivityStatus | "all")}>
            <SelectTrigger className="w-full lg:w-[200px] h-12 border-2 hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover/95 backdrop-blur-xl border-2">
              <SelectItem value="all" className="focus:bg-primary/10 focus:text-primary">All Status</SelectItem>
              <SelectItem value="completed" className="focus:bg-primary/10 focus:text-primary">Completed</SelectItem>
              <SelectItem value="in-progress" className="focus:bg-primary/10 focus:text-primary">In Progress</SelectItem>
              <SelectItem value="upcoming" className="focus:bg-primary/10 focus:text-primary">Upcoming</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Active Filter Indicator */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
            <span className="font-medium">Active filters:</span>
            <div className="flex gap-2">
              {selectedCategory !== "All" && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {selectedCategory}
                </span>
              )}
              {selectedStatus !== "all" && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium capitalize">
                  {selectedStatus.replace("-", " ")}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
