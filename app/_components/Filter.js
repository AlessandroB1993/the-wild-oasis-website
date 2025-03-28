"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); // Will be passed as argument to URLSearchParams
  const router = useRouter();
  const pathname = usePathname();

  // Useful for adding styling in filter Buttons (we can use get but not set)
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    // 1. we get the search parameters object that allows us to use set
    const params = new URLSearchParams(searchParams);
    // 2. we set the internal URL, adding '?capacity=filterParam'
    params.set("capacity", filter);
    // 3. we navigate to it
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      <Button
        handleFilter={handleFilter}
        filter={"all"}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"small"}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"medium"}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"large"}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
    >
      {children}
    </button>
  );
}

export default Filter;
