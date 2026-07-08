import Stripe from "stripe";



export const handlePaymentSuccess = async(session: Stripe.Checkout.Session) => {
    const bookingId = session.metadata?.bookingId;
    const transactionId = session.payment_intent as string;

    const amount = session.amount_total ? session.amount_total / 100 : 0
}