import { ZenkakuAlpha } from "https://code4fukui.github.io/mojikiban/ZenkakuAlpha.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { wareki2year } from "https://code4fukui.github.io/day-es/WAREKI.js";

export const parseDay = (s) => {
  if (!s) return null;
  s = ZenkakuAlpha.toHan(s);
  const n = s.match(new RegExp(`令和(\\d+|元)年(\\d+)月(\\d+)日`));
  if (!n) return null;
  const m = s.indexOf("年", n.index);
  const wa = "令和";
  const se = (n[2] == "元" ? wareki2year(wa + "1年") : wareki2year(n[0])) + "年";
  const res = new Day(se, n[2], n[3]);
  return res;
};
