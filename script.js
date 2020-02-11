
switchDisplay("commonInfo");
printPlantsArray();

function printPlantsArray(){
    let array = [];
    let request = new XMLHttpRequest();
    let url = "http://localhost:3000/posts";
    request.open('GET', url); 
    request.setRequestHeader('Content-Type', 'application/x-www-form-url'); 
    request.addEventListener("readystatechange", () => {
	if (request.readyState === 4 && request.status === 200) {  
        array = JSON.parse(request.responseText);

        let form = document.getElementById("commonInfo").getElementsByTagName("form");
        form[0].innerHTML = "";

        for(let i = 0; i < array.length; i++){
            form[0].innerHTML += "<br>";
            form[0].innerHTML += "<div class'element'>";
            form[0].innerHTML += "<div class='name'>" + "<div class='nameLabel'> Название: </div>" +
            "<div class='nameText' id='nameText" + i + "'>" + array[i].name + " " + array[i].type + "</div>"+ "</div>" +
            "<div class='edit' id='edit" + i + "'> Редактировать </div>"+
            "<div class='remove' id='remove" + i + "'> Удалить </div>";
            form[0].innerHTML += "</div>";
        }
        form[0].innerHTML += "<br>"; 
        form[0].innerHTML += "<input type='button' id='newPlantBtn' value='Добавить новое растение'>";

        document.getElementById("newPlantBtn").addEventListener("click", addPlant);
        addPlantsListeners(array);
        }
        else
        {
            console.error("Статус запроса " + request.status);
        }
    });
    request.send();   
    
}

function printPersonalInfo(i, plants){
    let form = document.getElementById("personalInfo").getElementsByTagName("form");
    form[0].innerHTML = "<br>";
    form[0].innerHTML += "<div class='detailedInfo'>" + 
    "<div class='detName'> Название: " + plants[i].name + " " + plants[i].type + "</div>";
    form[0].innerHTML += "<div class='detAge'> Возраст: " + plants[i].age + "</div>";
    if(plants[i].name == "Папоротник"){
        form[0].innerHTML += "<div class='detDescription'> Описание: " + plants[i].description + "</div>";
        if(plants[i].poison == true)
            form[0].innerHTML += "<div class='detPoison'> Ядовитый: да </div>";
        else
            form[0].innerHTML += "<div class='detPoison'> Ядовитый: нет </div>";
    }else{
        form[0].innerHTML += "<div class='detArea'> Место произрастания: " + plants[i].area + "</div>";
        form[0].innerHTML += "<div class='detApplication'> Применение: " + plants[i].application + "</div>";
    }
    form[0].innerHTML += "<input class='btn' id='mainMenuBtn' type='button' value='Главное меню'>";
    form[0].innerHTML += "</div>";

    document.getElementById("mainMenuBtn").addEventListener("click", ()=>{
        switchDisplay("commonInfo");
    });
}

function addPlantsListeners(array){
    for(let i = 0; i < array.length; i++){
        let name = "nameText" + i;
        let edit = "edit" + i;
        let remove = "remove" + i;

        document.getElementById(name).addEventListener("click", ()=>{
            printPersonalInfo(i, array);
            switchDisplay("personalInfo");
        });

        document.getElementById(edit).addEventListener("click", ()=>{
            printEditMenu(i, array);
            switchDisplay("editMenu");
        });

        document.getElementById(remove).addEventListener("click", ()=>{
            if(confirm("Вы уверены, что хотите удалить растение " + array[i].name + " " + array[i].type + "?")){
                removePlant(i, array);
            }
        });
    }
}

function printEditMenu(i, plants){
    document.getElementById("buttonFormComtainer").style.display = "none";

    document.getElementById("editNameField").value =  plants[i].type;
    document.getElementById("editAgeField").value = plants[i].age;
    if(plants[i].name == "Папоротник"){
        document.getElementById("editDescriptionField").value = plants[i].description;
        document.getElementById("spruceContainer").style.display = "none";
        document.getElementById("fernContainer").style.display = "";
    }
    else{
        document.getElementById("editAreaField").value = plants[i].area;
        document.getElementById("applicationField").value = plants[i].application;
        document.getElementById("spruceContainer").style.display = "";
        document.getElementById("fernContainer").style.display = "none";
    }

    document.getElementById("commonContainer").style.display = "";
    removePlant(i, plants);
}

function removePlant(i, plants){

    let request = new XMLHttpRequest();
    let url = "http://localhost:3000/posts/" + plants[i].id;
    console.log(url);
    request.open('DELETE', url); 
    request.setRequestHeader('Content-Type', 'application/x-www-form-url'); 
    request.addEventListener("readystatechange", () => {
	if (request.readyState == 4 && request.status == 200){
            printPlantsArray();
        }
        else
        {
            console.error("Статус запроса " + request.status);
        }
    });

    request.send();
}

