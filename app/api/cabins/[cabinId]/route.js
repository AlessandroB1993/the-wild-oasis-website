import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// Route handlers
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    // Web standard implemented in browser as well
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
