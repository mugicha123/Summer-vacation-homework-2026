//ロックするURLのリスト
const lockList = [
    "https://www.youtube.com/",
    "https://example.com/"
];

// ロック解除用のパスワード
const password = "0123";



//lockPage関数を定義
function lockPage() {
    //LockDivを作成
    const lockDiv = document.createElement('div');
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
    lockDiv.id = "lockDiv";
    lockDiv.style.position = "fixed";
    lockDiv.style.bottom = "20px";
    lockDiv.style.width = "100%";
    lockDiv.style.height = "100%";
    lockDiv.style.top = '0';
    lockDiv.style.left = '0';
    lockDiv.style.zIndex = '9999';
    lockDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    lockDiv.style.paddingTop = '100px';
    lockDiv.style.color = 'white';
    lockDiv.style.textAlign = 'center';
    lockDiv.innerHTML = "<h1 style='font-size: 48px'>このページはロックされています</h1><p style='font-size: 20px;'>このページはロックされているため、操作できません。</p>";
    //LockDivをbodyに追加
    document.body.appendChild(lockDiv);
};



//ロック判定関数を定義
function lockJudgement() {
    //現在のURLを取得
    const currentUrl = window.location.href;
    //現在のURLがロックリストに含まれているか判定する
    const judgement = lockList.some(item => currentUrl.includes(item));
    //判定結果がtrueの場合、lockPage関数を実行
    if (judgement) {
        lockPage();
    }
};

//ページ読み込み時にlockJudgement関数を実行
window.addEventListener('load', lockJudgement);



//lock解除関数を定義
window.cancellation = function() {
    const password_judgement = prompt("パスワードを入力してください:", "");
    if (password_judgement === password) {
        //ロック解除
        document.querySelector('div[id="lockDiv"]').remove();
    }
};