// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import xCrawl from 'x-crawl';
import dayjs from 'dayjs'

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // 判空
  if (req.method !== 'GET' && req.method !== 'get') return;

  // 2.Create a crawler instance
  const myXCrawl = xCrawl({
    maxRetry: 3,
    intervalTime: { max: 3000, min: 2000 },
  });

  // 3.Set the crawling task
  /*
  Call the startPolling API to start the polling function,
  and the callback function will be called every other day
*/
  myXCrawl.startPolling({ d: 1 }, async (count, stopPolling) => {
    // Call crawlPage API to crawl Page
    const result = await myXCrawl.crawlPage({
      targets: [
        'https://www.airbnb.cn/s/experiences',
        'https://www.airbnb.cn/s/plus_homes',
      ],
      viewport: { width: 1920, height: 1080 },
    });
    // Store the image URL to targets
    const targets = [];
    const elSelectorMap = ['._fig15y', '._aov0j6'];
    for (const item of result) {
      const { id } = item;
      const { page } = item.data;

      // Wait for the page to load
      await new Promise((r) => setTimeout(r, 300));

      // Gets the URL of the page image
      const urls = await page!.$$eval(
        `${elSelectorMap[id - 1]} img`,
        (imgEls) => {
          return imgEls.map((item) => item.src);
        }
      );
      targets.push(...urls);

      // Close page
      page.close();
    }

    // Call the crawlFile API to crawl pictures
    myXCrawl.crawlFile({ targets, storeDir: `./public/craw/images/${dayjs().format('YYYY-MM-DD')}` });

    res.status(200).json(targets || []);
  });
}
