//////////////////////////
// Framework.js
//////////////////////////
// ver0.12b �Z���T�[�@�\�ǉ�
// ver0.12c ZOOM�@�\�ǉ�
//          �_�u���N���b�N
// ver0.12d �A���t�@�u�����h�@�\�C��
// ver0.12e �A���t�@�u�����h�@�\�C��
// ver0.13  ����Đ��@�\�ǉ�
// ver0.14  �E�N���b�N�@�\�ǉ�
// ver0.15  �N���b�N,�X���C�v�@�\�ǉ�
//////////////////////////
//////////////////////////
// �O���[�o���ϐ�
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
var clickBtn = 0;                                       // (2017/07/2 ver0.14 �ǉ�)
var zoomW;
var zoomH;
// (2017/10/19 ver0.15 �ǉ� START)
var mouseOnPosX = 0;
var mouseOnPosY = 0;
var mouseButton = 0;
var mouseMove = 0;
var moveX = 0;
var moveY = 0;
var mouseCurX = 0;
var mouseCurY = 0;
// (2017/10/19 ver0.15 �ǉ� END)

var debugTxt = "---------";

//////////////////////////
// ������
//////////////////////////
onload = function() {
    // ��ʕ\���p�R���e�L�X�g�̎擾
    var canvas = document.getElementById('gamefield');
    if (!canvas || !canvas.getContext) {
        alert("�{�y�[�W�̉{����HTML5�Ή��u���E�U�ōs���Ă�������");
        return false;
    }
    ctx = canvas.getContext('2d');
    //    zoom = (Math.floor((screen.width / 1366) * 100) / 100);
//    zoomW = (Math.floor((document.documentElement.clientWidth / 1366) * 100) / 100);
//    zoomH = (Math.floor((document.documentElement.clientHeight / 768) * 100) / 100);

    zoomW = 1.0;
    zoomH = 1.0;

    ctx.scale(zoomW, zoomH);
    // ���ϐ��̏�����
    width = 1366;
    height = 768;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);
    origin = new point(0, 0);
    bkcolor = "rgb(0,0,0)";
    // ���[�v�Đ��̐ݒ�
    document.getElementById('audioBGM').addEventListener('ended', function() { this.currentTime = 0; this.pause(); document.getElementById('audio_jet').play(); }, false);
    pauseAudio('audioBGM')
    // �L�[�{�[�h�C�x���g�֐��̐ݒ�
// (2017/10/19 ver0.15 �ǉ� START)
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
// (2017/10/19 ver0.15 �ǉ� END)

    window.addEventListener('keydown', keydownfunc, true);
    window.addEventListener('keyup', keyupfunc, true);
    window.addEventListener('devicemotion', devfunc, true);
    canvas.addEventListener('click', mousefunc, true);
    canvas.addEventListener('dblclick', mouseDblfunc, true);
    canvas.addEventListener(touchStartEvent, mouseDownfunc, false);	// (2017/10/19 ver0.15 �ǉ�)
    canvas.addEventListener(touchEndEvent, mouseUpfunc, false);		// (2017/10/19 ver0.15 �ǉ�)
    canvas.addEventListener(touchMoveEvent, mouseMovefunc, false);	// (2017/10/19 ver0.15 �ǉ�)
    // �^�C�}�[�C�x���g�֐��̐ݒ�
    timerID = setInterval('mainLoop()', 16);
//    timerID = setInterval('mainLoop()', 32);
}

///////////////////////////////
// ���C�����[�v
function mainLoop() {
    update();
    keyInit();
}

///////////////////////////////
// �|�C���g�N���X
function point(x, y) {
    this.x = x;
    this.y = y;
}

///////////////////////////////
// �����o��
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
// �L�[���o
// ��L�[�`�F�b�N
function isUp() {
    return keyUp;
}
// ���L�[�`�F�b�N
function isDown() {
    return keyDown;
}
// ���L�[�`�F�b�N
function isLeft() {
    return keyLeft;
}
// �E�L�[�`�F�b�N
function isRight() {
    return keyRight;
}
// A�L�[�`�F�b�N
function isA() {
    return keyA;
}
// B�L�[�`�F�b�N
function isB() {
    return keyB;
}
// C�L�[�`�F�b�N
function isC() {
    return keyC;
}
// D�L�[�`�F�b�N
function isD() {
    return keyD;
}
// E�L�[�`�F�b�N
function isE() {
    return keyE;
}
// END�L�[�`�F�b�N
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
// �L�[�{�[�h�C�x���g�֐�
function keyupfunc(event) {
    var code = event.keyCode;
    switch (code) {
        case 37:    // ���L�[
            keyLeft = 0;
            break;
        case 38:    // ���L�[
            keyUp = 0;
            break;
        case 39:    // ���L�[
            keyRight = 0;
            break;
        case 40:    // ���L�[
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
        case 68:    // A�L�[(D)
            keyA = 1;
            break;
        case 88:    // B�L�[(X)
            keyB = 1;
            break;
        case 83:    // C�L�[(S)
            keyC = 1;
            break;
        case 27:    // Esc�L�[
            keyEnd = 1;
            break;
        case 37:    // ���L�[
            keyLeft = 1;
            event.preventDefault();
            break;
        case 38:    // ���L�[
            keyUp = 1;
            event.preventDefault();
            break;
        case 39:    // ���L�[
            keyRight = 1;
            event.preventDefault();
            break;
        case 40:    // ���L�[
            keyDown = 1;
            event.preventDefault();
            break;
    }
}


