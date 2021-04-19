const btnAdd = document.getElementById("btnAdd");
const cList = document.getElementById("list");
const addCar = document.getElementById("addCar");
const data = document.getElementById("data");
const models = document.getElementById("models");
const brandCars = document.getElementById("brand");
const colors = document.getElementById("colors");
const btn = document.getElementById("btnAddUpdate");
const price = document.getElementById("price");
let cars = [];
let id = 0;
let updateID = "";
let update = false;

brandCars.addEventListener("change", readBrand);
models.addEventListener("change", readModel);

btnAdd.addEventListener("click", e => {
    e.preventDefault();
    e.target.parentElement.nextElementSibling.style.display = "block";
    readBrand();
});

addCar.addEventListener("click", e => {
    e.preventDefault();
    console.log(price);
    if(price.value="0"){
        alert("Debes rellenar todos los campos");
    }else{
        collectData(e.target);
        createHtmlCar(cars);
        e.target.parentElement.parentElement.parentElement.style.display = "none";
    }
    
})

list.addEventListener("click", e => {
    if(e.target.classList.contains("btn--delete")){
        carID = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        cars = cars.filter(car => car.id != carID);
        createHtmlCar(cars);
    }
    if(e.target.classList.contains("btn--update")){
        update = true;
        updateID = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
        readBrand();
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.style.display = "block";
        btnText(update, e);
    }
})

function btnText(action) {
    if(action){
        addCar.value = "Actualizar";
    }
}

function readBrand() {
    if(brandCars.options[brandCars.selectedIndex].text === "Suzuki"){
        models.innerHTML = `
        <option value="">Ignis</option>
        <option value="">Vitara</option>
        <option value="">Swift</option>
        `
    }
    if(brandCars.options[brandCars.selectedIndex].text === "Nissan"){
        models.innerHTML = `
        <option value="">Kicks</option>
        <option value="">Versa</option>
        <option value="">March</option>
        `
    }
    if(brandCars.options[brandCars.selectedIndex].text === "Ford"){
        models.innerHTML = `
        <option value="">Mustang</option>
        <option value="">Figo</option>
        <option value="">Fusion</option>
        `
    }
    readModel();
}

function readModel() {
    if(models.options[models.selectedIndex].text === "Swift"){
        colors.innerHTML = `
        <option value="">Red</option>
        <option value="">White</option>
        <option value="">Black</option>
        <option value="">Gray</option>
        `
    }
    if(models.options[models.selectedIndex].text === "Ignis"){
        colors.innerHTML = `
        <option value="">Red</option>
        <option value="">White</option>
        <option value="">Black</option>
        `
    }
    if(models.options[models.selectedIndex].text === "Vitara"){
        colors.innerHTML = `
        <option value="">Red</option>
        <option value="">White</option>
        <option value="">Silver</option>
        <option value="">Gray</option>
        `
    }
    if(models.options[models.selectedIndex].text === "Kicks"){
        colors.innerHTML = `
        <option value="">Orange</option>
        <option value="">Blue</option>
        <option value="">Red</option>
        `
    }

    if(models.options[models.selectedIndex].text === "Versa"){
        colors.innerHTML = `
        <option value="">White</option>
        <option value="">Blue</option>
        <option value="">Red</option>
        <option value="">Black</option>
        `
    }

    if(models.options[models.selectedIndex].text === "March"){
        colors.innerHTML = `
        <option value="">Blue</option>
        <option value="">Red</option>
        <option value="">Black</option>
        `
    }

    if(models.options[models.selectedIndex].text === "Mustang"){
        colors.innerHTML = `
        <option value="">Orange</option>
        <option value="">Red</option>
        <option value="">Yellow</option>
        `
    }

    if(models.options[models.selectedIndex].text === "Figo"){
        colors.innerHTML = `
        <option value="">Blue</option>
        <option value="">Red</option>
        <option value="">Black</option>
        `
    }

    if(models.options[models.selectedIndex].text === "Fusion"){
        colors.innerHTML = `
        <option value="">White</option>
        <option value="">Red</option>
        <option value="">Black</option>
        `
    }

}

function collectData(event){
    let brand = event.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild;
    brand = brand.options[brand.selectedIndex].text;
    let model = event.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.lastElementChild;
    model = model.options[model.selectedIndex].text;
    let year = event.parentElement.parentElement.firstElementChild.lastElementChild.lastElementChild;
    year = year.options[year.selectedIndex].text;
    let color = event.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.lastElementChild;
    color = color.options[color.selectedIndex].text;
    const price = event.parentElement.parentElement.firstElementChild.nextElementSibling.lastElementChild.lastElementChild.value;
    id = id+1;
    let  data = {brand: brand, model: model, year: year, color: color, price: price, id: id};
    updateData(data);
    
}

