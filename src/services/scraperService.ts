import puppeteer from 'puppeteer';
import { Stream } from '../types';

export class StreamScraper {
  private browser: any;
  
  async initialize() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async scrapeStreams(matchId: string, url: string): Promise<Stream[]> {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      const streams = await page.evaluate(() => {
        const streamElements = document.querySelectorAll('.stream-container');
        return Array.from(streamElements).map(element => ({
          provider: element.querySelector('.provider')?.textContent || '',
          channel: element.querySelector('.channel')?.textContent || '',
          language: element.querySelector('.language')?.textContent || 'English',
          quality: element.querySelector('.quality')?.textContent || 'HD',
          ads: parseInt(element.querySelector('.ads')?.textContent || '1'),
          url: element.querySelector('a')?.href || ''
        }));
      });

      return streams;
    } catch (error) {
      console.error(`Failed to scrape streams for match ${matchId}:`, error);
      return [];
    } finally {
      await page.close();
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}