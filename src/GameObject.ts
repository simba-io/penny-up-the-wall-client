import * as PIXI from 'pixi.js';
import { Scene } from './Scene';

export class GameObject extends PIXI.Graphics
{
    public name: string = "";

    constructor(name: string = "")
    {
        super();
        
        this.name = name;

        this.interactive = true;
        this.eventMode = 'static';

        this.ontouchstart = this.onTouchDown;
        this.ontouchend = this.onTouchUp;
        this.onmousedown = this.onTouchDown;
        this.onmouseup = this.onTouchUp;
    }

    public setPosition(x: number, y: number): void
    {
        
    }

    public updatePosition(): void
    {
        
    }

    onTouchDown = () =>
    {
        console.log('touch down!');
    }

    onTouchUp = () =>
    {
        console.log('touch up!');
    }
 
}