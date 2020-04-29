const {
  performance
} = require('perf_hooks');
const {
  promises: fss
} = require('fs');

const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');
const express = require('express');
var fs = require("fs");
var captchaholder = [];
var next_ready = true;
var captchaWindow = null;

const crypto = require("crypto");
let processing = false
app.allowRendererProcessReuse = true
const headers = {
  Accept: "application/json",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  Host: "www.supremenewyork.com",
  Pragma: "no-cache",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36",
  "X-Requested-With": "XMLHttpRequest",
  Origin: "https://www.supremenewyork.com"
};

function createCaptchaWin(pageUrl, sitekey, callback) {
  if (next_ready == false) {
    if (captchaWindow == null) {
      rest();
      return;
    }
    var a_aA = setInterval(function () {
      if (next_ready == true) {
        clearInterval(a_aA);
        rest();
      }
    }, 500)
  } else {
    rest()
  }

  function rest() {
    next_ready = false;
    if (captchaWindow == null) {
      captchaWindow = new BrowserWindow({
        width: 850,
        height: 800,
        show: true,
        frame: false,
        webPreferences: {
          nodeIntegration: true
        }
      });
      captchaWindow.setResizable(false);
      captchaWindow.webContents.session.setProxy({
        proxyRules: `http://127.0.0.1:${parseInt(4242)}`,
        pacScript: '',
        proxyBypassRules: '.google.com, .gstatic.com .fonts.googleapis.com'
      });
      captchaWindow.loadURL(`${pageUrl}?sitekey=${sitekey}`);
      next_ready = true;
    }
    if (pageUrl != '') {

      captchaWindow.loadURL(`${pageUrl}?sitekey=${sitekey}`);
    }

    ipcMain.once(`failed-captcha`, () => {
      next_ready = true;
      callback('fail');
      return
    });
    captchaWindow.once('close', function () {
      captchaWindow = null;
      next_ready = true;
      callback('closed');
      return;
    })
    ipcMain.once(`submit-captcha`, (event, arg) => {
      next_ready = true;
      captchaWindow.loadURL('http://127.0.0.1:9393/waitcap')
      callback(arg.value);
      return;

    });
  }
}

var authwin
var mainwin

