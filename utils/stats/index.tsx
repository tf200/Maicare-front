import { useQuery } from "react-query";

async function mockInflowsOutflows() {
  return [
    {
      date: "2023-03-01",
      inflow: 1000,
      outflow: 500,
    },
    {
      date: "2023-04-01",
      inflow: 1000,
      outflow: 1000,
    },
    {
      date: "2023-05-01",
      inflow: 3000,
      outflow: 500,
    },
    {
      date: "2023-06-01",
      inflow: 2500,
      outflow: 2000,
    },
    {
      date: "2023-07-01",
      inflow: 2600,
      outflow: 2500,
    },
    {
      date: "2023-08-01",
      inflow: 4250,
      outflow: 3000,
    },
    {
      date: "2023-09-01",
      inflow: 3000,
      outflow: 2400,
    },
    {
      date: "2023-10-01",
      inflow: 4532,
      outflow: 2789,
    },
    {
      date: "2023-11-01",
      inflow: 4523,
      outflow: 4500,
    },
    {
      date: "2023-12-01",
      inflow: 4500,
      outflow: 3530,
    },
    {
      date: "2024-01-01",
      inflow: 5000,
      outflow: 4500,
    },
    {
      date: "2024-02-01",
      inflow: 6000,
      outflow: 4000,
    },
  ];
}

export const useInflowsOutflows = () => {
  return useQuery("inflows-outflows", mockInflowsOutflows);
};

async function mockCareTypeRevenue() {
  return [
    {
      careType: "Zorgtype #1",
      revenue: 5000,
    },
    {
      careType: "Zorgtype #2",
      revenue: 3000,
    },
    {
      careType: "Zorgtype #3",
      revenue: 1000,
    },
    {
      careType: "Andere zorgtypen",
      revenue: 2000,
    },
  ];
}

export const useCareTypeRevenue = () => {
  return useQuery("care-type-revenue", mockCareTypeRevenue);
};
