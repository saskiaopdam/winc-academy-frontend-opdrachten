const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

/*
VARIABLES:
 - costs: costs of one plant
 - numCrops: number of plants of the same sort
 - salePrice: price per kg of sold produce

GIVEN TESTS:

The following 'describe' blocks should not be changed:
1: "getYieldForPlant"
2: "getYieldForCrop"
3: "getTotalYield"
They may however be expanded with tests for environment factors

NUMBER OF FACTORS:

At present, there are 3 environment factors: sun, wind and temperature
Tests have been created for the following situations:
- no environment factors
- one environment factor
- two environment factors
- three environment factors
 */

class Plant {
  constructor(name, plantYield, factors) {
    this.name = name;
    this.yield = plantYield;
    this.factors = factors;
  }
}
// 1: tests for the function "getYieldForPlant"

describe("getYieldForPlant", () => {
  // given test - should not be changed
  const corn = {
    name: "corn",
    yield: 30,
  }; // shorter: const corn = new Plant("corn", 30);
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  // added tests
  test("Get yield for plant with one environment factor", () => {
    const corn = new Plant("corn", 30, {
      sun: { low: -50, medium: 0, high: 50 },
    });
    const environmentFactors = {
      sun: "low",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });

  test("Get yield for plant with two environment factors", () => {
    const corn = new Plant("corn", 30, {
      sun: { low: -50, medium: 0, high: 50 },
      wind: { low: -30, medium: 0, high: 60 },
    });
    const environmentFactors = {
      sun: "low",
      wind: "high",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(24);
  });

  test("Get yield for plant with three environment factors", () => {
    const corn = new Plant("corn", 30, {
      sun: { low: -50, medium: 0, high: 50 },
      wind: { low: -30, medium: 0, high: 60 },
      temp: { low: -40, medium: 0, high: 20 },
    });
    const environmentFactors = {
      sun: "low",
      wind: "high",
      temp: "low",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(14.4);
  });
});

// 2: tests for the function "getYieldForCrop"

describe("getYieldForCrop", () => {
  // given test - should not be changed
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    }; // shorter: const corn = new Plant("corn", 3);
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });

  // added tests
  test("Get yield for crop, simple, with one environment factor", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
    });
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(48);
  });

  test("Get yield for crop, simple, with two environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
    });
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "low",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(38.4);
  });

  test("Get yield for crop, simple, with three environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
      temp: { low: -50, medium: 0, high: 40 },
    });
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "low",
      temp: "medium",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(38.4);
  });
});

// 3: tests for the function "getTotalYield"

describe("getTotalYield", () => {
  // given test - should not be changed
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    }; // shorter: const corn = new Plant("corn", 3);
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    }; // shorter: const pumpkin = new Plant("pumpkin", 4);
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  // given test - should not be changed
  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    }; // shorter: const corn = new Plant("corn", 3);
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });

  // added tests for multiple crops
  test("Calculate total yield with multiple crops with one environment factor", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -40, medium: 0, high: 60 },
    });
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "high",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(36.8);
  });

  test("Calculate total yield with multiple crops with two environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
    });
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "high",
      wind: "low",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(29.4);
  });

  test("Calculate total yield with multiple crops with three environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
      temp: { low: -50, medium: 0, high: 40 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
      temp: { low: -50, medium: 0, high: 40 },
    });
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "high",
      wind: "low",
      temp: "medium",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(29.4);
  });

  // added tests for 0 amount
  test("Calculate total yield with 0 amount with one environment factor", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -40, medium: 0, high: 60 },
    });
    const crops = [{ crop: corn, numCrops: 0 }];
    const environmentFactors = {
      sun: "high",
    };
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield with 0 amount with two environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
    });
    const crops = [{ crop: corn, numCrops: 0 }];
    const environmentFactors = {
      sun: "high",
      wind: "low",
    };
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield with 0 amount with three environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
      temp: { low: -50, medium: 0, high: 40 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -40, medium: 0, high: 60 },
      wind: { low: -20, medium: 0, high: 70 },
      temp: { low: -50, medium: 0, high: 40 },
    });
    const crops = [{ crop: corn, numCrops: 0 }];
    const environmentFactors = {
      sun: "high",
      wind: "low",
      temp: "medium",
    };
    expect(getTotalYield({ crops })).toBe(0);
  });
});

/*
ADDED TESTS:

4: "getCostsForCrop"
5: "getRevenueForCrop"
6: "getProfitForCrop"
7: "getTotalProfit"
*/

// 4: tests for the function "getCostsForCrop"

describe("getCostsForCrop", () => {
  test("Get costs for crop", () => {
    const corn = new Plant("corn");
    corn.costs = 10;

    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getCostsForCrop(input)).toBe(100);
  });
});

// 5: tests for the function "getRevenueForCrop"

