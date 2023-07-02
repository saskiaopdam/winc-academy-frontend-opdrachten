/*
VARIABLES:
 - costs: costs of one plant
 - numCrops: number of plants of the same sort
 - salePrice: price per kg of sold produce
*/

// code-onder-test for given tests:

const getMultipleOfFactorValues = (plantFactors, environmentFactors) => {
  const factorValues = Object.entries(environmentFactors).map(
    (environmentFactor) => {
      const factorName = environmentFactor[0];
      const factorLevel = environmentFactor[1];
      const factorValue = (plantFactors[factorName][factorLevel] + 100) / 100;
      return factorValue;
    }
  );
  const multipleOfFactorValues = factorValues.reduce(
    (acc, curVal) => acc * curVal
  );
  return multipleOfFactorValues;
};

const getYieldForPlant = (plant, environmentFactors) => {
  const yieldForPlant = plant.yield;
  const plantFactors = plant.factors; // object
  const getYieldForPlantWithNoFactors = () => yieldForPlant;
  const getYieldForPlantWithFactors = () => {
    // const yieldForPlantWithFactors = Number(
    //   (
    //     yieldForPlant *
    //     getMultipleOfFactorValues(plantFactors, environmentFactors)
    //   ).toFixed(1)
    // );
    // return yieldForPlantWithFactors;
    return Number(
      (
        yieldForPlant *
        getMultipleOfFactorValues(plantFactors, environmentFactors)
      ).toFixed(1)
    );
  };
  if (!environmentFactors) {
    return getYieldForPlantWithNoFactors();
  }
  return getYieldForPlantWithFactors();
};

const getYieldForCrop = (input, environmentFactors) => {
  const yieldForPlant = input.crop.yield;
  const plantFactors = input.crop.factors; // object
  const numOfPlants = input.numCrops;
  const yieldForCrop = yieldForPlant * numOfPlants;
  const getYieldForCropWithNoFactors = () => yieldForCrop;
  const getYieldForCropWithFactors = () => {
    // const yieldForCropWithFactors = Number(
    //   (
    //     yieldForCrop *
    //     getMultipleOfFactorValues(plantFactors, environmentFactors)
    //   ).toFixed(1)
    // );
    // return yieldForCropWithFactors;
    return Number(
      (
        yieldForCrop *
        getMultipleOfFactorValues(plantFactors, environmentFactors)
      ).toFixed(1)
    );
  };
  if (!environmentFactors) {
    return getYieldForCropWithNoFactors();
  }
  return getYieldForCropWithFactors();
};

const getTotalYield = (inputs, environmentFactors) => {
  const cropsArray = inputs.crops;
  const yieldsArray = cropsArray.map((input) => getYieldForCrop(input));
  const totalYield = yieldsArray.reduce((acc, curVal) => acc + curVal);
  const yieldsWithFactorsArray = cropsArray.map((input) =>
    getYieldForCrop(input, environmentFactors)
  );
  const totalYieldWithFactors = yieldsWithFactorsArray.reduce(
    (acc, curVal) => acc + curVal
  );
  const getTotalYieldWithNoFactors = () => totalYield;
  const getTotalYieldWithFactors = () => totalYieldWithFactors;
  if (!environmentFactors) {
    return getTotalYieldWithNoFactors();
  }
  return getTotalYieldWithFactors();
};

// code-onder-test for added tests:

const getCostsForCrop = (input) => {
  const costsForPlant = input.crop.costs;
  const numOfPlants = input.numCrops;
  const costsForCrop = costsForPlant * numOfPlants;
  return costsForCrop;
};

const getRevenueForCrop = (input, environmentFactors) => {
  const salePrice = input.crop.salePrice;
  const plantFactors = input.crop.factors; // object
  const revenueForCrop = salePrice * getYieldForCrop(input);
  const getRevenueForCropWithNoFactors = () => revenueForCrop;
  const getRevenueForCropWithFactors = () => {
    // const revenueForCropWithFactors = Number(
    //   (
    //     revenueForCrop *
    //     getMultipleOfFactorValues(plantFactors, environmentFactors)
    //   ).toFixed(1)
    // );
    // return revenueForCropWithFactors;
    return Number(
      (
        revenueForCrop *
        getMultipleOfFactorValues(plantFactors, environmentFactors)
      ).toFixed(1)
    );
  };
  if (!environmentFactors) {
    return getRevenueForCropWithNoFactors();
  }
  return getRevenueForCropWithFactors();
};

const getProfitForCrop = (input, environmentFactors) => {
  const profitForCrop = getRevenueForCrop(input) - getCostsForCrop(input);
  const getProfitForCropWithNoFactors = () => profitForCrop;
  const getProfitForCropWithFactors = () => {
    // const profitForCropWithFactors = Number(
    //   (
    //     getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input)
    //   ).toFixed(1)
    // );
    // return profitForCropWithFactors;
    return Number(
      (
        getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input)
      ).toFixed(1)
    );
  };
  if (!environmentFactors) {
    return getProfitForCropWithNoFactors();
  }
  return getProfitForCropWithFactors();
};

const getTotalProfit = (inputs, environmentFactors) => {
  const cropsArray = inputs.crops;
  const profitsArray = cropsArray.map((input) => getProfitForCrop(input));
  const totalProfit = profitsArray.reduce((acc, curVal) => acc + curVal);
  const profitsWithFactorsArray = cropsArray.map((input) =>
    getProfitForCrop(input, environmentFactors)
  );
  const totalProfitWithFactors = profitsWithFactorsArray.reduce(
    (acc, curVal) => acc + curVal
  );
  const getTotalProfitWithNoFactors = () => totalProfit;
  const getTotalProfitWithFactors = () => totalProfitWithFactors;
  if (!environmentFactors) {
    return getTotalProfitWithNoFactors();
  }
  return getTotalProfitWithFactors();
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
