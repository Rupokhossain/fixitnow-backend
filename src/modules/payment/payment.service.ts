import Stripe from "stripe";
import config from "../../config";
import { stripe } from "../../config/stripe";
import { prisma } from "../../lib/prisma";
import { handlePaymentSuccess } from "./payment.utils";

const createCheckoutSession = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId,
    },
    include: {
      service: true,
    },
  });

  if (booking.customerId !== userId) {
    throw new Error("You are not authorized to pay for this booking.");
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

const handleWebhook = async (payload: Buffer, signature: string) => {
  console.log("Webhook service hit");

  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    config.stripe_webhook_secret as string,
  );

  console.log(event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log(session.metadata);

    await handlePaymentSuccess(session);
  }
};

const getAllPaymentsFromDB = async (userId: string, role: string) => {
  let result;
  
  if (role === "ADMIN") {

    result = await prisma.payment.findMany({
      include: {
        booking: {
          include: { customer: true, service: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } else {
   
    result = await prisma.payment.findMany({
      where: {
        booking: {
          customerId: userId 
        }
      },
      include: {
        booking: {
          include: { service: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
  return result;
};

const getSinglePaymentFromDB = async (id: string) => {
  return await prisma.payment.findUniqueOrThrow({
    where: { id },
    include: {
      booking: {
        include: { customer: true, service: true, technician: true }
      }
    }
  });
};

export const paymentServices = {
  createCheckoutSession,
  handleWebhook,
  getAllPaymentsFromDB,
  getSinglePaymentFromDB
};