describe("getRevenueForCrop", () => {
  test("Get revenue for crop with no environment factors", () => {
    const corn = new Plant("corn", 3); // name, yield
    corn.salePrice = 3;

    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getRevenueForCrop(input)).toBe(90);
  });

  test("Get revenue for crop with one environment factor", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -70, medium: 0, high: 70 },
    });
    corn.salePrice = 3;

    const input = {
      crop: corn,
      numCrops: 20,
    };
    const environmentFactors = {
      sun: "low",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(54);
  });

  test("Get revenue for crop with two environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -70, medium: 0, high: 70 },
      wind: { low: -30, medium: 0, high: 20 },
    });
    corn.salePrice = 3;

    const input = {
      crop: corn,
      numCrops: 20,
    };
    const environmentFactors = {
      sun: "low",
      wind: "high",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(64.8);
  });

  test("Get revenue for crop with three environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -70, medium: 0, high: 70 },
      wind: { low: -30, medium: 0, high: 20 },
      temp: { low: -40, medium: 0, high: 40 },
    });
    corn.salePrice = 3;

    const input = {
      crop: corn,
      numCrops: 20,
    };
    const environmentFactors = {
      sun: "low",
      wind: "high",
      temp: "medium",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(64.8);
  });
});

// 6: tests for the function "getProfitForCrop"

describe("getProfitForCrop", () => {
  test("Get profit for crop, simple", () => {
    const corn = new Plant("corn", 3); // name, yield
    corn.costs = 10;
    corn.salePrice = 3;

    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getProfitForCrop(input)).toBe(-10);
  });

  test("Get profit for crop, simple, with one environment factor", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -80, medium: 0, high: 80 },
    });
    corn.costs = 10;
    corn.salePrice = 3;

    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(62);
  });

  test("Get profit for crop, simple, with two environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -80, medium: 0, high: 80 },
      wind: { low: -40, medium: 0, high: 50 },
    });
    corn.costs = 10;
    corn.salePrice = 3;

    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "low",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(-2.8);
  });

  test("Get profit for crop, simple, with three environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -80, medium: 0, high: 80 },
      wind: { low: -40, medium: 0, high: 50 },
      temp: { low: -20, medium: 0, high: 30 },
    });
    corn.costs = 10;
    corn.salePrice = 3;

    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "low",
      temp: "low",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(-22.2);
  });
});

// 7: tests for the function "getTotalProfit"

describe("getTotalProfit", () => {
  test("Calculate total profit with multiple crops", () => {
    const corn = new Plant("corn", 3); // name, yield
    corn.costs = 10;
    corn.salePrice = 3;

    const pumpkin = new Plant("pumpkin", 4);
    pumpkin.costs = 7;
    pumpkin.salePrice = 5;

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(21);
  });

  test("Calculate total profit with 0 amount", () => {
    const corn = new Plant("corn", 3); // name, yield
    corn.costs = 10;
    corn.salePrice = 3;

    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalProfit({ crops })).toBe(0);
  });

  // tests for multiple crops:
  test("Calculate total profit with multiple crops with one environment factor", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -10, medium: 0, high: 20 },
    });
    corn.costs = 10;
    corn.salePrice = 3;

    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -10, medium: 0, high: 20 },
    });
    pumpkin.costs = 7;
    pumpkin.salePrice = 5;

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(12.5);
  });

  test("Calculate total profit with multiple crops with two environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -10, medium: 0, high: 20 },
      wind: { low: -20, medium: 0, high: 30 },
    });
    corn.costs = 10;
    corn.salePrice = 3;

    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -10, medium: 0, high: 20 },
      wind: { low: -20, medium: 0, high: 30 },
    });
    pumpkin.costs = 7;
    pumpkin.salePrice = 5;

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
      wind: "high",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(35.5);
  });

  test("Calculate total profit with multiple crops with three environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -10, medium: 0, high: 20 },
      wind: { low: -20, medium: 0, high: 30 },
      temp: { low: -60, medium: 0, high: 10 },
    });
    corn.costs = 10;
    corn.salePrice = 3;

    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -10, medium: 0, high: 20 },
      wind: { low: -20, medium: 0, high: 30 },
      temp: { low: -60, medium: 0, high: 10 },
    });
    pumpkin.costs = 7;
    pumpkin.salePrice = 5;

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
      wind: "high",
      temp: "low",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(-24.2);
  });

  // tests for 0 amount:
  test("Calculate total profit with 0 amount with one environment factor", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -10, medium: 0, high: 20 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -10, medium: 0, high: 20 },
    });
    const crops = [{ crop: corn, numCrops: 0 }];
    const environmentFactors = {
      sun: "high",
    };
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total profit with 0 amount with two environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -10, medium: 0, high: 20 },
      wind: { low: -20, medium: 0, high: 30 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -10, medium: 0, high: 20 },
      wind: { low: -20, medium: 0, high: 30 },
    });
    const crops = [{ crop: corn, numCrops: 0 }];
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total profit with 0 amount with three environment factors", () => {
    const corn = new Plant("corn", 3, {
      sun: { low: -10, medium: 0, high: 20 },
      wind: { low: -20, medium: 0, high: 30 },
      temp: { low: -60, medium: 0, high: 10 },
    });
    const pumpkin = new Plant("pumpkin", 4, {
      sun: { low: -10, medium: 0, high: 20 },
      wind: { low: -20, medium: 0, high: 30 },
      temp: { low: -60, medium: 0, high: 10 },
    });
    const crops = [{ crop: corn, numCrops: 0 }];
    const environmentFactors = {
      sun: "high",
      wind: "high",
      temp: "low",
    };
    expect(getTotalYield({ crops })).toBe(0);
  });
});
