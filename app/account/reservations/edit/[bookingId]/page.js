import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const session = await auth();
  const { bookingId } = params;

  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(Number(bookingId)))
    throw new Error("Can't update this booking");

  const { cabinId, numGuests, observations } = await getBooking(
    Number(bookingId),
  );
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateReservation}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={numGuests}
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
              (guestNumber) => (
                <option value={guestNumber} key={guestNumber}>
                  {guestNumber} {guestNumber === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <input type="hidden" name="bookingId" value={bookingId} />

        <div className="flex items-center justify-end gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
