//////////////////////////
// Framework.js
//////////////////////////
// ver0.12b センサー機能追加
// ver0.12c ZOOM機能追加
//          ダブルクリック
// ver0.12d アルファブレンド機能修正
// ver0.12e アルファブレンド機能修正
// ver0.13  動画再生機能追加
// ver0.14  右クリック機能追加
// ver0.15  クリック,スワイプ機能追加
//////////////////////////
//////////////////////////
// グローバル変数
//////////////////////////
var width, height;
var ctx;
var timerID;
var soundon = 1;
var origin;
var bkcolor, color;
var keyUp = 0;
var keyDown = 0;
var keyLeft = 0;
var keyRight = 0;
var keyA = 0;
var keyB = 0;
var keyC = 0;
var keyD = 0;
var keyE = 0;
var keyEnd = 0;
var clickS = 0;
var clickD = 0;
var clickPosX = 0;
var clickPosY = 0;
var clickBtn = 0;                                       // (2017/07/2 ver0.14 追加)
var zoomW;
var zoomH;
// (2017/10/19 ver0.15 追加 START)
var mouseOnPosX = 0;
var mouseOnPosY = 0;
var mouseButton = 0;
var mouseMove = 0;
var moveX = 0;
var moveY = 0;
var mouseCurX = 0;
var mouseCurY = 0;
// (2017/10/19 ver0.15 追加 END)

var debugTxt = "---------";

//////////////////////////
// 初期化
//////////////////////////
onload = function() {
    // 画面表示用コンテキストの取得
    var canvas = document.getElementById('gamefield');
    if (!canvas || !canvas.getContext) {
        alert("本ページの閲覧はHTML5対応ブラウザで行ってください");
        return false;
    }
    ctx = canvas.getContext('2d');
    //    zoom = (Math.floor((screen.width / 1366) * 100) / 100);
//    zoomW = (Math.floor((document.documentElement.clientWidth / 1366) * 100) / 100);
//    zoomH = (Math.floor((document.documentElement.clientHeight / 768) * 100) / 100);

    zoomW = 1.0;
    zoomH = 1.0;

    ctx.scale(zoomW, zoomH);
    // 大域変数の初期化
    width = 1366;
    height = 768;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);
    origin = new point(0, 0);
    bkcolor = "rgb(0,0,0)";
    // ループ再生の設定
    document.getElementById('audioBGM').addEventListener('ended', function() { this.currentTime = 0; this.pause(); document.getElementById('audio_jet').play(); }, false);
    pauseAudio('audioBGM')
    // キーボードイベント関数の設定
// (2017/10/19 ver0.15 追加 START)
    var suport;
    support = {
        mspointer: window.navigator.msPointerEnabled,
        touch: 'ontouchstart' in window
    };
    var touchStartEvent =
    support.mspointer ? 'MSPointerDown' :
    support.touch ? 'touchstart' :
    'mousedown';

    support = {
        mspointer: window.navigator.msPointerEnabled,
        touch: 'ontouchend' in window
    };
    var touchEndEvent =
    support.mspointer ? 'MSPointerUp' :
    support.touch ? 'touchend' :
    'mouseup';

    support = {
        mspointer: window.navigator.msPointerEnabled,
        touch: 'ontouchmove' in window
    };
    var touchMoveEvent =
    support.mspointer ? 'MSPointerMove' :
    support.touch ? 'touchmove' :
    'mousemove';
// (2017/10/19 ver0.15 追加 END)

    window.addEventListener('keydown', keydownfunc, true);
    window.addEventListener('keyup', keyupfunc, true);
    window.addEventListener('devicemotion', devfunc, true);
    canvas.addEventListener('click', mousefunc, true);
    canvas.addEventListener('dblclick', mouseDblfunc, true);
    canvas.addEventListener(touchStartEvent, mouseDownfunc, false);	// (2017/10/19 ver0.15 追加)
    canvas.addEventListener(touchEndEvent, mouseUpfunc, false);		// (2017/10/19 ver0.15 追加)
    canvas.addEventListener(touchMoveEvent, mouseMovefunc, false);	// (2017/10/19 ver0.15 追加)
    // タイマーイベント関数の設定
    timerID = setInterval('mainLoop()', 16);
