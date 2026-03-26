import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip =
      req.headers.get("cf-connecting-ip") ||
      (forwarded ? forwarded.split(",")[0].trim() : null) ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const body = await req.json();

    await prisma.visit.create({
      data: {
        ip,
        userAgent: req.headers.get("user-agent") ?? "",
        path: body.path ?? "/",
        referer: body.referer ?? "",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
