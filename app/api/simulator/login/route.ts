import { cookies } from "next/headers";

export async function POST(request: Request) {
  const pw = process.env.SIMULATOR_PASSWORD;
  if (!pw) {
    return Response.json(
      { error: "Simulator password is not configured on the server." },
      { status: 500 },
    );
  }
  let password = "";
  try {
    const body = await request.json();
    password = String(body?.password ?? "");
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }
  if (password !== pw) {
    return Response.json({ error: "Incorrect password." }, { status: 401 });
  }
  const store = await cookies();
  store.set("sim_session", pw, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return Response.json({ ok: true });
}
