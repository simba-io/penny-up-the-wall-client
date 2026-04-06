import * as PIXI from "pixi.js";
import { Color, Scene } from "./Scene";
import { DESIGN_WIDTH } from "./main";

export class Wall extends PIXI.Graphics
{
    public name: string = "";

    constructor(parent: Scene, name: string = "")
    {
        super();
        
        this.name = name;

        this.beginFill(Color.ORANGE).drawRect(0, 0, DESIGN_WIDTH, 40).endFill();

        parent.addChild(this);
    }
}