import React, { useState, useEffect, useRef, useMemo } from 'react';
import Kenat, { getHolidaysInMonth, monthNames } from 'kenat';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface KewtiCalendarProps {
  value?: Kenat | null;
  onChange?: (date: Kenat) => void;
  showHolidays?: boolean;
  showAnimations?: boolean;
  calendarPref?: 'ethiopian' | 'gregorian';
  className?: string;
  style?: React.CSSProperties;
}

export interface KewtiDatePickerProps extends KewtiCalendarProps {
  placeholder?: string;
}

const AMHARIC_WEEKDAYS = ['ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ', 'እሑድ'];
const GREGORIAN_WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const KewtiCalendar: React.FC<KewtiCalendarProps> = ({
  value,
  onChange,
  showHolidays = true,
  showAnimations = true,
  calendarPref = 'ethiopian',
  className = '',
  style = {},
}) => {
  // Current active date representing view month
  const [viewDate, setViewDate] = useState<Kenat>(() => {
    try {
      return value ?? new Kenat();
    } catch {
      return new Kenat();
    }
  });
  const [activePref, setActivePref] = useState<'ethiopian' | 'gregorian'>(calendarPref);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  useEffect(() => {
    setActivePref(calendarPref);
  }, [calendarPref]);

  useEffect(() => {
    if (value) {
      try {
        setViewDate(value);
      } catch {
        // fallback
      }
    }
  }, [value]);

  const eth = useMemo(() => {
    try {
      if (typeof viewDate.getEthiopian === 'function') {
        return viewDate.getEthiopian();
      }
    } catch {
      // fallback
    }
    return { year: 2019, month: 1, day: 1 };
  }, [viewDate]);

  const greg = useMemo(() => {
    try {
      if (typeof viewDate.getGregorian === 'function') {
        return viewDate.getGregorian();
      }
    } catch {
      // fallback
    }
    return { year: 2026, month: 9, day: 14 };
  }, [viewDate]);

  const holidays = useMemo(() => {
    if (!showHolidays) return [];
    try {
      if (typeof getHolidaysInMonth === 'function' && eth?.year && eth?.month) {
        return getHolidaysInMonth(eth.year, eth.month) || [];
      }
    } catch {
      return [];
    }
    return [];
  }, [eth?.year, eth?.month, showHolidays]);

  const daysInMonth = useMemo(() => {
    try {
      if (typeof viewDate.getMonthCalendar === 'function') {
        const cal = viewDate.getMonthCalendar();
        if (Array.isArray(cal)) return cal;
      }
    } catch {
      // fallback
    }
    return [];
  }, [viewDate]);

  // Determine weekday offset for grid
  const startDayOffset = useMemo(() => {
    if (!daysInMonth || daysInMonth.length === 0) return 0;
    const firstDayGregorian = daysInMonth[0]?.gregorian?.display;
    if (!firstDayGregorian) return 0;
    try {
      // Parse YYYY-MM-DD
      const parts = firstDayGregorian.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getDay();
        // Convert JS Sunday (0) to European/Ethiopian index where Monday = 0, ..., Sunday = 6
        return (d + 6) % 7;
      }
    } catch {
      return 0;
    }
    return 0;
  }, [daysInMonth]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof viewDate.addMonths === 'function') {
        const prev = viewDate.addMonths(-1);
        setViewDate(prev);
      }
    } catch (err) {
      console.error('Error navigating previous month:', err);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof viewDate.addMonths === 'function') {
        const next = viewDate.addMonths(1);
        setViewDate(next);
      }
    } catch (err) {
      console.error('Error navigating next month:', err);
    }
  };

  const handleGoToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setViewDate(new Kenat());
    } catch {
      // fallback
    }
  };

  const handleSelectSpecificMonth = (targetMonthIndex: number) => {
    try {
      if (activePref === 'ethiopian') {
        const currentM = eth?.month || 1;
        const diff = (targetMonthIndex + 1) - currentM;
        if (diff !== 0 && typeof viewDate.addMonths === 'function') {
          setViewDate(viewDate.addMonths(diff));
        }
      } else {
        const targetDate = new Date(greg.year, targetMonthIndex, 1);
        setViewDate(new Kenat(targetDate));
      }
    } catch (err) {
      console.error('Error selecting specific month:', err);
    }
  };

  const isSelected = (dayItem: any) => {
    if (!value || !dayItem) return false;
    try {
      const vEth = typeof value.getEthiopian === 'function' ? value.getEthiopian() : null;
      if (vEth && dayItem.ethiopian) {
        return (
          vEth.year === dayItem.ethiopian.year &&
          vEth.month === dayItem.ethiopian.month &&
          vEth.day === dayItem.ethiopian.day
        );
      }
      // Or check Gregorian match
      const vGreg = typeof value.getGregorian === 'function' ? value.getGregorian() : null;
      if (vGreg && dayItem.gregorian) {
        return (
          vGreg.year === dayItem.gregorian.year &&
          vGreg.month === dayItem.gregorian.month &&
          vGreg.day === dayItem.gregorian.day
        );
      }
    } catch {
      return false;
    }
    return false;
  };

  const isToday = (dayItem: any) => {
    if (!dayItem) return false;
    try {
      const today = new Kenat();
      const tEth = today.getEthiopian();
      if (tEth && dayItem.ethiopian) {
        return (
          tEth.year === dayItem.ethiopian.year &&
          tEth.month === dayItem.ethiopian.month &&
          tEth.day === dayItem.ethiopian.day
        );
      }
    } catch {
      return false;
    }
    return false;
  };

  const handleSelectDay = (dayItem: any) => {
    if (!onChange || !dayItem) return;
    try {
      // Construct new Kenat from Gregorian date
      if (dayItem.gregorian?.display) {
        const gregStr = dayItem.gregorian.display;
        const parts = gregStr.split('-');
        if (parts.length === 3) {
          const jsDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          const newSelected = new Kenat(jsDate);
          onChange(newSelected);
          return;
        }
      }
      if (dayItem.gregorian?.year && dayItem.gregorian?.month && dayItem.gregorian?.day) {
        const jsDate = new Date(dayItem.gregorian.year, dayItem.gregorian.month - 1, dayItem.gregorian.day);
        const newSelected = new Kenat(jsDate);
        onChange(newSelected);
      }
    } catch {
      // fallback
    }
  };

  const monthTitle = useMemo(() => {
    if (activePref === 'ethiopian') {
      const amharicMonths = monthNames?.amharic || [
        'መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
        'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሀምሌ', 'ነሐሴ', 'ጳጉሜ'
      ];
      const mName = amharicMonths[(eth?.month || 1) - 1] || 'መስከረም';
      return `${mName} ${eth?.year || 2019}`;
    } else {
      const gregMonths = monthNames?.gregorian || [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const mName = gregMonths[(greg?.month || 9) - 1] || 'September';
      return `${mName} ${greg?.year || 2026}`;
    }
  }, [activePref, eth, greg]);

  const secondaryMonthSubtitle = useMemo(() => {
    if (activePref === 'ethiopian') {
      const gregMonths = monthNames?.gregorian || [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const mName = gregMonths[(greg?.month || 9) - 1] || 'September';
      return `${mName} ${greg?.year || 2026} G.C.`;
    } else {
      const amharicMonths = monthNames?.amharic || [
        'መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
        'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሀምሌ', 'ነሐሴ', 'ጳጉሜ'
      ];
      const mName = amharicMonths[(eth?.month || 1) - 1] || 'መስከረም';
      return `${mName} ${eth?.year || 2019} ዓ.ም`;
    }
  }, [activePref, eth, greg]);

  return (
    <div
      className={`rounded-2xl border border-[#D4A373]/30 bg-[#FDFBF7] p-3 sm:p-4 text-[#1A1818] shadow-sm select-none transition-all duration-300 w-full overflow-hidden ${className}`}
      style={style}
    >
      {/* Header controls: Switcher & Nav (Mobile-optimized flex layout) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#E0A96D]/20 pb-3 mb-3">
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <div>
            <button
              type="button"
              onClick={() => setIsMonthPickerOpen(prev => !prev)}
              className="group font-serif text-base sm:text-lg font-bold tracking-tight text-[#1A1818] flex items-center gap-1.5 hover:text-[#9C6D38] transition-colors text-left cursor-pointer"
              title="Click to jump to any month"
            >
              <span>{monthTitle}</span>
              <span className="text-[10px] sm:text-xs font-sans font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-[#E0A96D]/15 text-[#82531F]">
                {activePref === 'ethiopian' ? 'ዓ.ም' : 'G.C.'}
              </span>
              <span className="text-[9px] sm:text-[10px] text-stone-400 group-hover:text-[#9C6D38] transition-transform">
                {isMonthPickerOpen ? '▲' : '▼'}
              </span>
            </button>
            <p className="text-[11px] sm:text-xs text-stone-500 font-sans tracking-wide mt-0.5">
              {secondaryMonthSubtitle}
            </p>
          </div>

          {/* Quick month switcher for small mobile screens right next to title */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-stone-200 bg-white hover:border-[#D4A373] text-stone-700 active:bg-[#E0A96D]/20"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-stone-200 bg-white hover:border-[#D4A373] text-stone-700 active:bg-[#E0A96D]/20"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Nav buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5">
          {/* Today button */}
          <button
            type="button"
            onClick={handleGoToday}
            className="text-[11px] px-2.5 py-1 rounded-lg border border-stone-200 bg-white/80 hover:border-[#D4A373] hover:bg-[#E0A96D]/10 text-stone-600 hover:text-[#82531F] font-medium transition-colors cursor-pointer"
            title="Go to Today"
          >
            {activePref === 'ethiopian' ? 'ዛሬ (Today)' : 'Today'}
          </button>

          {/* Calendar Preference toggle */}
          <button
            type="button"
            onClick={() => {
              setActivePref(prev => prev === 'ethiopian' ? 'gregorian' : 'ethiopian');
              setIsMonthPickerOpen(false);
            }}
            className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg border border-[#D4A373]/30 bg-white/90 hover:bg-[#E0A96D]/15 text-[#82531F] font-medium transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
            title="Switch Ethiopian / Gregorian Calendar mode"
          >
            <Globe className="w-3 h-3 text-[#D4A373]" />
            <span>{activePref === 'ethiopian' ? 'ኢትዮጵያ' : 'Gregorian'}</span>
          </button>

          {/* Desktop month navigation arrows */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-stone-200 hover:border-[#D4A373] hover:bg-[#E0A96D]/10 text-stone-700 hover:text-[#9C6D38] transition-colors cursor-pointer"
              aria-label="Previous Month"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-stone-200 hover:border-[#D4A373] hover:bg-[#E0A96D]/10 text-stone-700 hover:text-[#9C6D38] transition-colors cursor-pointer"
              aria-label="Next Month"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Month Picker Dropdown */}
      {isMonthPickerOpen && (
        <div className="mb-3 p-2.5 rounded-xl bg-white border border-[#E0A96D]/30 shadow-md">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-stone-100 text-xs font-semibold text-stone-700">
            <span>{activePref === 'ethiopian' ? 'ወር ይምረጡ (Select Month)' : 'Select Month'}</span>
            <button
              type="button"
              onClick={() => setIsMonthPickerOpen(false)}
              className="text-stone-400 hover:text-stone-600 text-[11px]"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 text-xs">
            {(activePref === 'ethiopian'
              ? (monthNames?.amharic || [
                  'መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
                  'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሀምሌ', 'ነሐሴ', 'ጳጉሜ'
                ])
              : (monthNames?.gregorian || [
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ])
            ).map((mName, idx) => {
              const isCurrent = activePref === 'ethiopian'
                ? eth?.month === idx + 1
                : greg?.month === idx + 1;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    handleSelectSpecificMonth(idx);
                    setIsMonthPickerOpen(false);
                  }}
                  className={`py-1.5 px-1 text-center rounded-lg font-medium text-xs transition-colors truncate ${
                    isCurrent
                      ? 'bg-[#1A1818] text-[#E0A96D] font-bold shadow-2xs'
                      : 'bg-stone-50 hover:bg-[#E0A96D]/15 text-stone-700'
                  }`}
                >
                  {mName}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center mb-1.5">
        {(activePref === 'ethiopian' ? AMHARIC_WEEKDAYS : GREGORIAN_WEEKDAYS).map((day, idx) => (
          <div key={idx} className="text-[10px] sm:text-[11px] font-semibold text-stone-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {/* Leading empty slots */}
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9 sm:h-10 w-full rounded-lg opacity-0 pointer-events-none" />
        ))}

        {daysInMonth.map((dayItem: any, idx: number) => {
          const selected = isSelected(dayItem);
          const today = isToday(dayItem);
          const holidayMatch = holidays.find(
            (h: any) => h.ethiopian && h.ethiopian.day === dayItem.ethiopian?.day
          );

          const mainNum = activePref === 'ethiopian'
            ? dayItem.ethiopian?.day
            : (dayItem.gregorian?.day || (dayItem.gregorian?.display ? new Date(dayItem.gregorian.display).getDate() : ''));
          
          const subNum = activePref === 'ethiopian'
            ? (dayItem.gregorian?.day || (dayItem.gregorian?.display ? new Date(dayItem.gregorian.display).getDate() : ''))
            : dayItem.ethiopian?.day;

          return (
            <motion.button
              key={idx}
              type="button"
              whileHover={showAnimations ? { scale: 1.08, y: -1 } : undefined}
              whileTap={showAnimations ? { scale: 0.95 } : undefined}
              onClick={() => handleSelectDay(dayItem)}
              className={`relative h-9 sm:h-10 w-full rounded-lg sm:rounded-xl flex flex-col items-center justify-center transition-all duration-150 group cursor-pointer ${
                selected
                  ? 'bg-gradient-to-br from-[#E0A96D] to-[#B87A38] text-white shadow-md font-semibold ring-2 ring-[#E0A96D]/40'
                  : today
                  ? 'border border-[#D4A373] bg-[#E0A96D]/15 text-[#82531F] font-semibold shadow-2xs'
                  : 'hover:bg-[#E0A96D]/15 text-stone-800 hover:text-[#82531F]'
              }`}
              title={
                holidayMatch
                  ? `${holidayMatch.name || 'Holiday'}: ${holidayMatch.description || ''}`
                  : undefined
              }
            >
              <span className="text-[11px] sm:text-xs leading-none font-medium">
                {mainNum}
              </span>
              <span className={`text-[8px] sm:text-[9px] leading-none mt-0.5 opacity-60 ${selected ? 'text-amber-100' : 'text-stone-400'}`}>
                {subNum}
              </span>

              {/* Holiday dot indicator */}
              {showHolidays && holidayMatch && (
                <span
                  className={`absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${
                    selected ? 'bg-white' : 'bg-[#D4A373]'
                  }`}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Holiday highlight banner if current month has holidays */}
      {showHolidays && holidays.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-[#E0A96D]/20 text-[11px] text-[#82531F] flex items-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A373] shrink-0 mt-0.5" />
          <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold">በዓላት: </span>
            {holidays.map((h: any) => `${h.name} (${h.ethiopian?.day})`).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export const KewtiDatePicker: React.FC<KewtiDatePickerProps> = ({
  value,
  onChange,
  showHolidays = true,
  showAnimations = true,
  calendarPref = 'ethiopian',
  placeholder = 'ቀን ይምረጡ / Select Date',
  className = '',
  style = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const formattedDisplay = useMemo(() => {
    if (!value) return '';
    try {
      if (calendarPref === 'ethiopian' && typeof value.format === 'function') {
        return value.format({ calendar: 'ethiopian', showWeekday: true });
      } else if (typeof value.format === 'function') {
        return value.format({ calendar: 'gregorian', showWeekday: true });
      }
    } catch {
      return '';
    }
    return '';
  }, [value, calendarPref]);

  return (
    <div ref={containerRef} className="relative w-full" style={style}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-[#D4A373]/40 bg-white hover:border-[#D4A373] text-left text-sm transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#D4A373]/40 ${
          value ? 'text-[#1A1818]' : 'text-stone-400'
        } ${className}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <CalendarIcon className="w-4 h-4 text-[#D4A373] shrink-0" />
          <span className="truncate font-medium">
            {formattedDisplay || placeholder}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {value && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#E0A96D]/15 text-[#82531F]">
              {calendarPref === 'ethiopian' ? 'ዓ.ም' : 'G.C.'}
            </span>
          )}
          <span className="text-xs text-stone-400">▾</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 top-full mt-2 z-50 w-full min-w-[300px] max-w-[340px] drop-shadow-xl"
          >
            <KewtiCalendar
              value={value}
              onChange={(date) => {
                if (onChange) onChange(date);
                setIsOpen(false);
              }}
              showHolidays={showHolidays}
              showAnimations={showAnimations}
              calendarPref={calendarPref}
              className="bg-[#FDFBF7] shadow-xl border-2 border-[#D4A373]/40"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
