import * as PIXI from 'pixi.js';
import { Color, Scene } from './Scene';

export class PowerBar extends PIXI.Graphics
{
    public name: string = "";

    public value: number = 0;
    public min: number = 0;
    public max: number = 600;

    private cover: PIXI.Graphics;

    constructor(parent: Scene, name: string = "")
    {
        super();
        
        this.name = name;

        this.value = this.max;

        this.beginFill(Color.GREEN).drawRect(0, 0, 100, this.max).endFill();

        parent.addChild(this);

        const _cover = new PIXI.Graphics();

        _cover.beginFill(Color.GREY).drawRect(0, 0, 100, this.max).endFill();

        this.addChild(_cover);

        this.cover = _cover;
    }

    public setValue(newValue: number): void
    {
        this.value = newValue;

        this.cover.scale.y = this.value / this.max;
    }

    public getValue(): number
    {
        return this.value;
    }
}