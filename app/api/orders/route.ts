import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseServer } from '@/lib/supabaseServer'
import { Resend } from 'resend'

const OrderSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  priceMad: z.number().int().positive(),
  quantity: z.number().int().min(1).max(10),
  fullName: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().min(2),
  address: z.string().min(5),
  // currently: pay on delivery only (simple checkout)
  acceptTerms: z.literal(true),
  // basic honeypot
  website: z.string().optional().or(z.literal('')),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = OrderSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'invalid_payload', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // Honeypot: bots fill this field
    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const supabase = supabaseServer()

    const orderRow = {
      product_id: parsed.data.productId,
      product_name: parsed.data.productName,
      price_mad: parsed.data.priceMad,
      quantity: parsed.data.quantity,
      full_name: parsed.data.fullName,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      city: parsed.data.city,
      address: parsed.data.address,
      payment_method: 'pay_on_delivery',
      notes: null,
      status: 'new',
    }

    const { data, error } = await supabase.from('orders').insert(orderRow).select('id, created_at').single()
    if (error) {
      return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
    }

    const resendKey = process.env.RESEND_API_KEY
    const toEmail = process.env.ORDERS_TO_EMAIL || 'lunettexstore@gmail.com'

    let emailSent = false
    if (resendKey) {
      try {
        const resend = new Resend(resendKey)
        const subject = `Nouvelle commande — ${parsed.data.productName} (x${parsed.data.quantity})`
        const text = [
          'Nouvelle commande reçue:',
          '',
          `Produit: ${parsed.data.productName}`,
          `ID produit: ${parsed.data.productId}`,
          `Quantité: ${parsed.data.quantity}`,
          `Prix (MAD): ${parsed.data.priceMad}`,
          `Paiement: Paiement à la livraison`,
          '',
          `Nom: ${parsed.data.fullName}`,
          `Téléphone: ${parsed.data.phone}`,
          `E-mail: ${parsed.data.email || '-'}`,
          `Ville: ${parsed.data.city}`,
          `Adresse: ${parsed.data.address}`,
          '',
          `Order ID: ${data.id}`,
          `Created: ${data.created_at}`,
        ].join('\n')

        await resend.emails.send({
          from: 'LunetteX <orders@resend.dev>',
          to: [toEmail],
          subject,
          text,
          replyTo: parsed.data.email ? parsed.data.email : undefined,
        })
        emailSent = true
      } catch (err) {
        // Don't fail the order if email sending fails.
        console.error('Resend email failed', err)
      }
    }

    return NextResponse.json({ ok: true, id: data.id, emailSent })
  } catch (err) {
    console.error('Order API failed', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
