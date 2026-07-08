import config from "../../config";
import { stripe } from "../../config/stripe";
import { prisma } from "../../lib/prisma";

const createCheckoutSession = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId,
    },
    include: {
      service: true,
    },
  });

  if(booking.customerId !== userId) {
    throw new Error("You are not authorized to pay for this booking.")
  }



  if (booking.status !== "ACCEPTED") {
    throw new Error("Payment can only be made for accepted bookings.");
  }


  const existingPayment = await prisma.payment.findFirst({
    where: {
      bookingId,
      status: "PAID",
    },
  });

  if (existingPayment) {
    throw new Error("This booking has already been paid.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${config.app_url}/payment?success=true`,
    cancel_url: `${config.app_url}/payment?success=false`,
    metadata: {
      userId: userId,
      bookingId: booking.id,
    },

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "bdt",
          product_data: {
            name: booking.service.name,
            description: booking.service.description,
          },
          unit_amount: booking.service.price * 100,
        },
      },
    ],
  });

  return session.url;

};


export const paymentServices = {
createCheckoutSession
}
