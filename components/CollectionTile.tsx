'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Collection } from '@/lib/data'
import { ChevronRight } from 'lucide-react'

interface CollectionTileProps {
  collection: Collection
}

export function CollectionTile({ collection }: CollectionTileProps) {
  return (
    <Link href={`/collections/${collection.slug}`}>
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="group cursor-pointer"
    >
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border mb-4 aspect-square">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full h-full p-8"
          >
            <Image
              src={collection.image || "/placeholder.svg"}
              alt={collection.name}
              fill
              className="object-contain"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight">
              {collection.name}
            </h3>
            <p className="text-sm text-white/80 mb-4">{collection.description}</p>
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-white font-medium text-sm"
            >
              Explore <ChevronRight size={16} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
