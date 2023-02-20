import Rating from "@/components/vetParners/modal/rating";

const NearbyVetCards = ({ vet, setViewPetDetails, setMapCenter }) => {
  const handleClick = (v) => {
    // setViewPetDetails(v)
    setMapCenter(v);
  };

  return (
    <div
      onClick={() => handleClick(vet)}
      key={vet.name}
      class="text-sm cursor-pointer justify-between rounded-lg bg-white pl-4 pr-4 pb-2"
    >
      <div className="p-3 border border-solid border-gray-500 rounded shadow-md">
        <h1>{vet.name}</h1>
        <p>
          <span>Address: </span> {vet.address}
        </p>
        <p>
          <span>Price: ₱</span>
          {vet.price}
        </p>
        <p className="flex">
          <span className="mr-2">Rating: </span>
          <Rating className="ml-2" rating={vet.rating} showRating={false}/>
        </p>
      </div>
    </div>
  );
};

export default NearbyVetCards;
