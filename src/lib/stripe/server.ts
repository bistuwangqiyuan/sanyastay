import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

/** Lazy Stripe client so `next build` does not require keys unless payment routes run. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(key, { typescript: true });
  }
  return stripeSingleton;
}
