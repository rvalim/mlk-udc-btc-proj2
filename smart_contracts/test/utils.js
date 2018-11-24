class Utils {
    constructor(contract, account) {
        this.contract = contract;
        this.defaultAccount = account;
        this.creatStarEvent = [];
    }

    async createStar (name, dec, mag, cent, story, response, account = this.defaultAccount) {
        let index = this.creatStarEvent.push(this.contract.createStarEvent()) -1 ;

        this.creatStarEvent[index].watch(function (err, result) {
            if (err) {
                throw (err);
            }
            if (response) response(result.args.tokenId);
        });
        
        return this.contract.createStar.sendTransaction(
            name,
            dec,
            mag,
            cent,
            story,
            { from: account });
    }


    async expectFailure (_function, errorMessage = 'Inexpected error message') {
        try {
            await _function()
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.match(/revert/)
            return;
        }
        expect.fail(null, null, errorMessage)
    }
}

module.exports = { Utils }