/////////////////////////////////////
// �}�E�X�C�x���g�֐�
function mousefunc(event) {
    var rect = event.target.getBoundingClientRect();
    clickPosX = (event.clientX - rect.left) * (1 / zoomW);
    clickPosY = (event.clientY - rect.top) * (1 / zoomH);
    clickS = 1;
    clickBtn = event.buttons;
}

/////////////////////////////////////
// �}�E�X�C�x���g�֐�
function mouseDblfunc(event) {
    var rect = event.target.getBoundingClientRect();
    clickPosX = (event.clientX - rect.left) * (1 / zoomW);
    clickPosY = (event.clientY - rect.top) * (1 / zoomH);
    clickD = 1;
    clickBtn = event.buttons;
}

/////////////////////////////////////
// �N���b�N���o
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

// (2017/10/19 ver0.15 �ǉ� START)

/////////////////////////////////////
// �}�E�X�{�^���A�b�v�C�x���g�֐�
function mouseUpfunc(event) {
    mouseButton = 0;
    mouseMove = 0;
}
function getMouseButton() {
    return mouseButton;
}

/////////////////////////////////////
// �}�E�X�{�^���_�E���C�x���g�֐�
function mouseDownfunc(event) {

    event.preventDefault();
    if (event.buttons == 0x0001) {
        mouseOnPosX = event.clientX;
        mouseOnPosY = event.clientY;
        mouseButton = 1;
        
    }
}