//    timerID = setInterval('mainLoop()', 32);
}

///////////////////////////////
// メインループ
function mainLoop() {
    update();
    keyInit();
}

///////////////////////////////
// ポイントクラス
function point(x, y) {
    this.x = x;
    this.y = y;
}

///////////////////////////////
// 音声出力
function playAudio(name) {
    try {
        document.getElementById(name).currentTime = 0;
        document.getElementById(name).volume = 1.0;
        document.getElementById(name).play();
    } catch (e) {
        // for IE9
        document.getElementById(name).volume = 1.0;
        document.getElementById(name).play();
    }
}
function pauseAudio(name) {
    document.getElementById(name).pause();
}

/////////////////////////////////////
// キー検出
// 上キーチェック
function isUp() {
    return keyUp;
}
// 下キーチェック
function isDown() {
    return keyDown;
}
// 左キーチェック
function isLeft() {
    return keyLeft;
}
// 右キーチェック
function isRight() {
    return keyRight;
}
// Aキーチェック
function isA() {
    return keyA;
}
// Bキーチェック
function isB() {
    return keyB;
}
// Cキーチェック
function isC() {
    return keyC;
}
// Dキーチェック
function isD() {
    return keyD;
}
// Eキーチェック
function isE() {
    return keyE;
}
// ENDキーチェック
function isEnd() {
    return keyEnd;
}

function keyInit() {
    keyA = 0;
    keyB = 0;
    keyC = 0;
    keyEnd = 0;
    keyLeft = 0;
    keyUp = 0;
    keyRight = 0;
    keyDown = 0;
    clickS = 0;
    clickD = 0;
    clickPosX = 0;
    clickPosY = 0;
}

/////////////////////////////////////
// キーボードイベント関数
function keyupfunc(event) {
    var code = event.keyCode;
    switch (code) {
        case 37:    // ←キー
            keyLeft = 0;
            break;
        case 38:    // ↑キー
            keyUp = 0;
            break;
        case 39:    // →キー
            keyRight = 0;
            break;
        case 40:    // ↓キー
            keyDown = 0;
            break;
    }
}
function keydownfunc(event) {
    var code = event.keyCode;
    if (window.opera) {
        document.focusform.focustext.focus();
    }
    switch (code) {
        case 68:    // Aキー(D)
            keyA = 1;
            break;
        case 88:    // Bキー(X)
            keyB = 1;
            break;
        case 83:    // Cキー(S)
            keyC = 1;
            break;
        case 27:    // Escキー
            keyEnd = 1;
            break;
        case 37:    // ←キー
            keyLeft = 1;
            event.preventDefault();
            break;
        case 38:    // ↑キー
            keyUp = 1;
            event.preventDefault();
            break;
        case 39:    // →キー
            keyRight = 1;
            event.preventDefault();
            break;
        case 40:    // ↓キー
            keyDown = 1;
            event.preventDefault();
            break;
    }
}


/////////////////////////////////////
// マウスイベント関数
function mousefunc(event) {
    var rect = event.target.getBoundingClientRect();
    clickPosX = (event.clientX - rect.left) * (1 / zoomW);
    clickPosY = (event.clientY - rect.top) * (1 / zoomH);
    clickS = 1;
    clickBtn = event.buttons;
}

/////////////////////////////////////
// マウスイベント関数
function mouseDblfunc(event) {
    var rect = event.target.getBoundingClientRect();
    clickPosX = (event.clientX - rect.left) * (1 / zoomW);
    clickPosY = (event.clientY - rect.top) * (1 / zoomH);
    clickD = 1;
    clickBtn = event.buttons;
}

/////////////////////////////////////
// クリック検出
/////////////////////////////////////
function isClick() {
    return clickS;
}

function isDblClick() {
    return clickD;
}


function getClickPos() {
    return [Math.floor(clickPosX), Math.floor(clickPosY)];
}

function getClickButton(){
    return clickBtn;
}

// (2017/10/19 ver0.15 追加 START)

/////////////////////////////////////
// マウスボタンアップイベント関数
function mouseUpfunc(event) {
    mouseButton = 0;
    mouseMove = 0;
}
function getMouseButton() {
    return mouseButton;
}

