//class Screen
class Screen
{
    //constructor
    constructor(socket, canvas)
    {
        this.socket = socket;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.assets = new Assets();
        this.iProcessingTimeNanoSec = 0;
        this.aTank = null;

        //init canvas
        this.canvas.width = SharedSettings.FIELD_WIDTH;
        this.canvas.height = SharedSettings.FIELD_HEIGHT;

        //init socket
        this.initSocket();

        //init context
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    }

    //init socket
    initSocket()
    {
        //when connect
        this.socket.on(
            'connect', 
            () =>
            {
                console.log('connect : socket.id = %s', socket.id)
                //send to server
                this.socket.emit('enter-the-game');
            }
        )

        //when get from server
        this.socket.on(
            'update', 
            (aTank, iProcessingTimeNanoSec) =>
            {
                this.aTank = aTank;
                this.iProcessingTimeNanoSec = iProcessingTimeNanoSec;
            }
        )
    }

    //animation
    animate(iTimeCurrent)
    {
        requestAnimationFrame(
            (iTimeCurrent) => 
            {
                this.animate(iTimeCurrent);
            }
        );
        this.render(iTimeCurrent);
    }

    //display
    render(iTimeCurrent)
    {
        //console.log('render')
        //clear canvas
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        //fill canvas
        this.renderField();

        //display tank
        if (null !== this.aTank)
        {
            const fTimeCurrenrSec = iTimeCurrent * 0.001; // m sec
            const iIndexFrame = parseInt(fTimeCurrenrSec / 0.2) % 2; // frame number
            this.aTank.forEach(
                (tank) =>
                {
                    this.renderTank(tank, iIndexFrame);
                }
            );
        }

        //display frame
        this.context.save();
        this.context.strokeStyle = RenderingSettings.FIELD_LINECOLOR;
        this.context.lineWidth = RenderingSettings.FIELD_LINEWIDTH;
        this.context.strokeRect(0, 0, canvas.width, canvas.height);
        this.context.restore();

        //show server processing time
        this.context.save();
        this.context.font = RenderingSettings.PROCESSINNGTIME_FONT;
        this.context.fillStyle = RenderingSettings.PROCESSINGTIME_COLOR;
        this.context.fillText((this.iProcessingTimeNanoSec*1e-9).toFixed(9)+'[s]', 
            this.canvas.width-30*10, 
            40);
        this.context.restore();
    }

    renderField()
    {
        this.context.save();

        let iCountX = parseInt(SharedSettings.FiELD_WIDTH / RenderingSettings.FiELDTILE_WIDTH);
        let iCountY = parseInt(SharedSettings.FIELD_HEIGHT / RenderingSettings.FIELDTILE_HEIGHT);
        for (let iIndexY=0; iIndexY < iCountY; iIndexY++)
        {
            for (let iIndexX=0; iIndexX < iCountX; iIndexX++)
            {
                this.context.drawImage(this.assets.imageField, 
                    this.assets.rectFieldInFieldImage.sx, this.assets.rectFieldInFieldImage.sy, 
                    this.assets.rectFieldInFieldImage.sw, this.assets.rectFieldInFieldImage.sh, 
                    iIndexX * RenderingSettings.FIELDTILE_WIDTH, 
                    iIndexY * RenderingSettings.FIELDTILE_HEIGHT, 
                    RenderingSettings.FIELDTILE_WIDTH, 
                    RenderingSettings.FIELDTILE_HEIGHT
                );
            }

            this.context.restore();
        }
    }

    renderTank(tank, iIndexFrame)
    {
        this.context.save();

        this.context.translate(tank.fX, tank.fY);

        // display image
        this.context.save();
        this.context.rotate(tank.fAngle);
        this.context.drawImage(this.assets.imageItems, 
            this.assets.arectTankInItemsImage[iIndexFrame].sx, this.assets.arectTankInItemsImage[iIndexFrame].sy, 
            this.assets.arectTankInItemsImage[iIndexFrame].sw, this.assets.arectTankInItemsImage[iIndexFrame].sh, 
            -SharedSettings.TANK_WIDTH * 0.5, 
            -SharedSettings.TANK_HEIGHT * 0.5, 
            SharedSettings.TANK_WIDTH, 
            SharedSettings.TANK_HEIGHT);
        this.context.restore()

        this.context.restore()
    }
}