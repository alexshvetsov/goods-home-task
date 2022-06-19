const pricesList = [
  {
    priceListID: 1,
    priceListName: "fruitapples",
    extErpPriceListID: 533,
  },
  {
    priceListID: 2,
    priceListName: "vegionion",
    extErpPriceListID: 20,
  },
  {
    priceListID: 3,
    priceListName: "vegitomato",
    extErpPriceListID: 8123,
  },
  {
    priceListID: 4,
    priceListName: "fruitwatermelon",
  },
  {
    priceListID: 5,
    priceListName: "fruitoranges",
    extErpPriceListID: 5123,
  },
  {
    priceListID: 6,
    priceListName: "fruitbananas",
  }
];

async function getPriceList(ERPCompanyids, searchTerm) {
  // throw new Error('asda')
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
