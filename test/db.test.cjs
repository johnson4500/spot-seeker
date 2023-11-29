const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('/First test collection', function() {
    it('should test two values', function() {
        let expectedValue = 10
        let actualValue = 10
        
        expect(actualValue).to.be.equal(expectedValue)
    })
})

