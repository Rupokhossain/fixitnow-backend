import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

export const handlePaymentSuccess = async (
  session: Stripe.Checkout.Session,
) => {
  const bookingId = session.metadata?.bookingId;
  const transactionId = session.payment_intent as string;

  const amount = session.amount_total ? session.amount_total / 100 : 0;

  if (!bookingId) return;

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "PAID",
      },
    });

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
};
