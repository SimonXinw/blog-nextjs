import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright"; // 导入 Playwright

// 处理 GET 请求
export async function GET(req: NextRequest) {
  try {
    // 启动浏览器
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // 请求指定网址
    const url = "https://www.kylc.com/bank/rmbfx.html?ccy=usd";
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // 等待表格加载，确保页面渲染完成
    await page.waitForSelector(".bank_rate_table tbody tr");

    // 获取页面中的汇率数据
    const data = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll(".bank_rate_table tbody tr")
      );
      return rows.map((row: HTMLElement) => {
        const name =
          row.querySelector("td:first-child")?.textContent?.trim() || "";
        const buyPrice = parseFloat(
          row
            .querySelector("td:nth-child(2)")
            ?.textContent?.trim()
            .replace(/[^\d.]/g, "") || "0"
        );
        const sellPrice = parseFloat(
          row
            .querySelector("td:nth-child(4)")
            ?.textContent?.trim()
            .replace(/[^\d.]/g, "") || "0"
        );

        return {
          name,
          currency: "USD",
          sellPrice,
          buyPrice,
        };
      });
    });

    // 关闭浏览器
    await browser.close();

    // 返回成功响应并设置 CORS 头
    const finalResponse = NextResponse.json(data, { status: 200 });
    finalResponse.headers.set("Access-Control-Allow-Origin", "*");
    finalResponse.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    finalResponse.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return finalResponse;
  } catch (error) {
    // 返回错误响应并设置 CORS 头
    const response = NextResponse.json(
      {
        code: 500,
        message: `查询汇率数据发生错误: ${error}`,
      },
      { status: 500 }
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }
}

// 处理 OPTIONS 请求以支持 CORS 预检
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
