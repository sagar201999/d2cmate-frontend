"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { searchHSN, HSNRecord } from "@/src/services/api";

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<HSNRecord[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim().length > 1) {
            const timer = setTimeout(async () => {
                try {
                    const data = await searchHSN(query);
                    setSuggestions(data.slice(0, 8)); // Top 8 suggestions
                } catch (err) {
                    setSuggestions([]);
                }
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        onSearch(query);
    };

    const handleSuggestionClick = (suggestion: HSNRecord) => {
        setQuery(suggestion.hsn_code.toString());
        setShowSuggestions(false);
        onSearch(suggestion.hsn_code.toString());
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar" ref={wrapperRef}>
            <div className="search-input-wrapper" style={{ position: 'relative' }}>
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
                    placeholder="Search by HSN code or description..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
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

                {/* Autocomplete Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="suggestions-dropdown" style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '0 0 8px 8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}>
                        {suggestions.map((suggestion) => (
                            <div
                                key={suggestion.id}
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(suggestion)}
                                style={{
                                    padding: '12px 16px',
                                    borderBottom: '1px solid #f0f0f0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 600, color: '#111827' }}>{suggestion.hsn_code}</span>
                                    <span style={{ fontSize: '12px', color: '#6B7280', backgroundColor: '#F3F4F6', padding: '2px 6px', borderRadius: '4px' }}>GST: {suggestion.gst_rate}%</span>
                                </div>
                                <span style={{ fontSize: '14px', color: '#4B5563', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {suggestion.description}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
}
