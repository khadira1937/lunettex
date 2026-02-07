'use client'

import { Truck, RotateCcw, MapPin } from 'lucide-react'
import Link from 'next/link'

export function ValuePropsRow() {
  return (
    <section className="bg-secondary py-12 md:py-16 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Free Shipping */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Truck className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                On orders over 2000 MAD across Morocco
              </p>
            </div>
          </div>

          {/* Free Returns */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <RotateCcw className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">30-Day Returns</h3>
              <p className="text-sm text-muted-foreground">
                Full refund or exchange, no questions asked
              </p>
            </div>
          </div>

          {/* Find Retailers */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Retailers Nearby</h3>
              <Link
                href="/retailers"
                className="text-sm text-accent hover:underline font-medium"
              >
                Find a store →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
