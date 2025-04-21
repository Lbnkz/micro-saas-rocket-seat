import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    try {
        const body = await req.text()
        const headersList = await headers();
        const signature = headersList.get("stripe-signature");

        if (!signature || !secret) {
            return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 })
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            secret
        );

        switch (event.type) {
            case "checkout.session.completed": // Pagamento realizado se status = paid - Pode ser tanto pagamento unico quanto assinatura
                const metadata = event.data.object.metadata;

                if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
                    await handleStripePayment(event);
                } else if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
                    await handleStripeSubscription(event);
                }

                break;
            case "checkout.session.expired": // Checkout expirado 24 horas
                console.log("Enviar um email para o cliente informando que o checkout expirou")
                break;
            case "checkout.session.async_payment_succeeded": // Boleto pago
                console.log("Enviar um email para o cliente informando que o boleto foi pago")
                break;
            case "checkout.session.async_payment_failed": // Boleto não pago
                console.log("Enviar um email para o cliente informando que o boleto não foi pago")
                break;
            case "customer.subscription.created": // Criação de assinatura
                console.log("Mensagem de Boas Vindas porque acabou de criar a assinatura")
                break;
            case "customer.subscription.deleted": // Cancelamento de assinatura
                await handleStripeCancelSubscription(event);
                break;
            default:
                console.warn(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: "Weebhook received!" }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Erro" }, { status: 500 })
    }
}