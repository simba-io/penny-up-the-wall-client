import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import type { Scene } from "./Scene";
import type { Wall } from "./Wall";
import { DistanceFromWall } from "./DistanceUI";

export class Coin extends PIXI.Sprite {
  public name: string = "";

  public wall!: Wall;

  private velocityY: number = 0;

  private isLaunched: boolean = false;

  private scene!: Scene;

  private distanceUI!: DistanceFromWall;

  constructor(
    parent: Scene,
    distanceUI: DistanceFromWall,
    wall: Wall,
    name: string = "",
  ) {
    super(PIXI.Texture.EMPTY);

    this.name = name;

    this.wall = wall;

    this.scene = parent;

    this.distanceUI = distanceUI;

    this.anchor.set(0.5, 0.5);

    this.scale.set(0.5, 0.5);

    Assets.load("assets/coin.png").then((texture) => {
      this.texture = texture as PIXI.Texture;
    });

    parent.addChild(this);
  }

  public launchCoin(initialPower: number = 24): void {
    if (this.isLaunched) {
      return;
    }

    this.isLaunched = true;

    this.velocityY = -Math.abs(initialPower);

    const ticker = PIXI.Ticker.shared;

    const deceleration = 0.5;

    const restitution = 0.35;

    const stop = () => {
      ticker.remove(update);

      this.isLaunched = false;

      this.velocityY = 0;
    };

    const update = () => {
      const bounds = this.getBounds();

      const wallBounds = this.wall.getBounds();

      const halfHeight = bounds.height * this.anchor.y;

      const nextTop = bounds.top + this.velocityY;

      if (this.velocityY < 0 && nextTop <= wallBounds.bottom) {
        this.y = wallBounds.bottom + halfHeight;

        this.velocityY = Math.abs(this.velocityY) * restitution;
      } else {
        this.y += this.velocityY;
      }

      if (Math.abs(this.velocityY) <= 0.5) {
        stop();

        return;
      }

      if (this.velocityY < 0) {
        this.velocityY += deceleration;

        if (this.velocityY > 0) {
          stop();
        }
      } else {
        this.velocityY -= deceleration;
      }

      const distance = this.scene.distancefromWall(this, this.wall);

      this.distanceUI.updateDistance(distance);
    };

    ticker.add(update);
  }
}
