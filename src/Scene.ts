import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from './main';
import { ActionButton } from './ActionButton';
import { PowerBar } from './PowerBar';

export enum Color
{
    GREEN = 0x00ff00,
    RED = 0xff0000,
    BLUE = 0x0000ff,
    YELLOW = 0xffff00,
    PURPLE = 0xff00ff,
    ORANGE = 0xffa500,
    PINK = 0xffc0cb,
    BROWN = 0xa52a2a,
    GREY = 0x808080,
    WHITE = 0xffffff,
    BLACK = 0x000000,
    TRANSPARENT = 0x00000000,
    GOLD = 0xffd700,
    SILVER = 0xc0c0c0
}

export class Scene extends PIXI.Container
{
    private gameObjects: Record<string, GameObject> = {};

    constructor()
    {
        super();
    }

    async bootstrap(): Promise<void>
    {
        // Placeholder: A centered sprite or graphic to test scaling
        const viewportBorder = new PIXI.Graphics()
            .rect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT)
            .fill({ color: 0xffffff, alpha: 0.1 })
            .stroke({ width: 10, color: 0xff0000 });
        
        this.addChild(viewportBorder);

        // -----------------------------------------------------------------
        // POWER BAR

        const powerBar = new PowerBar(this, 'power-bar');

        this.gameObjects['power-bar'] = powerBar;

        this.setGameObjectPosition('power-bar', 0.07, 0.15);
        // -----------------------------------------------------------------

        // ACTION BUTTON

        const button = new ActionButton(this, powerBar, 'action-button');

        this.gameObjects['action-button'] = button;
        
        this.setGameObjectPosition('action-button', 0.1, 0.85);

        // -----------------------------------------------------------------
    }

    public setGameObjectPosition(id: string, normalisedX: number, normalisedY: number): void
    {
        const gameObject = this.gameObjects[id];

        if (gameObject)
        {
            // this code will position the object based on the normalized coordinates
            gameObject.x = this.denormalise(normalisedX, 0, DESIGN_WIDTH);
            gameObject.y = this.denormalise(normalisedY, 0, DESIGN_HEIGHT);
        }
    }

       /**
 * Converts a normalized value (0 to 1) back to an actual value 
 * based on the provided min and max range.
 * * @param normalisedValue - The value to convert (usually 0.0 to 1.0)
 * @param min - The start of the range (e.g., 0)
 * @param max - The end of the range (e.g., viewport width)
 * @returns The absolute value in pixels/units
 */
    denormalise(normalisedValue: number, min: number, max: number): number
    {
        return min + (max - min) * normalisedValue;
    };
}