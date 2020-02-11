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

class Fern extends Plant{
    constructor(type, age, description, poison){
        super(type, age);
        this.description = description;
        this.poison = poison;
        this.name = "Папоротник";
    }

    get description(){
        return this._description;
    }

    set description(description){
        this._description = description;
    }

    get poison(){
        return this._poison;
    }

    set poison(poison){
        this._poison = poison;
    }
}

class Spruce extends Plant{
    constructor(type, age, area, application){
        super(type, age);
        this.area = area;
        this.application = application;
        this.name = "Ель";
    }

    get area(){
        return this._area;
    }

    set area(area){
        this._area = area;
    }

    get application(){
        return this._application;
    }

    set application(application){
        this._application = application;
    }
}