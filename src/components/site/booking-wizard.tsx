"use client";

import { useMemo, useState } from "react";
import { services, stylists, salonInfo } from "@/lib/salon-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  User,
  Sparkles,
  Phone,
  Mail,
  CalendarHeart,
  PartyPopper,
} from "lucide-react";

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
];

const STEPS = ["Service", "Details", "Confirm"] as const;

const contactMethods = [
  { v: "Phone", label: "Phone", icon: Phone },
  { v: "Email", label: "Email", icon: Mail },
] as const;

const BRANCH = "Hayes Valley";

export interface BookingWizardProps {
  /** Service slug to preselect on mount. */
  presetService?: string | null;
  /** Stylist slug to preselect on mount. */
  presetStylist?: string | null;
  /** "Cancel" on step 0. */
  onCancel: () => void;
  /** "Done" after a confirmed booking. */
  onFinish: () => void;
  /** Fires once the booking is confirmed, for surrounding page chrome. */
  onBooked?: () => void;
  className?: string;
}

/**
 * The single 3-step booking flow. Rendered inside the modal and on /book —
 * mount it fresh (or key it) to reset.
 */
export function BookingWizard({
  presetService,
  presetStylist,
  onCancel,
  onFinish,
  onBooked,
  className,
}: BookingWizardProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [serviceSlug, setServiceSlug] = useState(presetService ?? "");
  const [stylistSlug, setStylistSlug] = useState(presetStylist ?? "");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState(BRANCH);
  const [specialRequests, setSpecialRequests] = useState("");
  const [contactMethod, setContactMethod] = useState("Phone");

  const [bookingRef] = useState(
    () => `LUM-${Math.floor(100000 + Math.random() * 900000)}`
  );

  const selectedService = useMemo(
    () => services.find((s) => s.slug === serviceSlug),
    [serviceSlug]
  );
  const selectedStylist = useMemo(
    () => stylists.find((s) => s.slug === stylistSlug),
    [stylistSlug]
  );

  const canContinueStep0 = !!serviceSlug && !!stylistSlug && !!date;
  const canContinueStep1 =
    !!time && name.trim().length > 1 && phone.trim().length >= 10;

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          service: selectedService?.name,
          serviceSlug,
          stylist: selectedStylist?.name,
          stylistSlug,
          date: date ? format(date, "yyyy-MM-dd") : "",
          time,
          branch,
          specialRequests,
          contactMethod,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setDone(true);
        onBooked?.();
        toast.success("Appointment booked!", {
          description: `See you on ${date ? format(date, "MMM d") : ""} at ${time}.`,
        });
      } else {
        toast.error("Could not book", {
          description: data.error || "Please try again.",
        });
      }
    } catch {
      toast.error("Network error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className={cn("flex flex-col items-center py-4 text-center sm:py-6", className)}>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 sm:h-16 sm:w-16">
          <PartyPopper className="h-6 w-6 sm:h-9 sm:w-9" />
        </span>
        <h3 className="mt-3 font-serif font-semibold text-foreground text-base sm:mt-5 sm:text-lg md:text-xl lg:text-2xl">
          You&apos;re all set, {name.split(" ")[0] || "friend"}!
        </h3>
        <p className="mx-auto mt-1.5 max-w-md text-pretty text-[0.7rem] text-muted-foreground leading-snug sm:mt-2 sm:text-sm md:leading-relaxed">
          Your appointment for{" "}
          <span className="font-semibold text-foreground">
            {selectedService?.name}
          </span>{" "}
          with{" "}
          <span className="font-semibold text-foreground">
            {selectedStylist?.name}
          </span>{" "}
          on{" "}
          <span className="font-semibold text-foreground">
            {date ? format(date, "EEEE, MMM d") : ""}
          </span>{" "}
          at <span className="font-semibold text-foreground">{time}</span> is
          confirmed.
        </p>

        <div className="mx-auto mt-4 w-full max-w-sm rounded-2xl border border-border/70 bg-secondary/50 p-2.5 text-left text-[0.7rem] sm:mt-6 sm:p-4 sm:text-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 py-1.5 sm:py-2">
            <span className="text-muted-foreground">Booking ref</span>
            <span className="font-mono font-semibold">{bookingRef}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-border/60 py-1.5 sm:py-2">
            <span className="text-muted-foreground">Branch</span>
            <span className="font-medium">{branch}, {salonInfo.address.city}</span>
          </div>
          <div className="flex items-center justify-between gap-3 py-1.5 sm:py-2">
            <span className="text-muted-foreground">Contact</span>
            <span className="font-medium">
              {contactMethod === "Email" ? email || phone : phone}
            </span>
          </div>
        </div>

        <p className="mt-3 max-w-md text-[0.65rem] leading-snug text-muted-foreground sm:mt-4 sm:text-xs">
          We&apos;ll send a confirmation shortly and a reminder two hours before
          your appointment. Need to reschedule? Email us at{" "}
          {salonInfo.bookingEmail}.
        </p>

        <Button
          onClick={onFinish}
          className="mt-4 h-8 rounded-full bg-primary px-6 text-xs transition-colors hover:bg-primary/90 sm:mt-6 sm:h-9 sm:px-8 sm:text-sm"
        >
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* STEP INDICATOR */}
      <div className="mb-4 flex items-center gap-1.5 sm:mb-7 sm:gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold transition-colors sm:h-8 sm:w-8 sm:text-xs",
                  i < step && "bg-primary text-primary-foreground",
                  i === step &&
                    "bg-primary text-primary-foreground ring-4 ring-primary/15",
                  i > step && "bg-secondary text-muted-foreground"
                )}
              >
                {i < step ? <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-[0.65rem] font-medium sm:text-xs",
                  i === step ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn("h-px flex-1", i < step ? "bg-primary" : "bg-border")}
              />
            )}
          </div>
        ))}
      </div>

      {/* STEP 0 — SERVICE */}
      {step === 0 && (
        <div className="space-y-3 sm:space-y-5">
          <div className="space-y-1.5 sm:space-y-2">
            <Label className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
              <Sparkles className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" /> Service
            </Label>
            <Select value={serviceSlug} onValueChange={setServiceSlug}>
              <SelectTrigger className="h-10 w-full rounded-xl text-xs sm:h-12 sm:text-sm">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {services.map((s) => (
                  <SelectItem key={s.slug} value={s.slug} className="text-xs sm:text-sm">
                    <span className="flex w-full items-center justify-between gap-2">
                      <span>{s.name}</span>
                      <span className="text-[0.65rem] text-muted-foreground sm:text-xs">
                        from ${s.startingPrice}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedService && (
              <p className="rounded-lg bg-secondary/60 px-2.5 py-1.5 text-[0.65rem] leading-snug text-muted-foreground sm:px-3 sm:py-2 sm:text-xs">
                {selectedService.shortDescription} · {selectedService.duration} ·
                from ${selectedService.startingPrice}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
              <User className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" /> Preferred Stylist
            </Label>
            <Select value={stylistSlug} onValueChange={setStylistSlug}>
              <SelectTrigger className="h-10 w-full rounded-xl text-xs sm:h-12 sm:text-sm">
                <SelectValue placeholder="Choose a stylist" />
              </SelectTrigger>
              <SelectContent>
                {stylists.map((s) => (
                  <SelectItem key={s.slug} value={s.slug} className="text-xs sm:text-sm">
                    <span className="flex w-full items-center justify-between gap-2">
                      <span>
                        {s.name} · {s.position}
                      </span>
                      <span className="text-[0.65rem] text-muted-foreground sm:text-xs">
                        ★ {s.rating}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
              <CalendarDays className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" /> Date
            </Label>
            <div className="rounded-xl border border-border/70 p-1 sm:p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="mx-auto w-full p-1 [--cell-size:--spacing(7)] sm:p-3 sm:[--cell-size:--spacing(8)]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 1 — DETAILS */}
      {step === 1 && (
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
              <Clock className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" /> Time
              {date && (
                <span className="text-[0.65rem] font-normal text-muted-foreground sm:text-xs">
                  · {format(date, "EEE, MMM d")}
                </span>
              )}
            </Label>
            <div className="grid grid-cols-4 gap-1 rounded-xl border border-border/70 p-1.5 sm:grid-cols-5 sm:gap-1.5 sm:p-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={cn(
                    "rounded-lg px-0.5 py-1.5 text-[0.6rem] font-medium leading-tight transition-colors sm:py-2 sm:text-xs",
                    time === slot
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/60 text-foreground/80 hover:bg-secondary"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="bk-name" className="text-xs font-medium sm:text-sm">
                Full name *
              </Label>
              <Input
                id="bk-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-10 rounded-xl text-xs sm:h-11 sm:text-sm"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="bk-phone" className="text-xs font-medium sm:text-sm">
                Phone *
              </Label>
              <Input
                id="bk-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your mobile number"
                className="h-10 rounded-xl text-xs sm:h-11 sm:text-sm"
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="bk-email" className="text-xs font-medium sm:text-sm">
                Email
              </Label>
              <Input
                id="bk-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-10 rounded-xl text-xs sm:h-11 sm:text-sm"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label className="text-xs font-medium sm:text-sm">Branch</Label>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger className="h-10 w-full rounded-xl text-xs sm:h-11 sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BRANCH}>
                    {BRANCH}, {salonInfo.address.city}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-xs font-medium sm:text-sm">Preferred contact method</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={setContactMethod}
              className="grid grid-cols-2 gap-2 sm:grid-cols-3"
            >
              {contactMethods.map((opt) => (
                <Label
                  key={opt.v}
                  htmlFor={`cm-${opt.v}`}
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-2 py-2 text-xs font-medium transition-colors sm:px-3 sm:py-3 sm:text-sm",
                    contactMethod === opt.v
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:bg-secondary"
                  )}
                >
                  <RadioGroupItem
                    id={`cm-${opt.v}`}
                    value={opt.v}
                    className="sr-only"
                  />
                  {opt.label}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="bk-notes" className="text-xs font-medium sm:text-sm">
              Special requests (optional)
            </Label>
            <Textarea
              id="bk-notes"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Allergies, accessibility needs, reference looks, etc."
              className="min-h-[80px] rounded-xl text-xs sm:min-h-[100px] sm:text-sm"
            />
          </div>
        </div>
      )}

      {/* STEP 2 — CONFIRM */}
      {step === 2 && (
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-2xl border border-border/70 bg-secondary/40 p-2.5 sm:p-4 lg:p-5">
            <h4 className="font-serif text-sm font-semibold sm:text-lg">
              Review your booking
            </h4>
            <dl className="mt-2 divide-y divide-border/60 text-[0.7rem] sm:mt-3 sm:text-sm">
              <div className="flex justify-between gap-3 py-1.5 sm:gap-4 sm:py-2.5">
                <dt className="text-muted-foreground">Service</dt>
                <dd className="text-right font-medium">
                  {selectedService?.name}
                </dd>
              </div>
              <div className="flex justify-between gap-3 py-1.5 sm:gap-4 sm:py-2.5">
                <dt className="text-muted-foreground">Stylist</dt>
                <dd className="text-right font-medium">
                  {selectedStylist?.name}
                </dd>
              </div>
              <div className="flex justify-between gap-3 py-1.5 sm:gap-4 sm:py-2.5">
                <dt className="text-muted-foreground">Date &amp; time</dt>
                <dd className="text-right font-medium">
                  {date ? format(date, "EEE, MMM d, yyyy") : ""} · {time}
                </dd>
              </div>
              <div className="flex justify-between gap-3 py-1.5 sm:gap-4 sm:py-2.5">
                <dt className="text-muted-foreground">Branch</dt>
                <dd className="text-right font-medium">
                  {branch}, {salonInfo.address.city}
                </dd>
              </div>
              <div className="flex justify-between gap-3 py-1.5 sm:gap-4 sm:py-2.5">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="text-right font-medium">{name}</dd>
              </div>
              <div className="flex justify-between gap-3 py-1.5 sm:gap-4 sm:py-2.5">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="text-right font-medium">{phone}</dd>
              </div>
              {email && (
                <div className="flex justify-between gap-3 py-1.5 sm:gap-4 sm:py-2.5">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="text-right font-medium">{email}</dd>
                </div>
              )}
              <div className="flex justify-between gap-3 py-1.5 sm:gap-4 sm:py-2.5">
                <dt className="text-muted-foreground">Contact via</dt>
                <dd className="text-right font-medium">{contactMethod}</dd>
              </div>
              {specialRequests && (
                <div className="flex flex-col gap-1 py-1.5 sm:py-2.5">
                  <dt className="text-muted-foreground">Special requests</dt>
                  <dd className="text-pretty">{specialRequests}</dd>
                </div>
              )}
            </dl>
            <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 sm:mt-3 sm:pt-3">
              <span className="text-[0.7rem] text-muted-foreground sm:text-sm">
                Starting price
              </span>
              <span className="font-serif text-base font-semibold text-primary sm:text-xl">
                ${selectedService?.startingPrice}
              </span>
            </div>
          </div>
          <p className="text-[0.65rem] leading-snug text-muted-foreground sm:text-xs">
            By confirming, you agree to our cancellation policy (4 hours&apos;
            notice). We&apos;ll send a confirmation message shortly.
          </p>
        </div>
      )}

      {/* FOOTER NAV */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/60 pt-3 sm:mt-7 sm:gap-3 sm:pt-4">
        <Button
          variant="ghost"
          onClick={() => (step === 0 ? onCancel() : setStep((s) => s - 1))}
          className="h-8 rounded-full px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
        >
          <ChevronLeft className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          {step === 0 ? "Cancel" : "Back"}
        </Button>
        {step < 2 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 0 ? !canContinueStep0 : !canContinueStep1}
            className="h-8 rounded-full bg-primary px-4 text-xs sm:h-9 sm:px-6 sm:text-sm"
          >
            Continue
            <ChevronRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        ) : (
          <Button
            onClick={submit}
            disabled={submitting}
            className="h-8 rounded-full bg-primary px-4 text-xs sm:h-9 sm:px-6 sm:text-sm"
          >
            {submitting ? "Confirming…" : "Confirm Booking"}
            {!submitting && <CalendarHeart className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          </Button>
        )}
      </div>
    </div>
  );
}