try {
  app.on('ready', () => {


    authwin = new BrowserWindow({
      frame: false,
      width: 1366,
      height: 768,
      show: true,
      webPreferences: {
        nodeIntegration: true
      }
    });
    authwin.loadURL('http://localhost:9393/main')
    mainwin = new BrowserWindow({
      frame: false,
      width: 1366,
      height: 768,
      show: false,
      resizable: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    mainwin.loadURL("http://localhost:9393")


    //startCaptchaViewServer();
    //startCaptchaHarvestServer();
  });

  app.on('window-all-closed', () => {
    // TODO: Do something here?
  });
} catch (e) {
  throw e;
}
//const express = require("express");
const path = require("path");
const app2 = express();
var loggedin = false;
const fkill = require("fkill");
var fs = require("fs");
var tough = require('tough-cookie');
const DiscordRPC = require('discord-rpc');
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const rpc = new DiscordRPC.Client({
  transport: 'ipc'
});
rpc.login({
  clientId: '650895288642437130'
}).catch(console.error);
rpc.on('ready', () => {
  console.log(`Starting Discord Status...`);
  rpc.setActivity({
    details: `Playing AliasPreme`,
    state: `AliasPreme Private Testing`,
    startTimestamp: new Date(),
    largeImageKey: 'a1971027986_10',
    largeImageText: 'a1971027986_10',
    instance: false,
  });
});

var bodyParser = require("body-parser");
const port = process.env.PORT || "9393";
app2.set("views", path.join(__dirname, "views"));
app2.set("view engine", "pug");
app2.use(express.static(path.join(__dirname, "public")));
app2.use(bodyParser.urlencoded({
  extended: true
}));
const request = require("request-promise");
const cheerio = require("cheerio");
var singlecheckout = false;
const Discord = require("discord.js");



// Create a new instance of ezHarvest

function renameKey(obj, old_key, new_key) {
  // check if old key = new key
  if (old_key !== new_key) {
    Object.defineProperty(
      obj,
      new_key, // modify old key
      // fetch description from object
      Object.getOwnPropertyDescriptor(obj, old_key)
    );
    delete obj[old_key]; // delete old key
  }
}
var initt = false;
var userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) app2leWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36";

function grabprox() {
  var proxraw = fs.readFileSync("proxies.txt", "utf8");
  var proxies = proxraw.split(/\r?\n/);
  var item = proxies[Math.floor(Math.random() * proxies.length)];
  if (item.split(":")[2]) {
    var proxyUrl =
      "http://" +
      item.split(":")[2] +
      ":" +
      item.split(":")[3] +
      "@" +
      item.split(":")[0] +
      ":" +
      item.split(":")[1];
    return proxyUrl;
  } else if (item != "") {
    return "http://" + item;
  } else {
    return "";
  }
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// o.addArguments('start-fullscreen');
//o.addArguments('headless'); // running test on visual chrome browser
if (initt == false) {
  process.setMaxListeners(0);

  function checkForFile(fileName, callback) {
    fs.exists(fileName, function (exists) {
      if (exists) {
        callback();
      } else {
        fs.writeFileSync(fileName, '[]', {
          flag: 'wx'
        });
        fs.writeFileSync('proxies.txt', '', {
          flag: 'wx'
        });
        fs.writeFileSync('delay.txt', '', {
          flag: 'wx'
        });

        fs.writeFileSync('restock.txt', '', {
          flag: 'wx'
        });
        fs.writeFileSync('helper.json', '{"profiles":[]}', {
          flag: 'wx'
        });
        fs.mkdirSync('tasks');
      }
    });
  }


  checkForFile('tasks.json', function () {});
  let rawdata = fs.readFileSync(`tasks.json`);
  let tasksobj = JSON.parse(rawdata);
  for (var i = 0; i < tasksobj.length; i++) {
    if (tasksobj[i]) {
      var actual = JSON.parse(fs.readFileSync(`tasks/task${tasksobj[i].sid}.json`));
      actual.status = "Stopped";
      fs.writeFileSync(`tasks/task${tasksobj[i].sid}.json`, JSON.stringify(actual));
    }
  }
  initt = true;
}
const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

app2.use(
  bodyParser.urlencoded({
    extended: false
  })
);

async function supcheckout(config2) {
  let running = true
  var _ticket = '';
  var proxprox = grabprox();
  var matchholder = [];
  let rawdata = fs.readFileSync("helper.json");
  let profobj1 = JSON.parse(rawdata);
  var profobj;

  function getObj() {
    return JSON.parse(fs.readFileSync(`tasks/task${config2.id}.json`));
  }
  var curobj = getObj()
  if (curobj.status.toLowerCase() == "stopped") {
    return;
  }
  curobj.status = "Starting";
  let data = JSON.stringify(curobj);
  fs.writeFileSync(`tasks/task${config2.id}.json`, data)
  curobj = getObj()
  for (var i = 0; i < profobj1.profiles.length; i++) {
    if (profobj1.profiles[i]) {
      if (profobj1.profiles[i].profname.toLowerCase() == curobj.profile.toLowerCase()) {
        profobj = profobj1.profiles[i];
      }
    }
  }
  var config = {
    fname: profobj.fname,
    lname: profobj.lname,
    addr1: profobj.addr1,
    addr2: profobj.addr2,
    city: profobj.city,
    state: profobj.state,
    country: profobj.country,
    phone: profobj.phone,
    zip: profobj.zip,
    ccnum: profobj.ccnum,
    ccexp: profobj.ccexp,
    ccv: profobj.ccv,
    cch: profobj.cch,
    email: profobj.email,
    hook: profobj.hook
  };
  var keywordarr = curobj.keywords.split('>')[0].split(",");
  var colorpls = curobj.keywords.split('>')[1]
  var poskey = [];
  var negkey = [];
  for (var x = 0; x < keywordarr.length; x++) {
    if (keywordarr[x].includes("+")) {
      poskey.push(keywordarr[x].replace("+", ""));
    } else if (keywordarr[x].includes("-")) {
      negkey.push(keywordarr[x].replace("-", ""));
    }
  }
  const sizee = curobj.size;

  var start = new Date().getTime();
  const items = {
    url: "https://www.supremenewyork.com/shop.json",
    method: "GET",
    headers: headers,
    agentOptions: {
      secureProtocol: "TLSv1_2_method"
    },
    gzip: true,
    json: true,
    proxy: proxprox
  };
  let resp = await request(items);
  resp = resp["products_and_categories"];
  const newCategory = resp["new"]
  let matcheditem = null
  for (let x = 0; x < newCategory.length; x++) {
    let item = newCategory[x]
    let matches = 0
    for (var i = 0; i < poskey.length; i++) {
      if (item.name.toLowerCase().includes(poskey[i].toLowerCase())) {
        matches++
      }
    }
    if (matches == poskey.length) {
      matcheditem = item
    }
  }
  if(matcheditem == null)
  {
    curobj = getObj();
    if (curobj) {
      if (curobj.id == config2.id) {
        if (curobj.status.toLowerCase() == "stopped") {
          return;
        }
        curobj.status =
          "Waiting for Item";
        let data = JSON.stringify(curobj);
        fs.writeFileSync(`tasks/task${config2.id}.json`, data)
        curobj = getObj();
      }
    }
    setTimeout(()=>{
      supcheckout(config2)
    },parseInt(fs.readFileSync('restock.txt', 'utf8')))
    
    return;
  }
  const itemId = matcheditem.id;
  Item(itemId)
  async function Item(id) {
    const opts = {
      url: `https://www.supremenewyork.com/shop/${id}.json`,
      method: "GET",
      headers: headers,
      agentOptions: {
        secureProtocol: "TLSv1_2_method"
      },
      gzip: true,
      json: true
    };


    let resp = await request(opts);
    resp = resp.styles;
    let desiredStyle

    if (colorpls.toLowerCase() == 'any') {
      desiredStyle = resp[0]
    } else {
      desiredStyle = resp.find((style => style.name.toLowerCase().includes(colorpls.toLowerCase())));
    }
    let desiredSize
    if (sizee.toLowerCase() == 'any') {
      desiredSize = desiredStyle.sizes[0]
    } else {
      desiredSize = desiredStyle.sizes.find((size => size.name.toLowerCase().includes(sizee.toLowerCase())));
    }
    const styleId = desiredStyle.id;
    const sizeId = desiredSize.id;
    addToCart(id, styleId, sizeId)
  }


  async function addToCart(postUrl, style, size) {
    console.log(postUrl, style, size)
    curobj = getObj();
    if (curobj) {
      if (curobj.id == config2.id) {
        if (curobj.status.toLowerCase() == "stopped") {
          return;
        }
        curobj.status =
          "Adding to Cart";
        let data = JSON.stringify(curobj);
        fs.writeFileSync(`tasks/task${config2.id}.json`, data)
        curobj = getObj();
      }
    }

    let cookiejar = request.jar();
    cookiejar.setCookie('lastVisitedFragment=', 'https://www.supremenewyork.com/')

    var document = {
      get cookie() {
        if (cookiejar != undefined) {
          let c = cookiejar._jar.getCookieStringSync('https://www.supremenewyork.com');
          return c;
        } else return 'lastVisitedFragment=';
      },

      set cookie(value) {
        if (cookiejar != undefined) {
          cookiejar._jar.setCookie(value, 'https://www.supremenewyork.com', (error, cookie) => {
            if (error) {
              throw error;
            }
          });
          _ticket = value
        }
      }
    };

    var navigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
    };

    var window = {
      crypto: {
        getRandomValues: crypto.randomFillSync
      },
      __wasmExecute() {}
    }

    var outputBuf = "";

    var global = {
      Uint8Array,
      window,
      document,
      navigator,
      fs: {
        constants: {
          O_WRONLY: -1,
          O_RDWR: -1,
          O_CREAT: -1,
          O_TRUNC: -1,
          O_APPEND: -1,
          O_EXCL: -1
        },
        writeSync(fd, buf) {
          outputBuf += decoder.decode(buf);
          const nl = outputBuf.lastIndexOf("\n");
          if (nl != -1) {
            outputBuf = outputBuf.substr(nl + 1);
          }
          return buf.length;
        },
        write(fd, buf, offset, length, position, callback) {
          if (offset !== 0 || length !== buf.length || position !== null) {
            callback(enosys());
            return;
          }
          const n = this.writeSync(fd, buf);
          callback(null, n);
        },
        open(path, flags, mode, callback) {
          callback(enosys());
        },
        fsync(fd, callback) {
          callback(null);
        },
      }
    }

    const enosys = () => {
      const err = new Error("not implemented");
      err.code = "ENOSYS";
      return err;
    };

    var b = new TextEncoder("utf-8"),
      e = new TextDecoder("utf-8"),
      g = [];

    class Go {
      constructor() {
        this.running = true
        var a = this;
        a._exitPromise = new Promise((resolve) => {
          a._resolveExitPromise = resolve;
        });
        a._pendingEvent = null;
        a._scheduledTimeouts = new Map();
        a._nextCallbackTimeoutID = 1;

        var c = function () {
            return new DataView(a._inst.exports.memory.buffer)
          },
          f = function (b) {
            var d = c().getFloat64(b, !0);
            if (0 !== d) {
              if (!isNaN(d)) return d;
              b = c().getUint32(b, !0);
              return a._values[b]
            }
          },
          d = function (b, d) {
            if ("number" === typeof d) isNaN(d) ? (c().setUint32(b + 4, 2146959360, !0), c().setUint32(b, 0, !0)) : 0 === d ? (c().setUint32(b + 4, 2146959360, !0), c().setUint32(b, 1, !0)) : c().setFloat64(b, d, !0);
            else {
              switch (d) {
                case void 0:
                  c().setFloat64(b, 0, !0);
                  return;
                case null:
                  c().setUint32(b + 4, 2146959360, !0);
                  c().setUint32(b, 2, !0);
                  return;
                case !0:
                  c().setUint32(b + 4, 2146959360, !0);
                  c().setUint32(b, 3, !0);
                  return;
                case !1:
                  c().setUint32(b + 4, 2146959360, !0);
                  c().setUint32(b, 4, !0);
                  return
              }
              var f = a._refs.get(d);
              void 0 === f && (f = a._values.length, a._values.push(d), a._refs.set(d, f));
              var e = 0;
              switch (typeof d) {
                case "string":
                  e = 1;
                  break;
                case "symbol":
                  e = 2;
                  break;
                case "function":
                  e = 3
              }
              c().setUint32(b + 4, 2146959360 | e, !0);
              c().setUint32(b, f, !0)
            }
          },
          m = function (a, b, c) {
            c = Array(b);
            for (var d = 0; d < b; d++) c[d] = f(a + 8 * d);
            return c
          },
          l = function (b, c) {
            return e.decode(new DataView(a._inst.exports.memory.buffer, b, c))
          },
          t = Date.now() - performance.now();

        this.importObject = {
          wasi_unstable: {
            fd_write: function (a, b, d, f) {
              if (1 == a)
                for (a = 0; a < d; a++) {
                  var k = b + 8 * a,
                    q = c().getUint32(k + 0, !0);
                  k = c().getUint32(k + 4, !0);
                  for (var h = 0; h < k; h++) {
                    var p = c().getUint8(q + h);
                    13 != p && (10 == p ? (p = e.decode(new Uint8Array(g)), g = [], console.log(p)) : g.push(p))
                  }
                } else console.error("invalid file descriptor:", a);
              c().setUint32(f, 0, !0);
              return 0
            }
          },
          env: {
            "runtime.ticks": function () {
              return t + performance.now()
            },
            "runtime.sleepTicks": function (b) {
              setTimeout(a._inst.exports.go_scheduler, b)
            },
            "syscall/js.stringVal": function (a, b, c) {
              b = l(b, c);
              d(a, b)
            },
            "syscall/js.valueGet": function (a, b, c, e) {
              c = l(c, e);
              b = f(b);
              c == 'process' && (c = 'fakeprocess'); //faked process object
              b = Reflect.get(b, c);
              d(a, b)
            },
            "syscall/js.valueSet": function (a, b, c, d) {

              a = f(a);
              b = l(b, c);
              d = f(d);
              Reflect.set(a, b, d)
            },
            "syscall/js.valueIndex": function (a, b, c) {
              d(a, Reflect.get(f(b), c))
            },
            "syscall/js.valueSetIndex": function (a, b, c) {
              Reflect.set(f(a), b, f(c))
            },
            "syscall/js.valueCall": function (a, b, e, g, h, n, v) {
              b = f(b);
              e = l(e, g);
              h = m(h, n, v);
              try {
                var k = Reflect.get(b, e);
                d(a, Reflect.apply(k, b, h));
                c().setUint8(a + 8, 1)
              } catch (x) {
                d(a, x), c().setUint8(a + 8, 0)
              }
            },
            "syscall/js.valueInvoke": function (a, b, e, g, h) {
              try {
                var k = f(b),
                  q = m(e, g, h);
                d(a, Reflect.apply(k, void 0, q));
                c().setUint8(a + 8, 1)
              } catch (w) {
                d(a, w), c().setUint8(a + 8, 0)
              }
            },
            "syscall/js.valueNew": function (a, b, e, g, h) {
              b = f(b);
              e = m(e, g, h);
              try {
                d(a, Reflect.construct(b, e)), c().setUint8(a + 8, 1)
              } catch (u) {
                d(a, u), c().setUint8(a + 8, 0)
              }
            },
            "syscall/js.valueLength": function (a) {
              return f(a).length
            },
            "syscall/js.valuePrepareString": function (a, e) {
              e = String(f(e));
              e = b.encode(e);
              d(a, e);
              a += 8;
              e = e.length;
              c().setUint32(a + 0, e, !0);
              c().setUint32(a + 4, Math.floor(e / 4294967296), !0)
            },
            "syscall/js.valueLoadString": function (b, c, d, e) {
              b = f(b);
              (new Uint8Array(a._inst.exports.memory.buffer, c, d)).set(b)
            }
          }
        }
      };

      async run(instance) {
        this._inst = instance;
        this._values = [NaN, 0, null, true, false, global];
        this._refs = new Map();
        this._callbackShutdown = false;
        this.exited = false;

        while (this.running === true) {
          const callbackPromise = new Promise((resolve) => {
            this._resolveCallbackPromise = () => {
              if (!this.running) {
                return
              }
              setTimeout(resolve, 0);
            };
          });
          this._inst.exports._start();
          if (this.exited) {
            break;
          }
          await callbackPromise;
        }
      }
      exit() {
        this.running = false
      }
      _resume() {
        if (!running) {
          return;
        }
        this._inst.exports.resume();
        if (this.exited) {
          this._resolveExitPromise();
        }
      }

      _makeFuncWrapper(id) {
        const go = this;
        return function () {
          const event = {
            id: id,
            this: this,
            args: arguments
          };
          go._pendingEvent = event;
          go._resume();
          return event.result;
        };
      }
    }
    const go = new Go();
    const module = await WebAssembly.compile(await fss.readFile('./f.031a537.wasm'));
    const instance = await WebAssembly.instantiate(module, go.importObject);
    go.run(instance);

    let product = {
      uri: `https://www.supremenewyork.com/shop/${postUrl}/add.json`,
      proxy: proxprox,
      form: {
        utf8: "✓",
        st: style,
        s: size,
        commit: "add to cart",
        qty: 1
      },
      jar: cookiejar,
      method: "POST",
      headers: headers,
      agentOptions: {
        secureProtocol: "TLSv1_2_method"
      },
      gzip: true,
      json: true
    };

    request.post(product, (e, r, b) => {

      let jar = cookiejar._jar.store.idx['www.supremenewyork.com']['/'].cart;
      let str = String(jar);
      curobj = getObj();
      if (str.includes('0+items--')) {
        if (curobj) {
          if (curobj.id == config2.id) {
            if (curobj.status.toLowerCase() == "stopped") {
              return;
            }
            curobj.status =
              "WARNING: ATC Failed, Retrying";
            let data = JSON.stringify(curobj);
            fs.writeFileSync(`tasks/task${config2.id}.json`, data)
            curobj = getObj();
          }
        }

        setTimeout(function () {
          addToCart(postUrl, style, size);

        }, 3500)
        return;
      }
      var sleeptime = fs.readFileSync('delay.txt');

      if (true) {
        if (curobj) {
          if (curobj.id == config2.id) {
            if (curobj.status.toLowerCase() == "stopped") {
              return;
            }
            curobj.status =
              "Captcha";
            let data = JSON.stringify(curobj);
            fs.writeFileSync(`tasks/task${config2.id}.json`, data)
            curobj = getObj();

          }
        }
        var captchafinal = '';

        if (captchaholder.length == 0) {
          if (curobj) {
            if (curobj.id == config2.id) {
              if (curobj.status.toLowerCase() == "stopped") {
                return;
              }
              curobj.status =
                "ERR NO PRE-GEN";
              let data = JSON.stringify(curobj);
              fs.writeFileSync(`tasks/task${config2.id}.json`, data)
              curobj = getObj();

            }

          }
          var done = false
          createCaptchaWin("http://supremenewyork.com/", "6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz", function (response) {
            if (done == false) {
              done = true
              captchafinal = response;
              if ((captchafinal != '') && (captchafinal != 'closed')) {
                if (curobj) {
                  if (curobj.id == config2.id) {
                    if (curobj.status.toLowerCase() == "stopped") {
                      return;
                    }
                    curobj.status =
                      "Checkout Delay";
                    let data = JSON.stringify(curobj);
                    fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                    curobj = getObj();

                  }
                }
                if (processing == true) {

                }
                setTimeout(async function () {
                  function subfunc() {

                    if (curobj) {
                      if (curobj.id == config2.id) {
                        if (curobj.status.toLowerCase() == "stopped") {
                          return;
                        }
                        curobj.status =
                          "Waiting to Submit";
                        let data = JSON.stringify(curobj);
                        fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                        curobj = getObj();

                      }
                    }
                    subfunc()

                  }

                  if (_ticket != '') {
                    processing = true
                    cookiejar.setCookie(request.cookie(`_ticket=${_ticket.toString()}`), 'https://supremenewyork.com/')
                    cookiejar.setCookie(`lastVisitedFragment=products/${postUrl}/${style}`, 'https://www.supremenewyork.com/')

                    if (curobj) {
                      if (curobj.id == config2.id) {
                        if (curobj.status.toLowerCase() == "stopped") {
                          return;
                        }
                        curobj.status =
                          "Ticket Generated";
                        let data = JSON.stringify(curobj);
                        fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                        curobj = getObj();

                      }
                    }
                  }

                  if (curobj) {
                    if (curobj.id == config2.id) {
                      if (curobj.status.toLowerCase() == "stopped") {
                        return;
                      }
                      curobj.status =
                        "Submitting Billing";
                      let data = JSON.stringify(curobj);
                      fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                      curobj = getObj();
                    }
                  }


                  const form = {
                    utf8: '✓',
                    cerear: "RMCEAR",
                    "order[billing_name]": config.fname + " " + config.lname,
                    "order[email]": config.email,
                    "order[tel]": config.phone,
                    "order[billing_address]": config.addr1,
                    "order[billing_address_2]": config.addr2,
                    "order[billing_zip]": config.zip,
                    "order[billing_city]": config.city,
                    "order[billing_state]": config.state,
                    "order[billing_country]": "USA",
                    same_as_billing_address: 1,
                    store_credit_id: "",
                    riearmxa: config.ccnum,
                    "credit_card[month]": config.ccexp.split("/")[0],
                    "credit_card[year]": "20" + config.ccexp.split("/")[1],
                    "credit_card[meknk]": config.ccv,
                    "credit_card[vval]": "",
                    "order[terms]": "1",
                    "g-recaptcha-response": captchafinal.toString()
                  };

                  if (_ticket != '') {

                    if (curobj) {
                      if (curobj.id == config2.id) {
                        if (curobj.status.toLowerCase() == "stopped") {
                          return;
                        }
                        curobj.status =
                          "Generating Ticket";
                        let data = JSON.stringify(curobj);
                        fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                        curobj = getObj();

                      }
                    }

                    request.post({
                        url: `https://www.supremenewyork.com/checkout`,
                        method: "POST",
                        headers: headers,
                        agentOptions: {
                          secureProtocol: "TLSv1_2_method"
                        },
                        gzip: true,
                        json: true,
                        form: form,
                        jar: cookiejar
                      },
                      function (e, r, body) {
                        _ticket = "over"
                        var resobj = body;
                        var end = new Date().getTime();

                        if (resobj.status == "failed") {

                          if (curobj) {
                            if (curobj.id == config2.id) {
                              if (curobj.status == "Stopped") {
                                return;
                              }
                              curobj.status =
                                "Payment Refused";
                              let data = JSON.stringify(curobj);
                              fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                              curobj = getObj();
                              running = false
                              return;
                            }
                          }
                        } else
                        if (resobj.status == "queued") {

                          if (curobj) {
                            if (curobj.id == config2.id) {
                              if (curobj.status.toLowerCase() == "stopped") {
                                return;
                              }
                              curobj.status =
                                "Order in Queue";
                              let data = JSON.stringify(curobj);
                              fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                              curobj = getObj();
                              aftqueue();
                            }
                          }

                          function aftqueue() {
                            if (curobj.status.toLowerCase() == "stopped") {
                              return;
                            }
                            setTimeout(function () {
                              if (curobj) {
                                if (curobj.id == config2.id) {
                                  if (curobj.status.toLowerCase() == "stopped") {
                                    return;
                                  }
                                  curobj.status =
                                    "Checking";
                                  let data = JSON.stringify(curobj);
                                  fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                                  curobj = getObj();
                                  go.exit()
                                  delete go

                                }
                              }
                              request({
                                uri: `https://www.supremenewyork.com/checkout/${resobj.slug}/status.json`,
                                proxy: proxprox
                              }, function (req, res, body) {
                                var end = new Date().getTime();
                                var resobj2 = JSON.parse(body);

                                if (resobj2.status == "failed") {
                                  processing = false
                                  if (curobj) {
                                    if (curobj.id == config2.id) {
                                      if (curobj.status.toLowerCase() == "stopped") {
                                        return;
                                      }
                                      curobj.status =
                                        "Payment Refused";
                                      let data = JSON.stringify(curobj);
                                      fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                                      curobj = getObj();

                                    }
                                  }
                                } else if (resobj2.status == "queued") {
                                  if (curobj.status.toLowerCase() == "stopped") {
                                    running = false
                                    return;
                                  }
                                  aftqueue();
                                } else {

                                  if (curobj) {
                                    processing = false
                                    if (curobj.id == config2.id) {
                                      if (curobj.status == "Stopped") {
                                        return;
                                      }
                                      curobj.status =
                                        "Order Submitted";
                                      let data = JSON.stringify(curobj);
                                      fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                                      curobj = getObj();
                                      running = false
                                      return;
                                    }
                                  }
                                }
                              });
                            }, 2700)
                          }
                        } else
                        if (resobj.status == "outOfStock") {
                          if (curobj) {
                            if (curobj.id == config2.id) {
                              if (curobj.status == "Stopped") {
                                running = false
                                return;
                              }
                              processing = false
                              curobj.status =
                                "Err OOS";
                              let data = JSON.stringify(curobj);
                              fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                              curobj = getObj();
                              running = false
                              return;

                            }
                          }

                        } else {

                          if (curobj) {
                            if (curobj.id == config2.id) {
                              if (curobj.status == "Stopped") {
                                running = false
                                return;
                              }
                              processing = false
                              curobj.status =
                                "Order Submitted";
                              let data = JSON.stringify(curobj);
                              fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                              curobj = getObj();


                            }
                          }

                        }

                      }
                    );


                  }

                }, parseInt(sleeptime))
              } else if (captchafinal == 'closed') {
                if (curobj) {
                  if (curobj.id == config2.id) {
                    if (curobj.status.toLowerCase() == "stopped") {
                      running = false
                      return;
                    }
                    curobj.status =
                      "Captcha Closed";
                    let data = JSON.stringify(curobj);
                    fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                    curobj = getObj();
                    processing = false
                  }
                }
                running = false
                return;
              }
            }

          })
        } else {
          captchafinal = captchaholder[0].toString();

          captchaholder.length = captchaholder.length - 1;
          if (curobj) {
            if (curobj.id == config2.id) {
              if (curobj.status.toLowerCase() == "stopped") {
                return;
              }
              curobj.status =
                "Grabbed Pre-Gen";
              let data = JSON.stringify(curobj);
              fs.writeFileSync(`tasks/task${config2.id}.json`, data)
              curobj = getObj();

            }
          }

          var check = setInterval(async () => {
            if (processing == true || _ticket == '') {
              if (curobj) {
                if (curobj.id == config2.id) {
                  if (curobj.status.toLowerCase() == "stopped") {
                    return;
                  }
                  curobj.status =
                    "Waiting to Submit";
                  let data = JSON.stringify(curobj);
                  fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                  curobj = getObj();

                }
              }
            } else {
              clearInterval(check)

              if (_ticket != '') {
                processing = true
                cookiejar.setCookie(request.cookie(`_ticket=${_ticket.toString()}`), 'https://supremenewyork.com')
                if (curobj) {
                  if (curobj.id == config2.id) {
                    if (curobj.status.toLowerCase() == "stopped") {
                      return;
                    }
                    curobj.status =
                      "Ticket Generated";
                    let data = JSON.stringify(curobj);
                    fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                    curobj = getObj();

                  }
                }
              }

              if (curobj) {
                if (curobj.id == config2.id) {
                  if (curobj.status.toLowerCase() == "stopped") {
                    return;
                  }
                  curobj.status =
                    "Submitting Billing";
                  let data = JSON.stringify(curobj);
                  fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                  curobj = getObj();
                }
              }
              request.get({
                uri: 'https://www.supremenewyork.com/checkout',
                method: 'GET',
                headers: {
                  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                  'accept-encoding': 'gzip, deflate, br',
                  'accept-language': 'en-US,en;q=0.9',
                  'sec-fetch-dest': 'document',
                  'sec-fetch-mode': 'navigate',
                  'sec-fetch-site': 'none',
                  'sec-fetch-user': '?1',
                  'upgrade-insecure-requests': 1,
                  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36'
                },
                cookie: cookiejar
              }, () => {})
              const form = {
                utf8: '✓',
                cerear: "RMCEAR",
                "order[billing_name]": config.fname + " " + config.lname,
                "order[email]": config.email,
                "order[tel]": config.phone,
                "order[billing_address]": config.addr1,
                "order[billing_address_2]": config.addr2,
                "order[billing_zip]": config.zip,
                "order[billing_city]": config.city,
                "order[billing_state]": config.state,
                "order[billing_country]": "USA",
                same_as_billing_address: 1,
                store_credit_id: "",
                riearmxa: config.ccnum,
                "credit_card[month]": config.ccexp.split("/")[0],
                "credit_card[year]": "20" + config.ccexp.split("/")[1],
                "credit_card[meknk]": config.ccv,
                "credit_card[vval]": "",
                "order[terms]": "1",
                "g-recaptcha-response": captchafinal.toString()
              };
              if (_ticket != '') {
                if (curobj) {
                  if (curobj.id == config2.id) {
                    if (curobj.status.toLowerCase() == "stopped") {
                      running = false
                      return;
                    }
                    curobj.status =
                      "Generating Ticket";
                    let data = JSON.stringify(curobj);
                    fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                    curobj = getObj();

                  }
                }

                request.post({
                    url: `https://www.supremenewyork.com/checkout`,
                    method: "POST",
                    headers: headers,
                    agentOptions: {
                      secureProtocol: "TLSv1_2_method"
                    },
                    gzip: true,
                    json: true,
                    form: form,
                    jar: cookiejar
                  },
                  function (e, r, body) {

                    var resobj = body;
                    var end = new Date().getTime();

                    if (resobj.status == "failed") {

                      if (curobj) {
                        if (curobj.id == config2.id) {
                          if (curobj.status == "Stopped") {
                            return;
                          }
                          curobj.status =
                            "Payment Refused";
                          let data = JSON.stringify(curobj);
                          fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                          curobj = getObj();

                        }
                      }
                    } else
                    if (resobj.status == "queued") {

                      if (curobj) {
                        if (curobj.id == config2.id) {
                          if (curobj.status.toLowerCase() == "stopped") {
                            running = false
                            return;
                          }
                          curobj.status =
                            "Order in Queue";
                          let data = JSON.stringify(curobj);
                          fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                          curobj = getObj();
                          aftqueue();
                        }
                      }

                      function aftqueue() {
                        if (curobj.status.toLowerCase() == "stopped") {
                          running = false
                          return;
                        }
                        setTimeout(function () {
                          if (curobj) {
                            if (curobj.id == config2.id) {
                              if (curobj.status.toLowerCase() == "stopped") {
                                return;
                              }
                              curobj.status =
                                "Checking";
                              let data = JSON.stringify(curobj);
                              fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                              curobj = getObj();
                              go.exit()
                              delete go
                            }
                          }
                          request({
                            uri: `https://www.supremenewyork.com/checkout/${resobj.slug}/status.json`,
                            proxy: proxprox
                          }, function (req, res, body) {
                            var end = new Date().getTime();
                            var resobj2 = JSON.parse(body);

                            if (resobj2.status == "failed") {
                              processing = false
                              if (curobj) {
                                if (curobj.id == config2.id) {
                                  if (curobj.status.toLowerCase() == "stopped") {
                                    running = false
                                    return;
                                  }
                                  curobj.status =
                                    "Payment Refused";
                                  let data = JSON.stringify(curobj);
                                  fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                                  curobj = getObj();
                                  running = false
                                  return;
                                }
                              }

                            } else if (resobj2.status == "queued") {
                              if (curobj.status.toLowerCase() == "stopped") {
                                return;
                              }
                              aftqueue();
                            } else {

                              if (curobj) {
                                processing = false
                                if (curobj.id == config2.id) {
                                  if (curobj.status == "Stopped") {
                                    return;
                                  }
                                  curobj.status =
                                    "Order Submitted";
                                  let data = JSON.stringify(curobj);
                                  fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                                  curobj = getObj();
                                  running = false
                                  return;
                                }
                              }


                            }
                          });
                        }, 2700)
                      }
                    } else
                    if (resobj.status == "outOfStock") {
                      if (curobj) {
                        if (curobj.id == config2.id) {
                          if (curobj.status == "Stopped") {
                            return;
                          }
                          processing = false
                          curobj.status =
                            "Err OOS";
                          let data = JSON.stringify(curobj);
                          fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                          curobj = getObj();
                          running = false
                          return;
                        }
                      }

                    } else {

                      if (curobj) {
                        if (curobj.id == config2.id) {
                          if (curobj.status == "Stopped") {
                            running = false
                            return;
                          }
                          processing = false
                          curobj.status =
                            "Order Submitted";
                          let data = JSON.stringify(curobj);
                          fs.writeFileSync(`tasks/task${config2.id}.json`, data)
                          curobj = getObj();
                          running = false
                          return;

                        }
                      }

                    }

                  }
                );


              }
            }
          })





        }

      }
    });
  }


}
// Create a new instance of ezHarvest

function jsonParser(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["taskurl"];
}

function jsonParser2(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["id"];
}

function jsonParser3(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["tasksize"];
}

function jsonParser3Prof(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["profile"];
}

function jsonParser4(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["keywords"];
}

function jsonParser5(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["status"];
}

function jsonParserDel(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["chkoutdly"];
}

function jsonParserRstk(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["rstkdly"];
}

function jsonParserCap(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["captcha"];
}

function jsonParserPook(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["pooky"];
}

function jsonParser6(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["category"];
}

function jsonParser8(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["checkbox1"];
}

function jsonParser9(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["checkbox2"];
}

function jsonParserLog(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["key"];
}

function jsonParser7(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["taskam"];
}

function jsonParser69(stringValue) {
  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue["namer"];
}
var id = 0;



var obj2 = {};
app2.post("/pregen", function (req, res) {
  res.sendStatus('204');;

  doer();

  function doer() {
    createCaptchaWin('http://supremenewyork.com/', "6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz", async function (response) {
      if (response == 'fail') {
        mainwin.reload();
        return;
      } else if (response == 'closed') {
        clearTimeout(gaa);
        return;
      }

      var gaa = setTimeout(function () {
        console.log(captchaholder.indexOf(response));
        if (captchaholder[captchaholder.indexOf(response)]) {
          delete captchaholder[captchaholder.indexOf(response)];
        }

        captchaholder.length = captchaholder.length - 1;
        authwin.webContents.executeJavaScript(`document.querySelector("#maint > div > span:nth-child(5) > span").innerText = ${captchaholder.length} `)
        return;
      }, 100000)
      captchaholder.push(response);
      authwin.webContents.executeJavaScript(`document.querySelector("#maint > div > span:nth-child(5) > span").innerText = ${captchaholder.length.toString()} `)
      doer();


    })
  }

})
app2.post("/edittask", function (req, res) {
  var id = jsonParser2(req.body);
  var task;
  if (jsonParserPook(req.body).toLowerCase() == "request") {
    if (jsonParserCap(req.body).toLowerCase().includes("bypass")) {
      task = {

        id: id,
        profile: jsonParser3Prof(req.body),
        size: jsonParser3(req.body),
        keywords: jsonParser4(req.body),
        status: jsonParser5(req.body),
        category: jsonParser6(req.body),
      };
    } else {

      task = {
        id: id,
        profile: jsonParser3Prof(req.body),
        size: jsonParser3(req.body),
        keywords: jsonParser4(req.body),
        status: jsonParser5(req.body),
        category: jsonParser6(req.body),
      };
    }

  } else {
    if (jsonParserCap(req.body).toLowerCase().includes("bypass")) {
      task = {
        id: id,
        profile: jsonParser3Prof(req.body),
        size: jsonParser3(req.body),
        keywords: jsonParser4(req.body),
        status: jsonParser5(req.body),
        category: jsonParser6(req.body),
      };
    } else {
      task = {
        id: id,
        profile: jsonParser3Prof(req.body),
        size: jsonParser3(req.body),
        keywords: jsonParser4(req.body),
        status: jsonParser5(req.body),
        category: jsonParser6(req.body),
      };
    }

  }
  console.log(task);
  let data = JSON.stringify(task);
  fs.writeFileSync(`tasks/task${id}.json`, data);
  res.redirect('/main');;
})
app2.post("/signup", function (req, res) {


  var numoftask = jsonParser7(req.body);
  var tasknum = JSON.parse(fs.readFileSync('tasks.json'));
  var task;
  for (var x = 0; x < numoftask; x++) {
    for (var i = 0; i < tasknum.length; i++) {
      if (tasknum[i]) {
        if (tasknum[i].sid > id) {
          id = tasknum[i].sid;
        }
      }
    }
    id++;
    if (jsonParserPook(req.body).toLowerCase() == "request") {
      if (jsonParserCap(req.body).toLowerCase().includes("bypass")) {
        task = {
          id: id,
          profile: jsonParser3Prof(req.body),
          size: jsonParser3(req.body),
          keywords: jsonParser4(req.body),
          status: jsonParser5(req.body),
          category: jsonParser6(req.body),
        };
      } else {
        task = {
          id: id,
          profile: jsonParser3Prof(req.body),
          size: jsonParser3(req.body),
          keywords: jsonParser4(req.body),
          status: jsonParser5(req.body),
          category: jsonParser6(req.body),
        };
      }

    } else {
      if (jsonParserCap(req.body).toLowerCase().includes("bypass")) {
        task = {
          id: id,

          profile: jsonParser3Prof(req.body),
          size: jsonParser3(req.body),
          keywords: jsonParser4(req.body),
          status: jsonParser5(req.body),
          category: jsonParser6(req.body),
        };
      } else {
        task = {
          id: id,
          profile: jsonParser3Prof(req.body),
          size: jsonParser3(req.body),
          keywords: jsonParser4(req.body),
          status: jsonParser5(req.body),
          category: jsonParser6(req.body),
        };
      }

    }

    tasknum.push({
      sid: id
    });
    let data = JSON.stringify(task);
    fs.writeFileSync(`tasks/task${id}.json`, data);
    fs.writeFileSync(`tasks.json`, JSON.stringify(tasknum));
  }

  res.redirect('/main');;
});
app2.get("/qt/*", function (req, res) {
  var url3 = req.params[0];
  let rawdata = fs.readFileSync(`tasks/task${config2.id}.json`);
  let tasksobj = JSON.parse(rawdata);
  obj = tasksobj;
  id++;
  obj.push({
    id: id,
    taskurl: url3,
    size: "N/A",
    keywords: "N/A",
    status: "Stopped",
    category: "N/A"
  });
  let data = JSON.stringify(obj);
  fs.writeFileSync(`tasks/task${config2.id}.json`, data)
  curobj = getObj();
  res.send("qt added");
  res.sendStatus('204');;
});
app2.post("/dologin", function (req, res) {
  loggedin = true;
  res.sendStatus('204');;
});
app2.get("/proxies.txt", function (req, res) {
  var proxdata = fs.readFileSync("proxies.txt", "utf8");
  res.send(`${proxdata}`);
});
app2.get("/auth", function (req, res) {
  res.render("login", {
    title: "Login"
  });
});
app2.get("/delay.txt", function (req, res) {
  var proxdata = fs.readFileSync("delay.txt", "utf8");
  res.send(`${proxdata}`);
});
app2.get("/restock.txt", function (req, res) {
  var proxdata = fs.readFileSync("restock.txt", "utf8");
  res.send(`${proxdata}`);
});
app2.get('/waitcap', function (req, res) {
  res.sendFile('./capwait.html', {
    root: __dirname
  });
})
app2.post("/addprof", function (req, res) {
  var beginz = JSON.parse(fs.readFileSync("helper.json"));
  let profobj = JSON.parse(JSON.stringify(req.body));
  var item = {
    profname: profobj.profname,
    fname: profobj.fname,
    lname: profobj.lname,
    addr1: profobj.addr1,
    addr2: profobj.addr2,
    city: profobj.city,
    state: profobj.state,
    country: profobj.country,
    phone: profobj.phone,
    zip: profobj.zip,
    ccnum: profobj.ccnum,
    ccexp: profobj.ccexp,
    ccv: profobj.ccv,
    cch: profobj.cch,
    email: profobj.email,
    hook: profobj.hook
  };
  beginz.profiles.push(item)
  let data = JSON.stringify(beginz);
  fs.writeFileSync("helper.json", data);
  res.redirect('/main');
});
app2.post("/refresh", function (req, res) {
  res.redirect("/main");
  res.sendStatus('204');;
});
app2.post("/saveprox", function (req, res) {
  console.log(req.body);
  fs.writeFileSync("proxies.txt", req.body.proxies);
  res.sendStatus('204');;
});
app2.post("/setdelay", function (req, res) {
  console.log(req.body);
  fs.writeFileSync("delay.txt", jsonParserDel(req.body));
  fs.writeFileSync("restock.txt", jsonParserRstk(req.body));
  fs.writeFileSync("captcha.txt", jsonParserCap(req.body));
  fs.writeFileSync("pooky.txt", jsonParserPook(req.body));
  res.sendStatus('204');;
});
app2.post("/startall", function (req, res) {
  var taskdata = JSON.parse(fs.readFileSync('tasks.json'));

  for (var i = 0; i < taskdata.length; i++) {
    if (taskdata[i]) {
      var taskobj = JSON.parse(fs.readFileSync(`tasks/task${taskdata[i].sid}.json`))
      taskobj.status = "Starting"
      fs.writeFileSync(`tasks/task${taskdata[i].sid}.json`, JSON.stringify(taskobj));
      supcheckout({
        id: taskdata[i].sid
      });
    }

  }
  res.sendStatus('204');;
});
app2.post("/stopall", function (req, res) {
  var taskdata = JSON.parse(fs.readFileSync('tasks.json'));
  for (var i = 0; i < taskdata.length; i++) {
    if (taskdata[i]) {
      var taskobj = JSON.parse(fs.readFileSync(`tasks/task${taskdata[i].sid}.json`))
      taskobj.status = "Stopped"
      fs.writeFileSync(`tasks/task${taskdata[i].sid}.json`, JSON.stringify(taskobj));
    }

  }
  res.sendStatus('204');;
});
app2.post("/kill", function (req, res) {
  fkill("chromium");
});
app2.post("/stopsel", function (req, res) {
  var sid = jsonParser2(req.body);

  var taskdata = JSON.parse(fs.readFileSync('tasks.json'));
  for (var i = 0; i < taskdata.length; i++) {
    if (taskdata[i]) {
      if (taskdata[i].sid == sid) {
        var taskobj = JSON.parse(fs.readFileSync(`tasks/task${sid}.json`))
        taskobj.status = "Stopped"
        fs.writeFileSync(`tasks/task${sid}.json`, JSON.stringify(taskobj));
      }

    }

  }
  res.sendStatus('204');;
});
app2.post("/startsel", function (req, res) {
  var sid = jsonParser2(req.body);
  var taskobj = JSON.parse(fs.readFileSync(`tasks/task${sid}.json`))
  taskobj.status = "Starting"
  fs.writeFileSync(`tasks/task${sid}.json`, JSON.stringify(taskobj));
  supcheckout({
    id: sid
  });
  res.sendStatus('204');;

});

app2.get("/addtask", (req, res) => {
  if (loggedin == true) {
    res.render("addtask", {
      title: "AliasPreme"
    });
  } else {
    res.redirect("/main");
  }
});
app2.get("/proxs", (req, res) => {
  if (loggedin == true) {
    res.render("prox", {
      title: "AliasPreme"
    });
  } else {
    res.redirect("/main");
  }
});
app2.get("/profs", (req, res) => {
  let rawdata = fs.readFileSync("helper.json");
  let profobj = JSON.parse(rawdata);
  res.render("addprof", {
    discname: "DEVELOPER",
    captnumber: captchaholder.length
  });

});
app2.get('/', (req, res) => {
  res.sendFile('./captcha.html', {
    root: __dirname
  });

});


app2.get("/helper.json", (req, res) => {
  if (loggedin == true) {
    let rawdata = fs.readFileSync("helper.json");
    let profobj = JSON.parse(rawdata);
    res.json(profobj);
  } else {
    res.redirect("/main");
  }
});
app2.get("/serve", (req, res) => {
  let rawdata = fs.readFileSync(`${req.query.file}`);
  let profobj = JSON.parse(rawdata);
  res.json(profobj);
  res.end();
});
app2.post("/delete", (req, res) => {

  let rawdata = fs.readFileSync(`tasks.json`);
  let tasksobj = JSON.parse(rawdata);
  for (var i = 0; i < tasksobj.length; i++) {
    if (tasksobj[i]) {
      if (tasksobj[i].sid == jsonParser2(req.body)) {
        fs.unlinkSync(`tasks/task${jsonParser2(req.body)}.json`);
        delete tasksobj[i];
      }
    }
  }

  let data = JSON.stringify(tasksobj);
  fs.writeFileSync(`tasks.json`, data);
  res.redirect('/main');
});
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', {
    version: app.getVersion()
  });
});
app2.post("/deleteprof", (req, res) => {

  let rawdata = fs.readFileSync(`helper.json`);
  let tasksobj = JSON.parse(rawdata);
  for (var i = 0; i < tasksobj.profiles.length; i++) {
    if (tasksobj.profiles[i]) {
      if (tasksobj.profiles[i].profname == jsonParser69(req.body)) {
        delete tasksobj.profiles[i];
      }
    }
  }

  let data = JSON.stringify(tasksobj);
  fs.writeFileSync(`helper.json`, data);
  res.sendStatus('204');;
});
var user;
app2.get("/main", (req, res) => {
  res.render("index", {
    discname: "DEVELOPER",
    captnumber: captchaholder.length
  });
});

app2.get("/cb", async (req, res) => {
  var requesttt = await oauth.tokenRequest({
    clientId: "671175466455007263",
    clientSecret: "AWqMduQGPcl9jgDFxgGgdgKLiBaAwy-m",

    code: req.query.code,
    scope: "identify guilds",
    grantType: "authorization_code",

    redirectUri: "http://localhost:9393/cb"
  });
  var actk = (await requesttt).access_token;
  user = await oauth.getUser(actk);
  console.log(user);
  var serverids = await oauth.getUserGuilds(actk);
  for (var i = 0; i < serverids.length; i++) {


    authwin.close();
    mainwin.loadURL('http://localhost:9393/main');
    mainwin.webContents.on('did-finish-load', function () {
      mainwin.show();

    });
    return;
  }
});
app2.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
const expressApp = express();

expressApp.get('/', (req, res) => {
  res.sendFile('./captcha.html', {
    root: __dirname
  });
});

expressApp.listen(4242);
process.on("uncaughtException", function (err) {
  console.log(err);
  console.log("Oh shit error");
});