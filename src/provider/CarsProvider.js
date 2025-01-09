import { createContext, useState } from "react";

export const CarsContext = createContext({});

const CarsProvider = ({ children }) => {
  const [CarData, setCarData] = useState({});
  const [filtersData, setFiltersData] = useState({
    filters: {
      marka: "",
      emodel: "",
      maxPrice: "",
    },
    facilities: [],
  });

  return (
    <CarsContext.Provider
      value={{
        CarData,
        setCarData,
        filtersData,
        setFiltersData,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export default CarsProvider;