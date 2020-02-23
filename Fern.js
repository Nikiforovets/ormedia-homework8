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