"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

// SearchBar component allows users to search for planes by callsign or aircraft ID.
// It provides dynamic suggestions and pans the map to the selected plane.
export default function SearchBar({ planes, onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle user input and generate search suggestions
  const handleInput = (value) => {
    setQuery(value);

    // Clear suggestions if input is empty
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const q = value.toLowerCase();

    // Filter plane list by callsign or ID (case-insensitive, partial match)
    const filtered = planes.filter(
      (p) =>
        p.callsign?.toLowerCase().includes(q) || p.id?.toLowerCase().includes(q)
    );

    setSuggestions(filtered);
  };

  // When a suggestion is selected, update the input and trigger map selection
  const handleSelect = (plane) => {
    setQuery(plane.callsign || plane.id); // Fill input with selected value
    setSuggestions([]);
    onSelect(plane); // Trigger map pan and popup
  };

  return (
    <div className="z-[1000] bg-white shadow-md rounded p-2 w-[300px] relative">
      <Input
        placeholder="Search by callsign or aircraft ID"
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full"
      />

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-md rounded text-sm max-h-60 overflow-auto z-[1000]">
          {suggestions.map((plane) => (
            <button
              key={plane.id}
              onClick={() => handleSelect(plane)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              <div className="font-semibold">
                {plane.callsign || "No Callsign"}
              </div>
              <div className="text-xs text-gray-500">
                {plane.id} — {plane.originCountry}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
