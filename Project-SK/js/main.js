var gFirstFlg = 1;
var BULLET_NUM = 8;
var EBULLET_NUM = 100;
var gBulletObj = [];
var gEBulletObj = [];
var gBulletX = 0;
var gBulletY = 0;
var Bullet_limit = 100;
var SODN = 0; //撃墜数
var Bullet_hit;
var gPosX;
var gImage;
var gImageT;
var gImageS1;
var gImageS2;
var gImageGt;
var gImagePs;
var gImageET;
var gImageBb;
var gScene;
var time;
var Pspeed;
var i;
var Pdirection;

var gImageObj;
var gBackX0;
var gBackY0;
var gBackX1;
var gBackY1;
var gImgW = 680;
var gImgH = 768;
var gMapEnd = -3072;
var gSpeedN = 2;
var gMapPosY;
var gcanceloutY; //マップポス打ち消し用
var gStage;
var hpHeartImg;             /*filled heart*/
var hpEmpty;                /*Empty Heart*/
var hpHeartImgWidth = 100;  
var hpHeartImgHeight = 100;
var playerHP = 3;           /*current player HP*/
var maxHp = 5;              /*Maximum HP*/
var hpStartX = 1050;        /* HP Bar position X axis*/
var hpStartY = 658;         /* HP Bar position Y axis*/
var hpSpacing = 5;          /*Space between hearts*/
const playerPos = {
    x: gPosX,
    y: 658,
    width: 100,
    height: 100,
};

var OBJ_NUM = 7;

var OBJ_X_DATA = 600;

var OBJ_Y_DATA = [
    [-800, -900, -1200, -1800, -2100, -2200, -2300],
    [-800, -1200, -1900, -8000, -2100, -2200, -2300],
    [-800, -900, -1200, -1800, -2100, -2200, -2300],
    [-800, -900, -1200, -1800, -2100, -2200, -2300]
];


var OBJ_SRCX_DATA = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

var BG_COLOR = ["WHITE", "BLUE", "BLACK", "GREEN"];

