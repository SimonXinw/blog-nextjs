import { AjaxOptionTs, AutoReboundTs } from './type';

// 生成范围随机整数
function randomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

// 随机十六进制颜色值 #e3e3e3
export function randomColor() {
  var str = '0123456789abcdef'; //0-15

  var col = '#';

  for (var i = 0; i < 6; i++) {
    var num = Math.floor(Math.random() * 16);

    col += str[num];
  }

  return col;
}

// 缓冲运动
export function bufferMove(dom: HTMLElement | any, target: any, callback: any) {
  dom.timer = null;
  clearInterval(dom.timer);
  dom.timer = setInterval(function () {
    // x轴运动
    var speedx = (target.left - dom.offsetLeft) / 10; //持续变化的速度
    speedx = speedx > 0 ? Math.ceil(speedx) : Math.floor(speedx); //取整，避免数据丢失
    // 剩余运动量 <= 每次的运动量
    if (Math.abs(target.left - dom.offsetLeft) <= Math.abs(speedx)) {
      dom.style.left = target.left + 'px'; //设置终点
    } else {
      dom.style.left = dom.offsetLeft + speedx + 'px';
    }

    // y轴运动
    var speedy = (target.top - dom.offsetTop) / 10; //持续变化的速度
    speedy = speedy > 0 ? Math.ceil(speedy) : Math.floor(speedy); //取整，避免数据丢失
    // 剩余运动量 <= 每次的运动量
    if (Math.abs(target.top - dom.offsetTop) <= Math.abs(speedy)) {
      dom.style.top = target.top + 'px'; //设置终点
      clearInterval(dom.timer); //运动结束
      callback(); //执行回调函数
    } else {
      dom.style.top = dom.offsetTop + speedy + 'px';
    }
  }, 20);
}

// 设置cookie函数
function setCookie(key: string, val: string, day: number) {
  if (day) {
    var d = new Date();
    d.setDate(d.getDate() + day);
    document.cookie = key + '=' + escape(val) + '; expires=' + d;
  } else {
    document.cookie = key + '=' + escape(val);
  }
}
// setCookie('username','xw',3);

// 获取cookie
export function getCookie(key: string) {
  var arr = document.cookie.split('; ');
  for (var i = 0, len = arr.length; i < len; i++) {
    var arr2 = arr[i].split('='); // ["user1","xiao ming"]
    if (arr2[0] === key) {
      return unescape(arr2[1]);
    }
  }
  return null;
}
// console.log( getCookie('user2') );

// 删除cookie
function removeCookie(key: string) {
  setCookie(key, '123', -3);
}

// ajax请求
function ajax(option: AjaxOptionTs) {
  // 1.创建XMLHttpRequest对象(数据交互对象)
  var xhr: XMLHttpRequest = new XMLHttpRequest();

  // data -> 'a=123&b=456'
  if (option.type == 'get' || option.type == 'GET') {
    // 2.打开与服务器的链接
    xhr.open(
      option.type,
      option.url + '?' + option.data + '&_=' + new Date().getTime(),
      true
    ); //解决缓存
    // 3.发送请求
    xhr.send(null); //get请求
  } else if (option.type == 'post' || option.type == 'POST') {
    // 2.打开与服务器的链接
    xhr.open(option.type, option.url, true); //解决缓存
    // 模拟表单form的post方式提交数据，在send之前设置
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // 3.发送请求
    xhr.send(option.data); //post请求
  } else {
    alert('目前只支持get和post请求方式!');
  }

  // 4.等待服务的响应
  xhr.onreadystatechange = function () {
    // console.log(xhr.readyState);//2 3 4
    if (xhr.readyState == 4) {
      //请求完成
      if (xhr.status == 200) {
        //请求成功
        option.success(xhr.responseText);
      } else {
        //请求失败
        option.failed(xhr.status);
      }
    }
  };
}

