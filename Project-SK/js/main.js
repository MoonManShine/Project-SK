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
var gImageCounter;
var gImageT;
var gImageS1;
var gImageS2;
var gImageGt;
var gImageGc;
var gImagePs;
var gImageET;
var gImageBb;
var gImageAb;
var gImageAsh;
var gImageAsp;
var gImageNormal;
var gImageHard;
var gScene = 0;
var time;
var timebullet;
var timeCounter;
var Pspeed;
var i;
var Pdirection;
var Counter;
var debug;

var gImageObj;
var gBackX0;
var gBackY0;
var gBackX1;
var gBackY1;
var gImgW = 680;
var gImgH = 768;
var gMapEnd = -3500;
var gSpeedN = 2;
var gMapPosY;
var gcanceloutY; //マップポス打ち消し用
var gStage;
var hpHeartImg;             /*filled heart*/
var hpEmpty;                /*Empty Heart*/
var hpHeartImgWidth = 100;  
var hpHeartImgHeight = 100;
var playerHP = 3;
var maxHp = 5;
var hpStartX = 1050;
var hpStartY = 658;
var hpSpacing = 5;
var playerPos = {
    x: gPosX,
    y: 658,
    width: 100,
    height: 100
}
var enemyHitFlags = []; //массив для обратки разового столкновения с врагом
var enemyShootInterval = 60; // Враги стреляют каждые 60 кадров
var enemyShootTimer = 0;
var railgunCharge = 0; //заряд рельстрона (0-100%)
var railgunReady = false; //готовность к использованию
var OBJ_NUM = 7;
var difficulty = 0;
var OBJ_NUM = 7;

