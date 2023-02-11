import { useId, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import Dogs from '@/images/dogs_img_1.png';
import Bg from '@/images/blue_abstract.png';

import { Player, Controls } from '@lottiefiles/react-lottie-player';

import DogWalk from '@/images/animated/dog_walking_loading.json';

export function Loading() {

    const [findVetModalVisible, setFindVetModalVisible] = useState(false)

    return (
        <div className="overflow-hidden pt-4 pb-20 sm:py-16 lg:pb-32 xl:pb-36">
            <Container>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
                    <Player
                        autoplay
                        loop
                        src={DogWalk}
                        style={{ height: '300px', width: '300px' }}
                    >
                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                </div>
            </Container>
        </div>
    )
}
