const NearbyVetCards = ({ vet, setViewPetDetails, setMapCenter }) => {

    const handleClick = (v) => {
        // setViewPetDetails(v)
        setMapCenter(v)
    }

    return (
        <div
            onClick={() => handleClick(vet)}
            key={vet.name}
            class="text-sm cursor-pointer justify-between mb-6 rounded-lg bg-white p-3 shadow-md"
        >
            <h1>{vet.name}</h1>
            <p><span>Address:</span> {vet.address}</p>
            <p><span>Price:</span>{vet.price}</p>
            <p><span>Rating: </span>{vet.rating}</p>
        </div>
    )
}

export default NearbyVetCards;