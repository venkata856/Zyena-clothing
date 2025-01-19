import { loadStripe } from "@stripe/stripe-js";
const stripeKey = import.meta.env.VITE_STRIPE_API_KEY;

export const stripePromise = loadStripe(stripeKey);