// ajax({
//     url: './data/post.php',
//     type: 'post',
//     data: 'age='+ipt.value,
//     success: function (strObj){
//         var json = JSON.parse(strObj);
//         con.innerHTML = '姓名：'+json.name;
//     },
//     failed: function (status){
//         alert(status);
//     }
// });

// 求元素的到body的 左 上 距离
function offset(obj: any) {
  var l = 0;
  var t = 0;
  var bdl = obj.clientLeft; //目标元素的左边框宽度
  var bdt = obj.clientTop; //目标元素的上边框宽度
  while (obj) {
    //循环累加目标元素到定位父级的距离
    l = l + obj.offsetLeft + obj.clientLeft;
    t = t + obj.offsetTop + obj.clientTop;
    obj = obj.offsetParent; //每次循环之后指向离他最近的定位父级
  }
  return { left: l - bdl, top: t - bdt };
}

// 图片懒加载
// var allImgs = document.querySelectorAll('img');
function loadImg(dom: any) {
  var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
  var windowH =
    document.documentElement.clientHeight || document.body.clientHeight;

  for (var i = 0, len = dom.length; i < len; i++) {
    if (offset(dom[i]).top <= scrollT + windowH - 100) {
      //图片进入可视区
      dom[i].src = dom[i].getAttribute('data-src'); //设置图片src
    }
  }
}
// 先执行一次打开首页
// loadImg(allImgs);
// window.onscroll = function(){
//     //  持续执行
//     // loadImg(allImgs);
// }

// 生成范围随机整数
function randomPositiveOrNegative(preNum: number) {
  let newNum = preNum;

  const isPositive = Math.round(Math.random());

  if (isPositive) return newNum;

  return -newNum;
}

/**
 * @线性运动
 */
export function linearMotion(config: AutoReboundTs) {
  let { speedX = 1, speedY = 1, ms = 10, className = '' } = config;

  let dom = document.querySelector(className) as HTMLElement;

  clearInterval(dom.linearMotionTimer);

  // Move in 设置
  dom.onmouseover = null;

  // Move in
  dom.onmouseover = () => {
    clearInterval(dom.linearMotionTimer);
  };

  // Move out 清除
  dom.onmouseout = null;

  // Move out
  dom.onmouseout = () => {
    dom.linearMotionTimer = setInterval(() => {
      handleMotion();
    }, ms);
  };

  dom.linearMotionTimer = setInterval(() => {
    handleMotion();
  }, ms);

  const handleMotion = () => {
    var maxY = document.documentElement.clientHeight - dom.offsetHeight;

    var maxX = document.documentElement.clientWidth - dom.offsetWidth;

    var x = dom.offsetLeft;

    var y = dom.offsetTop;

    // 碰撞 - 左
    if (x < 0) {
      speedX = Math.abs(speedX);
    }

    // 碰撞 - 右
    if (x > maxX) {
      speedX = -Math.abs(speedX);
    }

    // 碰撞 - 上
    if (y < 0) {
      speedY = Math.abs(speedY);
    }

    // 碰撞 - 下
    if (y > maxY) {
      speedY = -Math.abs(speedY);
    }

    //  赋值 最终应该是多少的距离，位置
    dom.style.left = x + speedX + 'px';

    dom.style.top = y + speedY + 'px';
  };

  // END
}

/**
 * @计算视频第一帧
 */
export const getVideoBase64 = (url: string) => {
  return new Promise(function (resolve) {
    let dataURL = '';
    let video = document.createElement('video');
    video.setAttribute('crossOrigin', 'anonymous'); //处理跨域
    video.setAttribute('src', url);
    video.setAttribute('width', '400');
    video.setAttribute('height', '400');
    video.setAttribute('preload', 'auto');
    video.addEventListener('loadeddata', function () {
      let canvas: any = document.createElement('canvas'),
        width = video.width, //canvas的尺寸和图片一样
        height = video.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height); //绘制canvas
      dataURL = canvas?.toDataURL('image/jpeg') as string; //转换为base64
      resolve(dataURL);
    });
  });
};
