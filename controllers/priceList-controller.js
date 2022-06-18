const { getPriceList, findPriceList } = require("../mock_data");

// @desc get priceList
// @route POST /price-list
exports.getPriceListsAsObs = async (req, res, next) => {
  try {
    const { eRPCompanyIds, searchTerm } = req.body;
    const priceLists = await getPriceList(eRPCompanyIds, searchTerm);
    return res.status(200).json({ success: true, priceLists: priceLists });
  } catch (error) {
    //uncommont the throw error in the mock data line 87 to the effect in the ui, 
    return res.status(500).json({ success: false, error: "Server Error - Price Lists are temporarily unavailable" });
  }
};

// @desc update priceList
// @route put /price-list
exports.updatePriceList = async (req, res, next) => {
  try {
    const priceList = req.body.newPriceList;
    const newPriceList = await findPriceList(priceList.priceListID);
    if (newPriceList) {
      newPriceList.priceListName = priceList.priceListName;
      newPriceList.extErpPriceListID = priceList.extErpPriceListID;
    }
    return res.status(201).json({ priceList: newPriceList });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Item not Found" });
  }
};
