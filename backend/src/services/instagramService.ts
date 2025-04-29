import * as puppeteer from "puppeteer";
import { sleep } from "../utils/helpers";

export class InstagramService {
  private static instance: InstagramService;
  private browser: puppeteer.Browser | null = null;

  private constructor() {}

  public static getInstance(): InstagramService {
    if (!InstagramService.instance) {
      InstagramService.instance = new InstagramService();
    }
    return InstagramService.instance;
  }

  private async initializeBrowser() {
    if (!this.browser) {
      try {
        // Configuration simplifiée pour éviter les erreurs de lancement
        this.browser = await puppeteer.launch({
          headless: false,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--window-size=1920x1080",
          ],
        });

        console.log("Navigateur lancé avec succès");
      } catch (error) {
        console.error("Erreur lors du lancement du navigateur:", error);
        throw new Error(
          "Impossible de lancer le navigateur. Vérifiez que Chrome est installé."
        );
      }
    }
  }

  public async getFollowers(
    username: string
  ): Promise<{ count: number; followers: string[] }> {
    await this.initializeBrowser();
    if (!this.browser) throw new Error("Browser not initialized");

    const page = await this.browser.newPage();
    let followers: string[] = [];

    try {
      // Configurer les headers pour ressembler à un vrai navigateur
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );

      // Accéder à la page des followers
      const response = await page.goto(
        `https://www.instagram.com/${username}/followers/`,
        {
          waitUntil: "networkidle0",
          timeout: 30000,
        }
      );

      console.log("Page chargée, status:", response?.status());

      // Vérifier si la page existe
      if (!response || response.status() === 404) {
        throw new Error(`L'utilisateur ${username} n'existe pas sur Instagram`);
      }

      // Prendre une capture d'écran pour debug
      await page.screenshot({ path: "debug-screenshot.png" });

      // Vérifier le contenu de la page
      const pageContent = await page.content();
      console.log("Contenu de la page:", pageContent.substring(0, 500));

      // Vérifier la structure de la page
      const pageStructure = await page.evaluate(() => {
        const dialogs = document.querySelectorAll('div[role="dialog"]');
        console.log("Nombre de dialogs trouvés:", dialogs.length);
        return Array.from(dialogs).map((dialog) => ({
          className: dialog.className,
          style: dialog.getAttribute("style"),
          children: dialog.children.length,
        }));
      });
      console.log(
        "Structure des dialogs:",
        JSON.stringify(pageStructure, null, 2)
      );

      // Vérifier si nous sommes sur la page de connexion
      const isLoginPage = await page.evaluate(() => {
        return (
          document.title.includes("Login") ||
          document.querySelector("input[name='username']") !== null
        );
      });

      if (isLoginPage) {
        throw new Error(
          "Instagram demande une authentification. Le scraping est bloqué."
        );
      }

      // Attendre que la liste se charge avec un sélecteur plus spécifique
      console.log("Attente du chargement de la liste...");

      // Attendre que le dialogue soit visible
      await page.waitForSelector('div[role="dialog"]', { timeout: 25000 });

      // Attendre un peu plus pour le chargement initial
      await sleep(5000);

      // Vérifier si la liste est vide
      const isListEmpty = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        return !dialog || dialog.textContent?.includes("Aucun abonné") || false;
      });

      if (isListEmpty) {
        throw new Error(
          `La liste des followers de ${username} est vide ou inaccessible.`
        );
      }

      // Attendre que les éléments de la liste soient chargés avec un sélecteur plus générique
      await page.waitForSelector('div[role="dialog"] div[style*="height"]', {
        timeout: 25000,
      });

      // Attendre encore un peu pour s'assurer que tout est chargé
      await sleep(3000);

      // Fonction pour extraire les noms d'utilisateur avec un sélecteur plus générique
      const extractUsernames = async () => {
        return await page.evaluate(() => {
          const followers = document.querySelectorAll(
            'div[role="dialog"] div[style*="height"] a[role="link"]'
          );
          console.log("Nombre d'éléments trouvés:", followers.length);
          return Array.from(followers)
            .map((follower) => {
              const usernameElement = follower.querySelector(
                'span[class*="_ap3a"]'
              );
              const nameElement = follower.querySelector(
                'span[class*="xlyipyv"]'
              );
              const followButton = follower.querySelector(
                'button[class*="_acan"]'
              );

              return {
                username: usernameElement?.textContent || "",
                fullName: nameElement?.textContent || "",
                isFollowing:
                  followButton?.textContent?.includes("Suivi") || false,
              };
            })
            .filter((user) => user.username !== "");
        });
      };

      // Scroll jusqu'à la fin de la liste
      let previousHeight = 0;
      let currentHeight = await page.evaluate(
        () => document.querySelector('div[role="dialog"]')?.scrollHeight || 0
      );
      let scrollAttempts = 0;
      const maxScrollAttempts = 50;

      while (
        previousHeight !== currentHeight &&
        scrollAttempts < maxScrollAttempts
      ) {
        previousHeight = currentHeight;
        scrollAttempts++;

        // Scroll vers le bas
        await page.evaluate(() => {
          const dialog = document.querySelector('div[role="dialog"]');
          if (dialog) {
            dialog.scrollTop = dialog.scrollHeight;
          }
        });

        // Attendre que de nouveaux éléments se chargent
        await sleep(3000);

        // Mettre à jour la hauteur actuelle
        currentHeight = await page.evaluate(
          () => document.querySelector('div[role="dialog"]')?.scrollHeight || 0
        );

        // Extraire les nouveaux noms d'utilisateur
        const newUsernames = await extractUsernames();
        console.log("Nouveaux usernames trouvés:", newUsernames.length);
        followers.push(...newUsernames.map((user) => user.username));

        // Éliminer les doublons
        followers = [...new Set(followers)];
        console.log("Nombre total de followers:", followers.length);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des followers:", error);
      throw error;
    } finally {
      await page.close();
    }

    return {
      count: followers.length,
      followers,
    };
  }

  public async getFollowersCount(username: string): Promise<number> {
    await this.initializeBrowser();
    if (!this.browser) throw new Error("Browser not initialized");

    const page = await this.browser.newPage();

    try {
      // Configurer les headers pour ressembler à un vrai navigateur
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
      );

      // Ajouter des headers supplémentaires pour éviter la détection
      await page.setExtraHTTPHeaders({
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
      });

      // Accéder à la page de profil
      console.log(`Accès à la page de profil de ${username}...`);
      const response = await page.goto(
        `https://www.instagram.com/${username}/`,
        {
          waitUntil: "networkidle2",
          timeout: 30000,
        }
      );

      if (!response || response.status() === 404) {
        throw new Error(`L'utilisateur ${username} n'existe pas sur Instagram`);
      }

      // Voir si nous sommes redirigés vers la page de connexion
      const currentUrl = page.url();
      console.log("URL actuelle:", currentUrl);

      if (currentUrl.includes("/accounts/login")) {
        console.log("Redirection vers la page de connexion détectée");

        // Essayer d'extraire les informations même sur la page de connexion
        // Instagram affiche souvent le nombre de followers même sur cette page
        try {
          // Attendre le chargement du contenu minimal
          await page.waitForSelector("body", { timeout: 5000 });

          // Extraire les méta-données
          const metaData = await page.evaluate(() => {
            const metaTags = document.querySelectorAll('meta[property^="og:"]');
            const data: Record<string, string> = {};

            metaTags.forEach((tag) => {
              const property = tag.getAttribute("property");
              const content = tag.getAttribute("content");
              if (property && content) {
                data[property] = content;
              }
            });

            return data;
          });

          console.log("Méta-données:", metaData);

          // Vérifier si les méta-données contiennent le nombre de followers
          if (metaData["og:description"]) {
            const description = metaData["og:description"];
            const followerMatch = description.match(
              /(\d+(?:,\d+)*)\s+followers/i
            );

            if (followerMatch && followerMatch[1]) {
              const followersStr = followerMatch[1].replace(/,/g, "");
              return parseInt(followersStr, 10);
            }
          }
        } catch (metaError) {
          console.error(
            "Erreur lors de l'extraction des méta-données:",
            metaError
          );
        }

        throw new Error(
          "L'accès aux données nécessite une connexion Instagram"
        );
      }

      console.log("Attente du chargement des statistiques...");
      // Attendre que les statistiques soient chargées (sélecteur plus générique)
      await page.waitForSelector("header section ul li", { timeout: 10000 });

      // Extraire le nombre de followers avec un sélecteur plus robuste
      const followersCount = await page.evaluate(() => {
        // Sélectionner tous les éléments li dans la section d'en-tête
        const statElements = document.querySelectorAll("header section ul li");

        // Parcourir les éléments pour trouver celui qui contient "followers" ou "abonnés"
        for (const element of Array.from(statElements)) {
          const text = element.textContent || "";
          if (text.includes("followers") || text.includes("abonnés")) {
            // Extraire juste le nombre
            const countMatch = text.match(/(\d+(?:[.,]\d+)*[km]?)/i);
            if (countMatch && countMatch[1]) {
              let count = countMatch[1].toLowerCase();

              // Convertir k/m en valeurs numériques
              if (count.endsWith("k")) {
                return Math.round(parseFloat(count.replace("k", "")) * 1000);
              } else if (count.endsWith("m")) {
                return Math.round(parseFloat(count.replace("m", "")) * 1000000);
              } else {
                return parseInt(count.replace(/[.,]/g, ""), 10);
              }
            }
          }
        }

        // Fallback: essayer avec le sélecteur de classe spécifique
        const stats = document.querySelectorAll('span[class*="_ac2a"]');
        if (stats.length >= 2) {
          const followersText = stats[1].textContent;
          if (followersText) {
            return parseInt(followersText.replace(/[.,]/g, ""), 10);
          }
        }

        return 0;
      });

      console.log(`Nombre de followers trouvé: ${followersCount}`);
      return followersCount;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de followers:",
        error
      );
      throw error;
    } finally {
      await page.close();
    }
  }

  public async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
