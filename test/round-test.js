const chai = require('chai');
const expect = chai.expect;

const { createRound, takeTurn, calculatePercentCorrect, endRound } = require("../src/round");
const { createDeck } = require("../src/deck")
const { createCard } = require("../src/card")

const card1 = createCard(1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object")

const card2 = createCard(2, "What is a comma-separated list of related values?", ["object", "array", "function"], "array")

const card3 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")

const card4 = createCard(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")

const card5 = createCard(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")

const card6 = createCard(6, "What is an example of a mutator method?", ["sort()", "map()", "join()"], "sort()")

const card7 = createCard(7, "Which array prototype is not an accessor method?", ["join()", "slice()", "splice()"], "splice()")

const card8 = createCard(8, "What do iterator methods take in as their first argument?", ["callback function", "current element", "an array"], "callback function")

const card9 = createCard(9, "What does the callback function for find() return?", ["boolean", "array", "object"], "boolean")

const card10 = createCard(10, "Which iteration method returns the first array element where the callback function returns true", ["find()", "filter()", "forEach()"], "find()")

const testDeck = createDeck([card1, card2, card3, card4, card5, card6, card7, card8, card9, card10])


describe('round', function () {
    it('should be able to create a round', function () {
        const round = createRound(testDeck)
        expect(round).to.deep.equal({
            deck: testDeck,
            currentCard: testDeck[0],
            turns: 0,
            incorrectGuesses: []
        })
    })
})

describe('turn', function () {
    it('should be able to take turns', function () {
        const round = createRound(testDeck)
        takeTurn("object", round)
        expect(round.turns).to.equal(1)
        takeTurn("object", round)
        expect(round.turns).to.equal(2)
    })
    it('should make next card become current card', function () {
        const round = createRound(testDeck)
        takeTurn("object", round)
        expect(testDeck[1]).to.deep.equal(round.currentCard)
    })
    it('should check if the answer is correct', function () {
        const round = createRound(testDeck)
        takeTurn("object", round)
        expect([]).to.deep.equal(round.incorrectGuesses)
        takeTurn("object", round)
        expect([2]).to.deep.equal(round.incorrectGuesses)
    })
    it('should return feedback', function () {
        const round = createRound(testDeck)
        const correctResult = takeTurn("object", round)
        expect(correctResult).to.equal('correct!')
        const wrongResult = takeTurn("object", round)
        expect(wrongResult).to.equal('incorrect!')
    })
})

describe('calculate percentage', function () {
    it('should calculate the percentage of the correct guesses', function () {
        const round = createRound(testDeck)
        const percentage = calculatePercentCorrect(round)
        const expectedPercentage = ((round.turns - round.incorrectGuesses.length) / 30) * 100;
        expect(percentage).to.equal(expectedPercentage)
    })
})

describe('End round', function () {
    it('should print **Round over!** You answered # % of the questions correctly!', function () {
        const round = createRound(testDeck)
        const percentage = calculatePercentCorrect(round)
        const print = endRound(round)
        const expectedMessage = `**Round over!** You answered ${percentage} % of the questions correctly!`
        expect(print).to.equal(expectedMessage)
    })
})