function updateData(data){
    
    if(update){
        update = false;
        const index = cars.findIndex(car => car.id === Number(updateID));
        cars[index] = data;
        addCar.value = "Agregar";
    }else{
        cars.push(data);
    }
}

function createHtmlCar(array){
    cleanHTML();
    array.forEach(car => {
        const {brand, model, year, color, price, id} = car;
        const image = selectImage(car);
        const colorId = brand + id;
        const cars = document.createElement("div");
        const carCard = `<div class="carContainer center" id="${id}">
        <div class="carLayout">
        <div class="picBar">
            <div class="imgContainer">
                <img src="${image}" alt="" >
            </div>
        </div>
        <div class="glassmMedium features" >
                <div class="features__main">
                <p>${brand}</p>
                <p>${model}</p>
                <p>${year}</p>
                </div>  
                <div class="features__secondary">
                <div class="features__color features__color--gray center" id="${colorId}">  
                </div>
                <p>$ ${price}</p>
                </div>
        </div>    
        <div class="glassm">
            <div class="buttons">
            <div class="btn btn--update center">
            Actualizar
            </div>
            <div class="btn btn--delete center" id="delete">
            Eliminar
            </div>
            </div>
        </div>
        </div>
        </div>`;
        cars.innerHTML = carCard;
        cList.appendChild(cars);
        const carColor = document.getElementById(`${colorId}`);
        carColor.style.background = color;
    });
}

function cleanHTML(){
    cList.innerHTML = "";
}

function selectImage(car) {
    model = car.model;
    color = car.color;
    console.log(color);
    switch (model) {
        case "Swift":
            if(color === "Red")
                return "/img/suzuki/swiftRojo.PNG";
            if(color === "White")
                return "/img/suzuki/swift blanco.PNG";
            if(color === "Gray")
                return "/img/suzuki/swift gris.PNG";
            if(color = "Black")
                return "/img/suzuki/swift negro.PNG";

        case "Ignis":
            if(color === "Red")
                return "/img/suzuki/ignis rojo.PNG";
            if(color === "White")
                return "/img/suzuki/ignis blanco.PNG";
            if(color === "Black")
                return "/img/suzuki/ignis negro.PNG";
            

        case "Vitara":
            if(color === "Red")
                return "/img/suzuki/vitara roja.PNG";
            if(color === "White")
                return "/img/suzuki/vitara blanca.PNG";
            if(color === "Gray")
                return "/img/suzuki/vitara gris.PNG";
            if(color = "Silver")
                return "/img/suzuki/vitara plata.PNG";
        case "Kicks":
            if(color === "Red")
                return "/img/Nissan/kicks roja.PNG";
            if(color === "Orange")
                return "/img/Nissan/kicks naranja.PNG";
            if(color === "Blue")
                return "/img/Nissan/kicks azul.PNG";
        case "Versa":
            if(color === "White")
                return "/img/Nissan/versa blanco.PNG";
            if(color === "Red")
                return "/img/Nissan/versa rojo.PNG";
            if(color === "Blue")
                return "/img/Nissan/versa azul.PNG";
            if(color === "Black")
                return "/img/Nissan/versa negro.PNG";
        case "March":
            if(color === "Red")
                return "/img/Nissan/March rojo.PNG";
            if(color === "Black")
                return "/img/Nissan/March negro.PNG";
            if(color === "Blue")
                return "/img/Nissan/March azul.PNG";
        case "Mustang":
            if(color === "Red")
                return "/img/Ford/Mustang rojo.PNG";
            if(color === "Orange")
                return "/img/Ford/Mustang Naranja.PNG";
            if(color === "Yellow")
                return "/img/Ford/Mustang Amarillo.PNG";
        case "Figo":
            if(color === "Red")
                return "/img/Ford/Figo Rojo.PNG";
            if(color === "Black")
                return "/img/Ford/Figo Negro.PNG";
            if(color === "Blue")
                return "/img/Ford/Figo Azul.PNG";
        case "Fusion":
            if(color === "Red")
                return "/img/Ford/fusion Rojo.PNG";
            if(color === "Black")
                return "/img/Ford/fusion negro.PNG";
            if(color === "White")
                return "/img/Ford/fusion blanco.PNG";
    }

}