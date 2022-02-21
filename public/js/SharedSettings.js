//class shared settings
class SharedSettings
{
    //field size
    static get FIELD_WIDTH() {return 1024.0;}
    static get FIELD_HEIGHT() {return 1024.0;}
}

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined')
{
    //Node.js
    module.exports = SharedSettings;
}