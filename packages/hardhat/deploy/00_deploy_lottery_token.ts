import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * @notice
 * This deployment is needed for exporting the LotteryToken contract ABI only
 * The LotteryToken contract is deployed by the Lottery contract itself
 * So here is a workaround on top of hardhat-deploy plugin
 */
const deployLotteryTokenContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("LotteryToken", {
    from: deployer,
    args: ["Group 9 Lottery Token", "G9LT"],
    log: true,
    autoMine: true,
  });
};

export default deployLotteryTokenContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployLotteryTokenContract.tags = ["LotteryToken"];
