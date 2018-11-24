const { Utils } = require('./utils.js')
const StarNotary = artifacts.require('StarNotary')

contract('StarNotary test commerce(by operator)', accounts => {
    const owner = accounts[0];
    const operator = accounts[1];
    const anyUser = accounts[2];
    let starId = 0;
    let starPrice = web3.toWei(.01, "ether");

    beforeEach(async function () {
        this.contract = await StarNotary.new({ from: owner });
        this.utils = new Utils(this.contract, owner);

        await this.utils.createStar(
            'awesome star!',
            '1',
            '2',
            '3',
            'story',
            result => starId = result.toNumber());

        await this.contract.setApprovalForAll(operator, true);
        await this.contract.putStarUpForSale(starId, starPrice, { from: operator });
    })

    describe('Using setApprovalForAll', () => {
        it('operator can put stars for sale, and approve it\'s transfer', async function () {
            await this.contract.approve(anyUser, starId, { from: operator })
            assert.equal(await this.contract.getApproved(starId), anyUser, 'The star\'s transfer was not registered');
        })

        it('Another user can not put star for sale', async function () {
            this.contract.putStarUpForSale(starId, starPrice, { from: anyUser })
                .then((result) => {
                    assert.fail("No exception was thrown");
                }).catch((err) => {
                    assert.equal(true, err.message.includes('owner'), 'Inexpected error message');
                });
        })

        describe('Buying stars putting for sell by the operator', () => {
            it('operator can buy star he put for sale', async function () {
                await this.contract.approve(operator, starId, { from: operator })
                await this.contract.buyStar(starId, { from: operator, value: starPrice, gasPrice: 0 })
                assert.equal(await this.contract.ownerOf(starId), operator, 'The star was not transfer');
            })

            it('Another user can buy star', async function () {
                await this.contract.approve(anyUser, starId, { from: operator })
                await this.contract.buyStar(starId, { from: anyUser, value: starPrice, gasPrice: 0 });
                assert.equal(await this.contract.ownerOf(starId), anyUser, 'The star was not transfer');
            })
        })
    })
})