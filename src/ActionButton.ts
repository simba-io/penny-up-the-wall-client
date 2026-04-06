import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { PowerBar } from './PowerBar';
import { Coin } from './Coin';

export class ActionButton extends PIXI.Graphics
{
    public name: string = "";

    private power: number = 50;

    private powerMultiplier: number = 5;

    private animateReduction: number = 0.2;

    private currentInterval: any = null;

    private powerBar: PowerBar;
    private coin: Coin;

    constructor(parent: Scene, _powerBar: PowerBar, coin: Coin, name: string = "")
    {
        super();
        
        this.name = name;
        this.powerBar = _powerBar;
        this.coin = coin;

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
        this.scale.set(this.scale.x + this.animateReduction, this.scale.y + this.animateReduction); // Example of a simple animation effect (scaling up)
        
        if (this.currentInterval)
        {
            const currentValue = this.powerBar.getValue();
            const launchPower = Math.max(12, this.powerBar.max - currentValue);

            this.coin.launchCoin(launchPower / this.powerMultiplier);
            this.powerBar.setValue(this.powerBar.max); // Reset power bar value on touch release

            clearInterval(this.currentInterval);
            this.currentInterval = null;
        }
    }
}