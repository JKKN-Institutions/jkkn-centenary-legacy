import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, type Category } from "@/data/all-activities";
import { ActivityStatus } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useState } from "react";

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
  const { scrollDirection, isAtTop } = useScrollDirection();
  
  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "All" || selectedStatus !== "all";
  
  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("All");
    onStatusChange("all");
  };

  const removeFilter = (type: 'search' | 'category' | 'status') => {
    if (type === 'search') onSearchChange("");
    if (type === 'category') onCategoryChange("All");
    if (type === 'status') onStatusChange("all");
  };

  // Smart behavior: hide when scrolling down, show when scrolling up or at top
  const shouldShow = isAtTop || scrollDirection === 'up';

  return (
    <>
      <div 
        className={`sticky top-0 z-40 backdrop-blur-xl bg-background/90 border-b-2 shadow-lg transition-all duration-500 ${
          shouldShow ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{
          borderImage: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent) 1"
        }}
      >
        <div className="container px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" />
              <Input
                type="text"
                placeholder="Search initiatives..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm focus:shadow-lg"
                style={{
                  boxShadow: searchQuery ? "0 0 0 3px hsl(var(--primary) / 0.1)" : undefined
                }}
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={(value) => onCategoryChange(value as Category)}>
              <SelectTrigger className="w-full md:w-56 h-12 border-2 hover:border-primary/50 transition-all duration-300 focus:bg-primary/10 focus:border-primary shadow-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.filter(c => c !== "All").map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={(value) => onStatusChange(value as ActivityStatus | "all")}>
              <SelectTrigger className="w-full md:w-56 h-12 border-2 hover:border-primary/50 transition-all duration-300 focus:bg-primary/10 focus:border-primary shadow-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="h-12 px-6 border-2 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-all duration-300 shadow-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 animate-fade-in">
              {searchQuery && (
                <Badge 
                  variant="secondary" 
                  className="pl-3 pr-2 py-1.5 text-sm font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                  onClick={() => removeFilter('search')}
                >
                  Search: "{searchQuery}"
                  <X className="w-3 h-3 ml-2" />
                </Badge>
              )}
              {selectedCategory !== "All" && (
                <Badge 
                  variant="secondary" 
                  className="pl-3 pr-2 py-1.5 text-sm font-semibold bg-info/10 text-info border border-info/20 hover:bg-info/20 transition-colors cursor-pointer"
                  onClick={() => removeFilter('category')}
                >
                  Category: {selectedCategory}
                  <X className="w-3 h-3 ml-2" />
                </Badge>
              )}
              {selectedStatus !== "all" && (
                <Badge 
                  variant="secondary" 
                  className="pl-3 pr-2 py-1.5 text-sm font-semibold bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-colors cursor-pointer"
                  onClick={() => removeFilter('status')}
                >
                  Status: {selectedStatus}
                  <X className="w-3 h-3 ml-2" />
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Collapsed Pill (shown when scrolling) */}
      {!shouldShow && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed top-4 right-4 z-50 h-12 px-6 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 flex items-center gap-3 font-bold animate-bounce-in"
          style={{
            boxShadow: "0 8px 32px hsl(var(--primary) / 0.4)"
          }}
        >
          <Search className="w-5 h-5" />
          <span>Filters</span>
        </button>
      )}
    </>
  );
};

export default FilterBar;
