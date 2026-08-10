//LockDivを作成
const LockDiv = document.createElement('div');
//html,bodyを取得
const html = document.querySelector("html");
const body = document.querySelector("body");
//html,bodyを100%のサイズに設定
html.style.width = "100%";
html.style.height = "100%";
body.style.width = "100%";
body.style.height = "100%";
//余白を削除
const style = document.createElement('style');
style.textContent = '* { margin: 0; padding: 0; }';
document.head.appendChild(style);
//LockDivのスタイルを設定
LockDiv.style.position = "fixed";
LockDiv.style.bottom = "20px";
LockDiv.style.width = "100%";
LockDiv.style.height = "100%";
LockDiv.style.top = '0';
LockDiv.style.left = '0';
LockDiv.style.zIndex = '9999';
LockDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
//LockDivをbodyに追加
document.body.appendChild(LockDiv);