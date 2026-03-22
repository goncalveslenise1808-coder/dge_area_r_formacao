'use client';

import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { FilterModal, FilterOption } from './FilterModal';
import { IOfertaFormativa } from '@/services/ofertas/type';

interface FilterBarProps {
    placeholder?: string;
    filterOptions: FilterOption[];
    onSearch: (value: string) => void;
    onFilter: (filters: Record<string, string>) => void;
    children?: ReactNode;
    data?: IOfertaFormativa[]
}

export function FilterBar({
  placeholder,
  filterOptions,
  onSearch,
  onFilter,
  children,
  data
}: FilterBarProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

    const activeFilterCount = Object.keys(activeFilters).length;

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const handleApplyFilters = (filters: Record<string, string>) => {
        setActiveFilters(filters);
        onFilter(filters);

        const queryString = new URLSearchParams(filters).toString();
        router.push(queryString ? `?${queryString}` : '/');
    };

    const handleClearFilters = () => {
        setActiveFilters({});
        onFilter({});

        router.push('/user-role/ofertas');
    };

    const handleRemoveFilter = (filterId: string) => {
        const newFilters = { ...activeFilters };
        delete newFilters[filterId];
        setActiveFilters(newFilters);
        onFilter(newFilters);

        const queryString = new URLSearchParams(newFilters).toString();
        router.push(queryString ? `?${queryString}` : '/');
    };

    const getFilterLabel = (filterId: string, value: string) => {
        const filterOption = filterOptions.find(option => option.id === filterId);
        if (!filterOption) return value;

        const option = filterOption.options.find(opt => opt.value === value);
        return option ? `${filterOption.label}: ${option.label}` : value;
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Input
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-12 h-12 text-base border-0 bg-gray-200/70 dark:bg-white/5 backdrop-blur-xs"
                    />
                </div>

                <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    className="h-12 px-6 border-0 bg-gradient-primary text-white backdrop-blur-xs hover:bg-black/5 dark:hover:bg-white/10"
                >
                    <Filter className="w-5 h-5 mr-2" />
                    Filtrar
                    {activeFilterCount > 0 && (
                        <Badge className="ml-2 bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30">
                            {activeFilterCount}
                        </Badge>
                    )}
                </Button>

                <FilterModal
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    filterOptions={filterOptions}
                    activeFilters={activeFilters}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    data={data ?? []}
                />

                {children}
            </div>

            {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center mr-2">
                        <Filter className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">Filtros ativos:</span>
                    </div>
                    {Object.entries(activeFilters).map(([filterId, value]) => (
                        <Badge
                            key={filterId}
                            className="bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30 px-3 py-1 h-8"
                        >
                            {getFilterLabel(filterId, value)}
                            <button
                                onClick={() => handleRemoveFilter(filterId)}
                                className="ml-2 hover:text-green-900 dark:hover:text-green-100"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-green-700 dark:text-green-300 hover:bg-green-500/10 hover:text-green-800 dark:hover:text-green-200 h-8 px-3 text-xs"
                    >
                        Limpar todos
                    </Button>
                </div>
            )}
        </div>
    );
}

export type { FilterOption };
