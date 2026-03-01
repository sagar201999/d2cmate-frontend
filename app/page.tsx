"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/src/components/ui/SearchBar";
import { searchHSN, HSNRecord } from "@/src/services/api";

export default function Home() {
  const [results, setResults] = useState<HSNRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Load all results on mount
  useEffect(() => {
    handleSearch("");
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const data = await searchHSN(query || undefined);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Hero / Header */}
      <header className="hero-section">
        <div className="hero-glow" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-accent">D2C</span>Mate
          </h1>
          <p className="hero-subtitle">
            Discover the best direct-to-consumer products
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      {/* Results Section */}
      <main className="results-section">
        {error && (
          <div className="error-banner" id="error-banner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="error-icon">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {isLoading && (
          <div className="loading-container" id="loading-indicator">
            <div className="loading-pulse">
              <div className="pulse-dot" />
              <div className="pulse-dot" />
              <div className="pulse-dot" />
            </div>
            <p className="loading-text">Searching products...</p>
          </div>
        )}

        {!isLoading && hasSearched && results.length === 0 && !error && (
          <div className="empty-state" id="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M8 11h6" />
            </svg>
            <h2 className="empty-title">No products found</h2>
            <p className="empty-text">
              Try a different search term or browse all products
            </p>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <>
            <div className="results-header">
              <h2 className="results-count">
                {results.length} record{results.length !== 1 ? "s" : ""} found
              </h2>
            </div>
            <div className="table-container" style={{ overflowX: 'auto', marginTop: '20px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', fontWeight: '600', color: '#4B5563' }}>ID</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600', color: '#4B5563' }}>HSN Code</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600', color: '#4B5563' }}>Description</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600', color: '#4B5563' }}>GST Rate</th>
                  </tr>
                </thead>
                <tbody style={{ borderTop: '1px solid #E5E7EB' }}>
                  {results.map((record, index) => (
                    <tr key={record.id || index} style={{ borderBottom: '1px solid #E5E7EB', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '12px 16px', color: '#6B7280' }}>#{record.id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: '#111827' }}>{record.hsn_code}</td>
                      <td style={{ padding: '12px 16px', color: '#4B5563', maxWidth: '400px' }}>{record.description}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: '#E0E7FF', color: '#3730A3', padding: '4px 8px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500' }}>
                          {record.gst_rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
