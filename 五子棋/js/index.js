
var canvas=document.getElementById('five-in-a-row');
var cxt=canvas.getContext('2d')
var over=false;
var chessBox=[];
//赢法数组
var wins=[];
for(var i=0;i<15;i++){
    chessBox[i]=[]
    for(var j=0;j<15;j++){
        chessBox[i][j]=0;
    }
}
//绘制棋盘
for(var i=0;i<15;i++){
    cxt.moveTo(15+i*30,15);
    cxt.lineTo(15+i*30,435);
    cxt.stroke()
    cxt.moveTo(15,15+i*30);
    cxt.lineTo(435,15+i*30);
    cxt.stroke()
}
//棋盘绘制结束
//赢法数组填充
for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}
var count=0;
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i][j+k][count]=true;
        }
        count++;
    }
}
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[j+k][i][count]=true;
        }
        count++;
    }
}
for(var i=0;i<11;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}
for(var i=0;i<11;i++){
    for(var j=14;j>3;j--){
        for(var k=0;k<5;k++){
            wins[i+k][j-k][count]=true;
        }
        count++;
    }
}
//赢法数组填充完毕

//赢法的统计数组
var myWin=[];
var computerWin=[];
//赢法数组的初始化
for(var i=0;i<count;i++){
    myWin[i]=0;
    computerWin[i]=0;
}
//赢法统计数组初始化完毕
function onestep(i,j,me){
    cxt.beginPath();
    cxt.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    var gradient=cxt.createRadialGradient(15+i*30,15+j*30,13,15+i*30,15+j*30,0);
    if(me){
        gradient.addColorStop(0,'#0A0A0A');
        gradient.addColorStop(1,'#636766');
    }else{
        gradient.addColorStop(0,'#D1D1D1');
        gradient.addColorStop(1,'#F9F9F9');
    }

    cxt.fillStyle=gradient;
    cxt.fill()
    cxt.closePath();
}
var me=true;
canvas.onclick=function(e){
    var i=parseInt( e.offsetX/30);
    var j=parseInt( e.offsetY/30);
    if(over){
        return;
    }
    if(!me){
        return;
    }

    if(chessBox[i][j]==0){
        onestep(i,j,me);
        chessBox[i][j]=1;
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k]=6;
                if(myWin[k]==5){
                    alert("你赢了");
                    over=true;
                }
            }
        }
        if(!over){
            me = !me;
            computerAI();
        }
    }
}

var computerAI=function(){
    var myScore=[];
    var computerScore=[];
    var max=0;
    var u= 0,v=0;
    for(var i= 0;i<15;i++){
        myScore[i]=[];
        computerScore[i]=[];
        for(var j=0;j<15;j++){
            myScore[i][j]=0;
            computerScore[i][j]=0;
        }
    }
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBox[i][j]==0){
                for(var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(myWin[k]==1){
                            myScore[i][j]+=200;
                        }else if(myWin[k]==2){
                            myScore[i][j]+=400;
                        }else if(myWin[k]==3){
                            myScore[i][j]+=2000;
                        }else if(myWin[k]==4){
                            myScore[i][j]+=10000;
                        }
                        if(computerWin[k]==1){
                            myScore[i][j]+=220;
                        }else if(computerWin[k]==2){
                            myScore[i][j]+=420;
                        }else if(computerWin[k]==3){
                            myScore[i][j]+=2100;
                        }else if(computerWin[k]==4){
                            myScore[i][j]+=20000;
                        }
                    }
                }
                if(myScore[i][j]>max){
                    max=myScore[i][j];
                    u=i;
                    v=j;
                }else if(myScore[i][j]==max){
                    if(computerScore[i][j]>computerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
                if(computerScore[i][j]>max){
                    max=computerScore[i][j];
                    u=i;
                    v=j;
                }else if(computerScore[i][j]==max){
                    if(myScore[i][j]>computerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
            }
        }
    }
    onestep(u,v,false);
    chessBox[u][v]=2;
    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k]=6;
            if(computerWin[k]==5){
               alert("计算机赢了");
                over=true;
            }
        }
    }
    if(!over){
        me = !me;
    }
}