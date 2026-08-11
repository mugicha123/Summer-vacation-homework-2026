//ロックするURLのリスト
const lockList = [
    "https://www.youtube.com/",
    "https://example.com/"
];

// ロック解除用のパスワード
const password = "0123";

//ロック状態を管理する変数
let lock = true;


//lockPage関数を定義
function lockPage() {
    //すでにLockDivが存在する場合は処理を中断
    if (document.getElementById("lockDiv")) return;

    lock = true;

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
    lockDiv.style.zIndex = '2147483647';
    lockDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    lockDiv.style.paddingTop = '100px';
    lockDiv.style.color = 'white';
    lockDiv.style.textAlign = 'center';
    lockDiv.innerHTML = "<h1 style='font-size: 48px'>このページはロックされています</h1><p style='font-size: 20px; margin-bottom: 24px;'>このページはロックされているため、操作できません。</p><button id='lockButton'></button>";

    //LockDivをbodyに追加
    document.body.appendChild(lockDiv);

    //ボタンのスタイルを設定
    const lockButton = document.getElementById("lockButton");
    lockButton.style.display = 'inline-flex';
    lockButton.style.alignItems = 'center';
    lockButton.style.justifyContent = 'center';
    lockButton.style.padding = '10px 20px';
    lockButton.style.fontSize = '16px';
    lockButton.style.fontWeight = '600';
    lockButton.style.color = '#ffffff';
    lockButton.style.textDecoration = 'none';
    lockButton.style.whiteSpace = 'nowrap';
    lockButton.style.backgroundColor = '#2563eb';
    lockButton.style.border = 'none';
    lockButton.style.borderRadius = '8px';
    lockButton.style.cursor = 'pointer';
    lockButton.style.userSelect = 'none';
    
    lockButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
            <path d="M264-624h336v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85h-72q0-80 56.23-136 56.22-56 136-56Q560-912 616-855.84q56 56.16 56 135.84v96h24q29.7 0 50.85 21.15Q768-581.7 768-552v384q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72Q234-96 213-117.15T192-168v-384q0-29.7 21.15-50.85Q234.3-624 264-624Zm0 456h432v-384H264v384Zm267-141.21q21-21.21 21-51T530.79-411q-21.21-21-51-21T429-410.79q-21 21.21-21 51T429.21-309q21.21 21 51 21T531-309.21ZM264-168v-384 384Z"/>
        </svg>&emsp;解除する
    `;

    //buttonのクリックイベントを設定
    lockButton.addEventListener('click', () => {
        window.cancellation();
    });
};



//ロック判定関数を定義
function lockJudgement() {
    if (lock === true) {
        //現在のURLを取得
        const currentUrl = window.location.href;
        //現在のURLがロックリストに含まれているか判定する
        const judgement = lockList.some(item => currentUrl.includes(item));
        //判定結果がtrueの場合、lockPage関数を実行
        if (judgement) {
            lockPage();
        };
    };
};

//ページ読み込み時にlockJudgement関数を実行
window.addEventListener('load', lockJudgement);

//ページ遷移時にlockJudgement関数を実行
window.addEventListener('popstate', lockJudgement);

//URL変更時にを判定
let lastUrl = window.location.href;
const observer = new MutationObserver(() => {
    const newUrl = location.href;
    if (newUrl !== lastUrl) {
        lastUrl = newUrl;
        lockJudgement();
    }
});
//監視対象を設定
observer.observe(document, { subtree: true, childList: true });

//lock解除関数を定義
window.cancellation = function() {
    if (lock === true) {
        const password_judgement = prompt("パスワードを入力してください:", "");
        if (password_judgement === password) {
            //ロック解除
            document.querySelector('div[id="lockDiv"]').remove();
            lock = false;
            // 監視を停止して処理を軽くする
            observer.disconnect();
        };
    };
};