/////////////////////////////////////
// マウスボタンダウンイベント関数
function mouseDownfunc(event) {

    event.preventDefault();
    if (event.buttons == 0x0001) {
        mouseOnPosX = event.clientX;
        mouseOnPosY = event.clientY;
        mouseButton = 1;
        
    }
}

/////////////////////////////////////
// マウス移動イベント関数
function mouseMovefunc(event) {

    event.preventDefault();    
    mouseCurX = event.clientX;
    mouseCurY = event.clientY;

    // 移動チェック
    if (mouseButton == 1) {

        moveX = Math.abs(Math.floor(mouseOnPosX - mouseCurX));
        moveY = Math.abs(Math.floor(mouseOnPosY - mouseCurY));

        if (moveX < 10 && moveY < 10) {
            mouseMove = 0;
        } else {
            mouseMove = 1;
        }
    }
}

function getMouseMove() {
    return mouseMove;
}


/////////////////////////////////////
// スワイプ検出
function isSwipe() {
    var ret = 0;
    if (mouseButton == 1 && mouseMove == 1) {
        ret = 1;
    }
    return ret;
}

/////////////////////////////////////
// マウス移動検出
function isMouseMove() {
    return mouseMove;
}

function getMousePos() {
    return [Math.floor(mouseCurX), Math.floor(mouseCurY)];
}
// (2017/10/19 ver0.15 追加 END)

/////////////////////////////////////
// イメージクラス
/////////////////////////////////////
function image(fname) {
    // コンストラクタ
    var imgObj;
    var mAlpha;                                          // (2015/09/20 ver0.12d 修正 alph -> mAlph) (2016/10/13 ver0.12e 修正 alph -> mAlpha)
    imgObj = new Image();
    imgObj.src = fname;
    mAlpha = 1.0;

    /////////////////////////////////////
    // アルファブレンド設定関数
    this.setAlpha = function(alpha) {
        mAlpha = alpha;
    }

    /////////////////////////////////////
    // 描画関数
    this.draw = function(dx, dy, srcX, srxY, width, height) {
        ctx.save();                                     // canvasの状態を一旦保存 (2015/09/20 ver0.12d 追加)
        ctx.globalAlpha = mAlpha;
        ctx.drawImage(imgObj, srcX, srxY, width, height, dx, dy, width, height);
        ctx.restore();                                  // canvasの状態を元に戻す(2015/09/20 ver0.12d 追加)
    }

    /////////////////////////////////////
    // 描画関数
    this.drawDeg = function(dx, dy, srcX, srxY, width, height, deg) {
        var rad = Math.PI * deg / 360;                  // vx, vy で作るベクトルの方向に回転 
        ctx.save();                                     // canvasの状態を一旦保存
        ctx.translate(dx + width / 2, dy + height / 2); // 原点を移動
        ctx.rotate(rad);                                // 回転を適用
        ctx.translate(-1 * (dx + width / 2), -1 * (dy + height / 2));
        ctx.drawImage(imgObj, srcX, srxY, width, height, dx, dy, width, height);
        ctx.globalAlpha = mAlpha;
        ctx.restore();                                  // canvasの状態を元に戻す
    }

    /////////////////////////////////////
    // 描画関数
    this.drawTransForm = function(dx, dy, srcX, srxY, width, height, deg, scale) {
        var rad = Math.PI * deg / 360;                  // vx, vy で作るベクトルの方向に回転
        var calcW = width * scale;
        var calcH = height * scale;
        var posX = dx;
        var posY = dy;
        ctx.save();                                     // canvasの状態を一旦保存
        // 回転処理
        ctx.translate(dx + width / 2, dy + height / 2); // 原点を移動
        ctx.rotate(rad);                                // 回転を適用
        ctx.translate(-1 * (dx + width / 2), -1 * (dy + height / 2));
        // 拡大縮小処理
        posX = posX + ((width - calcW) / 2);
        posY = posY + ((height - calcH) / 2);
        ctx.globalAlpha = mAlpha;
        ctx.drawImage(imgObj, srcX, srxY, width, height, posX, posY, width * scale, height * scale);
        ctx.restore();                                  // canvasの状態を元に戻す
    }
}

