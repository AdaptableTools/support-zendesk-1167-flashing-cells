const fs = require("fs");

const TRADE_KEYS = [];
let INCREMENT_ID = 10001;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomFloat(max) {
  return parseFloat((Math.random() * max).toFixed(2));
}

function getRandomString(length) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

function getRandomTypology() {
  const TYPOLOGY_LIST = ["TYPE1", "TYPE2", "TYPE3"];
  return TYPOLOGY_LIST[Math.floor(Math.random() * TYPOLOGY_LIST.length)];
}

function randomizeTrade(key = null) {
  if (!key) {
    return null;
  }

  return {
    key,
    priceKey: `PRICE_KEY_${getRandomString(6)}`,
    bloombergTicker: getRandomString(6),
    book: getRandomString(6),
    broker: getRandomString(6),
    ccp: getRandomString(6),
    cdr: 99999,
    contractId: getRandomInt(100000).toString(),
    contractMaturity: new Date().toISOString(),
    contractTicker: getRandomString(6),
    couponRate: getRandomFloat(10),
    counterparty: `${getRandomInt(100000)}AMG`,
    country: getRandomString(2).toUpperCase(),
    currency: getRandomString(3).toUpperCase(),
    direction: getRandomString(4),
    exchangeTicker: getRandomString(6),
    executionDate: new Date().toISOString(),
    fixedRate: getRandomFloat(10),
    futCode: getRandomString(6),
    futureType: getRandomString(6),
    id: `20241001_${getRandomInt(100000)}`,
    inputDate: new Date().toISOString(),
    instrumentDescription: getRandomString(15),
    instrumentId: getRandomString(12),
    isinCode: getRandomString(12),
    instrumentLabel: getRandomString(15),
    isSod: Math.random() < 0.5,
    isCancelled: Math.random() < 0.5,
    isConfirmed: Math.random() < 0.5,
    issueDate: new Date().toISOString(),
    issueLongDescription: getRandomString(30),
    issuer: getRandomString(12),
    jsbId: `20241001_${getRandomInt(100000)}`,
    manualTrade: Math.random() < 0.5,
    market: getRandomString(6),
    bpv: getRandomFloat(500),
    marketPrice: getRandomFloat(500),
    marketYield: getRandomFloat(10),
    marketValue: getRandomFloat(1000000),
    pv01: getRandomFloat(10),
    maturityDate: new Date().toISOString(),
    modificationDate: new Date().toISOString(),
    notional: getRandomFloat(1000000),
    price: getRandomFloat(500),
    priceType: getRandomString(10),
    productType: getRandomString(6),
    quantity: getRandomFloat(100000),
    rfqId: getRandomString(6),
    rate: getRandomFloat(10),
    counterpartyRicosId: getRandomString(6),
    brokerRicosId: getRandomString(6),
    secondaryKey: `20241001_${getRandomInt(100000)}`,
    settlementDate: new Date().toISOString(),
    deliveryDate: new Date().toISOString(),
    settlementAmount: getRandomFloat(1000000),
    signedQuantity: getRandomFloat(100000),
    signedNotional: getRandomFloat(1000000),
    sourceSystem: getRandomString(10),
    status: getRandomString(6),
    swapPayAmount: getRandomFloat(1000000),
    swapPayCurrency: getRandomString(3).toUpperCase(),
    swapPayDayCount: getRandomInt(365),
    swapPayFrequency: getRandomString(10),
    swapPayIndex: getRandomString(6),
    swapPayMaturityDate: new Date().toISOString(),
    swapPayRateType: getRandomString(10),
    swapPayStartDate: new Date().toISOString(),
    swapRecAmount: getRandomFloat(1000000),
    swapRecCurrency: getRandomString(3).toUpperCase(),
    swapRecDayCount: getRandomInt(365),
    swapRecFrequency: getRandomString(10),
    swapRecIndex: getRandomString(6),
    swapRecMaturityDate: new Date().toISOString(),
    swapRecRateType: getRandomString(10),
    swapRecStartDate: new Date().toISOString(),
    tenor: `${getRandomInt(10)}Y`,
    ticker: getRandomString(6),
    tradeDate: new Date().toISOString(),
    tradeId: `20241001_${getRandomInt(100000)}`,
    tradeVersion: getRandomInt(100),
    trader: getRandomString(10),
    updatedAt: new Date().toISOString(),
    typology: getRandomTypology(),
    group: getRandomString(6),
    yield: getRandomFloat(10),
    venue: getRandomString(10),
    venueOrderId: getRandomInt(100000).toString(),
    blockTradeId: getRandomInt(100000).toString(),
    internalOrderId: `${getRandomInt(1000000000)}_${getRandomInt(100000)}`,
    isBlockTrade: Math.random() < 0.5,
    initialPrice: getRandomFloat(500),
    initialQuantity: getRandomFloat(100000),
    initialCounterparty: getRandomString(10),
    initialExecutionDate: new Date().toISOString(),
    cashNew: getRandomFloat(1000000),
    sodMarketValue: getRandomFloat(1000000),
    cashSod: getRandomFloat(1000000),
    signedSodNotional: getRandomFloat(1000000),
  };
}

