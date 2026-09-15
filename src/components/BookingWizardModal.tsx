import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import Kenat from 'kenat';
import { KewtiCalendar } from '../kewti/ui';
import {
  STUDIO_PACKAGES,
  TIME_SLOTS,
  MUSIC_GENRES,
  RENTAL_COLLATERAL_OPTIONS,
  getStudioConfig
} from '../data/studioData';
import { BookingState } from '../types';
import {
  X, Check, Send, Copy, ExternalLink, Guitar, Disc3,
  MessageSquare, Info, Sparkles
} from 'lucide-react';

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialNotes?: string;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  initialNotes
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const config = getStudioConfig();

  // Form State
  const [formData, setFormData] = useState<BookingState>(() => ({
    packageId: initialPackageId || 'prod-20000',
    selectedDate: new Kenat(),
    timeSlot: 'afternoon',
    projectTitle: '',
    genre: 'Gospel / Worship / Church',
    audioLinks: '',
    rentalDays: 1,
    pickupOrStudio: 'studio_use',
    collateralType: RENTAL_COLLATERAL_OPTIONS[0],
    projectNotes: initialNotes || '',
    clientName: '',
    clientEmail: '',
    clientPhone: '+251 ',
    contactMethod: 'Instagram',
  }));

  const [calPref, setCalPref] = useState<'ethiopian' | 'gregorian'>('ethiopian');

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setCopiedNotification(false);
      if (initialPackageId) {
        setFormData(prev => ({ ...prev, packageId: initialPackageId }));
      }
      if (initialNotes) {
        setFormData(prev => ({ ...prev, projectNotes: initialNotes }));
      }
    }
  }, [isOpen, initialPackageId, initialNotes]);

  if (!isOpen) return null;

  const selectedPkg = STUDIO_PACKAGES.find(p => p.id === formData.packageId) || STUDIO_PACKAGES[0];
  const selectedSlot = TIME_SLOTS.find(s => s.id === formData.timeSlot) || TIME_SLOTS[0];
  const isRental = selectedPkg.category === 'rental';

  const calculateTotal = () => {
    if (isRental) {
      return selectedPkg.priceETB * (formData.rentalDays || 1);
    }
    return selectedPkg.priceETB;
  };

  const formattedDateString = () => {
    try {
      if (formData.selectedDate && typeof formData.selectedDate.format === 'function') {
        const ethStr = formData.selectedDate.format({ calendar: 'ethiopian', showWeekday: true });
        const gregStr = formData.selectedDate.format({ calendar: 'gregorian', showWeekday: true });
        return { eth: ethStr, greg: gregStr };
      }
    } catch {
      // fallback
    }
    return { eth: 'ሰኞ, መስከረም 4 2019', greg: 'Monday, September 14 2026' };
  };

  const dates = formattedDateString();

  const generateBookingMessage = () => {
    const total = calculateTotal();

    if (isRental) {
      return `🎸 *INSTRUMENT RENTAL BOOKING — MUNIT PRODUCTION* 🎸

📌 *Instrument:* ${selectedPkg.title}
💰 *Daily Rate:* ${selectedPkg.priceETB.toLocaleString()} ETB / Rental
🗓️ *Rental Duration:* ${formData.rentalDays} Day${formData.rentalDays > 1 ? 's' : ''}
💵 *Estimated Total:* ${total.toLocaleString()} ETB

📋 *Included Items:*
${selectedPkg.deliverables.map(d => `• ${d}`).join('\n')}

📅 *Rental Start Date:*
• Ethiopian Calendar: ${dates.eth}
• Gregorian Calendar: ${dates.greg}

⏰ *Pickup / Session Window:*
• ${selectedSlot.title} (${selectedSlot.ethiopianTime})

📍 *Rental Type:* ${formData.pickupOrStudio === 'studio_use' ? 'Studio In-House Session Use' : 'Pickup / Takeaway for Outside Event/Gig'}
🪪 *Collateral / Verification:* ${formData.collateralType}
${formData.projectNotes ? `📝 *Session Notes:* ${formData.projectNotes}\n` : ''}
👤 *Client Contact:*
• Name: ${formData.clientName}
• Phone: ${formData.clientPhone}
• Direct Instagram: @${config.instagramUsername}
---
Booking generated via Munit Production Web`;
    }

    return `🎵 *STUDIO SESSION BOOKING REQUEST — MUNIT PRODUCTION* 🎵

📌 *Selected Service:* ${selectedPkg.title}
💰 *Rate:* ${selectedPkg.priceETB.toLocaleString()} ETB (${selectedPkg.unit})
${selectedPkg.duration ? `⏱️ *Duration:* ${selectedPkg.duration}\n` : ''}
📋 *Included Deliverables:*
${selectedPkg.deliverables.map(d => `• ${d}`).join('\n')}

📅 *Target Session Date:*
• Ethiopian Calendar: ${dates.eth}
• Gregorian Calendar: ${dates.greg}

⏰ *Session Time Slot:*
• ${selectedSlot.title} — ${selectedSlot.ethiopianTime} (${selectedSlot.westernTime})

🎼 *Project Information:*
• Project Title: ${formData.projectTitle || 'Untitled Project'}
• Musical Style / Genre: ${formData.genre}
${formData.audioLinks ? `• Reference Link: ${formData.audioLinks}\n` : ''}${formData.projectNotes ? `• Notes: ${formData.projectNotes}\n` : ''}
👤 *Client Contact:*
• Name: ${formData.clientName}
• Phone: ${formData.clientPhone}
• Routed to: @${config.instagramUsername}
---
Munit Production Studio Booking`;
  };

  const handleCopyMessage = async () => {
    const text = generateBookingMessage();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    } catch {
      // fallback
    }
  };

  const handleSubmitBooking = async () => {
    const msg = generateBookingMessage();
    
    // 1. Copy message automatically to client's clipboard
    try {
      await navigator.clipboard.writeText(msg);
      setCopiedNotification(true);
    } catch {
      // fallback
    }

    // 2. Confetti feedback
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4A373', '#E0A96D', '#1A1818']
      });
    } catch {
      // ignore
    }

    // 3. Move to instructions & confirmation view
    setIsSubmitted(true);

    // 4. Open recipient's Instagram DM
    setTimeout(() => {
      window.open(config.instagramDmLink, '_blank', 'noopener,noreferrer');
    }, 700);
  };

  const steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Date & Time' },
    { num: 3, label: isRental ? 'Rental Info' : 'Project Info' },
    { num: 4, label: 'Confirm' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1A1818]/65 backdrop-blur-xs">
      <div className="w-full sm:max-w-2xl bg-[#FDFBF7] rounded-t-3xl sm:rounded-2xl shadow-2xl border border-[#D4A373]/30 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* Top Header without any settings button */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-[#1A1818] text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div>
            <h3 className="font-serif text-sm sm:text-lg font-bold flex items-center gap-2">
              <span>Book Session &bull; Munit Production</span>
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#E0A96D] font-mono flex items-center gap-1.5">
              <span>Direct Studio Booking with:</span>
              <strong className="text-white">@{config.instagramUsername}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {!isSubmitted && (
          <div className="bg-[#FAF5EC] px-3 sm:px-6 py-2 sm:py-2.5 border-b border-stone-200 shrink-0">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {steps.map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                        currentStep === s.num
                          ? 'bg-[#1A1818] text-[#E0A96D]'
                          : currentStep > s.num
                          ? 'bg-[#D4A373] text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {currentStep > s.num ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" /> : s.num}
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-stone-600 hidden xs:inline sm:inline">
                      {s.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 sm:mx-2 ${
                        currentStep > idx + 1 ? 'bg-[#D4A373]' : 'bg-stone-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1 text-[#1A1818]">
          <AnimatePresence mode="wait">
            
            {/* Confirmation & Paste Guide Screen */}
            {isSubmitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 space-y-5 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Booking Copied to Clipboard!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    We just opened the Instagram DM for <strong className="text-[#844E20]">@{config.instagramUsername}</strong>.
                  </p>
                </div>

                {/* Clear "What to do next" guidance banner */}
                <div className="p-4 rounded-xl bg-[#FFF8EE] border-2 border-[#E0A96D]/60 text-left space-y-2 max-w-lg mx-auto shadow-xs">
                  <div className="flex items-center gap-2 text-[#82531F] font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#D4A373]" />
                    <span>Next Step: Simply Paste &amp; Send in Instagram</span>
                  </div>
                  <ol className="text-xs sm:text-[13px] text-[#4A3222] space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>
                      Your complete booking details are <strong>already copied</strong> to your clipboard.
                    </li>
                    <li>
                      In the Instagram chat that opened with <strong>@{config.instagramUsername}</strong>, right-click and choose <strong>&ldquo;Paste&rdquo;</strong> (or press <strong>Ctrl+V / Cmd+V</strong>).
                    </li>
                    <li>
                      Hit <strong>Send</strong> to submit your session or gear rental directly to the producer.
                    </li>
                  </ol>
                </div>

                {/* Summary box */}
                <div className="rounded-xl bg-white p-4 border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between font-bold text-stone-900 border-b pb-2">
                    <span>{selectedPkg.title}</span>
                    <span className="text-[#82531F]">{calculateTotal().toLocaleString()} ETB</span>
                  </div>
                  <div className="text-stone-600">
                    <strong>Target Date:</strong> {dates.eth} ({dates.greg})
                  </div>
                  <div className="text-stone-600">
                    <strong>Time:</strong> {selectedSlot.title} &bull; {selectedSlot.ethiopianTime}
                  </div>
                  {isRental ? (
                    <div className="text-stone-600">
                      <strong>Usage:</strong> {formData.pickupOrStudio === 'studio_use' ? 'In Studio' : 'Pickup'} &bull; {formData.rentalDays} Day(s)
                    </div>
                  ) : (
                    <div className="text-stone-600">
                      <strong>Project:</strong> {formData.projectTitle || 'Single'} &bull; {formData.genre}
                    </div>
                  )}
                  <div className="text-stone-600">
                    <strong>Client:</strong> {formData.clientName} ({formData.clientPhone})
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={config.instagramDmLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#211A15] to-[#1A1818] text-[#E0A96D] text-xs font-bold flex items-center justify-center gap-2 border border-[#E0A96D]/40 shadow-md hover:opacity-95"
                  >
                    <span>Go to Instagram DM (@{config.instagramUsername})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-50 cursor-pointer"
                  >
                    {copiedNotification ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Details Again</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : null}

            {/* STEP 1: Select Service */}
            {!isSubmitted && currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-bold">
                    Step 1: Select Service or Instrument
                  </h4>
                  <p className="text-xs text-stone-500">
                    Choose music production package, standalone service, or instrument rental.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {STUDIO_PACKAGES.map((pkg) => {
                    const isSelected = formData.packageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setFormData(prev => ({ ...prev, packageId: pkg.id }))}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#D4A373] bg-[#FAF5EC] shadow-xs ring-1 ring-[#D4A373]'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#A06935] font-semibold">
                              {pkg.category === 'rental' ? 'Instrument Rental' : 'Studio Production'}
                            </span>
                            <h5 className="font-serif font-bold text-sm text-stone-900 leading-tight">
                              {pkg.title}
                            </h5>
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-[#1A1818] text-[#E0A96D] flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-baseline justify-between text-xs">
                          <span className="font-bold text-[#82531F]">
                            {pkg.priceETB.toLocaleString()} ETB
                          </span>
                          <span className="text-[10px] text-stone-400 uppercase font-mono">
                            / {pkg.unit}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time Slot */}
            {!isSubmitted && currentStep === 2 && (
              <div className="space-y-3.5 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold">
                      Step 2: Pick Date & Time Slot
                    </h4>
                    <p className="text-[11px] sm:text-xs text-stone-500">
                      Select date on the Ethiopian Kewti calendar.
                    </p>
                  </div>

                  {/* Calendar Toggle */}
                  <div className="inline-flex items-center gap-1 bg-[#FAF5EC] p-1 rounded-lg border border-stone-200 text-xs self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setCalPref('ethiopian')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer ${
                        calPref === 'ethiopian' ? 'bg-[#1A1818] text-[#E0A96D]' : 'text-stone-600'
                      }`}
                    >
                      የኢትዮጵያ
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalPref('gregorian')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer ${
                        calPref === 'gregorian' ? 'bg-[#1A1818] text-[#E0A96D]' : 'text-stone-600'
                      }`}
                    >
                      Gregorian
                    </button>
                  </div>
                </div>

                {/* Kewti Calendar */}
                <KewtiCalendar
                  value={formData.selectedDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, selectedDate: date }))}
                  calendarPref={calPref}
                  className="w-full bg-[#FAF5EC] border-stone-200"
                />

                <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-stone-500">Selected Date:</span>
                  <span className="font-bold text-[#82531F] text-xs sm:text-sm">
                    {dates.eth} &bull; {dates.greg}
                  </span>
                </div>

                {/* Slot Selection */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = formData.timeSlot === slot.id;
                      return (
                        <div
                          key={slot.id}
                          onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot.id }))}
                          className={`p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                            isSelected
                              ? 'border-[#D4A373] bg-[#FAF5EC] font-semibold ring-1 ring-[#D4A373]'
                              : 'border-stone-200 bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex sm:block justify-between items-baseline">
                            <div className="text-stone-900 font-medium">{slot.title}</div>
                            <div className="text-[#82531F] font-bold">{slot.ethiopianTime}</div>
                          </div>
                          <div className="text-stone-400 text-[10px] mt-0.5">{slot.westernTime}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Details — DYNAMICALLY ADAPTED: Instrument Rental vs Music Production */}
            {!isSubmitted && currentStep === 3 && (
              <div className="space-y-3.5">
                {isRental ? (
                  // Instrument Rental Details
                  <>
                    <div className="flex items-center gap-2 pb-1 border-b border-stone-200">
                      <div className="w-8 h-8 rounded-lg bg-[#E0A96D]/20 text-[#82531F] flex items-center justify-center">
                        <Guitar className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold">
                          Step 3: Rental Details
                        </h4>
                        <p className="text-xs text-stone-500">
                          Specific details for renting: <strong className="text-stone-900">{selectedPkg.title}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Rental Duration (Days)
                        </label>
                        <select
                          value={formData.rentalDays}
                          onChange={(e) => setFormData(prev => ({ ...prev, rentalDays: Number(e.target.value) }))}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                        >
                          {[1, 2, 3, 4, 5, 7, 14, 30].map(d => (
                            <option key={d} value={d}>
                              {d} {d === 1 ? 'Day' : 'Days'} &bull; {(selectedPkg.priceETB * d).toLocaleString()} ETB
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Usage Location
                        </label>
                        <select
                          value={formData.pickupOrStudio}
                          onChange={(e) => setFormData(prev => ({ ...prev, pickupOrStudio: e.target.value as any }))}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                        >
                          <option value="studio_use">Inside Munit Studio Session</option>
                          <option value="pickup_takeaway">Pickup / Event / Church / Gig</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Collateral / Identification Agreement
                      </label>
                      <select
                        value={formData.collateralType}
                        onChange={(e) => setFormData(prev => ({ ...prev, collateralType: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                      >
                        {RENTAL_COLLATERAL_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Standard deposit or valid identification is checked during gear handoff.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Equipment Notes & Special Requests
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Need standard 1/4 guitar cables, specific strings gauge, or amp setup details..."
                        value={formData.projectNotes}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectNotes: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                      />
                    </div>
                  </>
                ) : (
                  // Music Production Details
                  <>
                    <div className="flex items-center gap-2 pb-1 border-b border-stone-200">
                      <div className="w-8 h-8 rounded-lg bg-[#E0A96D]/20 text-[#82531F] flex items-center justify-center">
                        <Disc3 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold">
                          Step 3: Project Information
                        </h4>
                        <p className="text-xs text-stone-500">
                          Provide project details and references.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Project / Song Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Worship Track / Acoustic Single"
                        value={formData.projectTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Musical Style
                      </label>
                      <select
                        value={formData.genre}
                        onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                      >
                        {MUSIC_GENRES.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Demo Link (YouTube / Telegram / Drive)
                      </label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={formData.audioLinks}
                        onChange={(e) => setFormData(prev => ({ ...prev, audioLinks: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Notes & Instrumentation Details
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Piano arrangement, live bass, choir harmonies..."
                        value={formData.projectNotes}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectNotes: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STEP 4: Client Contact & Advance Instagram Notice */}
            {!isSubmitted && currentStep === 4 && (
              <div className="space-y-3.5">
                <div>
                  <h4 className="font-serif text-lg font-bold">
                    Step 4: Contact & Send to Instagram
                  </h4>
                  <p className="text-xs text-stone-500">
                    Provide your contact info to confirm your booking with <strong className="text-stone-900">@{config.instagramUsername}</strong>.
                  </p>
                </div>

                {/* Advance notice letting the client know what will happen */}
                <div className="p-3.5 rounded-xl bg-[#FFF8EE] border border-[#E0A96D]/50 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#844E20] shrink-0 mt-0.5" />
                  <div className="text-[#543825] leading-relaxed">
                    <strong className="text-[#2B1B11] block mb-0.5 font-semibold">How Booking Works:</strong>
                    When you click the button below, your booking details are <strong>automatically copied</strong> to your clipboard and your browser will open Instagram direct message. All you need to do is <strong>Paste &amp; Send</strong>!
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.clientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 91 000 0000"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white"
                    />
                  </div>
                </div>

                {/* Cost breakdown */}
                <div className="p-3.5 rounded-xl bg-[#FAF5EC] border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-[#82531F] text-sm">
                    <span>{selectedPkg.title}</span>
                    <span>{calculateTotal().toLocaleString()} ETB</span>
                  </div>
                  <div className="text-stone-600">
                    Date: {dates.eth} &bull; {selectedSlot.title} ({selectedSlot.ethiopianTime})
                  </div>
                  {isRental ? (
                    <div className="text-stone-500">
                      Rental Days: {formData.rentalDays} &bull; Location: {formData.pickupOrStudio === 'studio_use' ? 'In Studio' : 'Pickup'}
                    </div>
                  ) : (
                    <div className="text-stone-500">
                      Style: {formData.genre} {formData.projectTitle ? `• Title: ${formData.projectTitle}` : ''}
                    </div>
                  )}
                  <div className="text-stone-500 pt-1 border-t border-stone-200 flex justify-between items-center text-[11px]">
                    <span>Recipient Studio Account:</span>
                    <strong className="text-stone-800">@{config.instagramUsername}</strong>
                  </div>
                </div>
              </div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {!isSubmitted && (
          <div className="px-4 sm:px-6 py-3 bg-[#FAF5EC] border-t border-stone-200 flex items-center justify-between shrink-0 gap-2">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-3 sm:px-3.5 py-2 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-medium cursor-pointer hover:bg-stone-50 transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-4 sm:px-5 py-2 rounded-lg bg-[#1A1818] text-white text-xs font-medium cursor-pointer hover:bg-[#322A23] transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitBooking}
                disabled={!formData.clientName.trim() || formData.clientPhone.trim().length < 6}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#211A15] to-[#1A1818] text-[#E0A96D] text-xs font-bold flex items-center gap-1.5 sm:gap-2 disabled:opacity-50 cursor-pointer shadow-md border border-[#E0A96D]/30 hover:opacity-95 text-center transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                <span className="truncate">Copy &amp; Open Instagram</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
