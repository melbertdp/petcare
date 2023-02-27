import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// import Modal from "@/components/vetParners/modal/viewVetDetails";
import Modal from "@/components/modals/viewDetails";
import Rating from "@/components/vetParners/modal/rating";
import Filter from "@/components/vetParners/filter";

export default function VetPartners({ vetList }) {
  const [showVetDetails, setsShowVetDetails] = useState(false);
  const [vetDetails, setVetDetails] = useState({});
  const [vets, setVets] = useState([]);

  useEffect(() => {
    setVets(vetList);
  }, []);

  const handleShowVetDetails = (vet) => {
    setVetDetails(vet);
    setsShowVetDetails(true);
  };

  const changeFilterValues = (val) => {
    let specialization = val.specialization;
    let operatingHours = val.operatingHours;

    let filteredVets = [];

    if (val.selectedPlace) {
      const newLoc = val.selectedPlace.address_components[0]?.long_name;

      filteredVets = vetList.filter((vet) => {
        return vet.address_city.toLowerCase().includes(newLoc.toLowerCase());
      });
    }

    filteredVets = filteredVets.filter((vet) => {
      return (
        vet.specialization.includes(specialization) &&
        vet.operatingHours.includes(operatingHours)
      );
    });

    setVets(filteredVets);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-1 px-4 sm:py-1 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col">
          <div className="container max-w-7xl px-4">
            <div className="flex flex-wrap justify-center text-center mb-10">
              <div className="w-full lg:w-6/12 px-4">
                <p className="text-gray-700 text-lg font-light">
                  We have a team of highly qualified and experienced
                  veterinarians
                </p>
              </div>
            </div>

            <div>
              <Filter changeFilterValues={changeFilterValues} />
            </div>

            <div className="flex flex-wrap">
              {vets.map((vet, index) => {
                return (
                  <motion.div
                    key={index}
                    className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className="flex flex-col"
                      onClick={() => handleShowVetDetails(vet)}
                    >
                      <a
                        href="#"
                        className="mx-auto"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img
                          alt="vet"
                          className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                          src={vet.imageSrc}
                        />
                      </a>

                      <div className="mt-6">
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          {vet.name}
                        </h1>

                        <div className="text-gray-700 font-light mb-2">
                          <span className="font-bold">Specialization:</span>{" "}
                          {vet?.specialization.slice(1).join(", ")}
                        </div>

                        <div className="text-gray-700 font-light mb-2">
                          <span className="font-bold mr-1">Rate:</span> ₱
                          {vet.price}
                        </div>

                        <div className="flex items-center text-gray-700 font-light mb-2">
                          <span className="font-bold mr-1">Rating:</span>
                          <Rating rating={vet.rating} showRating={false} />
                        </div>

                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {showVetDetails && (
              <Modal
                viewVetDetails={vetDetails}
                open={showVetDetails}
                setOpen={setsShowVetDetails}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
