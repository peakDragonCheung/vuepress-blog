const target = {
    name: '何雅虹'
};

const hander = {
    get() {
        return '何雅虹是猪'
    }
}

const proxy = new Proxy(target, hander);
console.log(proxy.name); // 何雅虹是猪