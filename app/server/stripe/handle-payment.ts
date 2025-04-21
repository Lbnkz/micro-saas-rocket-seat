import { db } from "@/app/lib/firebase";
import "server-only"
import Stripe from "stripe";

export async function handleStripePayment(event: Stripe.CheckoutSessionCompletedEvent) {
    if (event.data.object.payment_status === "paid") {
        console.log("Pagamento realizado com sucesso. Enviar um email liberando o acesso ao cliente.");
        const metadata = event.data.object.metadata;
        const userId = metadata?.userId;

        if (!userId) {
            throw new Error("User ID not found in metadata");
        }
        await db.collection("users").doc(userId).update({
            stripeSubscriptionId: event.data.object.subscription,
            subscriptionStatus: "active",
        })
    }
}