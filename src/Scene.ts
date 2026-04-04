import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from './main';

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
        const viewport = new PIXI.Graphics()
            .rect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT)
            .fill({ color: 0xffffff, alpha: 0.1 })
            .stroke({ width: 10, color: 0xff0000 });
        
        this.addChild(viewport);

        const graphics = new GameObject('circle');

        const circle = graphics.circle(0, 0, 100).fill({ color: 0xff0000 }).stroke({ width: 5, color: 0x000000 });

        this.addChild(circle);


        this.gameObjects['circle'] = graphics;

        circle.ontouchstart = this.ontouchstart;
        circle.ontouchend = this.ontouchend;
        circle.onmousedown = this.ontouchstart;
        circle.onmouseup = this.ontouchend;

        
        this.setGameObjectPosition('circle', 0.5, 0.5);
    }

    ontouchstart = () =>
    {
        console.log('touch start!');
    }

    ontouchend = () =>
    {
        console.log('touch end!');
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