// class game

const Question = require('./Question.js');

module.exports = class Room
{
    constructor()
    {
        this.memberCount = 0;
        this.question = new Question();
        this.counter = 0;
    }

    joinMember()
    {
        this.memberCount++;
    }

    leaveMember()
    {
        this.memberCount--;
    }

    incrementCount()
    {
        this.counter++;
    }

    resetCount()
    {
        this.counter = 0;
    }
}