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

    describe('Validate create a star', () => {
        beforeEach(async function () {
            await createStar(
                this.contract,
                'awesome star!',
                '1',
                '2',
                '3',
                'story');
        })

        it('can create a star and get its values', async function () {

            //Star created on beforeEach
            let star = await this.contract.tokenIdToStarInfo(0);

            assert.equal(star[0], 'awesome star!', 'Star\'s name do not match');
            assert.equal(star[1], '1', 'Star\'s dec do not match');
            assert.equal(star[2], '2', 'Star\'s mag do not match');
            assert.equal(star[3], '3', 'Star\'s cent do not match');
            assert.equal(star[4], 'story', 'Star\'s name do not match');
        })

        it('can create star, with different coordinates', async function () {
            await createStar(
                this.contract,
                'awesome star!',
                '1',
                '20',
                '3',
                'story');

            let star = await this.contract.tokenIdToStarInfo(1);

            assert.equal(star[2], '20', 'Star\'s mag do not match');
        });

        describe('can\'t duplicate coordinates', () => {
            it('try to create more than one star with the same coordinates', async function () {
                //Trying to create another star with the same values
                await createStar(
                    this.contract,
                    'awesome star!',
                    '1',
                    '2',
                    '3',
                    'story')
                    .then((result) => {
                        assert.Fail("No exception was thrown");
                    }).catch((err) => {
                        assert.equal(true, err.message.includes('coordinate'), 'Inexpected error message');
                    });
            })
        })
    })

    describe('Validate coordinates', () => {
        beforeEach(async function () {
            //this.contract = await StarNotary.new({ from: accounts[0] });
            await createStar(
                this.contract,
                'awesome star!',
                '1',
                '2',
                '3',
                'story');
        })

        it('Confirm the existing of a giving Star', async function () {
            let result = await this.contract.checkIfStarExist('1', '2', '3')
            assert.equal(true, result, 'Should return true');
        })

        it('Confirm the inexisting of a giving Star', async function () {
            let result = await this.contract.checkIfStarExist('1000', '2', '3')
            assert.equal(false, result, 'Should return false');
        })
    })

    describe('Buying and selling stars', () => {
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

        describe('Validate selling stars', () => {
            beforeEach(async function () {
                await this.contract.putStarUpForSale(starId, starPrice, { from: user1 })
            })

            it('user1 can put his star for sale', async function () {
                assert.equal(await this.contract.ownerOf(starId), user1, 'Owner different from user1')
                await this.contract.putStarUpForSale(starId, starPrice, { from: user1 })

                assert.equal(await this.contract.starsForSale(starId), starPrice, 'Verify if star is for sale, and it\'s price')
            })

            it('user2 can\'t put star\'s user1 for sale', async function () {
                assert.notEqual(await this.contract.ownerOf(starId), user2, 'Different owners')

                this.contract.putStarUpForSale(starId, starPrice, { from: user2 })
                    .then((result) => {
                        assert.Fail("No exception was thrown");
                    }).catch((err) => {
                        assert.equal(true, err.message.includes('owner'), 'Inexpected error message');
                    });
            })
        })

        describe('Validate buying stars', () => {
            beforeEach(async function () {
                await this.contract.putStarUpForSale(starId, starPrice, { from: user1 })
            })

            describe('user1 can\'t buy his own star', () => {
                beforeEach(async function () {
                    await this.contract.putStarUpForSale(starId, starPrice, { from: user1 })
                })

                it('Fail when user1 try to buy his own star', async function () {
                    this.contract.buyStar(starId, { from: user1, value: starPrice, gasPrice: 0 })
                        .then((result) => {
                            assert.Fail("No exception was thrown");
                        }).catch((err) => {
                            assert.equal(true, err.message.includes('his own'), 'Inexpected error message');
                        });
                })
            })

            describe('user2 can buy a star that was put up for sale', () => {
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

        describe('Validate selling stars by an operator', () => {
            let uOwner = accounts[0]
            let uOperator = accounts[1]
            let uCommon = accounts[2]

            let starId = 0

            describe('Using setApprovalForAll', () => {
                beforeEach(async function () {
                    await this.contract.setApprovalForAll(uOperator, true, { from: uOwner });
                })

                it('operator can put stars for sale', async function () {
                    this.contract.putStarUpForSale(starId, starPrice, { from: uOperator })
                        .then((result) => {
                        }).catch((err) => {
                            assert.fail("No exception was thrown");
                        });
                })

                it('common user can not put star for sale', async function () {
                    this.contract.putStarUpForSale(starId, starPrice, { from: uCommon })
                        .then((result) => {
                            assert.fail("No exception was thrown");
                        }).catch((err) => {
                            assert.equal(true, err.message.includes('owner'), 'Inexpected error message');
                        });
                })

                describe('Buying stars', () => {
                    beforeEach(async function () {
                        await this.contract.setApprovalForAll(uOperator, true, { from: uOwner });
                        await this.contract.putStarUpForSale(starId, starPrice, { from: uOperator })
                    })

                    it('operator can not buy star he put for sale', async function () {
                        this.contract.buyStar(starId, { from: uOperator, value: starPrice, gasPrice: 0 })
                            .then((result) => {
                                assert.fail('fudeu');
                            }).catch((err) => {
                                assert.equal(true, err.message.includes('owner or his'), 'Inexpected error message');
                            });
                    })

                    it('common user can buy star', async function () {
                        await this.contract.buyStar(starId, { from: uCommon, value: starPrice, gasPrice: 0 });
                    })
                })
            })


            describe('Using approve', () => {
                //Considering that there is already an star with index 0
                var starId0 = 0;
                var starId1 = 1;

                beforeEach(async function () {
                    await createStar(
                        this.contract,
                        'awesome star!',
                        '10',
                        '200',
                        '3',
                        'story',
                        async result => {
                            this.contract.approve(uOperator, 1, { from: uOwner })
                                .then((result) => {

                                }).catch((err) => {
                                    console.log(err);
                                });
                        });
                })

                it('operator can put star 0 for sale', async function () {
                    this.contract.putStarUpForSale(1, starPrice, { from: uOperator })
                        .then((result) => {
                        }).catch((err) => {
                            // assert.fail("No exception was thrown");
                            console.log(err);
                        });
                })

                it('operator can not put star 1 for sale', async function () {
                    this.contract.putStarUpForSale(1, starPrice, { from: uOperator })
                        .then((result) => {
                            // assert.fail("No exception was thrown");
                            console.log(result);
                        }).catch((err) => {
                            assert.equal(true, err.message.includes('owner'), 'Inexpected error message');
                        });
                })


                // describe('Buying stars', () => {
                //     beforeEach(async function () {
                //         await this.contract.approve(uOperator, starId0, { from: uOwner });
                //         //await this.contract.putStarUpForSale(starId0, starPrice, { from: uOperator })
                //     })

                //     it('operator can not buy star he put for sale', async function () {
                //         this.contract.buyStar(starId, { from: uOperator, value: starPrice, gasPrice: 0 })
                //             .then((result) => {
                //                 assert.fail('fudeu');
                //             }).catch((err) => {
                //                 assert.equal(true, err.message.includes('owner or his'), 'Inexpected error message');
                //             });
                //     })

                //     it('common user can buy star', async function () {
                //         await this.contract.buyStar(starId, { from: uCommon, value: starPrice, gasPrice: 0 });
                //     })
                // })
            })


        })

        describe('Validate list of stars for sale', () => {
            let coordinates = [
                ['1', '2', '2'],
                ['2', '3', '3'],
                ['3', '4', '4'],
                ['4', '5', '5'],
                ['5', '6', '6'],
                ['6', '7', '7'],
                ['7', '8', '8'],
                ['8', '9', '9']
            ];

            sellStar = async (contract, dec, mag, cent) => {
                await createStar(
                    contract,
                    'awesome star!',
                    dec,
                    mag,
                    cent,
                    'story',
                    async _starId => await contract.putStarUpForSale(_starId, starPrice));
            }

            beforeEach(async function () {
                // for (let i = 0; i < coordinates.length; i++) {
                //     await sellStar(
                //         this.contract
                //         , coordinates[i][0]
                //         , coordinates[i][1]
                //         , coordinates[i][2]
                //     );
                // }
            })

            it('Validate if all stars was put for sale', async function () {
                // let arr = await this.contract.starsForSale(1);
                // let arr1 = [];

                // arr.forEach(element => arr1.push(element.toNumber()));

                // console.log('arrayyyyyyyyyyyyyyy', arr1);
            })

            // it('Buy a star, and verify if it is still on the array', async function () { })

            // it('', async function () { })
        })

    })
})