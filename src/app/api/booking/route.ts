import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, stylist, date, time } = body;

    if (!name || !phone || !service || !stylist || !date || !time) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Booking received successfully (no persistence in this standalone demo)
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not create booking" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, bookings: [] });
}
