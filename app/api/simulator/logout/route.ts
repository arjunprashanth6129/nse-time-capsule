import { cookies } from "next/headers";

export async function POST(request: Request) {
  const store = await cookies();
  store.delete("sim_session");
  return Response.redirect(new URL("/simulator", request.url), 303);
}
