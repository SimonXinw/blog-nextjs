// 定义 GeoIP 数据的类型
import { filteredCountryToLocaleMapping, DEFAULT_LOCALE } from "i18n/index";
interface GeoDataPropsType {
  country: {
    iso_code: string;
  };
  registered_country: {
    iso_code: string;
  };
  continent: {
    code: string;
  };
}

// 欧盟国家列表（示例）
// const euCountries = [
//   'at', // 奥地利（欧盟成员国，使用欧元）
//   'be', // 比利时（欧盟成员国，使用欧元）
//   'cy', // 塞浦路斯（欧盟成员国，使用欧元）
//   'ee', // 爱沙尼亚（欧盟成员国，使用欧元）
//   'fi', // 芬兰（欧盟成员国，使用欧元）
//   'fr', // 法国（欧盟成员国，使用欧元）
//   'de', // 德国（欧盟成员国，使用欧元）
//   'gr', // 希腊（欧盟成员国，使用欧元）
//   'ie', // 爱尔兰（欧盟成员国，使用欧元）
//   'it', // 意大利（欧盟成员国，使用欧元）
//   'lv', // 拉脱维亚（欧盟成员国，使用欧元）
//   'lt', // 立陶宛（欧盟成员国，使用欧元）
//   'lu', // 卢森堡（欧盟成员国，使用欧元）
//   'mt', // 马耳他（欧盟成员国，使用欧元）
//   'nl', // 荷兰（欧盟成员国，使用欧元）
//   'pt', // 葡萄牙（欧盟成员国，使用欧元）
//   'sk', // 斯洛伐克（欧盟成员国，使用欧元）
//   'si', // 斯洛文尼亚（欧盟成员国，使用欧元）
//   'es', // 西班牙（欧盟成员国，使用欧元）
//   'bg', // 保加利亚（欧盟成员国，但未使用欧元）
//   'hr', // 克罗地亚（欧盟成员国，但未使用欧元）
//   'cz', // 捷克（欧盟成员国，但未使用欧元）
//   'dk', // 丹麦（欧盟成员国，但未使用欧元，有货币丹麦克朗）
//   'hu', // 匈牙利（欧盟成员国，但未使用欧元）
//   'pl', // 波兰（欧盟成员国，但未使用欧元）
//   'ro', // 罗马尼亚（欧盟成员国，但未使用欧元）
//   'se', // 瑞典（欧盟成员国，但未使用欧元）
//   'ua', // 乌克兰（非欧盟成员国，但部分地区使用欧元相关情况，可按需调整）
// ];

export const getDbGeoIpLocale = async (ip: string, requestUlr: string) => {
  try {
    let ipAddress = ip;

    if (ipAddress === "::1") ipAddress = "127.0.0.1";

    const fetchGeoIpUrl = `${requestUlr}/api/geoip?ip=${ipAddress}`;

    const startTime = new Date().getTime();

    const response = await fetch(fetchGeoIpUrl, {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to request maxmind DB, Status: ${response?.status} ${response?.statusText}`
      );
    }

    const endTime = new Date().getTime();

    const geoIpRes = await response.json();

    console.log(
      "MiddleWare: ip api request time >>>>>>>",
      endTime - startTime,
      "ms",
      "ip >>",
      ip,
      "fetchGeoIpUrl>>>",
      fetchGeoIpUrl,
      "country code >>>>",
      geoIpRes?.country?.iso_code
    );

    return maxmindConvertIsoToLocale(geoIpRes) || DEFAULT_LOCALE;
  } catch (error) {
    console.warn("Request maxmind Error: >>>>>>>>>>>", error);

    return DEFAULT_LOCALE;
  }
};

/**
 * @MaxMind DB
 *
 */
export function maxmindConvertIsoToLocale(
  geoData: GeoDataPropsType
): string | null {
  if (!geoData) return "";

  const countryCode: string =
    geoData?.country?.iso_code?.toLowerCase() ||
    geoData?.registered_country?.iso_code?.toLowerCase() ||
    "";

  return convertIsoToLocale(countryCode);
}

/**
 * @ipinfo https://api.iplocation.net/?ip=183.14.31.99 的第三方接口
 *
 */
export function iplocationConvertIsoToLocale(geoData: any): string {
  // 提取国家和大陆代码，并确保它们为字符串类型
  let countryCode: string = geoData?.country_code2?.toLowerCase() || null; // 如果不存在，使用空字符串作为默认值

  return convertIsoToLocale(countryCode);
}

export function convertIsoToLocale(
  countryIsoCode: string | undefined | null
): string {
  if (!countryIsoCode) return "cn";

  if (countryIsoCode === "-") countryIsoCode = "cn";

  // 1. 优先匹配国家代码
  if (filteredCountryToLocaleMapping[countryIsoCode]) {
    return filteredCountryToLocaleMapping[countryIsoCode] as string;
  }

  // 2. 如果大陆代码为 `eu` 或国家代码属于欧盟，返回 `eu`
  // if (euCountries.includes(countryIsoCode)) {
  //   return 'eu';
  // }

  // 3. 如果国家代码存在但不在映射表中，返回 `global`
  if (countryIsoCode) {
    return "global";
  }

  // 4. 如果没有国家和大陆信息，返回 `us`（默认值）
  return "cn";
}
