    const target = {
        sayThis() {
            console.log(this === proxy)
        }
    };

    const hander = {
        
    }
    const { proxy, revoke } = Proxy.revocable(target, hander);
    console.log(proxy.sayThis()); // true
    console.log(target.sayThis()); // false

