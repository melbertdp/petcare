import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TextField } from '@/components/Fields'
import { Logomark } from '@/components/Logo'
import { NavLinks } from '@/components/layout/NavLinks'
import qrCode from '@/images/qr-code.svg'

import LogoDog from '@/images/logo2.png';

function QrCodeBorder(props) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pt-16 pb-6 lg:flex-row lg:items-center lg:py-5">
          <div>
            <div className="flex items-center text-gray-900">
              <Image
                src={LogoDog}
                alt="dogs"
                className='h-14 w-auto'
                unoptimized
              />
              <div className="ml-4">
                <p className="text-base font-semibold">Petcare</p>
                <p className="mt-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor quam bibendum.</p>
              </div>
            </div>
          </div>
          <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <p className="mt-6 text-sm text-gray-500 md:mt-0">
              &copy; Copyright {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
