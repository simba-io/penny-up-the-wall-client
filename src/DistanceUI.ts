import * as PIXI from 'pixi.js';
import { Color, Scene } from './Scene';

export class DistanceFromWall extends PIXI.Graphics
{
    public name: string = "";

    constructor(parent: Scene, name: string = "")
    {
        super();
        
        this.name = name;

        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fill: Color.WHITE,
        });

        const text = new PIXI.Text('Dist: ', textStyle);

        text.anchor.set(0.5, 0.5);

        this.addChild(text);

        parent.addChild(this);
    }

    public updateDistance(distance: number): void
    {
        const text = this.children[0] as PIXI.Text;

        text.text = `Dist: ${distance.toFixed(5)}`;
    }

}