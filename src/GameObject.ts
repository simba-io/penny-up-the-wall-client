import * as PIXI from 'pixi.js';

export class GameObject extends PIXI.Graphics
{
    public name: string = "";

    constructor(name: string = "")
    {
        super();
        
        this.name = name;
    }
}