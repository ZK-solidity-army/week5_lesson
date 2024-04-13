import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployLotteryContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Lottery", {
    from: deployer,
    args: ["Group 9 Lottery Token", "G9LT", 1500, 10n ** 16n, 10n ** 15n],
    log: true,
    autoMine: true,
  });

  const lotteryContract = await hre.ethers.getContract<Contract>("Lottery", deployer);
  const lotteryTokenContract = await hre.ethers.getContractAt("LotteryToken", await lotteryContract.paymentToken());

  console.log("👋 DeployedContract: Group 9 Lottery");
  const symbol = await lotteryTokenContract.symbol();
  console.log("   Symbol: ", symbol);
  console.log("   Purchase ration: ", await lotteryContract.purchaseRatio());
  console.log(`   Bet price: ${(await lotteryContract.betPrice()).toString()} ${symbol}`);
  console.log(`   Bet fee: ${(await lotteryContract.betFee()).toString()} ${symbol}`);
  console.log("   LotteryToken address", await lotteryContract.paymentToken());
};

export default deployLotteryContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployLotteryContract.tags = ["Lottery"];
