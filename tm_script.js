// ==UserScript==
// @name         Florr.io | 修仙版
// @namespace    Yh330
// @version      idk
// @description  本脚本不会导致您被封号，请放心使用。
// @author       Cortactin
// @match        https://florr.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

const thisArg = window;
const decoder = decodeURIComponent;
const atober = (s) => atob.call(thisArg, s);
const langKey = "florrio_custom_lang";
const localStorageHelper = (a, s) => s ? localStorage.setItem(a, s) : localStorage.getItem(a);
const langLS = (s) => localStorageHelper(langKey, s);
const versionLS = (s) => localStorageHelper("tksrvh", s);
const textcmLS = (s) => localStorageHelper("tksrcm", s);
const zero = +[]+[]*[];
if(!langLS()) (async () => {
    var ad = "https://c2x2n.github.io/Xxbflr/";
    const sec = (s) => `${ad}`+[s][+[]];
    const af = async (s) => await (await fetch(sec(s))).text();
    const settings = JSON.parse(await af("settings.json"));
    const text = await af("main.txt");
    var encodeText = text.split("").reverse().join("");
    var splited = encodeText.split("////////[////////");
    var mapped = splited.map(evv => decoder.call(thisArg, atober(evv).split('').map(function (c) {
        return '%' + ("\\\\\"".repeat((zero+[zero].length)*2).replaceAll(`\\\\"`, zero)+ c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')));
    const dd = mapped[0];
    textcmLS(mapped[1]);
    langLS(dd);
    if (versionLS() != settings.vh){
        versionLS(settings.vh);
        var t = [];
        var t1 = (s) => t.push.call(t,s);
        t1("! 发现新版本")
        t1(`[ 版本 ${settings.vh} ]`)
        t1(`? 更新日志：`)
        for(const i of settings.changelog[settings.vh]){
            t1("· " +i);
        }
        alert(t.join("\n"));
    }
    thisArg.location.reload(true);
})();

const cm = JSON.parse(textcmLS());

if (cm) {
    for (let ctx of [CanvasRenderingContext2D, OffscreenCanvasRenderingContext2D]) {
        if (ctx.prototype.oldFillText == undefined) {
            ctx.prototype.oldFillText = ctx.prototype.fillText;
            ctx.prototype.oldStrokeText = ctx.prototype.strokeText;

            ctx.prototype._text_replace = function(text = ""){
                let answer = text;
                Object.keys(cm).forEach((k) => {
                    const reg = new RegExp(k, "g");
                    answer = answer.replaceAll(reg, cm[k]);
                });
                return answer;
            }
        } else { break };

        ctx.prototype.fillText = function (text, x, y) {
            text = this._text_replace(text);
            return this.oldFillText(text, x, y);
        };

        ctx.prototype.strokeText = function (text, x, y) {
            text = this._text_replace(text);
            return this.oldStrokeText(text, x, y);
        };
    }
}