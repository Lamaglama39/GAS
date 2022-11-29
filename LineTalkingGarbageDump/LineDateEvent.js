/**
 * Lineに日付ごとの予定を送信
 */

function DateEvent() {
    //Line Messaging API情報　基本設定
    const url = PropertiesService.getScriptProperties().getProperty("url");
    const token = PropertiesService.getScriptProperties().getProperty("token");
    const user_id = PropertiesService.getScriptProperties().getProperty("user_id");
    const message = getday_(new Date());
    if (!message) return;
  
    const payload = {
      to: user_id,
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
  
    UrlFetchApp.fetch(url, params);
  }
  
  //各日付を変数に格納
  function getday_(date) {
    //今日
    today = new Date;
    gettoday = today.getDate();
    //月初
    firstday = (new Date(date.setDate(1)));
    get_firstday =  (firstday.getDate());
    //月末
    lastday = (new Date(date.getFullYear(), date.getMonth() + 1, 0));
    get_lastday = (lastday.getDate());
    //特定の日時
    const credit = 10;
    const rent = 25;
    
  //日付に応じて送信する文章を選択
    if (get_firstday == gettoday) return `test。\n本日は${gettoday}日！\n月初めですよ～。`;
    if (get_lastday == gettoday) return `test。\n本日は${gettoday}日！\n給料日ですよ～。`;
    if (credit == gettoday) return `test。\n本日は${gettoday}日！\nクレジットカードの引き落とし日ですよ～。`;
    if (rent == gettoday) return `test。\n本日は${gettoday}日！\n家賃の引き落とし日ですよ～。`;
  }