function switchDisplay(display){
    switch(display){
        case "commonInfo":
        document.getElementById("commonInfo").style.display = "";
        document.getElementById("personalInfo").style.display = "none";
        document.getElementById("editMenu").style.display = "none";
        break;
        case "personalInfo":
        document.getElementById("commonInfo").style.display = "none";
        document.getElementById("personalInfo").style.display = "";
        document.getElementById("editMenu").style.display = "none";
        break;
        case "editMenu":
        document.getElementById("commonInfo").style.display = "none";
        document.getElementById("personalInfo").style.display = "none";
        document.getElementById("editMenu").style.display = "";
        break;
    }

}

function addPlant(){
    switchDisplay("editMenu");
    document.getElementById("buttonFormComtainer").style.display = "";
    document.getElementById("spruceContainer").style.display = "none";
    document.getElementById("fernContainer").style.display = "none";

    document.querySelectorAll('input[type=text]').forEach(el=>el.value = '');

    document.getElementById("plantType1").addEventListener("click", ()=>{
        document.getElementById("commonContainer").style.display = "";
        document.getElementById("spruceContainer").style.display = "none";
        document.getElementById("fernContainer").style.display = "";
    });

    document.getElementById("plantType2").addEventListener("click", ()=>{
        document.getElementById("commonContainer").style.display = "";
        document.getElementById("spruceContainer").style.display = "";
        document.getElementById("fernContainer").style.display = "none";
    });
};


document.getElementById("editElement").addEventListener("click", ()=>{

    let form = document.getElementById("editMenu").getElementsByTagName("form");
    let newPlant; 

    let request = new XMLHttpRequest();
    let url = "http://localhost:3000/posts";// +  //json-server"&author=typicode";
    request.open('POST', url); 
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.addEventListener("readystatechange", () => {
    if (request.readyState == 4 && request.status == 201){
        printPlantsArray();
        switchDisplay("commonInfo");
        }
        else{
                console.error("Статус запроса " + request.status);
        }
    });  

    if(document.getElementById("spruceContainer").style.display == "none" &&
    document.getElementById("fernContainer").style.display == ""){
        newPlant = new Fern(form[0].elements.type.value, form[0].elements.age.value, form[0].elements.desc.value, form[0].elements.poison.checked);
        console.log(newPlant.poison);
        newPlant = JSON.stringify(newPlant, ['type', 'age', 'description', 'poison', 'name']);
        console.log(newPlant);
        request.send(newPlant);

    }if(document.getElementById("spruceContainer").style.display == "" &&
    document.getElementById("fernContainer").style.display == "none"){
        newPlant = new Spruce(form[0].elements.type.value, form[0].elements.age.value, form[0].elements.area.value, form[0].elements.application.value);  
        newPlant = JSON.stringify(newPlant, ['type', 'age', 'area', 'application', 'name']);
        request.send(newPlant);
    } 
});

/*var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
xhr.open('GET', ' http://localhost:3000/posts/1', false);

// 3. Отсылаем запрос
xhr.send();

// 4. Если код ответа сервера не 200, то это ошибка
if (xhr.status != 200) {
  // обработать ошибку
  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
  // вывести результат
  alert( xhr.responseText ); // responseText -- текст ответа.
}*/
//show();

/*function show(){  
            $.ajax({  
                url: "http://localhost:3000/posts/1",  
                type: "GET",
                cache: false,  
                success: function(obj){  
                    console.log(obj);
                    //$("#content").html(html);  
                },
                error: function(responseText){
                    console.log(responseText);
                }
            });  
        }  
      
        $(document).ready(function(){  
            show();  
            //setInterval('show()',1000);  
        });  

*/
//	Данные для передачи на сервер например	id товаров и его количество
//let id_product = 321;
//let qty_product = 2;
 


/*


 // принцип	тот же самый что и у обычного POST	запроса 
const request = new XMLHttpRequest();
const url = "http://localhost:3000/posts";
//const params = "id_product=" + id_product+ "&qty_product=" + qty_product;
 
//	Здесь нужно указать в каком формате мы будем принимать данные вот и все	отличие 
request.responseType =	"json";
request.open("POST", url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 
request.addEventListener("readystatechange", () => {
 
    if (request.readyState === 4 && request.status === 200) {
        let obj = request.response;
       
	console.log(obj);       
	// Здесь мы можем обращаться к свойству объекта и получать	его значение
	console.log(obj.id_product);
	console.log(obj.qty_product);   
	}
});
//console.log(plants[0]);
 
request.send("age=" + fern1.age+ "&name=" + fern1.name);

*/