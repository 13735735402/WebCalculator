window.onload = function () {
  var screen1 = document.getElementsByClassName("screen1")[0];
  var screen2 = document.getElementsByClassName("screen2")[0];
  /*1. C键 清除键*/
  document.querySelector('[value="C"]').onclick = function () {
    screen1.innerHTML = '';
    screen2.innerHTML = 0;
  };
  var numberBtns = document.getElementsByClassName("type2");
  var zero = document.getElementsByClassName("type3")[0];
  /*2. 小屏幕显示运算式  */
  var screen1msg = '';
  /*3. 1-9按键
  点击拼接字符串，显示在小屏幕上*/
  for (var i = 0; i < numberBtns.length - 1; i++) {
    numberBtns[i].onclick = function () {
      if (screen2.innerHTML == "0") {
        screen1.innerHTML += this.value;
      } else {
        screen1.innerHTML = '';
        screen2.innerHTML = 0;
        screen1.innerHTML += this.value;
      }
    }
  }
  /*4. 0按键
  小屏幕上有内容，0才能拼接上去*/
  zero.onclick = function () {
    if (screen1.innerHTML)
      screen1.innerHTML += this.value;
  }
  /*5. 小数点*/
  numberBtns[numberBtns.length - 1].onclick = function () {
    /*5.1 小屏幕上没有小数点 */
    if (screen1.innerHTML.indexOf(this.value) == -1) {
      /*5.1.1 小屏幕内容为空
       小数点前面加一个0并拼接*/
      if (screen1.innerHTML == "") {
        screen1.innerHTML = "0" + this.value;
      } else {
        /*5.1.2 小屏幕上有内容，但没有小数点，最后一位是运算符
         小数点前面加0并拼接*/
        if (screen1.innerHTML.charAt(screen1.innerHTML.length - 1).match(/[+]|[-]|[*]|[/]/)) {
          screen1.innerHTML = screen1.innerHTML + "0" + this.value;
        } else {
          /*5.1.3 小屏幕上有内容，但没有小数点，最后一位不是运算符
           直接拼接小数点*/
          screen1.innerHTML += this.value;
        }
      }
    } else {
      /*5.2 屏幕上已经有小数点，最后一个字符是运算符
      小数点前面加0并拼接*/
      if (screen1.innerHTML.charAt(screen1.innerHTML.length - 1).match(/[+]|[-]|[*]|[/]/)) {
        screen1.innerHTML = screen1.innerHTML + "0" + this.value;
      } else {
        /*5.2.1 屏幕上已经有小数点，最后一个字符不是运算符
         获取最后一个小数点所在的索引 */
        var index = screen1.innerHTML.lastIndexOf(".");
        /*5.2.2 截取最后一个小数点至末尾的字符串，用 search方法判断是否含有运算符 */
        var x = screen1.innerHTML.substring(index, screen1.innerHTML.length - 1).search(/[+]|[-]|[*]|[/]/);
        /*5.2.3 含有运算符，则直接拼接小数点，否则不执行 */
        if (x != -1) {
          screen1.innerHTML += this.value;
        }
      }
    }
  }
  /*6. 运算符 */
  var computs = document.getElementsByClassName("type1");
  for (var i = 1; i < computs.length; i++) {
    computs[i].onclick = function () {
      /*6.1 大屏幕内容为0 */
      if (screen2.innerHTML == "0") {
        /*6.1.1 小屏幕内容为空，不执行 */
        if (screen1.innerHTML == "") {} else {
          /*6.1.2 小屏幕有内容，并且最后一位是运算符
           删除最后位的运算符，用当前点击的运算符代替*/
          if (screen1.innerHTML.charAt(screen1.innerHTML.length - 1).match(/[+]|[-]|[*]|[/]/)) {
            screen1.innerHTML = screen1.innerHTML.substring(0, screen1.innerHTML.length - 1) + this.value;
          } else {
            /*6.1.3 小屏幕有内容，并且最后一位是小数点
             删除小数点并拼接运算符*/
            if (screen1.innerHTML.charAt(screen1.innerHTML.length - 1) == ".") {
              screen1.innerHTML = screen1.innerHTML.substring(0, screen1.innerHTML.length - 1) + this.value;
            } else {
              /*6.1.4 最后一位不是运算符也不是小数点，
               直接拼接运算符 */
              screen1.innerHTML += this.value;
            }
          }
        }
      } else {
        /*6.2 大屏幕有内容 将数值传到小屏幕，重置小屏幕的内容*/
        screen1.innerHTML = screen2.innerHTML;
        /*6.3 归零 */
        screen2.innerHTML = "0";
        /*6.3.1 小屏幕有内容，并且最后一位是运算符
        删除最后位的运算符，用当前点击的运算符代替*/
        if (screen1.innerHTML.charAt(screen1.innerHTML.length - 1).match(/[+]|[-]|[*]|[/]/)) {
          screen1.innerHTML = screen1.innerHTML.substring(0, screen1.innerHTML.length - 1) + this.value;
        } else {
          /*6.3.2 如果最后一位不是运算符,
           判断最后一位是不是小数点，如果是小数点，删除小数点并拼接运算符*/
          if (screen1.innerHTML.charAt(screen1.innerHTML.length - 1) == ".") {
            screen1.innerHTML = screen1.innerHTML.substring(0, screen1.innerHTML.length - 1) + this.value;
          } else {
            /*6.3.4 如果最后一位不是运算符也不是小数点，直接拼接运算符 */
            screen1.innerHTML += this.value;
          }
        }
      }
    }
  }
  /*7. 等于号 */
  var answerBtn = document.getElementsByClassName("type4")[0];
  answerBtn.onclick = function () {
    var anwser = 0;
    /*7.1 获取小屏幕上的字符串 判断是否为空
     如果为空，则不执行，如果不为空，获取内容*/
    var str = screen1.innerHTML;
    if (str) {
      anwser = eval(str);
    }
    screen2.innerHTML = anwser;
  }
  /*8. 撤销键← */
  var esc = document.getElementsByClassName("type5")[0];
  esc.onclick = function () {
    if (screen2.innerHTML == "0") {
      if (screen1.innerHTML) {
        screen1.innerHTML = screen1.innerHTML.substring(0, screen1.innerHTML.length - 1);
      } else {

      }
    } else {
      screen1.innerHTML = '';
      screen2.innerHTML = 0;
    }
  }



  // https://www.cnblogs.com/jiangxiaobo/p/5953863.html 参考网站
  // 小键盘事件 没有做太多兼容  可以考虑用第三方库来完善
  document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0]
    switch (e.keyCode) {
      case 96:
        console.log(e.key)
        break;
      case 97:
        console.log(e.key)
        break;
      case 98:
        console.log(e.key)
        break;
      case 99:
        console.log(e.key)
        break;
      case 100:
        console.log(e.key)
        break;
      case 101:
        console.log(e.key)
        break;
      case 102:
        console.log(e.key)
        break;
      case 103:
        console.log(e.key)
        break;
      case 104:
        console.log(e.key)
        break;
      case 105:
        console.log(e.key)
        break;
      case 110:
        console.log(e.key)
        break;
      case 107:
        console.log(e.key)
        break;
      case 13:
        console.log(e.key)
        break;
      case 109:
        console.log(e.key)
        break;
      case 109:
        console.log(e.key)
        break;
      case 106:
        console.log(e.key)
        break;
      case 111:
        console.log(e.key)
        break;
    }
  }
}