const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => {

    var creatStarEvent;
    createStar = async (contract, name, dec, mag, cent, story, response, account = accounts[0]) => {
        creatStarEvent = contract.createStarEvent();

        creatStarEvent.watch(function (err, result) {
            if (err) {
                throw (err);
            }
            if (response) response(result.args.tokenId);
        });

        await contract.createStar.sendTransaction(
            name,
            dec,
            mag,
            cent,
            story,
            { from: account });
    }

    beforeEach(async function () {
        this.contract = await StarNotary.new({ from: accounts[0] });
    })

    // describe('can create a star', () => {
    //     beforeEach(async function () {
    //         await createStar(
    //             this.contract,
    //             'awesome star!',
    //             '10',
    //             '2',
    //             '3',
    //             'story');
    //     })

    //     it('can create a star and get its name', async function () {

    //         //Star created on beforeEach
    //         let star = await this.contract.tokenIdToStarInfo(0);

    //         assert.equal(star[0], 'awesome star!', 'Star\'s name do not match');
    //         assert.equal(star[1], '1', 'Star\'s dec do not match');
    //         assert.equal(star[2], '2', 'Star\'s mag do not match');
    //         assert.equal(star[3], '3', 'Star\'s cent do not match');
    //         assert.equal(star[4], 'story', 'Star\'s name do not match');
    //     })

    //     it('can create star, with different coordinates', async function () {
    //         await createStar(
    //             this.contract,
    //             'awesome star!',
    //             '1',
    //             '20',
    //             '3',
    //             'story');

    //         let star = await this.contract.tokenIdToStarInfo(1);

    //         assert.equal(star[2], '20', 'Star\'s mag do not match');
    //     });

    //     describe('can\'t duplicate coordinates', () => {
    //         it('try to create more than one star with the same coordinates', async function () {
    //             //Trying to create another star with the same values
    //             await createStar(
    //                 this.contract,
    //                 'awesome star!',
    //                 '1',
    //                 '2',
    //                 '3',
    //                 'story')
    //                 .then((result) => {
    //                     assert.Fail("No exception was thrown");
    //                 }).catch((err) => {
    //                     assert.equal(true, err.message.includes('coordinate'), 'Inexpected error message');
    //                 });
    //         })
    //     })
    // })

    describe('buying and selling stars', () => {
        let user1 = accounts[1]
        let user2 = accounts[2]
        let randomMaliciousUser = accounts[3]

        let starId = 0
        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () {
            await createStar(
                this.contract,
                'awesome star!',
                '10',
                '2',
                '3',
                'story',
                (_starId) => starId = _starId,
                user1);
        })

        it('user2 can\'t put up star from user1 for sale', async function () {
            assert.notEqual(await this.contract.ownerOf(starId), user2, 'Different owners')
            await this.contract.putStarUpForSale(starId, starPrice, { from: user2 })
        })

        it('user1 can put up their star for sale', async function () {
            assert.equal(await this.contract.ownerOf(starId), user1, 'Owner different from user1')
            await this.contract.putStarUpForSale(starId, starPrice, { from: user1 })

            assert.equal(await this.contract.starsForSale(starId), starPrice, 'Verify if star is for sale, and it\'s price')
        })

        describe('user2 can buy a star that was put up for sale', () => {
            beforeEach(async function () {
                await this.contract.putStarUpForSale(starId, starPrice, { from: user1 })
            })

            it('user2 is the owner of the star after they buy it', async function () {
                await this.contract.buyStar(starId, { from: user2, value: starPrice, gasPrice: 0 })
                assert.equal(await this.contract.ownerOf(starId), user2)
            })

            it('user2 ether balance changed correctly', async function () {
                let overpaidAmount = web3.toWei(.05, 'ether')
                const balanceBeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(starId, { from: user2, value: overpaidAmount, gasPrice: 0 })
                const balanceAfterTransaction = web3.eth.getBalance(user2)

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
            })
        })
    })
})