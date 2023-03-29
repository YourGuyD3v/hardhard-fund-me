const { ethers, getNamedAccounts, network } = require("hardhat")
const { assert } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe staging testing", function () {
          const sendValue = ethers.utils.parseEther("1")
          let fundMe
          let deployer
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("Allow people to fund and withdraw", async () => {
              const fundTxResponse = fundMe.fund({ value: sendValue })
              await fundTxResponse.wait(1)
              const withdrawTxResponse = fundMe.withdraw({ value: sendValue })
              await withdrawTxResponse.wait(1)

              const endingBalance = await ethers.provider.getContract(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), 0)
          })
      })