var OBJ_X_DATA = [
    [600,486,385,845,756,512,900],
    [600,486,385,845,756,512,900],
    [600,486,385,845,756,512,900],
    [600,486,385,845,756,512,900]
];
var OBJ_Y_DATA = [
    [-100, -900, -1200, -1800, -2100, -2200, -2300],
    [-800, -1200, -1900, -8000, -2100, -2200, -2300],
    [-800, -900, -1200, -1800, -2100, -2200, -2300],
    [-800, -900, -1200, -1800, -2100, -2200, -2300]
];
var OBJO_Y_DATA = [
    [-200, -800, -1000, -1800, -2500, -2700, -2900],
    [-200, -800, -1000, -1800, -2500, -2700, -2900],
    [-200, -800, -1000, -1800, -2500, -2700, -2900],
    [-200, -800, -1000, -1800, -2500, -2700, -2900]
];
var AspOBJ_Y_DATA = [
    [-100, -1900, -2700],
    [-800, -1700, -2900],
    [-900, -1900, -2200],
    [-800, -1900, -2600]
]; //アイテムスピード出現
var AbOBJ_Y_DATA = [
    [-200, -1600, -2500],
    [-600, -1900, -2500],
    [-700, -1700, -2500],
    [-400, -1600, -2500]
]; //アイテム弾丸補充出現


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
        gImageGt = new image("./images/Template.png"); //背景
        gImageGc = new image("./images/cloud.png");
        gImage = new image("./images/PlayerG.png"); //自機
        gImageCounter = new image("./images/Counter.png"); //自機カウンター
        gImagePs = new image("./images/Pshot.png"); //弾自機
        gImageET = new image("./images/Tentacle.png"); //テンタ
        gImageEO = new image("./images/Octopus.png"); //オクト
        gImageBb = new image("./images/Bombeffect.png");
        hpHeartImg = new image("./images/hpHeart.png");
        hpEmpty = new image("./images/hpEmpty.png");
        gameOverImg = new image("./images/gameOver.png");
        gImageAb = new image("./images/Bulletup.png"); //アイテム弾補充
        gImageAsh = new image("./images/Shield.png"); //アイテムシールド
        gImageAsp = new image("./images/Speedup.png"); //アイテムスピードアップ
        gImageNormal = new image("./images/Normal.png");
        gImageHard = new image("./images/Hard.png");
        gPspeed = 10;    //自機速度
        SODN = 0; //撃墜数
        Bullet_limit = 100;
        Counter = 0;
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
        gFirstFlg = 0;      //初期化用
        time = 0;   // ストーリー画面遷移
        timebullet = 0;
        timeCounter = 0;
        gPosX = 633;    //自機座標
        Pdirection = 100;   //自機向き制御
        gSoundManager   =   new SoundManager();
        gSoundManager.play('BGMtitle');
        enemyShootTimer++;
    }





    if (gScene == 0) {
        ////////////////////タイトル部分       
        gImageT.draw(0, 0, 0, 0, 1366, 768);        
        if (isC()) {
            gScene = 2;
            time = 0;
            BGMflg  =   1;
            gSoundManager.play('push_se');
            gSoundManager.stop('BGMtitle');
            gSoundManager.play('BGMstory');
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
            BGMflg  =   1;
            gSoundManager.stop('BGMstory');
        }
        drawString(300, 50, "red", "24px 'HG創英角ゴシックUB'", "Time" + time)
        drawString(300, 100, "red", "24px 'HG創英角ゴシックUB'", "gScens" + gScene)
    } else if (gScene == 2) {
        ////////難易度選択/////////////////////////
        gSoundManager.stop('BGMstory');/////////とりあえず
        if (isUp()) {
            difficulty = 0;
            gSoundManager.play('push_se');
        } else if (isDown()) {
            difficulty = 1;
            gSoundManager.play('push_se');
        }

        if (difficulty == 0) {
            gImageNormal.draw(0, 0, 0, 0, 1366, 768);
        } else if (difficulty == 1) {
            gImageHard.draw(0, 0, 0, 0, 1366, 768);
        }


        if (isC()) {
            gScene = 3;
            gSoundManager.play('push_se');
            gSoundManager.play('BGMbattle');
        }

    } else if (gScene == 3) {
        ///////////////////////////////////////////////////////////////////ゲーム部分///////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                AOBJ_Y_DATA = [
                    [-1000, -1900, -2700],
                    [-800, -1700, -2900],
                    [-900, -1900, -2200],
                    [-800, -1900, -2600]
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
        if (gBackY0 < 0) {
            gBackY0 = 768;
        }
        if ((gImgH - gBackY0) > 0) {
            gImageGc.draw(343, 0, 0, (gBackY0 * 2), (gImgW * 2), (gImgH + gBackY0));
        }
        if (gBackY1 > 768) {
            gBackY1 = 0;
        }
        if ((gImgH - gBackY1) > 0) {
            gImageGc.draw(343, (gBackY1 * 2), 0, 0, (gImgW * 2), (gImgH + gBackY1));
        }
        drawString(0, 150, "red", "24px 'HG創英角ゴシックUB'", "Bullet_limit" + Bullet_limit)
        drawString(0, 200, "red", "24px  'HG創英角ｺﾞｼｯｸUB'", "STAGE:" + gStage + "MAP POS:" + gMapPosY + "_" + (gMapPosY - 768));
        drawString(0, 250, "red", "24px  'HG創英角ｺﾞｼｯｸUB'", "gPspeed" + gPspeed);
        drawString(0, 300, "red", "24px  'HG創英角ｺﾞｼｯｸUB'", "BGMflg" + BGMflg);
        drawString(300, 150, "red", "24px 'HG創英角ゴシックUB'", "timeCounter" + timeCounter);
        ////////////////////////////////////////////
        ///////////////////////////////////////////弾
        timebullet++; //弾発射間隔の制御
        //キー入力処理
        if (isC()) {
            Pdirection = 100;
            if (timebullet >= 30) {
                timebullet = 0;
                gSoundManager.play('shot');
                for (i = 0; i < BULLET_NUM; i++) {
                    if (Bullet_limit >= 1) {//残弾数
                        Bullet_limit--;
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
        timeCounter++;
        if (isLeft() && gPosX >= 343) {         //hidari
            gPosX -= gPspeed;
            Pdirection = 0;
        } else if (isRight() && gPosX <= 923) {        //migi
            gPosX += gPspeed;
            Pdirection = 200;
        }
        playerPos.x = gPosX;
        ///////////////////////////////////////////////////
        //////////////////////////////////////////////////カウンター
        if (Counter < 1) {
            gImage.draw(gPosX, 658, Pdirection, 0, 100, 100); //自機hyouji
        }
        if (isB() && timeCounter >= 12) {
            timeCounter = 0;
            Counter = 11;
        }
        if (Counter >= 1) {
            time++;
            if (time >= 5) {
                Counter--;
            }
            gImageCounter.draw(gPosX, 658, (120 * Counter), 0, 120, 120);
        }




        ///////////////////////////////////////////
        ///////////////////////////////////////////敵テンタ表示
        for (idx = 0; idx < OBJ_NUM; idx++) {
            if (OBJ_Y_DATA[gStage][idx] > gMapPosY && OBJ_Y_DATA[gStage][idx] < (gMapPosY + 100)) {

                if ((gBulletX - OBJ_X_DATA[gStage][idx]) <= 80 && (gBulletX - OBJ_X_DATA[gStage][idx]) >= 0 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 80 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) >= 0) {
                    gImageBb.draw(OBJ_X_DATA[gStage][idx], (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80);  //敵と弾が重なると爆発表示
                    if ((gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 10) {
                        gSoundManager.play('bomb_se');
                        OBJ_Y_DATA[gStage][idx] = -9999; //爆発したら消える
                        SODN++; //撃墜数+１
                    }
                } else {
                    gImageET.draw(OBJ_X_DATA[gStage][idx], (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80); //それ以外は敵を表示
                }

            } else if (OBJ_Y_DATA[gStage][idx] > (gMapPosY + 100) && OBJ_Y_DATA[gStage][idx] < (gMapPosY + 768)) {

                if ((gBulletX - OBJ_X_DATA[gStage][idx]) <= 80 && (gBulletX - OBJ_X_DATA[gStage][idx]) >= 0 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 80 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) >= 0) {
                    gImageBb.draw(OBJ_X_DATA[gStage][idx], (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80);  //敵と弾が重なると爆発表示;
                    if ((gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 10) {
                        gSoundManager.play('bomb_se');
                        OBJ_Y_DATA[gStage][idx] = -9999; //爆発したら消える
                        SODN++; //撃墜数+１
                    }
                } else {
                    OBJ_Y_DATA[gStage][idx] -= gSpeedN;
                    gImageET.draw(OBJ_X_DATA[gStage][idx], (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80); //それ以外は敵を表示
                    if (isA()) {
                        gSoundManager.play('shot');
                        for (k = 0; k < EBULLET_NUM; k++) {
                            if (gEBulletObj[k].getEActive() == 0) {
                                // var clickPos = getClickPos();
                                gEBulletObj[k].Eshot((OBJ_X_DATA[gStage][idx] + 40), OBJ_Y_DATA[gStage][idx] - gMapPosY, 0, 10); //10gasokudo
                                break;
                            }
                        }
                    }
                }
            }
            for (k = 0; k < EBULLET_NUM; k++) {
                gEBulletObj[k].update();
            }
        }
        ////////////////////////
        ////////////////////////オクト
        for (idx = 0; idx < OBJ_NUM; idx++) {
            if (OBJO_Y_DATA[gStage][idx] > gMapPosY && OBJO_Y_DATA[gStage][idx] < (gMapPosY + 768)) {
                if ((gBulletX - OBJ_X_DATA[gStage][idx] ) <= 80 && (gBulletX - OBJ_X_DATA[gStage][idx] ) >= 0 && (gBulletY - (OBJO_Y_DATA[gStage][idx] - gMapPosY)) <= 80 && (gBulletY - (OBJO_Y_DATA[gStage][idx] - gMapPosY)) >= 0) {
                    gImageBb.draw(OBJ_X_DATA, (OBJO_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80);  //敵と弾が重なると爆発表示
                    if ((gBulletY - (OBJO_Y_DATA[gStage][idx] - gMapPosY)) <= 10) {
                        gSoundManager.play('bomb_se');
                        OBJO_Y_DATA[gStage][idx] = -9999; //爆発したら消える
                        SODN++; //撃墜数+１
                    }
                }
            }
            //if ((gPosX - OBJ_X_DATA) <= 120 && (gPosX - OBJ_X_DATA) >= 0 && (658 - (OBJO_Y_DATA[gStage][idx] - gMapPosY - 768)) <= 120 && (658 - (OBJO_Y_DATA[gStage][idx] - gMapPosY)) >= 0) {
                if (Counter >= 1) {
                    gSoundManager.play('counter_SE');
                    gImageBb.draw(OBJ_X_DATA[gStage][idx], (OBJO_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80);  //敵とカウンターが重なると爆発表示
                    if ((gPosX - OBJ_X_DATA[gStage][idx]) <= 120 &&   (658 - (OBJO_Y_DATA[gStage][idx] - gMapPosY)) <= 120) {
                        gSoundManager.play('bomb_se');
                        OBJO_Y_DATA[gStage][idx] = -9999; //爆発したら消える
                        gImageBb.draw(OBJ_X_DATA[gStage][idx], (OBJO_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80); 
                        SODN++; //撃墜数+１
                    }
                }
            //} 
            if (OBJO_Y_DATA[gStage][idx] > gMapPosY) {
                    gImageEO.draw(OBJ_X_DATA[gStage][idx], (OBJO_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80); //それ以外は敵を表示
                    if (checkCollision(playerPos, {x: OBJ_X_DATA[gStage][idx], y: (OBJO_Y_DATA[gStage][idx] - gMapPosY), width: 100, height: 100})) {
                        console.log("Collision");
                        if (!enemyHitFlags[idx]) { //проверяем получал ли игрок урон от этого врага
                            playerHP--;    // Обработка столкновения (уменьшение HP игрока и т.д.)
                            enemyHitFlags[idx] = true; //отмечаем что этот враг нанес урон
                        }
                        if (playerHP <= 0) {
                            console.log("Game Over! Final HP:", playerHP);
                            gScene = 4; /* сцена окончания*/
                            break; 
                        }
                    }
                } else {
                    enemyHitFlags[idx] = false; // если коллизии нет то сбрасываем флаг
                
                }
         
        }
            ///アイテム
            for (idx = 0; idx < OBJ_NUM; idx++) {
                if (checkCollision(playerPos, { x: OBJ_X_DATA[gStage][idx], y: AspOBJ_Y_DATA[gStage][idx] - gMapPosY, width: 50, height: 50 }))  {
                    gSoundManager.play('item_se');
                    gPspeed += 5;
                    AspOBJ_Y_DATA[gStage][idx] = -9999;
                } else if (AspOBJ_Y_DATA[gStage][idx] > gMapPosY) {
                    gImageAsp.draw(OBJ_X_DATA[gStage][idx], (AspOBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 50, 50); //アイテム・スピードを表示
                }
            } //スピード終了

            ///弾丸数
            for (idx = 0; idx < OBJ_NUM; idx++) {
                if(checkCollision(playerPos, { x: OBJ_X_DATA[gStage][idx], y: AbOBJ_Y_DATA[gStage][idx] - gMapPosY, width: 80, height: 80 }))  {
                    gSoundManager.play('item_se');
                    Bullet_limit += 5;
                    AbOBJ_Y_DATA[gStage][idx] = -9999;
                } else if (AbOBJ_Y_DATA[gStage][idx] > gMapPosY) {
                    gImageAb.draw(OBJ_X_DATA[gStage][idx], (AbOBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80); //アイテム・スピードを表示
                }
            } //弾丸終了
    //}else if(gScene == 4){
    //    drawimageクリア画像
    //    if(isC()){gFirastFlg  =   0   gScene  =   2難易度選択部分
            var collisionsThisFrame = 0;
    for (let i = 0; i < EBULLET_NUM; i++) {
        const eBullet = gEBulletObj[i];
        // console.log("Player: x=" + playerPos.x + ", y=" + playerPos.y + ", w=" + playerPos.width + ", h=" + playerPos.height);
        // console.log("Bullet: x=" + eBullet.EmPoint.x + ", y=" + eBullet.EmPoint.y + ", w=" + eBullet.width + ", h=" + eBullet.height);
        // console.log("Bullet active:", eBullet.getEActive());
        if (eBullet.getEActive() && checkCollision(playerPos, { x: eBullet.EmPoint.x, y: eBullet.EmPoint.y, width: eBullet.width, height: eBullet.height})) {
            console.log("HP before decrement:", playerHP);
            console.log("Collision detected"); /*отладка*/
            playerHP--;

            eBullet.setEActive(0); /*деактивация пули*/
            eBullet.collidedFrame = true;
            collisionsThisFrame++;
            console.log("HP after decrement:", playerHP);
            drawHP();
            
            if (playerHP <= 0) {
                console.log("Game Over! Final HP:", playerHP);
                gScene = 4; /* сцена окончания*/
                break; 
            }
        }
    }
    // Сбрасываем флаги ПОСЛЕ обработки всех столкновений в кадре
    for (let i = 0; i < EBULLET_NUM; i++){
        gEBulletObj[i].hasCollidedThisFrame=false;
    }
    
    drawHP(); 
    if (enemyShootTimer >= enemyShootInterval) {
        for (k = 0; k < EBULLET_NUM; k++) {
            if (gEBulletObj[k].getEActive() == 0) {
                var enemyIdx = Math.floor(Math.random() * OBJ_NUM); // Выбираем случайного врага
                gEBulletObj[k].Eshot(
                    OBJ_X_DATA[gStage][enemyIdx] + 40,
                    OBJ_Y_DATA[gStage][enemyIdx] - gMapPosY,
                    90, // Вниз
                    10
                );
                break;
            }
        }
        enemyShootTimer = 0; // Сброс таймера
    }

    for (idx = 0; idx < OBJ_NUM; idx++) {
        if (checkCollision(playerPos, { x: OBJ_X_DATA[gStage][idx], y: AspOBJ_Y_DATA[gStage][idx] - gMapPosY, width: 100, height: 100 })) {
            gSoundManager.play('item_se');
            gPspeed += 5;
            AspOBJ_Y_DATA[gStage][idx] = -9999;
        } else if (AspOBJ_Y_DATA[gStage][idx] > gMapPosY) {
            gImageAsp.draw(OBJ_X_DATA[gStage][idx], AspOBJ_Y_DATA[gStage][idx] - gMapPosY, OBJ_SRCX_DATA[gStage][idx], 0, 80, 80);
        }


    }

    } else if (gScene == 4) {
        // drawFill(0, 0, 1366, 768, BG_COLOR[gStage]);
        gameOverImg.draw(0, 0, 0, 0, 1366, 786);
        if (isC()) {
            restartGame();
        }
    }
}
function drawHP() {
    for (var i = 0; i < maxHp; i++) {
         var heartX = hpStartX + i * (hpHeartImgWidth + hpSpacing);

         if (i < playerHP) {
            // Отрисовка заполненного сердца
            hpHeartImg.draw(heartX, hpStartY, 0, 0, hpHeartImgWidth, hpHeartImgHeight);
        } else {
            // Если нужно отображать "пустые" сердца, можно добавить другое изображение
            hpEmpty.draw(heartX, hpStartY, 0, 0, hpHeartImgWidth, hpHeartImgHeight);
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
        this.width = 10;
        this.height = 10;
        this.collidedFrame = false;

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
            // console.log("Bullet activated!");
        }
        this.EmPoint = EmPoint;
    }
    function restartGame() {
        gFirstFlg = 1;
        playerHP = 3;
        gPosX = 633;
        Pdirection = 0;
        playerPos.x = gPosX;
        gScene = 0;

    function increaseRailgunCharge(amount = 20) {
        if(railgunCharge < 100) {
            railgunCharge = Math.min(railgunCharge + amount, 100);
            console.log(`Charge: ${railgunCharge}%`);
        }

        if (railgunCharge >= 100) {
            railgunReady = true;
            console.log("Railgun is ready");
        }
    }

    function useRailgun() {
        if (!railgunReady) {
            console.log("Railgun not ready");
            return;
        }
    }
}