/////////////////////////////////////
// �}�E�X�ړ��C�x���g�֐�
function mouseMovefunc(event) {

    event.preventDefault();    
    mouseCurX = event.clientX;
    mouseCurY = event.clientY;

    // �ړ��`�F�b�N
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
// �X���C�v���o
function isSwipe() {
    var ret = 0;
    if (mouseButton == 1 && mouseMove == 1) {
        ret = 1;
    }
    return ret;
}

/////////////////////////////////////
// �}�E�X�ړ����o
function isMouseMove() {
    return mouseMove;
}

function getMousePos() {
    return [Math.floor(mouseCurX), Math.floor(mouseCurY)];
}
// (2017/10/19 ver0.15 �ǉ� END)

/////////////////////////////////////
// �C���[�W�N���X
/////////////////////////////////////
function image(fname) {
    // �R���X�g���N�^
    var imgObj;
    var mAlpha;                                          // (2015/09/20 ver0.12d �C�� alph -> mAlph) (2016/10/13 ver0.12e �C�� alph -> mAlpha)
    imgObj = new Image();
    imgObj.src = fname;
    mAlpha = 1.0;

    /////////////////////////////////////
    // �A���t�@�u�����h�ݒ�֐�
    this.setAlpha = function(alpha) {
        mAlpha = alpha;
    }

    /////////////////////////////////////
    // �`��֐�
    this.draw = function(dx, dy, srcX, srxY, width, height) {
        ctx.save();                                     // canvas�̏�Ԃ���U�ۑ� (2015/09/20 ver0.12d �ǉ�)
        ctx.globalAlpha = mAlpha;
        ctx.drawImage(imgObj, srcX, srxY, width, height, dx, dy, width, height);
        ctx.restore();                                  // canvas�̏�Ԃ����ɖ߂�(2015/09/20 ver0.12d �ǉ�)
    }

    /////////////////////////////////////
    // �`��֐�
    this.drawDeg = function(dx, dy, srcX, srxY, width, height, deg) {
        var rad = Math.PI * deg / 360;                  // vx, vy �ō��x�N�g���̕����ɉ�] 
        ctx.save();                                     // canvas�̏�Ԃ���U�ۑ�
        ctx.translate(dx + width / 2, dy + height / 2); // ���_���ړ�
        ctx.rotate(rad);                                // ��]��K�p
        ctx.translate(-1 * (dx + width / 2), -1 * (dy + height / 2));
        ctx.drawImage(imgObj, srcX, srxY, width, height, dx, dy, width, height);
        ctx.globalAlpha = mAlpha;
        ctx.restore();                                  // canvas�̏�Ԃ����ɖ߂�
    }

    /////////////////////////////////////
    // �`��֐�
    this.drawTransForm = function(dx, dy, srcX, srxY, width, height, deg, scale) {
        var rad = Math.PI * deg / 360;                  // vx, vy �ō��x�N�g���̕����ɉ�]
        var calcW = width * scale;
        var calcH = height * scale;
        var posX = dx;
        var posY = dy;
        ctx.save();                                     // canvas�̏�Ԃ���U�ۑ�
        // ��]����
        ctx.translate(dx + width / 2, dy + height / 2); // ���_���ړ�
        ctx.rotate(rad);                                // ��]��K�p
        ctx.translate(-1 * (dx + width / 2), -1 * (dy + height / 2));
        // �g��k������
        posX = posX + ((width - calcW) / 2);
        posY = posY + ((height - calcH) / 2);
        ctx.globalAlpha = mAlpha;
        ctx.drawImage(imgObj, srcX, srxY, width, height, posX, posY, width * scale, height * scale);
        ctx.restore();                                  // canvas�̏�Ԃ����ɖ߂�
    }
}

/////////////////////////////////////
// ��`�`��
/////////////////////////////////////
function drawFill(dx, dy, width, height, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(dx, dy, width, height);
    ctx.stroke();
}

/////////////////////////////////////
// �~�`��
/////////////////////////////////////
function drawArc(dx, dy, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(dx, dy, r, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
}

/////////////////////////////////////
// �����擾
/////////////////////////////////////
function getRand(max) {
    return (parseInt(Math.random() * (max + 1)));
}

/////////////////////////////////////
// �����`��
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
// �����\��
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
// Sound�N���X
/////////////////////////////////////
function SoundManager() {
    // �R���X�g���N�^

    /////////////////////////////////////
    // BGM Start �֐�
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
    // BGM Stop �֐�
    this.stop = function(name) {
        document.getElementById(name).pause();
    }
}

function devfunc(event) {
    /***
    //�����x
    var x = evt.acceleration.x;
    var y = evt.acceleration.y;
    var z = evt.acceleration.z;


    //�X��
    var xg = evt.accelerationIncludingGravity.x;
    var yg = evt.accelerationIncludingGravity.y;
    var zg = evt.accelerationIncludingGravity.z;

    //��]�l
    var a = evt.rotationRate.alpha; //z����
    var b = evt.rotationRate.beta; //x����
    var g = evt.rotationRate.gamma; // y����

    debugTxt = "x:" + x + " ";
    debugTxt += "y:" + y + " ";
    debugTxt += "z:" + z + " ";

    debugTxt += "�X��x:" + xg + " ";
    debugTxt += "�X��y:" + yg + " ";
    debugTxt += "�X��z:" + zg + " ";

    debugTxt += "alpha(z):" + a + " ";
    debugTxt += "beta(x):" + b + " ";
    debugTxt += "gamma(y):" + g + " ";

    //   console.log(debugTxt);
    ***/
}

/////////////////////////////////////
// �r�f�I�N���X 
// (2017/04/15 ver0.13 �@�\�ǉ�)
/////////////////////////////////////
function video( vname, frmInitPos ) {
    // �R���X�g���N�^
    var mVideo;                                         // Video�I�u�W�F�N�g
    var mtFrmStartPos;                                  // �t���[���J�n�ʒu
    var mtFrmEndPos;                                    // �t���[���I���ʒu
    var mDuration;

    mVideo = document.getElementById(vname);            // �Ǎ�
    while(mVideo.readyState == 0);			            // �Ǎ��҂����[�v
//console.log("B:"+mVideo.readyState);
    mVideo.currentTime  = frmInitPos;			        // �J�n�ʒuSEEK
//console.log("C:"+mVideo.readyState);
    mtFrmStartPos = mVideo.seekable.start(0);    	    // �t���[���J�n�ʒu
    mtFrmEndPos = mVideo.seekable.end(0);    	    	// �t���[���I���ʒu
//mDuration = mVideo.duration;

    /////////////////////////////////////
    // �t���[���`��֐�
    this.frmDraw = function(dx, dy, frmPos, width, height) {
        mVideo.currentTime  = frmPos;
        ctx.drawImage( mVideo, dx, dy, width, height);
    }

    /////////////////////////////////////
    // �t���[���ʒu�ݒ�֐�
    this.frmSetPos = function( frmPos ) {
        mVideo.currentTime  = frmPos;
    }

    /////////////////////////////////////
    // �J�n�ʒu�擾�֐�
    this.getFrmStartPos = function() {
        return mtFrmStartPos;
    }

    /////////////////////////////////////
    // �I�[�ʒu�擾�֐�
    this.getFrmEndPos = function() {
        return mtFrmEndPos;
    }
}
