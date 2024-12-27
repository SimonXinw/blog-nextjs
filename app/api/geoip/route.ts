import maxmind from "maxmind";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// 定义 GeoIP 数据库路径
const ipDbPath: string = path.join(
  process.cwd(),
  "app",
  "api",
  "geoip",
  "geolite2-country.mmdb"
);

// 使用全局变量存储数据库实例
let ipDbInstance: any;

// 加载 GeoIP 数据库实例（只加载一次）
async function loadGeoIPDatabase() {
  if (!ipDbInstance) {
    try {
      ipDbInstance = await maxmind.open(ipDbPath);
    } catch (error) {
      throw new Error(`无法加载 GeoIP 数据库: ${error}`);
    }
  }
  return ipDbInstance;
}

// 转换 IPv6 回环地址
function normalizeIP(ip: string | null) {
  if (ip === "::1") {
    return "127.0.0.1"; // 将 IPv6 回环地址转换为 IPv4 回环地址
  }
  return ip;
}

/**
 * 设置 CORS 响应头
 */
function setCORSHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

/**
 * @handleGeoIp
 * 测试接口: https://xxx.com/api/geoip?ip=207.148.80.179
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ip = normalizeIP(searchParams.get("ip")) || "127.0.0.1"; // 默认 IP

  try {
    // 加载并缓存 GeoIP 数据库实例
    const ipDb = await loadGeoIPDatabase();

    // 查询 IP 信息
    const ipInfo = ipDb?.get(ip);

    // 返回成功响应并设置 CORS 头
    const response = NextResponse.json(ipInfo, { status: 200 });
    return setCORSHeaders(response);
  } catch (error) {
    // 返回错误响应并设置 CORS 头
    const response = NextResponse.json(
      {
        code: 500,
        message: `查询 geoip 数据库发生错误. IP: ${ip}. 错误信息: ${error}`,
      },
      { status: 500 }
    );
    return setCORSHeaders(response);
  }
}

/**
 * 处理 OPTIONS 请求以支持 CORS 预检
 */
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCORSHeaders(response);
}
