const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log(`Got contract FundMe at ${fundMe.address}`)
    console.log("Withdrawing funds... ")

    const transactionResponse = await fundMe.withdraw({
        value: ethers.utils.parseEther("1"),
    })
    transactionResponse.wait(1)
    console.log("withdraws!!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
