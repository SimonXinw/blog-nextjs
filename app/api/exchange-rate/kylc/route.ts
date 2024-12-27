import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

// 处理 GET 请求
export async function GET(req: NextRequest) {
  try {
    // 请求指定网址
    const url = "https://www.kylc.com/bank/rmbfx.html?ccy=usd";
    const response = await axios.get(url, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        cookie:
          "_gid=GA1.2.986865695.1735112282; Hm_lvt_6f94dd9c61b079712310b58506cc59a5=1735016968,1735176854; HMACCOUNT=95059E8A716AD53F; Hm_lpvt_6f94dd9c61b079712310b58506cc59a5=1735276479; _ga_BDB5K4EVH8=GS1.1.1735276479.8.0.1735276479.0.0.0; _ga=GA1.1.1875763354.1735016969; __gads=ID=e5b86ec27147f046:T=1735016969:RT=1735276479:S=ALNI_Mafnqy-uYpJnf4VwerfHPOHo_uDbw; __gpi=UID=00000fb53a47137e:T=1735016969:RT=1735276479:S=ALNI_MZkZPAL6yqJMdT2xSZ6LcxKSNW2Ww; __eoi=ID=d6ace0474e14b49d:T=1735016969:RT=1735276479:S=AA-Afja1hReR-mK57B9ctjzNFUQl; FCNEC=%5B%5B%22AKsRol8IuBkuA06aOuA9NsWlbbXZbb1-yvsAo18fmDNXF8Cs92po-pkXPA1qWeqG506Bsmgzr2I_i-Ocvl1thBS-dbrveaOaLPwqaDGRmjmLimguod0mRT-rJPuAzsfTJFxZCSuBt_B-Y9beuIQof7R1_bnftpK52w%3D%3D%22%5D%5D",
      },
    });
    const html = response.data;

    // 使用 cheerio 加载 HTML
    const $ = cheerio.load(html);
    const rows = $(".bank_rate_table tbody tr");
    const data: Array<{
      name: string;
      currency: string;
      sellPrice: number;
      buyPrice: number;
    }> = [];

    // 遍历表格行，提取数据
    rows.each((index, element) => {
      const name = $(element).find("td:first-child").text().trim();
      const buyPrice = parseFloat(
        $(element)
          .find("td:nth-child(2)")
          .text()
          .trim()
          .replace(/[^\d.]/g, "")
      );
      const sellPrice = parseFloat(
        $(element)
          .find("td:nth-child(4)")
          .text()
          .trim()
          .replace(/[^\d.]/g, "")
      );

      data.push({
        name,
        currency: "USD",
        sellPrice,
        buyPrice,
      });
    });

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
