/**
 * スプレットシート上のテキストをchatworkに送信するbot
 */
function ChatBot (){
  const sheet = SpreadsheetApp.getActiveSheet();
  const last = sheet.getLastRow();
  const token = PropertiesService.getScriptProperties().getProperty('CW_TOKEN'); 

  for(let i = 2; i <= last; i++){
    if(!sheet.getRange(i,4).getValue()){
      const valus = sheet.getRange(i,1,1,3).getValues();
      let body = '[info]';
      body += valus[0][0] + '[hr]';
      body += valus[0][1] + '\n';
      body += '(' + valus[0][2] + ')[/info]';
      sendMessage(token, body);
      sheet.getRange(i, 4).setValue(true);
      sendMessage(token,body);
      sheet.getRange(i,4).setValue(true);

      if(i >= last){
        sheet.getRange(2,4,last　- 1).clearContent();
      }
      break;
    }
     
  }
}

/**
 * chatworkのマイチャットにメッセージを送信する
 * @param{string}token - チャットワークのAPIトークン 
 * @param{string}body  - メッセージ本文
 */
function sendMessage(token,body){
  const cw = ChatWorkClient.factory({token:　token});
  cw.sendMessageToMyChat(body);
}

function setScriptProparty(){
  PropertiesService.getScriptProperties().setProperty('CW_TOKEN','ChatWork APIトークン');
}


function logToken(){
  const token = PropertiesService.getScriptProperties().getProperty('CW_TOKEN')
  console.log(token);
}