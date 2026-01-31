// src/layouts/SearchLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchHeader from "../components/SearchHeader";

export default function SearchLayout() {
  const [query, setQuery] = useState("");

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <SearchHeader value={query} onChange={setQuery} />
      <Outlet context={{ query }} />
    </div>
  );
}
