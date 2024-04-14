import { ethers } from "hardhat";
import { LotteryTest, LotteryToken } from "../typechain-types";

describe("LotteryTestContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let lotteryContract: LotteryTest;
  let tokenContract: LotteryToken;
  let deployer: any;
  before(async () => {
    deployer = (await ethers.getSigners())[0];
    const lotteryContractFactory = await ethers.getContractFactory("LotteryTest");
    lotteryContract = (await lotteryContractFactory.deploy("MyToken", "Symbol", 100n, 100n, 10n)) as LotteryTest;
    await lotteryContract.waitForDeployment();

    await lotteryContract.purchaseTokens({ value: 10n ** 18n });

    tokenContract = await ethers.getContractAt("LotteryToken", await lotteryContract.paymentToken());
    tokenContract.mint(deployer.address, 10n ** 18n);
    tokenContract.approve(await lotteryContract.getAddress(), 10n ** 18n);

    await lotteryContract.openBets(Math.ceil(new Date().valueOf() / 1000) + 1000 * 10);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ in Array.from({ length: 1000 })) {
      await lotteryContract.bet();
    }
  });

  describe("Compare gas usage", function () {
    it("Should have the right message on deploy", async function () {
      await lotteryContract.betMany(300);
      await lotteryContract.betManyOptimized(300);
      await lotteryContract.betManyPartially(300);
    });
  });
});
