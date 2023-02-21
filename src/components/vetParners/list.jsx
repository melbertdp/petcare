import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Modal from "@/components/vetParners/modal/viewVetDetails";

export default function VetPartners({ vetList }) {
  console.log("vetList", vetList);

  const [showVetDetails, setsShowVetDetails] = useState(false);
  const [vetDetails, setVetDetails] = useState({});

  const handleShowVetDetails = (vet) => {
    setVetDetails(vet);
    setsShowVetDetails(true);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-1 px-4 sm:py-1 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col">
          <div className="container max-w-7xl px-4">
            <div className="flex flex-wrap justify-center text-center mb-10">
              <div className="w-full lg:w-6/12 px-4">
                <p className="text-gray-700 text-lg font-light">
                  With over 100 years of combined experience, weve got a
                  well-seasoned team at the helm.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap">
              {vetList.map((vet, index) => {
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

                      <div className="text-center mt-6">
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          {vet.name}
                        </h1>

                        <div className="text-gray-700 font-light mb-2">
                          {vet.specialization}
                        </div>
                        <div className="text-gray-700 font-light mb-2">
                          {vet.price}
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
                vetDetails={vetDetails}
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
