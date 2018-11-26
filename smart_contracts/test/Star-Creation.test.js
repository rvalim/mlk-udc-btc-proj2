const { Utils } = require('./utils.js')
const StarNotary = artifacts.require('StarNotary')

contract('StarNotary Test star creation', accounts => {
    const _ra = '1';
    const _dec = '2';
    const _mag = '3';

    beforeEach(async function () {
        this.contract = await StarNotary.new({ from: accounts[0] });
        this.utils = new Utils(this.contract, accounts[0]);

        await this.utils.createStar(
            'awesome star!',
            _dec,
            _mag,
            _ra,
            'story');
    })

    describe('Validate create a star', () => {
        it('can create a star and get its values', async function () {
            let star = await this.contract.tokenIdToStarInfo(0);

            assert.equal(star[0], 'awesome star!', 'Star\'s name do not match');
            assert.equal(star[1], 'story', 'Star\'s name do not match');
            assert.equal(star[2], 'ra_' + _ra, 'Star\'s cent do not match');
            assert.equal(star[3], 'dec_' + _dec, 'Star\'s dec do not match');
            assert.equal(star[4], 'mag_' + _mag, 'Star\'s mag do not match');
        })

        it('can create star, with different coordinates', async function () {
            const myMag = '20';

            await this.utils.createStar(
                'awesome star!',
                _dec,
                myMag,
                _ra,
                'story');

            let star = await this.contract.tokenIdToStarInfo(1);

            assert.equal(star[4], 'mag_' + myMag, 'Star\'s mag do not match');
        });

        describe('can\'t duplicate coordinates', () => {

            it('try to create more than one star with the same coordinates', async function () {
                //Trying to create another star with the same values
                this.utils.expectFailure(
                    async () => {
                        await this.utils.createStar(
                            'awesome star!',
                            _dec,
                            _mag,
                            _ra,
                            'story')
                    });
            })
        })
    })

    describe('Validate coordinates', () => {
        it('Confirm the existing of a giving Star', async function () {
            let result = await this.contract.checkIfStarExist(_ra, _dec, _mag)
            assert.equal(true, result, 'Should return true');
        })

        it('Confirm the inexisting of a giving Star', async function () {
            let result = await this.contract.checkIfStarExist(_ra, '1000', _mag)
            assert.equal(false, result, 'Should return false');
        })
    })

})