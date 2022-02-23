const fs = require("fs-extra");
const Bundlr = require("@bundlr-network/client");

const getWallet = (args) => {
  const wallet_option = args;
  return JSON.parse(fs.readFileSync(wallet_option, { encoding: "utf8" }));
};

const parseArgs = () => {
  var myArgs = process.argv.slice(2);
  if (myArgs.length != 1) {
    throw "Specify keypair path";
  }
  return myArgs[0];
};

const fundBundlr = async () => {
  args = parseArgs();
  const wallet = await getWallet(args);
  const bundlr = new Bundlr.default(
    "https://node1.bundlr.network",
    "solana",
    wallet
  );
  //   const price = await bundlr.getPrice(10000000000); this amount funds for 1 sol
  const price = await bundlr.getPrice(100000000);
  let amount = bundlr.utils.unitConverter(price);
  amount = amount.toNumber().toFixed(2);
  await bundlr.fund(parseInt(amount));
};

fundBundlr();
