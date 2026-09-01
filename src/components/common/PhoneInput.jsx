import React, { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown, Search, Check, Globe } from 'lucide-react';
import { ALL_COUNTRY_CODES, findCountryByCode } from '../../utils/countryCodes';

export const countryCodes = ALL_COUNTRY_CODES;

export const PhoneInput = ({
  value = "",
  onChange,
  required = false,
  placeholder = "e.g. 555-0192 or 9876543210",
  className = "",
  disabled = false,
  id = "phone-input"
}) => {
  // Extract initial country code & raw number
  const initialCountry = findCountryByCode(value) || ALL_COUNTRY_CODES[0];
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);

  const getRawNumber = (fullVal, country) => {
    if (!fullVal) return "";
    if (fullVal.startsWith(country.code)) {
      return fullVal.slice(country.code.length).trim();
    }
    // Check if starts with any other code
    for (const c of ALL_COUNTRY_CODES) {
      if (fullVal.startsWith(c.code)) {
        return fullVal.slice(c.code.length).trim();
      }
    }
    return fullVal;
  };

  const [rawNumber, setRawNumber] = useState(() => getRawNumber(value, initialCountry));
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Sync if value prop updates from outside
  useEffect(() => {
    if (value) {
      const match = findCountryByCode(value);
      if (match && match.code !== selectedCountry.code) {
        setSelectedCountry(match);
        setRawNumber(getRawNumber(value, match));
      }
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Auto-focus search input when opened
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");
    const combined = rawNumber ? `${country.code} ${rawNumber}` : country.code;
    if (onChange) onChange(combined);
  };

  const handleNumberChange = (e) => {
    const newRaw = e.target.value;
    setRawNumber(newRaw);
    const combined = newRaw ? `${selectedCountry.code} ${newRaw}` : "";
    if (onChange) onChange(combined);
  };

  // Filter country codes by search
  const filteredCountries = ALL_COUNTRY_CODES.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      c.country.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.iso.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`flex items-center rounded-2xl bg-white border border-[#E2E8F0] shadow-xs focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all ${
          disabled ? 'opacity-60 bg-slate-50 cursor-not-allowed' : ''
        }`}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50/80 hover:bg-slate-100/90 rounded-l-2xl border-r border-[#E2E8F0] text-xs font-bold text-slate-800 transition-colors focus:outline-none flex-shrink-0"
          title={`Selected: ${selectedCountry.country} (${selectedCountry.code}) - Click to change country`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span className="font-mono text-xs font-bold text-slate-700">{selectedCountry.code}</span>
          <ChevronDown
            size={13}
            className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`}
          />
        </button>

        {/* Raw Phone Number Input */}
        <div className="relative flex-1 flex items-center">
          <input
            id={id}
            type="tel"
            required={required}
            disabled={disabled}
            value={rawNumber}
            onChange={handleNumberChange}
            placeholder={placeholder}
            className="w-full pl-3 pr-10 py-2.5 bg-transparent text-xs sm:text-sm font-medium text-slate-900 focus:outline-none placeholder:text-slate-400 placeholder:text-xs"
          />
          <Phone size={15} className="absolute right-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Searchable All Countries Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-80 sm:w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Dropdown Header & Search Box */}
          <div className="p-3 bg-slate-50 border-b border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={13} className="text-primary" />
                Select Country ({ALL_COUNTRY_CODES.length} Available)
              </span>
              <span className="text-[10px] bg-orange-50 text-primary font-bold px-2 py-0.5 rounded-full border border-orange-200">
                All Calling Codes
              </span>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country name or code (+1, India, UK)..."
                className="w-full pl-8.5 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Country List (Virtualized style scroll container) */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 p-1">
            {filteredCountries.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No matching country calling code found for "{searchQuery}"
              </div>
            ) : (
              filteredCountries.map((c, index) => {
                const isSelected = selectedCountry.code === c.code && selectedCountry.country === c.country;
                return (
                  <button
                    key={`${c.iso}-${c.code}-${index}`}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors group ${
                      isSelected
                        ? 'bg-orange-50 text-orange-950 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg leading-none flex-shrink-0">{c.flag}</span>
                      <span className="truncate">{c.country}</span>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 group-hover:bg-white transition-colors">
                        {c.iso}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="font-mono text-xs font-bold text-primary bg-orange-50/80 px-2 py-0.5 rounded-lg border border-orange-100">
                        {c.code}
                      </span>
                      {isSelected && (
                        <Check size={14} className="text-primary flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Footer hint */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Scroll or type country name</span>
            <span className="font-semibold text-slate-500">Worldwide SMS/Calls Ready</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default PhoneInput;
