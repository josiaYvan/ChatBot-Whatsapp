import { WechatyBuilder, ScanStatus, log } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";

const botName = "JosiaBot";

function onScan(qrcode, status) {
  if (status == ScanStatus.Waiting || status == ScanStatus.Timeout) {
    qrcodeTerminal.generate(qrcode, { small: true });
  }
}

function onLogin(user) {
  log.info("", "%s login", user);
}

const onLogout = (user) => {
  log.info("", "%s logout", user);
};

// func to parse msf and reply them
// parse "ding" -> reply "dong"
async function onMessage(msg) {
  log.info(botName, msg.toString());

  if (msg.text() == "ding") {
    await msg.say("hello dong");
  }
}

// init bot
const bot = WechatyBuilder.build({
  name: botName,
});

bot
  .on("scan", onScan)
  .on("login", onLogin)
  .on("logout", onLogout)
  .on("message", onMessage);

bot
  .start()
  .then(() => log.info(botName, "bot Started"))
  .catch((e) => log.error(botName, e));
