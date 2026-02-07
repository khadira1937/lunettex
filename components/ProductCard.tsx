'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/lib/data'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border mb-4 aspect-square">
          {/* Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full h-full overflow-hidden p-6"
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                {product.badge}
              </div>
            </div>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white font-semibold">Out of Stock</p>
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3 opacity-0"
          >
            <button className="bg-white text-primary p-3 rounded-full hover:bg-accent hover:text-white transition-all duration-200 shadow-lg">
              <Eye size={20} />
            </button>
            <button className="bg-accent text-accent-foreground p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </motion.div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-sm font-medium text-primary hover:text-accent transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p className="text-lg font-serif font-bold text-primary">
          {product.price.toLocaleString('fr-MA')} MAD
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-border'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Color Swatches */}
        <div className="flex gap-2 mt-3">
          {product.variants.slice(0, 3).map((variant) => (
            <button
              key={variant.id}
              title={variant.name}
              className="w-4 h-4 rounded-full border-2 border-border hover:border-accent transition-colors"
              style={{ backgroundColor: variant.color }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
