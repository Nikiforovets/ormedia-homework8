class Plant{
    constructor(type, age){
        this.type = type;
        this.age = age;
    }

    get type(){
        return this._type;
    }

    set type(type){
        this._type = type;
    }

    get age(){
        return this._age;
    }

    set age(age){
        this._age = age;
    }
}