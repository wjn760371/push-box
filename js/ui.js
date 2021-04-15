//该模块用于将地图显示到页面上
import * as map from "./map.js"
var divContainer = document.getElementById('game');
var pieceWidth = 45;
var pieceHeight = 45

/**
 * 设置div的宽高
 */
function setDivContainer(){
    divContainer.style.width = pieceWidth * map.colNumber + "px";
    divContainer.style.height = pieceHeight * map.rowNumber + "px";
}

function isCorrect(row, col){
    for (const item of map.correct) {
        if (item.row === row && item.col === col){
            return true;
        }
    }
    return false;
    // return map.correct.find(item => item.row === row && item.col === col) !== undefined;
}

/**
 * 根据行和列创建div加入到容器中
 * @param row
 * @param col
 */
function setOnePiece(row, col){
    let value = map.content[row][col];//取出地图相应位置的值
    let div = document.createElement("div");
    div.className = "item";
    //调整div的位置
    div.style.left = col * pieceWidth + "px";
    div.style.top = row * pieceHeight + "px";
    let correct = isCorrect(row, col)
    if (value === map.PLAYER){
        div.classList.add("player");
    }
    else if(value ===map.WALL){
        div.classList.add("wall");
    }
    else if(value === map.BOX){
        if(correct){
            div.classList.add("correct-box");
        }else{
            div.classList.add("box")
        }
    }
    else{
        //空白
        if (correct){
            div.classList.add("correct");
        }else{
            return;
        }
    }

    divContainer.appendChild(div);
}

/**
 * 设置页面上相应元素的内容
 */
function setContent(){
    //1.清空容器
    divContainer.innerHTML = "";
    //2.遍历地图内容，设置元素
    for(var row = 0; row < map.rowNumber; row++){
        for (var col = 0; col < map.colNumber; col++){
            setOnePiece(row, col);
        }
    }
}

/**
 * 该函数用于显示地图
 */
export default function(){
    //1.设置div宽高
    setDivContainer();
    //2.显示地图中的内容
    setContent();
}