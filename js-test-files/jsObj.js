let promise = new Promise((resolve, reject) => {
  resolve("Hello");
});

promise.then((result) => {
  console.log(result); // 输出: "Hello"
}).catch((error) => {
  console.log(error); // 如果有错误，这里会输出错误信息
});