function update() {

    var pos;
    var str;
    var font;
    var speed;
    var j, idx;
    var k;
    var L;


    if (gFirstFlg == 1) {
        gImageT = new image("./images/TitleScreen.png"); //タイトル
        gImageS1 = new image("./images/Summary1.png"); //ストーリー１２３
        gImageS2 = new image("./images/Summary2.png");
        gImageGt = new image("./images/gameTemplatepng.png"); //背景
        gImage = new image("./images/PlayerG.png"); //自機
        gImagePs = new image("./images/Pshot.png"); //弾自機
        gImageET = new image("./images/Tentacle.png"); //テンタ
        gImageBb = new image("./images/Bombeffect.png");
        hpHeartImg = new image("./images/hpHeart.png");
        hpEmpty = new image("./images/hpEmpty.png");
        gPspeed = 10;    //自機速度
        SODN = 0; //撃墜数
        gBackX = 0;
        gBackY0 = 0;
        gBackY1 = 768;
        gMapPosY = 0;
        gcanceloutY = 0;
        Pdirection = 100;
        gStage = 0;
        //自機用
        for (i = 0; i < BULLET_NUM; i++) {
            gBulletObj[i] = new bullet();
        }
        //敵用
        for (k = 0; k < EBULLET_NUM; k++) {
            gEBulletObj[k] = new Ebullet();
        }
        gDispCnt = 0;
        gScene = 0; //画面遷移     
        gFirstFlg = 0;      //初期化用
        time = 0;   // ストーリー画面遷移
        gPosX = 633;    //自機座標
        Pdirection = 100;   //自機向き制御

    }





    if (gScene == 0) {
        ////////////////////タイトル部分
        gImageT.draw(0, 0, 0, 0, 1366, 768);
        if (isC()) {
            gScene = 2;
            time = 0;
        }
        drawString(300, 100, "red", "24px 'HG創英角ゴシックUB'", "gScens" + gScene)

    } else if (gScene == 1) {
        //////////////// ストーリー画面
        if (time <= 120) {
            gImageS1.draw(0, 0, 0, 0, 1366, 768);
            time++;
        } else if (time >= 120 && time <= 240) {
            gImageS2.draw(0, 0, 0, 0, 1366, 768);
            time++;
        } else if (time >= 240) {
            gScene = 2;
            time = 0;
        }
        drawString(300, 50, "red", "24px 'HG創英角ゴシックUB'", "Time" + time)
        drawString(300, 100, "red", "24px 'HG創英角ゴシックUB'", "gScens" + gScene)

    } else if (gScene == 2) {

        ////////////////////ゲーム部分///////////////////////////////////
        //ゲーム画面白
        drawFill(0, 0, 1366, 768, BG_COLOR[gStage]);
        gImageGt.draw(343, 0, 0, 0, 680, 768);

        ///////////////////////////////////////////////////背景
        ///////////////////////////////////////////////////////
        if (gMapPosY > gMapEnd) {
            gBackY0 -= gSpeedN;
            gBackY1 += gSpeedN;
            gMapPosY -= gSpeedN;
        } else {
            gBackY0 = 768;
            gBackY1 = 0;
            gMapPosY = 0;
            gStage++;
            L = -1;
            if (gStage > 3) {
                gStage = 0;
                OBJ_Y_DATA = [
                    [-100, -900, -1200, -1800, -2100, -2200, -2300],
                    [-800, -1200, -1900, -8000, -2100, -2200, -2300],
                    [-800, -900, -1200, -1800, -2100, -2200, -2300],
                    [-800, -900, -1200, -1800, -2100, -2200, -2300]
                ];
            }
        }
        if (gBackY0 < 0) {
            gBackY0 = 768;
        }
        if ((gImgH - gBackY0) > 0) {
            gImageGt.draw(343, 0, 0, gBackY0, gImgW, (gImgH + gBackY0));
        }
        if (gBackY1 > 768) {
            gBackY1 = 0;
        }
        if ((gImgH - gBackY1) > 0) {
            gImageGt.draw(343, gBackY1, 0, 0, gImgW, (gImgH + gBackY1));
        }
        drawString(0, 150, "red", "24px 'HG創英角ゴシックUB'", "gcanceloutY" + gcanceloutY)
        drawString(0, 200, "red", "24px  'HG創英角ｺﾞｼｯｸUB'", "STAGE:" + gStage + "MAP POS:" + gMapPosY + "_" + (gMapPosY - 768));
        drawString(0, 250, "red", "24px  'HG創英角ｺﾞｼｯｸUB'", "gBackY0" + gBackY0);
        drawString(0, 300, "red", "24px  'HG創英角ｺﾞｼｯｸUB'", "gBackY1" + gBackY1);
        drawString(300, 150, "red", "24px 'HG創英角ゴシックUB'", "－検証" + (-96) - gMapPosY)
        ////////////////////////////////////////////
        ///////////////////////////////////////////弾
        time++; //弾発射間隔の制御
        //キー入力処理
        if (isC()) {
            Pdirection = 100;
            if (time >= 30) {
                time = 0;
                for (i = 0; i < BULLET_NUM; i++) {
                    if (Bullet_limit >= 0) {//残弾数
                        Bullet_limit++;
                        if (gBulletObj[i].getActive() == 0) {
                            var clickPos = getClickPos();
                            gBulletObj[i].shot((gPosX + 47), 658, 0, 8);
                            break;              //銃口X   //銃口Y
                        }
                    }
                }
            }
        }


        //更新処理
        for (i = 0; i < BULLET_NUM; i++) {
            gBulletObj[i].update();
        }

        /////////////////////////////////////////////////
        /////////////////////////////////////////////////自機移動
        if (isLeft() && gPosX >= 343) {         //hidari
            gPosX -= gPspeed;
            Pdirection = 0;
        } else if (isRight() && gPosX <= 923) {        //migi
            gPosX += gPspeed;
            Pdirection = 200;
        }



        gImage.draw(gPosX, 658, Pdirection, 0, 100, 100); //自機hyouji
        ///////////////////////////////////////////
        ///////////////////////////////////////////敵テンタ表示
        for (idx = 0; idx < OBJ_NUM; idx++) {
            if (OBJ_Y_DATA[gStage][idx] > gMapPosY && OBJ_Y_DATA[gStage][idx] < (gMapPosY + 100)) {
                var dir = getRand(10); //敵プルプル
                var dis = getRand(10); //敵プルプル
                if (dir % 2 == 0) {
                    dir = -1;
                } else {
                    dir = 1;
                }

                if ((gBulletX - (OBJ_X_DATA + dir * dis)) <= 80 && (gBulletX - (OBJ_X_DATA + dir * dis)) >= 0 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 80 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) >= 0) {
                    gImageBb.draw((OBJ_X_DATA + dir * dis), (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80);  //敵と弾が重なると爆発表示
                    Bullet_hit = 1; //弾消す
                    if ((gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 10) {
                        OBJ_Y_DATA[gStage][idx] = -9999; //爆発したら消える
                        SODN++; //撃墜数+１
                        Bullet_hit = 0;
                    }
                } else {
                    gImageET.draw((OBJ_X_DATA + dir * dis), (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80); //それ以外は敵を表示
                    Bullet_hit = 0;
                }
            } else if (OBJ_Y_DATA[gStage][idx] > (gMapPosY + 100) && OBJ_Y_DATA[gStage][idx] < (gMapPosY + 768)) {
                var dir = getRand(10); //敵プルプル
                var dis = getRand(10); //敵プルプル
                if (dir % 2 == 0) {
                    dir = -1;
                } else {
                    dir = 1;
                }

                if ((gBulletX - (OBJ_X_DATA + dir * dis)) <= 80 && (gBulletX - (OBJ_X_DATA + dir * dis)) >= 0 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 80 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) >= 0) {
                    gImageBb.draw((OBJ_X_DATA + dir * dis), (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80);  //敵と弾が重なると爆発表示
                    Bullet_hit = 1; //弾消す
                    if ((gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 10) {
                        OBJ_Y_DATA[gStage][idx] = -9999; //爆発したら消える
                        SODN++; //撃墜数+１
                        Bullet_hit = 0;
                    }
                } else {
                    OBJ_Y_DATA[gStage][idx] -= gSpeedN;
                    gImageET.draw((OBJ_X_DATA + dir * dis), (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80); //それ以外は敵を表示
                    Bullet_hit = 0;
                    if (isA()) {
                        for (k = 0; k < EBULLET_NUM; k++) {
                            if (gEBulletObj[k].getEActive() == 0) {
                                var clickPos = getClickPos();
                                gEBulletObj[k].Eshot(640, 180, 0, 10); //10gasokudo
                                break;
                            }
                        }
                    }
                }
            }

        }

        for (k = 0; k < EBULLET_NUM; k++) {
            gEBulletObj[k].update();
        }

    for (let i = 0; i < EBULLET_NUM; i++) {
        const eBullet = gEBulletObj[i];
        if (eBullet.getEActive() && checkCollision(playerPos, eBullet)) {

            playerHP--;

            eBullet.setEActive(0); /*деактивация пули*/
            
            if (playerHP <= 0) {
                gScene = 3; /* сцена окончания*/
            }
        }
    }
    
    drawHP(); 

    }
    
    //敵






}
function drawHP() {
    for (var i = 0; i < maxHp; i++) {
         var heartX = hpStartX + i * (hpHeartImgWidth + hpSpacing);

         if (i < playerHP) {
            // Отрисовка заполненного сердца
            hpHeartImg.draw(heartX, hpStartY, 0, 0, hpHeartImgWidth, hpHeartImgHeight);
        } else {
            // Если нужно отображать "пустые" сердца, можно добавить другое изображение
            hpEmpty.draw(heartX, hpStartY, hpHeartImgWidth, hpHeartImgHeight, "gray");
        }
    }

}

function checkCollision(obj1, obj2) {       /*obj1 - player, obj2 - enemy/bullet*/
    return (
        obj1.x < obj2.x + obj2.width && /*левая сторона obj1 левее правой стороной obj2*/
        obj1.x + obj1.width > obj2.x && /*правая сторона obj1 правее левой стороны obj2*/
        obj1.y < obj2.y + obj2.height && /*верхняя сторона obj1 выше нижней стороны obj2*/
        obj1.y + obj1.height > obj2.y     /*Нижняя сторона obj1 ниже верхней стороны obj2*/
    );
}


//byouga    gazo   kyanpasu    gazousaizu
//gImage.draw(0, 0, 0, 0, 1366, 768);



/////////////////////////////////////
// 弾クラス
/////////////////////////////////////
function bullet() {
    // コンストラクタ
    var mSpeed = 10;
    var mPoint = { x: 0, y: 0 };
    var mAngle = 0;
    var mRadians, mMoveX, mMoveY;
    var mActiveFlg = 0; // 0:InActive 1:Active
    /////////////////////////////////////
    // 更新関数
    this.update = function() {

        if (mActiveFlg) {
            gImagePs.draw(mPoint.x, mPoint.y, 0, 0, 10, 40); //弾位置         
            mPoint.x -= mMoveY;
            mPoint.y -= mMoveX;
            gBulletX = mPoint.x;
            gBulletY = mPoint.y;
            // 画面外処理
            if ((mPoint.x + 50 > 1366 || mPoint.x < 0) || (mPoint.y + 50 > 768 || mPoint.y < 0)) {
                mActiveFlg = 0;
            }
        }
    }

    this.setActive = function(flg) {
        mActiveFlg = flg;
    }
    this.getActive = function() {
        return mActiveFlg;
    }
    this.getPos = function() {
        return [mPoint.x, mPoint.y];
    }
    this.shot = function(x, y, angle, speed) {
        mPoint.x = x;
        mPoint.y = y;
        mAngle = angle;
        mSpeed = speed;
        mRadians = mAngle * Math.PI / 180;
        mMoveX = Math.cos(mRadians) * mSpeed;
        mMoveY = Math.sin(mRadians) * mSpeed;
        mActiveFlg = 1;
    }

}



/////////////////////////////////////
// 敵弾クラス
/////////////////////////////////////
function Ebullet() {
    // コンストラクタ
    var EmSpeed = 10;
    var EmPoint = { x: 0, y: 0 };
    var EmAngle = 0;
    var EmRadians, EmMoveX, EmMoveY;
    var EmActiveFlg = 0; // 0:InActive 1:Active
    /////////////////////////////////////
    // 更新関数

    this.update = function() {
        drawString(300, 50, "red", "24px 'HG創英角ゴシックUB'", "EmPoint.x" + EmPoint.x)
        drawString(300, 100, "red", "24px 'HG創英角ゴシックUB'", "EmPoint.y" + EmPoint.y)
        if (EmActiveFlg) {
            drawFill(EmPoint.x, EmPoint.y, 10, 10, "red");
            EmPoint.x -= EmMoveY;
            EmPoint.y += EmMoveX;
            // 画面外処理
            if (EmPoint.y + 50 > 768 || EmPoint.y < -868) {
                EmActiveFlg = 0;
            }
        }
    }
    this.setEActive = function(Eflg) {
        EmActiveFlg = Eflg;
    }
    this.getEActive = function() {
        return EmActiveFlg;
    }
    this.getEPos = function() {
        return [EmPoint.x, EmPoint.y];
    }
    this.Eshot = function(x, y, Eangle, Espeed) {
        EmPoint.x = x;
        EmPoint.y = y;
        EmAngle = Eangle;
        EmSpeed = Espeed;
        EmRadians = EmAngle * Math.PI / 180;
        EmMoveX = Math.cos(EmRadians) * EmSpeed;
        EmMoveY = Math.sin(EmRadians) * EmSpeed;
        EmActiveFlg = 1;
    }
}