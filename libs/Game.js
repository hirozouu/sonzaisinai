//module
const World = require('./World.js');

//constant
const GameSettings = require('./GameSetting.js');

//class Game
module.exports = class Game
{
    //start
    start(io)
    {
        //variable
        const world = new World(io);
        let iTimeLast = Date.now();
        const timer = setTimeout(3000)

        //when connect
        io.on(
            'connection', 
            (socket) => 
            {
                console.log('connection : socket.id = %s', socket.id);

                // when game start
                socket.on('enter-the-game', 
                () => 
                {
                    console.log('enter-the-game : socket.id = %s', socket.id);
                });

                // receive message
                socket.on('new-message', 
                (strMessage) => 
                {
                    console.log('new-message', strMessage);
                    io.emit('spread-message', strMessage);
                });

                //when disconnect
                socket.on('disconnect', 
                () => 
                {
                    console.log('disconnect : socket.id = %s', socket.id)
                });
            });
        
        setInterval(
            () => 
            {
                const iTimeCurrent = Date.now(); //m sec
                const fDeltaTime = (iTimeCurrent - iTimeLast) * 0.001; // to sec
                iTimeLast = iTimeCurrent;
                //console.log('DeltaTime = %f[s]', fDeltaTime)

                const hrtime = process.hrtime(); //n sec

                //update world
                world.update(fDeltaTime);

                const hrtimeDiff = process.hrtime(hrtime);
                const iNanosecDiff = hrtimeDiff[0] * 1e9 + hrtimeDiff[1]

                //to client
                io.emit('update', 
                    Array.from(world.setTank), 
                    iNanosecDiff);
            }, 
            1000 / GameSettings.FRAMERATE);
    }
}