const vets = [
    {
        id: 1,
        name: 'Matt Murdock',
        specialization: 'Attorney',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: '#',
        price: '$48',
        address: '1234 Main St',
        imageSrc: 'https://i.pravatar.cc/300?img=2',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'Wade Wilson',
        specialization: 'Mercenary',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: '#',
        price: '$35',
        address: '1234 Main St',
        imageSrc: 'https://i.pravatar.cc/300?img=1',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'Tony Stark',
        specialization: 'Engineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: '#',
        price: '$89',
        address: '1234 Main St',
        imageSrc: 'https://i.pravatar.cc/300?img=3',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        name: 'Peter Parker',
        specialization: 'Photographer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: '#',
        price: '$35',
        address: '1234 Main St',
        imageSrc: 'https://i.pravatar.cc/300?img=4',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 5,
        name: 'Bucky Barnes',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        specialization: 'Soldier',
        href: '#',
        price: '$48',
        address: '1234 Main St',
        imageSrc: 'https://i.pravatar.cc/300?img=5',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 6,
        name: 'Jean Grey',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        specialization: 'Psychic',
        href: '#',
        price: '$35',
        address: '1234 Main St',
        imageSrc: 'https://i.pravatar.cc/300?img=9',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 7,
        name: 'Thor Odinson',
        specialization: 'God',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        href: '#',
        price: '$89',
        address: '1234 Main St',
        imageSrc: 'https://i.pravatar.cc/300?img=7',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 8,
        name: 'Steve Rogers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
        specialization: 'Soldier',
        address: '1234 Main St',
        href: '#',
        price: '$35',
        imageSrc: 'https://i.pravatar.cc/300?img=8',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    }
]

export default function VetPartners() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-1 px-4 sm:py-1 sm:px-6 lg:max-w-7xl lg:px-8">
                <div class="flex flex-col mt-8">
                    <div class="container max-w-7xl px-4">

                        <div class="flex flex-wrap justify-center text-center mb-10">
                            <div class="w-full lg:w-6/12 px-4">
                                <p class="text-gray-700 text-lg font-light">
                                    With over 100 years of combined experience, weve got a well-seasoned team at the helm.
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-wrap">
                            {
                                vets.map((vet, index) => {
                                    return (
                                        <div
                                            key={index}
                                            class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4"
                                        >
                                            <div class="flex flex-col">
                                                <a href="#" class="mx-auto">
                                                    <img
                                                        class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                                                        src={vet.imageSrc}
                                                    />
                                                </a>

                                                <div class="text-center mt-6">
                                                    <h1 class="text-gray-900 text-xl font-bold mb-1">
                                                        {vet.name}
                                                    </h1>

                                                    <div class="text-gray-700 font-light mb-2">
                                                        {vet.specialization}
                                                    </div>
                                                    <div class="text-gray-700 font-light mb-2">
                                                        {vet.price}
                                                    </div>

                                                    <div
                                                        class="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
