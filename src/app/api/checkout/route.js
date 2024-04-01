import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(
  'sk_test_51HS5wuDpeQG0ms9Mfm4Y5ApAAYfkIyltTkLxd1tuNIzyplbBnkX8QjQmTDzaON0rYCOn4x6jyi7saXBOB24Imhos0090WchBpX',
)

export async function POST(request) {
  const body = await request.json()

  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/success',

    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: body.name,
            images: [body.image],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      productId: body.id,
    },
    mode: 'payment',
  })

  return NextResponse.json(session)
}
