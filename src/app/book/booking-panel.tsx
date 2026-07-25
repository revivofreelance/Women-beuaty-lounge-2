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
      <div className="relative z-10 -mt-4 rounded-3xl border border-border/70 bg-background shadow-xl p-4 md:p-5 lg:p-6">
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
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Card className="border-border/70 py-4 shadow-sm">
              <CardContent className="flex items-center gap-3 p-0 px-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Free cancellation
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Up to 4 hours before your slot
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 py-4 shadow-sm">
              <CardContent className="flex items-center gap-3 p-0 px-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    2-minute booking
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Instant confirmation, no waiting
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 py-4 shadow-sm">
              <CardContent className="flex items-center gap-3 p-0 px-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Need help?
                  </p>
                  <a
                    href={`mailto:${salonInfo.bookingEmail}`}
                    className="text-xs text-primary hover:underline"
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
