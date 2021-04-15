//完成整个游戏
import showUI from "./ui.js";
import { playerMove, isWin } from "./play.js"
showUI();
var over = false;
window.onkeydown = function(e){
    if (over){
        return;
    }
    var result = false;
    if (e.key === "ArrowUp"){
        result = playerMove("up");
    }
    if (e.key === "ArrowDown"){
        result = playerMove("down");
    }
    if (e.key === "ArrowLeft"){
        result = playerMove("left");
    }if (e.key === "ArrowRight"){
        result = playerMove("right");
    }
    if (result){
        showUI();
        if (isWin()){
            alert("游戏胜利")
            over = true;
        }
    }
}