const { Utils } = require('./utils.js')
const StarNotary = artifacts.require('StarNotary')

contract('StarNotary test commerce(buy and sell)', accounts => {
    const owner = accounts[0];
    const anyUser = accounts[1];
    const anyUser2 = accounts[2];
    let starId = 0;
    let starPrice = web3.toWei(.01, "ether");
    let utils = undefined;
    let contract = undefined;

    beforeEach(async function () {
        contract = await StarNotary.new({ from: owner });
        utils = new Utils(contract, owner);

        await utils.createStar(
            'awesome star!',
            '1',
            '2',
            '3',
            'story',
            (_starId) => starId = _starId);
    })

    describe('Validate stars not for sale', () => {
        it('Fail to buy a star that was never put up for sale', async function () {
            utils.expectFailure(
                async () => {
                    await contract.buyStar(starId, { from: anyUser, value: starPrice, gasPrice: 0 })
                });
        })

        it('Fail to buy a star already brought', async function () {
            let newOwner = anyUser;
            await contract.putStarUpForSale(starId, starPrice)
            await contract.approve(newOwner, starId);
            await contract.buyStar(starId, { from: newOwner, value: starPrice, gasPrice: 0 })

            assert.equal(await contract.ownerOf(starId), newOwner, "Star was not transfered")

            utils.expectFailure(
                async () => {
                    await contract.buyStar(starId, { from: anyUser2, value: starPrice, gasPrice: 0 })
                });
        })


        it('Fail to buy a star, when the transfer was not approved', async function () {
            let newOwner = anyUser;
            await contract.putStarUpForSale(starId, starPrice)

            utils.expectFailure(
                async () => {
                    await contract.buyStar(starId, { from: newOwner, value: starPrice, gasPrice: 0 })

                });
        })
    })

    describe('Validate selling stars', () => {
        beforeEach(async function () {
            await contract.putStarUpForSale(starId, starPrice)
        })

        it('The owner can put his star for sale', async function () {
            assert.equal(await contract.ownerOf(starId), owner, 'Owner different from user1');
            assert.equal(await contract.starsForSale(starId), starPrice, 'Verify if star is for sale, and it\'s price');
        })

        it('Another user can\'t put owner\'s star for sale', async function () {
            assert.notEqual(await contract.ownerOf(starId), anyUser, 'Different owners')

            utils.expectFailure(
                async () => {
                    await contract.putStarUpForSale(starId, starPrice, { from: anyUser })
                });
        })
    })

    describe('Validate buying stars', () => {
        beforeEach(async function () {
            await contract.putStarUpForSale(starId, starPrice)
        })

        if('Validate star price', async () => {
            let valor = (await contract.starsForSale(starId));
            assert(starPrice, valor, 'Icorrect value');
        })

        it('Fail when owner try to buy his own star', async function () {
            utils.expectFailure(
                async () => {
                    await contract.approve(owner, starId)
                    await contract.buyStar(starId, { from: owner, value: starPrice, gasPrice: 0 })
                }
                , 'The owner can\'t buy his own star');
        })

        describe('Anyuser can buy a star from another person', () => {
            it('Anyuser is the owner of the star after they buy it', async function () {
                let newOwner = anyUser;
                await contract.approve(newOwner, starId);
                await contract.buyStar(starId, { from: newOwner, value: starPrice, gasPrice: 0 })
                assert.equal(await contract.ownerOf(starId), newOwner)
            })

            it('Anyuser ether balance changed correctly', async function () {
                let newOwner = anyUser;
                let overpaidAmount = web3.toWei(.05, 'ether');

                const balanceBeforeTransaction = web3.eth.getBalance(newOwner)
                await contract.approve(newOwner, starId);
                await contract.buyStar(starId, { from: newOwner, value: overpaidAmount, gasPrice: 0 })
                const balanceAfterTransaction = web3.eth.getBalance(newOwner)

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
            })
        })
    })
})