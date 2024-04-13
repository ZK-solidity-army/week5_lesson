import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployAdditionalLotteryContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Lottery", {
    from: deployer,
    args: ["Additional Lottery for test", "ALT", 300, 10n ** 15n, 10n ** 14n],
    log: true,
    autoMine: true,
  });

  await deploy("Lottery", {
    from: deployer,
    args: ["Green visa", "GV", 21, 10n ** 15n, 10n ** 14n],
    log: true,
    autoMine: true,
  });

  await deploy("Lottery", {
    from: deployer,
    args: ["SportLoto-82", "sl82", 500, 10n ** 15n, 10n ** 14n],
    log: true,
    autoMine: true,
  });
};

export default deployAdditionalLotteryContracts;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployAdditionalLotteryContracts.tags = ["Lottery"];
