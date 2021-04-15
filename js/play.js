import * as map from "./map.js";

/**
 * 按照指定的方向，让玩家移动一步
 * @param direction
 */
export function playerMove(direction){
    let playerPoint = getPlayerPoint();//得到玩家位置
    let nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction);//得到下一个位置

    //什么情况下不能移动
    if (nextInfo.value === map.WALL){
        return;
    }

    //能移动
    if (nextInfo.value === map.SPACE){
        //下个位置是空白
        exchange(playerPoint, nextInfo);
        return true;
    }
    else{
        //下个位置是箱子
        //获取箱子的下一个位置
        let nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction);
        if (nextNextInfo.value === map.SPACE){
            //可以移动
            exchange(nextInfo, nextNextInfo);
            exchange(playerPoint, nextInfo);
            return true;
        }else{
            return false;
        }
    }
}

/**
 * 根据当前地图内容，判断是否游戏胜利
 */
export function isWin(){
    for (const item of map.correct) {
        if (map.content[item.row][item.col] !== map.BOX){
            return false;
        }
    }
    return true;
}

function exchange(point1, point2){
    let temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}

function getPlayerPoint(){
    for (let row = 0; row < map.rowNumber; row++){
        for (let col = 0; col < map.colNumber; col++){
            if (map.content[row][col] === map.PLAYER){
                return {
                    row,
                    col
                }
            }
        }
    }
    throw new Error("地图上没有玩家")
}

/**
 * 得到玩家在指定方向上的下一个位置的信息（第几行、第几列、内容是啥）
 * @param row
 * @param col
 * @param direction
 */
function getNextInfo(row, col, direction){
    if (direction === "left"){
        return {
            row: row,
            col: col - 1,
            value: map.content[row][col - 1]
        }
    }
    else if(direction === "right"){
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    }
    else if(direction === "up"){
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]
        }
    }
    else{
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        }
    }
}