/**
 * Lineに曜日ごとのゴミ出し種別を送信
 */

function TalkingGarbageDump() {
  //プッシュメッセージURL
  const url = 'https://api.line.me/v2/bot/message/push';
  //チャネルアクセストークン
  const token = '*******';
  
  const message = getMessageAboutTrash_(new Date());
  if (!message) return;
  
  //リクエスト本文
  const payload = {
    //LINEユーザーID
    to: '*******',
    messages: [
      { type: 'text', text: message }
     ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };

  //HTTPリクエスト
  UrlFetchApp.fetch(url, params);
}
  
/**
 * 曜日ごとに送信するメッセージを選択
 */
function getMessageAboutTrash_(date) {
  const weekOfMonth = getWeekOfMonth_(date);
  const dayOfWeekString = getDayOfWeekString_(date);
  
  //火曜日か金曜日かのいずれか
  if (['火曜日','金曜日'].includes(dayOfWeekString)) return `本日は${dayOfWeekString}！\n*******ゴミの日ですよ～`;
  //毎週月曜日
  if (['月曜日'].includes(dayOfWeekString)) return `本日は${dayOfWeekString}！\n*******ゴミの日ですよ～`;
  //毎週土曜日
  if (['土曜日'].includes(dayOfWeekString)) return `本日は${dayOfWeekString}！\n*******ゴミの日ですよ～`;
  if (dayOfWeekString === '火曜日') return `本日は${dayOfWeekString}！\n*******ゴミの日ですよ～`;
  //2の倍数回目の水曜日
  if (dayOfWeekString === '水曜日' && weekOfMonth % 2 === 0) return `本日は${dayOfWeekString}！\n*******ゴミの日ですよ～`;
}
  
/**
 *何回目の何曜日かを判定 
 */
function getWeekOfMonth_(date) {
  return Math.floor((date.getDate() - 1) / 7) + 1;
}
  
/**
 * 曜日を日本語表記で取得
 */
function getDayOfWeekString_(date) {
  const dayOfWeeks = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  const dayOfWeek = date.getDay();
  return dayOfWeeks[dayOfWeek];
}