function createRandomTrade() {
  const key = `MatriX_${getRandomString(6)}`;
  const trade = randomizeTrade(key);
  TRADE_KEYS.push(key);
  return trade;
}

function createUpdatedTrade() {
  const key = TRADE_KEYS[Math.floor(Math.random() * TRADE_KEYS.length)];
  return randomizeTrade(key);
}

function createRandomPrice() {
  const key = TRADE_KEYS[Math.floor(Math.random() * TRADE_KEYS.length)];
  if (!key) {
    return null;
  }

  return {
    key,
    priceKey: `PRICE_KEY_${getRandomString(6)}`,
    cdr: 99999,
    bpv: getRandomFloat(500),
    marketPrice: getRandomFloat(500),
    marketYield: getRandomFloat(10),
    marketValue: getRandomFloat(1000000),
    pv01: getRandomFloat(10),
    settlementAmount: getRandomFloat(1000000),
    marketValue: getRandomFloat(1000000),
  };
}

function generateSnapshot(tradesCount = 1000) {
  let trades = [];
  for (let i = 0; i < tradesCount; i++) {
    trades.push(createRandomTrade());
  }

  const snapshot = {
    restartId: 1,
    incrementId: INCREMENT_ID,
    count: tradesCount,
    trades,
  };

  fs.writeFileSync(
    "./datasource/snapshot.json",
    JSON.stringify(snapshot, null, 2),
    "utf-8"
  );

  console.log("Generated Snapshot", INCREMENT_ID);
}

function generateIncrement(pricesCount = 100) {
  let createdTrades = [];
  let updatedTrades = [];
  let deletedTrades = [];
  let prices = [];

  for (let i = 0; i < pricesCount; i++) {
    const price = createRandomPrice();
    if (!!price) {
      prices.push(price);
    }
  }

  // const rnd1to3 = Math.floor(Math.random() * 3) + 1;

  // for (let i = 0; i < rnd1to3; i++) {
  //   createdTrades.push(createRandomTrade());
  // }

  // for (let i = 0; i < rnd1to3; i++) {
  //   const updatedTrade = createUpdatedTrade();
  //   if (!!updatedTrade) {
  //     updatedTrades.push();
  //   }
  // }

  const increment = {
    type: "Trade",
    key: "99999-0-1234",
    restartId: 1,
    incrementId: INCREMENT_ID,
    cdr: "99999",
    createdTrades,
    updatedTrades,
    deletedTrades,
    prices,
  };

  fs.writeFileSync(
    "./datasource/increment.json",
    JSON.stringify(increment, null, 2),
    "utf-8"
  );

  INCREMENT_ID++;

  console.log("Generated Increment", INCREMENT_ID - 1);
}

module.exports = { generateSnapshot, generateIncrement };
