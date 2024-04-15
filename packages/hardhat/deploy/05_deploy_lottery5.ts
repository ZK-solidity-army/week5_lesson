import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployLottery5Contract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Lottery5", {
    from: deployer,
    contract: "Lottery",
    args: ["betMany Optimized", "BMO", 500, 5n * 10n ** 18n, 85n * 10n ** 16n],
    log: true,
    autoMine: true,
  });

  const lotteryContract = await hre.ethers.getContract<Contract>("Lottery5", deployer);
  const lotteryTokenContract = await hre.ethers.getContractAt("LotteryToken", await lotteryContract.paymentToken());

  const symbol = await lotteryTokenContract.symbol();
  const tokenName = await lotteryTokenContract.name();

  console.log(`👋 DeployedContract: ${tokenName} Lottery`);
  console.log("   Symbol: ", symbol);
  console.log("   Purchase ration: ", await lotteryContract.purchaseRatio());
  console.log(`   Bet price: ${(await lotteryContract.betPrice()).toString()} ${symbol}`);
  console.log(`   Bet fee: ${(await lotteryContract.betFee()).toString()} ${symbol}`);
  console.log("   Lottery address", await lotteryContract.getAddress());
  console.log("   LotteryToken address", await lotteryContract.paymentToken());
};

export default deployLottery5Contract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployLottery5Contract.tags = ["Lottery", "Lottery5"];
