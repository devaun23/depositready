"use client";

import { useState, useEffect, useCallback, useId } from "react";

interface DateDropdownsProps {
  value: string | null;
  onChange: (date: string | null) => void;
  label?: string;
  required?: boolean;
  error?: string;
  maxDate?: Date;
  minDate?: Date;
  onBlur?: () => void;
  id?: string;
}

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function getYearRange(maxDate?: Date, minDate?: Date): number[] {
  const currentYear = new Date().getFullYear();
  const maxYear = maxDate ? maxDate.getFullYear() : currentYear;
  const minYear = minDate ? minDate.getFullYear() : currentYear - 10;

  const years: number[] = [];
  for (let year = maxYear; year >= minYear; year--) {
    years.push(year);
  }
  return years;
}

function parseDate(dateStr: string | null): { month: number | null; day: number | null; year: number | null } {
  if (!dateStr) return { month: null, day: null, year: null };

  const parts = dateStr.split("-");
  if (parts.length !== 3) return { month: null, day: null, year: null };

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return { month: null, day: null, year: null };
  }

  return { month, day, year };
}

function formatDate(year: number | null, month: number | null, day: number | null): string | null {
  if (year === null || month === null || day === null) return null;

  const monthStr = month.toString().padStart(2, "0");
  const dayStr = day.toString().padStart(2, "0");
  return `${year}-${monthStr}-${dayStr}`;
}

export function DateDropdowns({
  value,
  onChange,
  label,
  required = false,
  error,
  maxDate,
  minDate,
  onBlur,
  id,
}: DateDropdownsProps) {
  const generatedId = useId();
  const baseId = id || generatedId;

  const parsed = parseDate(value);
  const [month, setMonth] = useState<number | null>(parsed.month);
  const [day, setDay] = useState<number | null>(parsed.day);
  const [year, setYear] = useState<number | null>(parsed.year);

  // Sync internal state when value prop changes
  useEffect(() => {
    const parsed = parseDate(value);
    setMonth(parsed.month);
    setDay(parsed.day);
    setYear(parsed.year);
  }, [value]);

  const years = getYearRange(maxDate, minDate);

  // Calculate max days based on selected month/year
  const maxDays = month && year ? getDaysInMonth(year, month) : 31;

  // Adjust day if it exceeds the max for the selected month
  useEffect(() => {
    if (day !== null && day > maxDays) {
      setDay(maxDays);
    }
  }, [day, maxDays]);

  const handleChange = useCallback(
    (newMonth: number | null, newDay: number | null, newYear: number | null) => {
      // If all fields are filled, emit the date
      if (newMonth !== null && newDay !== null && newYear !== null) {
        // Validate day against month
        const adjustedMaxDays = getDaysInMonth(newYear, newMonth);
        const adjustedDay = newDay > adjustedMaxDays ? adjustedMaxDays : newDay;

        // Check if date is within bounds
        const newDate = new Date(newYear, newMonth - 1, adjustedDay);

        if (maxDate && newDate > maxDate) {
          // Date exceeds max, don't update
          return;
        }

        if (minDate && newDate < minDate) {
          // Date is before min, don't update
          return;
        }

        onChange(formatDate(newYear, newMonth, adjustedDay));
      } else if (newMonth === null && newDay === null && newYear === null) {
        // All cleared
        onChange(null);
      }
      // If partially filled, don't emit yet
    },
    [onChange, maxDate, minDate]
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value ? parseInt(e.target.value, 10) : null;
    setMonth(newMonth);
    handleChange(newMonth, day, year);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value ? parseInt(e.target.value, 10) : null;
    setDay(newDay);
    handleChange(month, newDay, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value ? parseInt(e.target.value, 10) : null;
    setYear(newYear);
    handleChange(month, day, newYear);
  };

  const selectBaseClass = `
    w-full px-3 py-3 min-h-[44px]
    border rounded-lg bg-white
    text-base
    focus:ring-2 focus:ring-black focus:border-black
    transition-colors
    appearance-none
    cursor-pointer
  `;

  const selectClass = error
    ? `${selectBaseClass} border-red-500 focus:ring-red-500 focus:border-red-500`
    : `${selectBaseClass} border-gray-300`;

  return (
    <div>
      {label && (
        <label
          htmlFor={`${baseId}-month`}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Month */}
        <div className="relative">
          <select
            id={`${baseId}-month`}
            value={month ?? ""}
            onChange={handleMonthChange}
            onBlur={onBlur}
            className={selectClass}
            aria-label="Month"
          >
            <option value="">Month</option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Day */}
        <div className="relative">
          <select
            id={`${baseId}-day`}
            value={day ?? ""}
            onChange={handleDayChange}
            onBlur={onBlur}
            className={selectClass}
            aria-label="Day"
          >
            <option value="">Day</option>
            {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Year */}
        <div className="relative">
          <select
            id={`${baseId}-year`}
            value={year ?? ""}
            onChange={handleYearChange}
            onBlur={onBlur}
            className={selectClass}
            aria-label="Year"
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
