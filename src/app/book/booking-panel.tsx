"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { salonInfo } from "@/lib/salon-data";
import { Reveal } from "@/components/site/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { BookingWizard } from "@/components/site/booking-wizard";
import { Clock, Mail, ShieldCheck } from "lucide-react";

export function BookingPanel() {
  const router = useRouter();
  const [done, setDone] = useState(false);

  return (
    <>
      <div className="relative z-10 -mt-4 rounded-3xl border border-border/70 bg-background p-3 shadow-xl sm:p-5 lg:p-6">
        <BookingWizard
          onCancel={() => router.push("/")}
          onFinish={() => router.push("/")}
          onBooked={() => {
            setDone(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>

      {/* TRUST STRIP */}
      {!done && (
        <Reveal delay={80}>
          <div className="mt-4 grid gap-2.5 sm:mt-6 sm:gap-3 sm:grid-cols-3">
            <Card className="border-border/70 py-2.5 shadow-sm sm:py-4">
              <CardContent className="flex items-center gap-2.5 p-0 px-3 sm:gap-3 sm:px-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-primary/10 text-primary">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <p className="text-[0.75rem] font-semibold text-foreground sm:text-sm">
                    Free cancellation
                  </p>
                  <p className="text-[0.65rem] text-muted-foreground sm:text-xs">
                    Up to 4 hours before your slot
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 py-2.5 shadow-sm sm:py-4">
              <CardContent className="flex items-center gap-2.5 p-0 px-3 sm:gap-3 sm:px-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-primary/10 text-primary">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <p className="text-[0.75rem] font-semibold text-foreground sm:text-sm">
                    2-minute booking
                  </p>
                  <p className="text-[0.65rem] text-muted-foreground sm:text-xs">
                    Instant confirmation, no waiting
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 py-2.5 shadow-sm sm:py-4">
              <CardContent className="flex items-center gap-2.5 p-0 px-3 sm:gap-3 sm:px-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-primary/10 text-primary">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <p className="text-[0.75rem] font-semibold text-foreground sm:text-sm">
                    Need help?
                  </p>
                  <a
                    href={`mailto:${salonInfo.bookingEmail}`}
                    className="break-all text-[0.65rem] text-primary hover:underline sm:text-xs"
                  >
                    {salonInfo.bookingEmail}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </Reveal>
      )}
    </>
  );
}
