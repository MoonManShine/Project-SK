var gFirstFlg = 1;
var BULLET_NUM = 8;
var gBulletObj = []; 
var gBulletX = 0;
var gBulletY = 0;
var Bullet_limit = 100;
var SODN = 0; //���Đ�
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
var gSpeedN = 4;
var gMapPosY;
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
    


    if (gFirstFlg == 1) {
        gImageT = new image("./images/TitleScreen.png");//�^�C�g��
        gImageS1 = new image("./images/Summary1.png");//�X�g�[���[�P�Q�R
        gImageS2 = new image("./images/Summary2.png");
        gImageGt = new image("./images/gameTemplatepng.png");//�w�i
        gImage = new image("./images/PlayerG.png"); //���@
        gImagePs = new image("./images/Pshot.png"); //�e���@
        gImageET = new image("./images/Tentacle.png"); //�e���^
        gImageBb = new image("./images/Bombeffect.png");
        hpHeartImg = new image("./images/hpHeart.png");
        hpEmpty = new image("./images/hpEmpty.png");
        gPspeed = 10;    //���@���x
        SODN = 0;//���Đ�
        gBackX = 0;
        gBackY0 = 0;
        gBackY1 = 768;
        gMapPosY = 0;
        gStage = 0;
        for (i = 0; i < BULLET_NUM; i++) {
            gBulletObj[i] = new bullet();
        }
        gDispCnt = 0;
        gScene = 0; //��ʑJ��     
        gFirstFlg = 0;      //�������p
        time = 0;   // �X�g�[���[��ʑJ��
        gPosX = 633;    //���@���W
        Pdirection = 100;   //���@��������
    }





    if (gScene == 0) {
        ////////////////////�^�C�g������
        gImageT.draw(0, 0, 0, 0, 1366, 768);
        if (isC()) {
            gScene = 2;
            time = 0;
        }
        drawString(300, 100, "red", "24px 'HG�n�p�p�S�V�b�NUB'", "gScens" + gScene)

    } else if (gScene == 1) {
        //////////////// �X�g�[���[���
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
        drawString(300, 50, "red", "24px 'HG�n�p�p�S�V�b�NUB'", "Time" + time)
        drawString(300, 100, "red", "24px 'HG�n�p�p�S�V�b�NUB'", "gScens" + gScene)

    } else if (gScene == 2) {

        ////////////////////�Q�[������///////////////////////////////////
        //�Q�[����ʔ�
        drawFill(0, 0, 1366, 768, BG_COLOR[gStage]);
        gImageGt.draw(343, 0, 0, 0, 680, 768);
        
        ///////////////////////////////////////////////////�w�i
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
            if (gStage > 3) {
                gStage = 0;
                OBJ_Y_DATA = [
                    [-800, -900, -1200, -1800, -2100, -2200, -2300],
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
            gImageGt.draw( 343, gBackY1, 0, 0, gImgW, (gImgH + gBackY1));
        }
        drawString(0, 150, "red", "24px 'HG�n�p�p�S�V�b�NUB'", "Number of shots down" + SODN)
        drawString(0, 200, "red", "24px  'HG�n�p�p�޼��UB'", "STAGE:" + gStage + "MAP POS:" + gMapPosY + "_" + (gMapPosY - 768));
        drawString(0, 250, "red", "24px  'HG�n�p�p�޼��UB'", "gBackY0" + gBackY0);
        drawString(0, 300, "red", "24px  'HG�n�p�p�޼��UB'", "gBackY1" + gBackY1);
        ////////////////////////////////////////////
        ///////////////////////////////////////////�e
        time++; //�e���ˊԊu�̐���
        //�L�[���͏���
        if (isC()) {
            if (time >= 30) {
                time = 0;
                for (i = 0; i < BULLET_NUM; i++) {
                    if (Bullet_limit >= 0) {//�c�e��
                        Bullet_limit++;
                        if (gBulletObj[i].getActive() == 0) {
                            var clickPos = getClickPos();
                            gBulletObj[i].shot((gPosX + 47), 658, 0, 8);
                            break;              //�e��X   //�e��Y
                        }
                    }
                }
            }
        }
          

        //�X�V����
        for (i = 0; i < BULLET_NUM; i++) {
            gBulletObj[i].update();
        }

        /////////////////////////////////////////////////
        /////////////////////////////////////////////////���@�ړ�
        if (isLeft() && gPosX >= 343) {         //hidari
            gPosX -= gPspeed;
            Pdirection = 0;
        } else if (isRight() && gPosX <= 923) {        //migi
            gPosX += gPspeed;
            Pdirection = 200;
        } else {
            Pdirection = 100;
        }
        gImage.draw(gPosX, 658, Pdirection, 0, 100, 100); //���@hyouji
        ///////////////////////////////////////////
        ///////////////////////////////////////////�G�e���^�\��
        for (idx = 0; idx < OBJ_NUM; idx++) {
            if (OBJ_Y_DATA[gStage][idx] > gMapPosY && OBJ_Y_DATA[gStage][idx] < (gMapPosY + 768)) {
                var dir = getRand(10);//�G�v���v��
                var dis = getRand(10); //�G�v���v��
                if (dir % 2 == 0) {
                    dir = -1;
                } else {
                    dir = 1;
                }
                if ((gBulletX - (OBJ_X_DATA + dir * dis)) <= 80 && (gBulletX - (OBJ_X_DATA + dir * dis)) >= 0 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 80 && (gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) >= 0) {
                    gImageBb.draw((OBJ_X_DATA + dir * dis), (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80);  //�G�ƒe���d�Ȃ�Ɣ����\��
                    Bullet_hit = true//�e����
                    if ((gBulletY - (OBJ_Y_DATA[gStage][idx] - gMapPosY)) <= 10) {
                        OBJ_Y_DATA[gStage][idx] = -9999; //���������������
                        SODN++;//���Đ�+�P
                    }
                }else{
                gImageET.draw((OBJ_X_DATA + dir * dis), (OBJ_Y_DATA[gStage][idx] - gMapPosY), OBJ_SRCX_DATA[gStage][idx], 0, 80, 80); //����ȊO�͓G��\��
                    Bullet_hit = false;
                }
            }
        }

        
        
    drawHP();
    if (checkCollision (palyer, enemies[i])) {
        playerHP--;          /*damage*/
            }
    
    //�G

            
                    

          
           

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
function checkCollision(obj1, obj2) {       /*obj1 - player, obj2 - enemy*/
    return (
        obj1.x < obj2.x + obj2.width && /*левая сторона obj1 левее правой стороной obj2*/
        obj1.x + obj1.width > obj2.x && /*правая сторона obj1 правее левой стороны obj2*/
        obj1.y < obj2.y + obj2.height && /*верхняя сторона obj1 выше нижней стороны obj2*/
        obj1.y + obj1.height > obj2.y     /*Нижняя сторона obj1 ниже верхней стороны obj2*/
    )
}


    //byouga    gazo   kyanpasu    gazousaizu
    //gImage.draw(0, 0, 0, 0, 1366, 768);



/////////////////////////////////////
// �e�N���X
/////////////////////////////////////
function bullet() {
    // �R���X�g���N�^
    var mSpeed = 10;
    var mPoint = { x: 0, y: 0 };
    var mAngle = 0;
    var mRadians, mMoveX, mMoveY;
    var mActiveFlg = 0; // 0:InActive 1:Active
    /////////////////////////////////////
    // �X�V�֐�
    this.update = function() {
        drawString(300, 50, "red", "24px 'HG�n�p�p�S�V�b�NUB'", "mPoint.x" + mPoint.x)
        drawString(300, 100, "red", "24px 'HG�n�p�p�S�V�b�NUB'", "mPoint.y" + mPoint.y)
        drawString(300, 150, "red", "24px 'HG�n�p�p�S�V�b�NUB'", "Bullet_hit" + Bullet_hit)
        if (mActiveFlg) {
            gImagePs.draw(mPoint.x, mPoint.y, 0, 0, 10, 40); //�e�ʒu         
            mPoint.x -= mMoveY;
            mPoint.y -= mMoveX;
            gBulletX = mPoint.x;
            gBulletY = mPoint.y;
            // ��ʊO����
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
