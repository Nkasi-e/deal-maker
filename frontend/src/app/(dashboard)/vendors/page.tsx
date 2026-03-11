"use client";

import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardPage } from "@/components/layout";
import { formatCurrency } from "@/lib/utils";
import { VENDOR_COMPARISON } from "@/data/mock";

type SortKey = "vendor" | "price" | "reliability" | "deliveryDays" | "score";
type SortDir = "asc" | "desc";

function SortIcon({
  columnKey,
  currentSortKey,
  sortDir,
}: {
  columnKey: SortKey;
  currentSortKey: SortKey;
  sortDir: SortDir;
}) {
  if (currentSortKey !== columnKey) return <ArrowUpDown className="h-4 w-4 opacity-50" />;
  return sortDir === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
}

export default function VendorComparisonPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const rows = VENDOR_COMPARISON.filter((r) =>
    r.vendor.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const mult = sortDir === "asc" ? 1 : -1;
    return aVal < bVal ? -1 * mult : aVal > bVal ? 1 * mult : 0;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "vendor" ? "asc" : "desc");
    }
  };

  return (
    <DashboardPage
      title="Vendor comparison"
      description="Compare vendors by price, reliability, delivery, and score. Sort and filter to choose the best fit."
    >
      <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">Comparison table</CardTitle>
              <Input
                placeholder="Filter by vendor name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <CardDescription>Vendor · Price · Reliability · Delivery time · Score</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">
                      <button type="button" className="flex items-center gap-1 hover:text-foreground" onClick={() => toggleSort("vendor")}>
                        Vendor <SortIcon columnKey="vendor" currentSortKey={sortKey} sortDir={sortDir} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      <button type="button" className="ml-auto flex items-center gap-1 hover:text-foreground" onClick={() => toggleSort("price")}>
                        Price <SortIcon columnKey="price" currentSortKey={sortKey} sortDir={sortDir} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      <button type="button" className="ml-auto flex items-center gap-1 hover:text-foreground" onClick={() => toggleSort("reliability")}>
                        Reliability <SortIcon columnKey="reliability" currentSortKey={sortKey} sortDir={sortDir} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      <button type="button" className="ml-auto flex items-center gap-1 hover:text-foreground" onClick={() => toggleSort("deliveryDays")}>
                        Delivery (days) <SortIcon columnKey="deliveryDays" currentSortKey={sortKey} sortDir={sortDir} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      <button type="button" className="ml-auto flex items-center gap-1 hover:text-foreground" onClick={() => toggleSort("score")}>
                        Score <SortIcon columnKey="score" currentSortKey={sortKey} sortDir={sortDir} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.vendor} className="border-b border-border hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{row.vendor}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(row.price)}</td>
                      <td className="px-4 py-3 text-right">{row.reliability}%</td>
                      <td className="px-4 py-3 text-right">{row.deliveryDays}</td>
                      <td className="px-4 py-3 text-right font-medium">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
    </DashboardPage>
  );
}
