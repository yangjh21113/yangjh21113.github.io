function checkOrderStatus() {
    console.log(1);
}

function checking() {
    setTimeout(() => {
        // 假设 checkOrderStatus是一个异步函数
        checkOrderStatus().then((res) => {
            // 满足条件停止递归
            if (res) {
                //
            } else {
                checking()
            }
        })
    }, 3000);
}

//setInterval(() => {
//    checkOrderStatus()
//}, 1000)

