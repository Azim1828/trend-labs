import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia', // Update to match Stripe's current version
})

export async function POST(req: Request) {
  try {
    const { items, customer } = await req.json()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
            images: [item.product.thumbnail],
            description: item.product.description?.substring(0, 500), // Stripe has a limit on description length
          },
          unit_amount: Math.round(item.product.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=true`,
      customer_email: customer.email,
      metadata: {
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
      },
      shipping_address_collection: {
        allowed_countries: ['US'], // Add more countries as needed
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 