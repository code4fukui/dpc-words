import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { fetchBin } from "https://js.sabae.cc/fetchBin.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const url = "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000198757_00008.html";
const baseurl = "https://www.mhlw.go.jp";

const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);
//console.log(html);

const links = dom.querySelectorAll("ul.li-notesB > li");
//console.log(links);
const links2 = links.filter(i => i.querySelector("a")).map(i => ({ text: i.text, url: baseurl + i.querySelector("a").getAttribute("href") }));
//console.log(links2);

const links3 = links2.filter(i => i.text.indexOf("診断群分類（DPC）電子点数表（正式版）") >= 0);
console.log(links3);

await Deno.writeTextFile("data/dpc.csv", CSV.stringify(links3));
for (const link of links3) {
  const fn = link.url.substring(link.url.lastIndexOf("/") + 1);
  const bin = await fetchBin(link.url);
  try {
    await Deno.readFile("data/" + fn);
  } catch (e) {
    await Deno.writeFile("data/" + fn, bin);
    console.log(fn);
  }
}
