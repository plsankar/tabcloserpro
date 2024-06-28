import { AppWindowIcon, ArrowDown10Icon, ArrowDownAZIcon, PinIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

import { Toggle } from "@/components/ui/toggle";
import { useAppStore } from "./stores/appstore";
import { Input } from "@/components/ui/input";

const FilterBar = () => {
    const { filter, setFilter } = useAppStore();

    return (
        <div className="flex items-center gap-2 p-2 border-b bg-muted">
            <div className="">
                <Toggle
                    title="Pinned"
                    variant="outline"
                    pressed={filter.pinned}
                    onPressedChange={(checked) => {
                        setFilter({
                            pinned: checked == true,
                        });
                    }}
                >
                    <PinIcon className="w-4 h-4" />
                </Toggle>
            </div>
            <div className="flex items-center">
                <Toggle
                    variant="outline"
                    pressed={filter.currentWindow}
                    onPressedChange={(checked) => {
                        setFilter({
                            currentWindow: checked == true,
                        });
                    }}
                >
                    <AppWindowIcon className="w-4 h-4" />
                </Toggle>
            </div>
            <div>
                <Select
                    value={filter.sort}
                    onValueChange={(v) => {
                        setFilter({
                            sort: v as "name" | "count",
                        });
                    }}
                >
                    <SelectTrigger>
                        {filter.sort === "name" ? (
                            <ArrowDownAZIcon className="w-5 h-5 mr-1 text-primary" />
                        ) : (
                            <ArrowDown10Icon className="w-5 h-5 mr-1 text-primary" />
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="count">Tabs Count</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Input
                    className="text-xs bg-background"
                    type="search"
                    placeholder="Search..."
                    value={filter.search}
                    onChange={(event) => {
                        setFilter({
                            search: event.target.value || "",
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default FilterBar;
