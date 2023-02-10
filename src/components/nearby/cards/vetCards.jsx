const NearbyVetCards = ({ vet, setViewPetDetails }) => {
    return (
        <div onClick={() => setViewPetDetails(vet)} key={vet.name} class="cursor-pointer justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <h1>{vet.name}</h1>
            <p>{vet.address}</p>
            <p>{vet.price}</p>
            <p>{vet.rating}</p>
        </div>
    )
}

export default NearbyVetCards;