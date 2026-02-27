"use client";

import { useState, FormEvent } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <div className="search-input-wrapper">
                <svg
                    className="search-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                    autoComplete="off"
                />
                <button
                    id="search-button"
                    type="submit"
                    className="search-button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="spinner" />
                    ) : (
                        "Search"
                    )}
                </button>
            </div>
        </form>
    );
}
