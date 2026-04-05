import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { PowerBar } from './PowerBar';

export class ActionButton extends PIXI.Graphics
{
    public name: string = "";

    private power: number = 50;

    private animateReduction: number = 0.2;

    private currentInterval: any = null;

    private powerBar: PowerBar;

    constructor(parent: Scene, _powerBar: PowerBar, name: string = "")
    {
        super();
        
        this.name = name;
        this.powerBar = _powerBar;

        this.interactive = true;
        this.eventMode = 'static';

        this.ontouchstart = this.onTouchDown;
        this.ontouchend = this.onTouchUp;
        this.onmousedown = this.onTouchDown;
        this.onmouseup = this.onTouchUp;

        const buttonGraphic = this.circle(0, 0, 100).fill({ color: 0xff0000 }).stroke({ width: 5, color: 0x000000 });

        parent.addChild(buttonGraphic);
    }

    onTouchDown = () =>
    {
        console.log('touch down!');

        this.scale.set(this.scale.x - this.animateReduction, this.scale.y - this.animateReduction); // Example of a simple animation effect (scaling down)
        
        this.currentInterval = setInterval(() =>
        {
            if (this.powerBar.getValue() > this.powerBar.min)
            {
                this.powerBar.setValue(this.powerBar.getValue() - this.power);
            }
            else
            {
                clearInterval(this.currentInterval);
            }
        }, 100);
    }

    onTouchUp = () =>
    {
        console.log('touch up!');

        this.scale.set(this.scale.x + this.animateReduction, this.scale.y + this.animateReduction); // Example of a simple animation effect (scaling up)
        
        if (this.currentInterval)
        {
            this.powerBar.setValue(this.powerBar.max); // Reset power bar value on touch release

            clearInterval(this.currentInterval);

            this.currentInterval = null;
        }
    }
}