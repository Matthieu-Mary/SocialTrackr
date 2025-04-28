import { Request, Response } from "express";
import { InstagramService } from "../services/instagramService";

export class InstagramController {
  private instagramService: InstagramService;

  constructor() {
    this.instagramService = InstagramService.getInstance();
  }

  public getFollowers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;

      if (!username) {
        res.status(400).json({ error: "Le nom d'utilisateur est requis" });
        return;
      }

      const followers = await this.instagramService.getFollowers(username);
      res.status(200).json({ followers });
    } catch (error) {
      console.error("Erreur dans le contrôleur:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des followers" });
    }
  };
}
