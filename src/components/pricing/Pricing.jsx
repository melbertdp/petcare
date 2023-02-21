import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const plans = [
  {
    name: "Walk-in",
    featured: false,
    price: { Monthly: "Pay per consult", Annually: "Pay per consult" },
    description: "",
    button: {
      label: "Get started for free",
      href: "/register",
    },
    features: [
      "24/7 Availability of Vet and Pet Sitter",
      "tele-consult",
      "e-prescription",
      "e-laboratory request",
      "access to partner benefits (e.g. grooming, petshops discounts, etc.)",
    ],
    logomarkClassName: "fill-gray-300",
  },
  {
    name: "VIP",
    featured: true,
    price: { Monthly: "₱ 999", Annually: "₱ 4999" },
    description: "",
    button: {
      label: "Subscribe",
      href: "/register",
    },
    features: [
      "24/7 Availability of Vet and Pet Sitter",
      "unlimited tele-consult",
      "e-prescription",
      "e-laboratory request",
      "access to partner benefits (e.g. grooming, petshops discounts, etc.)",
      "1 primary pet holder + 4 extension pet",
    ],
    logomarkClassName: "fill-indigo-500",
  },
];

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Plan({
  name,
  price,
  description,
  button,
  features,
  featured = false,
  activePeriod,
  logomarkClassName,
}) {
  return (
    <section
      className={clsx(
        "flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5",
        featured ? "order-first bg-gray-900 lg:order-none" : "bg-white"
      )}
    >
      <h3
        className={clsx(
          "flex items-center text-sm font-semibold",
          featured ? "text-white" : "text-gray-900"
        )}
      >
        <span className="font-bold text-2xl">{name}</span>
      </h3>
      <p
        className={clsx(
          "relative mt-5 flex text-3xl tracking-tight",
          featured ? "text-white" : "text-gray-900"
        )}
      >
        {price.Monthly === price.Annually ? (
          price.Monthly
        ) : (
          <>
            <span
              aria-hidden={activePeriod === "Annually"}
              className={clsx(
                "transition duration-300",
                activePeriod === "Annually" &&
                  "pointer-events-none translate-x-6 select-none opacity-0"
              )}
            >
              {price.Monthly}
            </span>
            <span
              aria-hidden={activePeriod === "Monthly"}
              className={clsx(
                "absolute left-0 top-0 transition duration-300",
                activePeriod === "Monthly" &&
                  "pointer-events-none -translate-x-6 select-none opacity-0"
              )}
            >
              {price.Annually}
            </span>
          </>
        )}
      </p>
      <p
        className={clsx(
          "mt-3 text-sm",
          featured ? "text-gray-300" : "text-gray-700"
        )}
      >
        {description}
      </p>
      <div className="order-last mt-6">
        <ul
          role="list"
          className={clsx(
            "-my-2 divide-y text-sm",
            featured
              ? "divide-gray-800 text-gray-300"
              : "divide-gray-200 text-gray-700"
          )}
        >
          {features.map((feature) => (
            <li key={feature} className="flex py-2">
              <CheckIcon
                className={clsx(
                  "h-6 w-6 flex-none",
                  featured ? "text-white" : "text-indigo-500"
                )}
              />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        href={button.href}
        color={featured ? "indigo" : "gray"}
        className="mt-6"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        {button.label}
      </Button>
    </section>
  );
}

export function Pricing() {
  let [activePeriod, setActivePeriod] = useState("Monthly");

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="border-t border-gray-200 bg-gray-100 py-12 sm:py-14"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-title"
            className="text-3xl font-bold tracking-tight text-indigo-500"
          >
            Flat pricing, no management fees.
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Portion of the fees collected will be donated to <i>Paws.com.ph</i>
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative">
            <RadioGroup
              value={activePeriod}
              onChange={setActivePeriod}
              className="grid grid-cols-2"
            >
              {["Monthly", "Annually"].map((period) => (
                <RadioGroup.Option
                  key={period}
                  value={period}
                  className={clsx(
                    "cursor-pointer border border-gray-300 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm text-gray-700 outline-2 outline-offset-2 transition-colors hover:border-gray-400",
                    period === "Monthly"
                      ? "rounded-l-lg"
                      : "-ml-px rounded-r-lg"
                  )}
                >
                  {period}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
            <div
              aria-hidden="true"
              className={clsx(
                "pointer-events-none absolute inset-0 z-10 grid grid-cols-2 overflow-hidden rounded-lg bg-indigo-500 transition-all duration-300",
                activePeriod === "Monthly"
                  ? "[clip-path:inset(0_50%_0_0)]"
                  : "[clip-path:inset(0_0_0_calc(50%-1px))]"
              )}
            >
              {["Monthly", "Annually"].map((period) => (
                <div
                  key={period}
                  className={clsx(
                    "py-2 text-center text-sm font-semibold text-white [&:not(:focus-visible)]:focus:outline-none",
                    period === "Annually" && "-ml-px"
                  )}
                >
                  {period}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-md space-y-4 mt-10 lg:grid lg:max-w-5xl lg:grid-cols-2 lg:gap-5 lg:space-y-0">
          {plans.map((plan) => (
            <Plan key={plan.name} {...plan} activePeriod={activePeriod} />
          ))}
        </div>
      </Container>
    </section>
  );
}
