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