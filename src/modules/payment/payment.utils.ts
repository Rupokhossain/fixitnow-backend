import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

export const handlePaymentSuccess = async (
  session: Stripe.Checkout.Session
) => {
  console.log("🔥 handlePaymentSuccess CALLED");

  const bookingId = session.metadata?.bookingId;

  const transactionId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  const amount = session.amount_total
    ? session.amount_total / 100
    : 0;

  console.log("Booking ID:", bookingId);
  console.log("Transaction ID:", transactionId);
  console.log("Amount:", amount);

  if (!bookingId) {
    throw new Error("Booking ID not found in Stripe metadata");
  }

  if (!transactionId) {
    throw new Error("Transaction ID not found");
  }

  await prisma.$transaction(async (tx) => {
    // Check booking
    const booking = await tx.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new Error(`Booking not found: ${bookingId}`);
    }

    console.log("Current booking status:", booking.status);

    // Update booking
    await tx.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "PAID",
      },
    });

    // Create payment
    await tx.payment.create({
      data: {
        bookingId,
        transactionId,
        amount,
        provider: "STRIPE",
        status: "PAID",
      },
    });
  });

  console.log("✅ Booking and payment updated successfully");
};