/////////////////////////////////////
// 矩形描画
/////////////////////////////////////
function drawFill(dx, dy, width, height, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(dx, dy, width, height);
    ctx.stroke();
}

/////////////////////////////////////
// 円描画
/////////////////////////////////////
function drawArc(dx, dy, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(dx, dy, r, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
}

/////////////////////////////////////
// 乱数取得
/////////////////////////////////////
function getRand(max) {
    return (parseInt(Math.random() * (max + 1)));
}

/////////////////////////////////////
// 直線描画
/////////////////////////////////////
function drawLine(dx0, dy0, dx1, dy1, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(dx0, dy0);
    ctx.lineTo(dx1, dy1);
    ctx.stroke();
}

/////////////////////////////////////
// 文字表示
/////////////////////////////////////
function drawString(dx, dy, color, font, str) {
    var tm;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = font;
    tm = ctx.measureText(str);
    ctx.fillText(str, dx, dy);
    ctx.stroke();
}

/////////////////////////////////////
// Soundクラス
/////////////////////////////////////
function SoundManager() {
    // コンストラクタ

    /////////////////////////////////////
    // BGM Start 関数
    this.play = function(name) {
        try {
            document.getElementById(name).currentTime = 0;
            document.getElementById(name).volume = 1.0;
            document.getElementById(name).play();
        } catch (e) {
            // for IE9
            document.getElementById(name).volume = 1.0;
            document.getElementById(name).play();
        }
    }
    /////////////////////////////////////
    // BGM Stop 関数
    this.stop = function(name) {
        document.getElementById(name).pause();
    }
}

function devfunc(event) {
    /***
    //加速度
    var x = evt.acceleration.x;
    var y = evt.acceleration.y;
    var z = evt.acceleration.z;


    //傾き
    var xg = evt.accelerationIncludingGravity.x;
    var yg = evt.accelerationIncludingGravity.y;
    var zg = evt.accelerationIncludingGravity.z;

    //回転値
    var a = evt.rotationRate.alpha; //z方向
    var b = evt.rotationRate.beta; //x方向
    var g = evt.rotationRate.gamma; // y方向

    debugTxt = "x:" + x + " ";
    debugTxt += "y:" + y + " ";
    debugTxt += "z:" + z + " ";

    debugTxt += "傾きx:" + xg + " ";
    debugTxt += "傾きy:" + yg + " ";
    debugTxt += "傾きz:" + zg + " ";

    debugTxt += "alpha(z):" + a + " ";
    debugTxt += "beta(x):" + b + " ";
    debugTxt += "gamma(y):" + g + " ";

    //   console.log(debugTxt);
    ***/
}

/////////////////////////////////////
// ビデオクラス 
// (2017/04/15 ver0.13 機能追加)
/////////////////////////////////////
function video( vname, frmInitPos ) {
    // コンストラクタ
    var mVideo;                                         // Videoオブジェクト
    var mtFrmStartPos;                                  // フレーム開始位置
    var mtFrmEndPos;                                    // フレーム終了位置
    var mDuration;

    mVideo = document.getElementById(vname);            // 読込
    while(mVideo.readyState == 0);			            // 読込待ちループ
//console.log("B:"+mVideo.readyState);
    mVideo.currentTime  = frmInitPos;			        // 開始位置SEEK
//console.log("C:"+mVideo.readyState);
    mtFrmStartPos = mVideo.seekable.start(0);    	    // フレーム開始位置
    mtFrmEndPos = mVideo.seekable.end(0);    	    	// フレーム終了位置
//mDuration = mVideo.duration;

    /////////////////////////////////////
    // フレーム描画関数
    this.frmDraw = function(dx, dy, frmPos, width, height) {
        mVideo.currentTime  = frmPos;
        ctx.drawImage( mVideo, dx, dy, width, height);
    }

    /////////////////////////////////////
    // フレーム位置設定関数
    this.frmSetPos = function( frmPos ) {
        mVideo.currentTime  = frmPos;
    }

    /////////////////////////////////////
    // 開始位置取得関数
    this.getFrmStartPos = function() {
        return mtFrmStartPos;
    }

    /////////////////////////////////////
    // 終端位置取得関数
    this.getFrmEndPos = function() {
        return mtFrmEndPos;
    }
}
