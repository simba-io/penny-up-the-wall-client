import * as PIXI from 'pixi.js';
import { Scene } from './Scene';

export class GameObject extends PIXI.Graphics
{
    public name: string = "";

    constructor(name: string = "")
    {
        super();
        
        this.name = name;
    }

    public setPosition(x: number, y: number): void
    {
        
    }

    public updatePosition(): void
    {
        
    }

 
}