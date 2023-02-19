import Link from 'next/link'

import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'Is the pet hotel safe?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet interdum nisi in scelerisque. Cras quam felis, mollis vitae varius et, facilisis quis lacus',
    },
  ],
  [
    {
      question: 'How can we ensure the safety of our pets',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet interdum nisi in scelerisque. Cras quam felis, mollis vitae varius et, facilisis quis lacus',
    },
  ],
  [
    {
      question: 'Who are you',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet interdum nisi in scelerisque. Cras quam felis, mollis vitae varius et, facilisis quis lacus',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-10"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-bold tracking-tight text-indigo-500"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <Link
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </Link>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-10 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
