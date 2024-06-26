import { XLSX } from "https://taisukef.github.io/sheetjs-es/es/XLSX.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { HankakuKana } from "https://code4fukui.github.io/mojikiban/HankakuKana.js";
import { parseDay } from "./parseDay.js";

const icds = [];

const list = await CSV.fetchJSON("data/dpc.csv");
for (const item of list) {
  //  診断群分類（DPC）電子点数表（正式版）（令和６年３月21日更新）
  const dt = parseDay(item.text);
  const fn2 = "idc_" + dt.toStringYMD() + ".csv";
  icds.push({ url: fn2, date: dt.toString() });
  try {
    await Deno.readTextFile("data/" + fn2);
    continue;
  } catch (e) {
  }


  const fn = item.url.substring(item.url.lastIndexOf("/") + 1);
  const bin = await Deno.readFile("data/" + fn);
  const ws = XLSX.decode(bin);
  //console.log(ws);
  //console.log(ws.Workbook.Sheets.map(i => i.name));
  /*
 "ＤＰＣ電子点数表の前提条件 ",
  "ダミーコード一覧",
  "１）ＭＤＣ名称",
  "２）分類名称",
  "３）病態等分類",
  "４）ＩＣＤ",
  "５）年齢、出生時体重等",
  "６）手術 ",
  "７）手術・処置等１",
  "８）手術・処置等２",
  "９）定義副傷病名",
  "10－1）重症度等（ＪＣＳ等）",
  "10－2）重症度等（手術等）",
  "10－3）重症度等（重症・軽症）",
  "10－4）重症度等（脳卒中の発症時期等）",
  "11）診断群分類点数表",
  "12）変換テーブル ",
  "13)出来高算定手術等コード ",
  "14）CCPM対応"
  */
  const sh = ws.Sheets["４）ＩＣＤ"];
  const idc = XLSX.toCSV(sh);
  idc.splice(1, 1);
  idc[0] = idc[0].map(i => HankakuKana.toZen(i));
  idc[0][5] = "有効期間開始日";
  idc[0][6] = "有効期間終了日";
  
  await Deno.writeTextFile("data/" + fn2, CSV.encode(idc));
}
icds.sort((a, b) => a.date.localeCompare(b.date)); // sort by old -> new
await Deno.writeTextFile("icd_list.csv", CSV.stringify(icds));
const latest = icds[icds.length - 1].url;
console.log("latest", latest);
await Deno.writeTextFile("icd.csv", await Deno.readTextFile("data/" + latest));
