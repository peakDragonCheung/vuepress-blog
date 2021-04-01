
    function *generatorFnA() {
        for (const iterator of [1,2,3]) {
            try {
                yield iterator
            } catch (error) {
                
            }
        }
    }
    const Ao = generatorFnA();
    console.log(Ao.next()) // {value: 1, done: false}
    Ao.throw('a'); 
    console.log(Ao.next()) // {value: 3, done: false}
