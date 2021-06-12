import { config } from '../config';

import TelegramBot from 'node-telegram-bot-api';
const { telegram } = config;

const TOKEN = telegram.token;
const url = telegram.appUrl;
const bot = new TelegramBot(TOKEN);

bot.setWebHook(`${url}/bot${TOKEN}`);

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Selamat datang di Telegram RW 05 gaes');
});

bot.onText(/\/stop/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Maaf Tidak bisa stop');
});

bot.onText(/\/kirim (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, 'Halo anda akan mendapatkan balasan sebentar lagi');
  bot.sendMessage(
    telegram.adminChatId,
    `Dari: ${chatId} ${msg.from.username} Pesan: ${resp}`
  );
});

// admin message
bot.onText(/\/adm (.+)/, (msg, match) => {
  const req = match[1].split(' ');
  const chatId = req[0];
  req.shift();
  const resp = req.join(' ');
  bot.sendMessage(chatId, resp);
});

export default bot;
