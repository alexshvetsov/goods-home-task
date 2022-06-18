const pricesList = [
  {
    priceListID: 1,
    priceListName: "apples",
    extErpPriceListID: 5,
  },
  {
    priceListID: 2,
    priceListName: "onion",
    extErpPriceListID: 20,
  },
  {
    priceListID: 3,
    priceListName: "tomato",
    extErpPriceListID: 8,
  },
  {
    priceListID: 4,
    priceListName: "watermelon",
  },
  {
    priceListID: 5,
    priceListName: "oranges",
    extErpPriceListID: 5,
  },
  {
    priceListID: 6,
    priceListName: "bananas",
  },{
    priceListID: 1,
    priceListName: "apples",
    extErpPriceListID: 5,
  },
  {
    priceListID: 2,
    priceListName: "onion",
    extErpPriceListID: 20,
  },
  {
    priceListID: 3,
    priceListName: "tomato",
    extErpPriceListID: 8,
  },
  {
    priceListID: 4,
    priceListName: "watermelon",
  },
  {
    priceListID: 5,
    priceListName: "oranges",
    extErpPriceListID: 5,
  },
  {
    priceListID: 6,
    priceListName: "bananas",
  },{
    priceListID: 1,
    priceListName: "apples",
    extErpPriceListID: 5,
  },
  {
    priceListID: 2,
    priceListName: "onion",
    extErpPriceListID: 20,
  },
  {
    priceListID: 3,
    priceListName: "tomato",
    extErpPriceListID: 8,
  },
  {
    priceListID: 4,
    priceListName: "watermelon",
  },
  {
    priceListID: 5,
    priceListName: "oranges",
    extErpPriceListID: 5,
  },
  {
    priceListID: 6,
    priceListName: "bananas",
  },
];

async function getPriceList(ERPCompanyids, searchTerm) {
  if (!ERPCompanyids) return pricesList;

  if (searchTerm === "")
    return pricesList.filter((priceList) =>
      ERPCompanyids.includes(priceList.priceListID)
    );

  return pricesList.filter((priceList) => {
    return (
      priceList.priceListName.includes(searchTerm) &&
      ERPCompanyids.includes(priceList.priceListID)
    );
  });
}

async function findPriceList(id) {
  return pricesList.find((priceList) => priceList.priceListID == id);
}

module.exports = {
  findPriceList,
  getPriceList,
};
