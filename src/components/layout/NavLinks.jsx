import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion'
import NavLinkList from "@/components/layout/sections";

export function NavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState(null)
  const router = useRouter()

  return NavLinkList.map((item, index) => (
    <Link
      key={item.name}
      href={router.pathname === "/" ? item.home : item.other}
      className="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-100 hover:delay-[0ms]"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 rounded-lg bg-indigo-500"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{item.name}</span>
    </Link>
  ))
}
