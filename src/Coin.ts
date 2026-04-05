import * as PIXI from 'pixi.js';
import { Assets } from 'pixi.js';
import { Scene } from './Scene';

export class Coin extends PIXI.Sprite
{
    public name: string = "";

    constructor(parent: Scene, name: string = "")
    {
        super(PIXI.Texture.EMPTY);
        
        this.name = name;

        this.anchor.set(0.5, 0.5);

        Assets.load('assets/pngegg.png').then((texture) =>
        {
            this.texture = texture as PIXI.Texture;
        });

        parent.addChild(this);

        this.scale.set(0.25, 0.25);
    }
}