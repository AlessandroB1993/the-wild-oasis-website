"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // We revalidate the cache so the changes are shown updated in the UI
  revalidatePath("/account/profile");
}

// bookingData argument has been bound with bind method, formData is from the form's action
export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // console.log(Object.entries(formData.entries()));

  // Getting data from the form
  const numGuests = Number(formData.get("numGuests"));
  const isBreakfastActive =
    formData.get("hasBreakfast") === "on" ? true : false;
  const breakfastPrice = Number(formData.get("breakfastPrice"));

  // Calculating extrasPrice if breakfast is active
  const extrasPrice = isBreakfastActive
    ? breakfastPrice * bookingData.numNights * numGuests
    : 0;

  const totalPrice = isBreakfastActive
    ? bookingData.cabinPrice + extrasPrice
    : bookingData.cabinPrice;

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests,
    observations: formData.get("observations").slice(0, 500),
    isPaid: false,
    hasBreakfast: isBreakfastActive,
    extrasPrice,
    totalPrice,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // formData stores everything as strings
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 500);
  const bookingId = Number(formData.get("bookingId"));

  const updatedFields = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) throw new Error("Booking could not be updated");

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

// We'll call this function as an handler
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Verify that the id of the logged user targets it's own bookings, before actually deleting
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  // .eq("guestId", session.user.guestId); // <- this is a good and shorter alternative

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function signInAction(formData) {
  const provider = formData.get("provider");
  await signIn(provider, { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// TODO:
// 1. sistemare formData col checkbox - DONE
// 2. provare a limitare il numero di reservations che un utente può avere attive in contemporanea
// 3. sistemare la questione di auth() e useSession()
