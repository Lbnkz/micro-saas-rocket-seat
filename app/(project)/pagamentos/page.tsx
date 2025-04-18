"use client"

import { useStripe } from "@/app/hooks/useStripe"

export default function Pagamentos() {

    const {
        createPaymentStripeCheckout,
        createSubscriptionStripeCheckout,
        handleCreateStripePortal
    } = useStripe()

    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold">Pagamentos</h1>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() =>
                    createPaymentStripeCheckout({
                        testeId: "1234",
                    })
                }
            >
                Criar Pagamento Stripe
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() =>
                    createSubscriptionStripeCheckout({
                        testeId: "1234",
                    })
                }
            >
                Criar Assinatura Stripe
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleCreateStripePortal}>
                Criar Portal de Pagamentos Stripe
            </button>
        </div>
    )
}