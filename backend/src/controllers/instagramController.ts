import { Request, Response } from "express";
import { InstagramService } from "../services/instagramService";

export class InstagramController {
  private _instagramService: InstagramService;

  constructor() {
    this._instagramService = InstagramService.getInstance();
  }

  public getFollowers = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const result = await this._instagramService.getFollowers(username);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  public getFollowersCount = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const count = await this._instagramService.getFollowersCount(username);
      res.json({ count });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
