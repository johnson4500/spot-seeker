const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

describe('/First test collection', function() {
    it('should test two values', function() {
        let expectedValue = 10
        let actualValue = 10
        
        expect(actualValue).to.be.equal(expectedValue)
    })
})