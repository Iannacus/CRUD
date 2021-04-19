const btnAdd = document.getElementById("btnAdd");
const cList = document.getElementById("list");
const addCar = document.getElementById("addCar");
const data = document.getElementById("data");
const models = document.getElementById("models");
const brandCars = document.getElementById("brand");
const colors = document.getElementById("colors");
const btn = document.getElementById("btnAddUpdate");
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
    collectData(e.target);
    createHtmlCar(cars);
    e.target.parentElement.parentElement.parentElement.style.display = "none";
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
                return "https://lh3.googleusercontent.com/t88LpkhfgVEKIj_s4L3ek6lo8HY2457BxbilvgZ2Xu1vq_hUIjDNN1RoM0XCEb9zBwe5OMYz3ypULUjXZA8Wz0WQCCTR_Mtf5DPF3atDlprQArq7XOrM7O_2VciZrDKl_wR4iWDyT4C01_hYIGiyOO15VzM8RjFuJbX-cCDyQuO80_uEI29FZOMa9fqzuFv73oSkYvZNIDQPet2B3eGK1OsC0p1bf9xu2GCYdVSlr6SgWRWKyZS2HltfW-3e71n84gmyZXmxIHLurEmhWl3V-NJXyyv4j5-JFp-vIJ7Pkgw22mmOtsw4p2HY1xJ1QScbt0nVMAQieQJ-4lFc9NaTnVM7c-DSmOytK8sQ6vndw62MBsmyWUqbydnFU9qQyIiObaa8dTD-Sn8rlrOETi07ACUe2pVGbomz-h4oEulxZW_V_KJWOpuoZi-ahoNz96fG1KCmrFRIXV1g6vnfC9sJ9Um1nuN3Tz9N32RLcJbQ3Fpq0SAX9nbjuWjMWnGj2RkMi_I_gAF333GqxHYTyhnBU4Z7enj3Uv1enJqJ9wPJvxx37GZZ6s-li0a2Wq7oodCcAvFC5R0HZVXRCyvNUdDCOI4DmTuzAxg74yRRPGOcGmxmnWdtRle_ZhVFGwaqo59ERhBbmnnGRsUqmjAJYDPPIjjPgW2ST2d2sFjn3LtKCLBjOC_Dxzw0SJxLGJJJOedBZikL5Em21Qjy_YPCK_lEBTTKlw=w465-h229-no?authuser=0";
            if(color === "White")
                return "https://lh3.googleusercontent.com/sHyvsklZBiLpbLYJb62k9UYQLEK4T5g0F5UOEcFDM7jjnhZEDWv12u3uuxxy4TBLZKLf6xej3F7XCikb7WnPOfvCmdPksyKsHUaL_9FqzIkN40OYWfeC-Wotp4BgkjtsQ_HLSQQ_hGStlra_dycS5nV8d9xZr0WzNAn_bmYmQqS8ro4D8nbeFWDfHRCW6ijmmgoPTeepZR2l7Ru6hHlPdrzMKe26IHqNV0AfUtWATo2tCVXOmKi93_wqeZILodgIKq0X6qHoC_xV5FDCfUMWc0puaNtxvk0cJNWqam00EKXwojgf0s1zGr1lHFJmzHQTlDftGRPsMbaejWU7PI4H9ky75kfhryipVe6kgmVABWwGxbdl-dNTfSPgx8DBcQJ7vhtAKWp07yLfLMcIEXiOEnkk6WCNM1has9fCd5hq5JftKcsAdcTlJmRXwxP_2SUeauK3nM997vhrB1Xs7gz5UQgEy1MrkpOrICINgIWvYDQFmLgvlh28KWALMwZbY7WI_MkEVIBQ05-avNNtmLB-_hpUkYKf5sAoccMv_MTA6UgaydxT1jVOkEZ20wpcL9LCK-wKqQL86P_7CoIptB4oxTLlgM8Q2nR9Jt_7CInNZ9LQRYsfZw0FPcIYEGEo7O7Mp2uHiYpj69RzjIncV4TOqyCO4hTtrDrg07-mqIcHLBXU7cqqxaYaCGvBNH-qnccRAAAw3pa-qVGfpJ_yH_i2W8_Lbg=w447-h263-no?authuser=0";
            if(color === "Gray")
                return "https://lh3.googleusercontent.com/IGqOAXYrZ7enxo0zERhLJfFAvykx4RlW_Plvqi5_zxxF2g7KYv1XChni0uF9ZP6T3eTqrybvTv97-z9n4SRxyvbelZAozYWtgj177SXFRZW77EeeAb5vxxKuBu0WZPw-qGgC0PXxgO-JYCB8nCIEhq8165gmOcQa3K1fdF4HIeJZ-w6YZRnAIE3Coq1vO1ODQukiaXLNeMpZN685_ByuGH6nwq0W7HZSwr3BGf4G3pUHf8qIIVsfU_t7onO3zX4yBwByj009jSBZVTIN8OyIQ4rQqx-PdzlTwiyIDizduQM6ymomv9uIXDWk0y9PP7k4ABoARtvHYAHv1HiX-DaFLnln5zLRmGOi1ZEluaE_6Cgk3j3wddGev0GSmhsNqacQYNfpQY-73cUcBImD9TGP4UNCuTq4-DnTc0wWY4bODp-QQVKPYsOFwKj9DGjRu-K4_7SxmbF5FSdyiVv4CR39GRFRPzyL3El-2dM4IaKbLmSfpdUvrwB9jksRG4jiDOmzzRwBXrGjEG5gHGcjsJSzpxQSx2v1jRa7qDKo_p6s9a1mcmTCQbdoGLhv6kTLsbP-KofhTS4y7P1lb4STW0WH_Ev6uASrGenLOUwshrYYB7V8pnB1erimJg3kPDWrd1cuRsIZTCgD1Pp0q-VEgcWSTlz3iNZ1V-CRz4MuFKLd2zM5LWmJCRqKcU5jw7KqPt4PXdpswOm-kbcxAIVZYUsClCnubg=w466-h231-no?authuser=0";
            if(color = "Black")
                return "https://lh3.googleusercontent.com/Dwg8rq2_a1_S6mJiIVmFFSi9asJzR-mMd1Q8sraLhFMtjwnXormTuvYkuYjDWCN7YK2EWXeclU7G4gL5quLHfUD9LLmnUn3EK5f-M8VsLrc98tOEkr1rqCAFeDHmAoxSTN29zMPjuswwHRauAOZ0ockh0blkj2XFetLRa6YRYEz7zdofkK5PY96HRc_hF5dceAXxg992uU3QosS6Y6Aswf0tigG2kXKohcHtslE0ELUaePS1YpYS-oZSEC2zGvDXuGmVHEwidjl3ZCmxt1eQmp0fKwwBs8yv3kNk8c65O-L6Lv7JQPQvoc1XlExhV-hGFjteEnbeGLEiclj72SiJJnE5Tx4OxFxUhcOPI7tOyrCTG-J2yew2zdjb82C4lfg-lRm5vs5WoEel8XZaoz1s4RPCDynqCbHdOVVPj887iJSIoD2LkFPQJcEo5cd1EUw_yGvYFFCHHXD1aJfZAGAmZuwXZ7KQtbsSbaHeAHiwqGjOcfIm6WJ-thfQndqG1f3d7zarfOhZWCyekIrs6Y6s82jbUVvYChtSh3qDiaHZpccmKpSZU5nk2QkKmrvstUcYAniStrNjeltBriMyQdudDST4aZ2zsD6JpA00t1DK-qg6LD8kuv65-bd5dnDCcB1LaI206dGZiseHR2gtyzjt-TgtPbGIveLJZw74BU94EoRevEnfMeL45OAQAH3q2WceyamXbtsN0YcbIRfzhteLXZIXfA=w464-h239-no?authuser=0";

        case "Ignis":
            if(color === "Red")
                return "https://lh3.googleusercontent.com/4a9V6g3woI8PGbRRZkWSwpoMesDuQQaF2AbKdqEhOqdXl62-JfiIpxB45zUBR-BkYJAt4EHYZ_sNJ55AZtNrcvxjmUQ6SA_Fp8lKYNJUJaaKcGbKohcYSNpL-To8VEQNxw84pYcBS_aTZQ9CCcQ8thW6uarH9JeqBv9QlvDtJkKVHviepztaKyeAFxU0U0JIjo4PYP1xkL44EdL6ic0VzILSkpNo9cW4XrL9uoImIG5JRkOIS8EF43GavVUepeMJkA4P1mbhy95IMhQ06sFzhxl1e4QB29pDm0PL_c1lrBK_NIAOM8Gf5jImzYzJks2NNrpucYXknL3xtF3P0dYSgk5S6TY2K78qSNXE-3xZ5bKwsMDcBU0pglsZ7-UEuqq6uBCE5cOTatP6CYLqDHRDrxtwFrGoFAyjovpAaUn6-hHEoXVL-Tk8LD4sCQCN_ZlAOvNzlWWB0tsZ7WvRsVNQXIo7ykXmejM8pkuxCZqHWV2kaXRuTTYJ71vMgO-1hTwnxDL_hYRKeDZ8tTqgO4cA1vq6HZtB0VB7OCtV7Mzm1Nu_8qAZkg90NQvaKwWXb7WvPLfPyxbTYeg8g0GQ0pVf6185hCE9Y8B-2v29qETP8zhLgVKwl5ZZPs9fHqk8GvADpjk6tNAco48zW0q6Zqm0xNG8eGDRiRrO9XzovjXnYriIQuDcdptXv2YYmLbYYCdjCf94SfBdw87-ETKx0HsBt27Erg=w466-h207-no?authuser=0";
            if(color === "White")
                return "https://lh3.googleusercontent.com/F6rOqwFHGplYdqZp8-UTCyWUkHizF_JwCSe2DID6_c8U5hAz0GayDgzMkSPXKtl6CaVdSYLI-KMAymRVEhzX12xIwLCXJ5Mr8sq089-M0CYH7qXzZ11cUuu_FdD0Tjwenj9WPMY9VR1vKKm5FdcNnnbKaqwIHo7bI8nPSW0bn1PJYUvCFA1GqD7xIV63WSDymU0QowklVpmnGMdHLglu5oAZp81qlPqoQqocpv0vLuMeIWWtCRSpqhGWVsz0kpSmfPC4d6UlLQLdrmzDHD4a4-7PhFNld9K7W1WzF6Ao44o6yz4u9f5QRqSGUpZNxJLcRBPKaDTFy7nLfqdqhMzsl_Zqh0All88JFy29b1X3ECiR3MnLTOBuO4uFoQcIslVo3pUUZNDBxpMi7rKr1e71-YcIk4_vJa-KLYKBs29eo_LqX6jX4QjVQS9dNzGxCwnwJoIVcMVrYJDKAZvp7cDXFNePhfnDozhbeQgl6S9zLgv3nnXmWVAWjy8QhDkr1MsPfJMCSzwpfGVjnka8suplN7Ve3UdHbfI__q4DAHLUPBZJ_q1MkGB70gEUOgebC07TzT6wmmraAQFejfBsIEptOLD20pcg5gsYMJr0CB-ylNPDZy5HY6y0pN_b4Z-l1-KJNrDs3o3WekP7rff2pdIRbdadCtXFoZ5L70AH1stIK-xBHFIWuLrpQjfbF6J5tEjiF3z35BXEeIkM3z6JT3UjvNCg9w=w465-h210-no?authuser=0";
            if(color === "Black")
                return "https://lh3.googleusercontent.com/KH-JjohO5vkJRD4CKkIhLUxa2KSoUo161uHMKpukGmDkCSIMrkMPBqVjhw7iWqVis5Tar9gmTxQGIQCsN2bNdjzlC5q6ZSAZks2pSddw1ilfKIkGw0mzg-KbSqhGlyi4tJUJYQs_LKkP_byqbCR-M8sm-Am10y-PND8xAcIGxMGmHxaEFWv7fWobDkt8h0joy4TQ51F-QB8gJi24onPeTnAgmgP_7cjE9owM56qv63qAtGToefOssNTjTqCciWcQTh8d2Z5m3lBfHC2Gj5G1epun_jNVgC3DmFTQNjCcpUTDv6eTZVfP9PV9pWdBpBcg05kf_SLoWjL1r8r04S9a7o0g9GfXh5N8GfUPX2nvhnSQxoo-gEX17NflzmfAk1DTw54aivnD6225WXIWqPfhnhyY6o91dEdq092CZVVTNjLT2G_7ob2dgmbgGkjoAE-aLeApmzf2uz3plrcrobF1rjPlSGspbOBNY2sLU2JxQ0cNXZ9ZdBn4BS80vl1C042AhXZGobterlNG7UoMSqbXUivNT2_BWmxxBdwYky0BD0B3kf5eUOFu3wlHNtE0KqUzeuxRoRccAanFtHHpy54TGbyRpsouNCQ_S5FSrCvynVMEbyqr9qJ7D0u6pYJHinNNPeyXZtaerV4rkhEwNbVBbu89phbuIz9snwxXZD-kp6Rbj-LsguEeW_Hb1A3_o265QX3hJdBxDphBFTjRrmQijXjCmw=w466-h202-no?authuser=0";
            

        case "Vitara":
            if(color === "Red")
                return "https://lh3.googleusercontent.com/BKy2Pf0iBbDlGkiTalnrQ0O1HLFNzD_hAVkybBO4XuXKul7A4Jh0Jvn9gBkb3P9WVPlILi5_1QDHVkOA6qEqcj_dtnCezKBsw6gig_9EMX_UaORvywNFhqC1-Su3KS5flWHaP3AfVkxwWr81gdeSNkFWopAWiLAN5W4xYYeDL7Trn7JLs_j946WivlEGzkOFTWZywPzs1eI9iGUV6B14J9-lp3GFS6Gq_PT8JvnflwAsmnKrsS7FMJW2pXVjH7V9wpXEOw4j4Q8aNSgE9Wz4Zgd5oUYCDWFLJKC9br0ctzaPIeiZmsVvZ4hVq4z4utZZiRWZEGhfDRAcONWAoDElPC14bt9nbA0poOqihcti-aBAgHxt5U8oze94WegA2Ro_q4CTeTa_bY_ZosrdqPrjHewzX_TW9aEBLyJ8JY7L6KczZ3WjiEacPLonOdQ48XC9rcTKXlUxzQpZg4GfaDSRi-PI_mRJTMRWK38rnSaN6uEvmgep4cF-gLAe93JjZHlCjHOrydqNYIwih9lnFYA1WcsQAkw4Ii0bsSrS6FJq0U3tB9Gdlblt26SLIqqNx-iOnDyWe10qfcRS7PAGRKfK-U1pYhgHkmUdCh3HswMHErUlmUfuSh8jc5_o1v1TimxurggDncC7BoaI2eyAcEn_KKzVfFYXjXjWFWWH8ypavLqsq1Mw2wPJOohw1fUwsWX8VG_Fs6VSkfJ7Psi6d1i1eV9ahw=w458-h211-no?authuser=0";
            if(color === "White")
                return "https://lh3.googleusercontent.com/Y3VQwPKOpv9GUZhlCvHaom9CBHSTZPKi3mpGQtYDvGPnFHkFPPeabm6Zj2EHt9sDd6SyYvkj_NfJ1rWs-zgTIoQ56xNYM_u2AfDUwHid7OKMqKJ1NgBQXW9BtoX7xMkJ83rccT28UHUk-IEzOcfpC-1jFxZEaiEsbz8GfeLiRxiRbp-kJgSslx7yGOJ-LQff2LF8FHny_lKssKEy0Do4mvjQH6WiftfvzLBmW6PZ8Ru1Ayi3Kg5XalxNXrm7rdYbEpZSKpe2KkerukeGphuytHMbGbAF8ZUOhsXle151M_1HRH9Id8FAWpsphfz9Az38cp2tlFcOvBAabCmcpCJBzsEoUd2OaLthitfLqsAlca2akPX42C-tfG_-Q3RBfrusJ7Msc7-CeL9pPAvuq11pIHXnN13M2Ewq02RVFMUnTHFks07wf3ojVkkKm7vDVUA-xxFZ3IXt1SHHpzAam4Ap-C3aJFmhcPDxbFs1gA9hdt0Q9UKqBuaxgYSUgwTX4FjjHFdFz8DK2dtXqKCxxYK1nwa5jaNethc9Z2sIWE7g8a3ttiH0yGktC6LlaQ5e5U9-mfHKBhASTGzcYvYRAhESG9qQJyqM7X6b82ED_3bb1hklFYYl7lUGod0FyZSGscjcPgU1ecX-nd0e1WtMymBUYXME4FF-85geuhMYo5rdkAK5_HyNnipnvb9GRNGgQkyqomAZsx1yn-eh2BLH5jb9pOFN0A=w466-h203-no?authuser=0";
            if(color === "Gray")
                return "https://lh3.googleusercontent.com/R177nm74ofBycQu2s58f9aShxfBwQCQESotpQoK3CupuX48WnaAAzG9z-dM-jKIojH7YRFXg5Ymt_kpIgNlEyBcoXhhAEWTEvuJA_Sc0ZQHxQUiEEN_RLpGWVHMAOzVieeIwy9pwh9PFkx-5nera5-QIHNkRbxNBFPiITyyp9cCVmoscZ6LhakxXpyHB1urrnvI0FB56PtaIt4yzHJBjH8hVCAO_OZMQwsfwQfU83UDrKJsKH70Df9sWTwKrPcKKyFu3r9NAZ84tf7R7Exk2s3_XxOogtlv25wwvHCc4WiZHBEm9P0Fc8LnSGwzRpdZEgDZklwSUMPLrc31QUsjSw2ZCKDDMq2dKbBG6OtwjumbOSPZVVkNord8uFCCI8dW1j-VOK_C38XvSFFA3VwiWtGkPzvr4yIR-5hUqXtjtJWdDRItSgKsXtmXK9clxshxbRQWyVnX38hK60PwGN4vBeUYO5U8lodOYVeguEQE8krcmfNhBodF4Kc8rqH2f3Zoe_cPZIzrNoeYavmFmwBRZTV0nAU75A6ZZk_70n-S2QqUhZHrDND3I12YeWCfjIrOFu_QhPDLnryqhIj3KlscvN7z36pUedPzGJUCY_zGzGVKPGKJreHxm2yjOKO9foD41vG1BmcD5y6_AyGo3iV_J782MgGPk-iHRU6ilceN1T-iT5QPn1sirdemPRvmU7qqqV4cc8mwSs_HAAwEu-gL2a_lZJw=w466-h207-no?authuser=0";
            if(color = "Silver")
                return "https://lh3.googleusercontent.com/7qFkCKXH6sTKwBPuEaFgZciSAUM1OTISvJkvEoUJ4Cppjj8A74xgtDiprNzR8Zt_1yBwh9DFhlau8YGwfisqx1canDs0qYmecKidiExsehMWOa6ReNOjL-_jZTM9lC4RVl34FwZ6_d3z69GJPqW1ISKVJUcEobWSaCYXqyoVvc8s2tfLNd_sonBKk9IzLeyJHynJ-VA3oL8jwZiQUJqBMu7ZvJRGJrDH-DLHnmwlGELUoMU6Rsusy1bfWzSJl6tMC_r9K_y90w7z4FQyQSJOn-ktPoaSHGVxoMRo1T5-84tmqWoaN9Y3Hj1Qi-8bNsR1jFNSjutetyEcV-wsWebYbntaZlSC5ylzVXajzW85DErF4k3KwlNrJddowvF34zLTW2xqHgrT8mBFNY8yodUbyWC6unQE8mrpNIuSH1WC1d1vyZjXbmAbd2S2DrZKA4lrYoiKOV1DIqYcOVBhbA_Z3HRt-5dx9hv0WtidxhyLURSqmjlQyLHCytyuUJD5QyISkz7hkCJ0phbIuH0xdFQiLEm8v63cAolRL5Oz005IP9z9J6xo40bDPKn6EoZjca914DxUrn1W993hL8ggv9sv-vsFLbho4tjo3P3WdAcGqnQTIZq9xLI7HeDe6sVqEMbAFL0oT9xYuu5DNU2lHaI_3R9EpWPONy-88LsX-hQW4SuNLvjRVi6F1OQSiC_z0L27gm2MvxpEKhh3ilKtENMnqB2BGA=w466-h218-no?authuser=0";
        case "Kicks":
            if(color === "Red")
                return "https://lh3.googleusercontent.com/wuG2DJj-tyllhZkMoIj-xtindERstxlS8kG-cmMhAxtMpp-bDCEljsiwXwyobrfkI_j4pSXA-B0-JfF36kajw2Dq06m0IL6eroRKgUxJa-Hq8DiiSXXcZLw2nB2QZ9HKXBNxu7M338YFBprOsUyjqojLrW7wN0Da1-4ibkR7c_jp_GfZ9sWEXdfQ2ONsSTN0FoELX3pMQ3JXzx1txxiH6u-XhB-v28wUy3JFi9YD1rcY_8prb9OrFynnCV7dC4m4vzhG249JwwY5Oem-FtooLfGzdGhfydl5GJxucIDgX8_Ya8pnVkDPgZgZx-3MYHHudiAA67Xxtk3i1xaax8a6hu5Ijr1CE1ETojPbNZwFg735NYaE68jushnkcYyRdn8zc_2vRMqGOGJ8Yl1W86B7djpVX3t1leWxDn2uVS0WUb1QCXeSzrYup7qxNEq1-JchiR_zyJKxfF7dF2TL3lFxQTj1D58itEbNWU-zHMuv8xauhucDbThENBuF4ZWtsfUuUQ6dbqMhNFQEviP0r8aAPfBFHOJMySoiZdMjQ_6AlXRGhXuER_VY8hai9_Cs1DuZ2ud4SkKMf1pxOVcrzle3XQ5sCABuQRpSNzWQVvOA-waEy3myK_mnHCceMjxu5HfzHYOfGDy1EKbIE2gyHlhOIXc5LVc0GcvRh-SJYltKiQrHtndPKVRDw3Lf5xfoggpyHc2Tqn57IZ8JEXjd7XFPNW-B8A=w698-h447-no?authuser=0";
            if(color === "Orange")
                return "https://lh3.googleusercontent.com/KoJe8KGvYeFgvaRuu_6eMNXyOUgcSo6gHwfjPfpSvALpcu6QlppHHFBGqZDnz8nRpq4HFvfQJXGNtyX8S3CMB4OhvGYs87Gu474AyJFmiBeg-coEGUk-S4eJS8G_enZxIAJ9unDGffpvNDGNoiCpDTwSO5exKMVlveF5IvIw2BbrbvnLREzOTIb6DIziVK_PSeMfNwgrsqJAS-02jlnBwhwWBf0USjppFR4UlRAeo6IerjuJ1E7Drq5cwsnMyPaHEml3YV8VoAypiavHOKjnYoE48JfDVbZ5Pt2Cb4FKYXOv8howBrS7SRhkFdcR-JYI2SgEmL0DrdXbjBxQ5uIc8Z0wpwY9QPb3KtTdSPfmmSG1oMyhr2piVEsfkEUaGoA-Bp2EgkJFWIBxi-itlh8urEZoBG4eC4DFGX3Pa3Vys2VDizdwmD8Cgw6GT0j_niwJEtUx3iKtvBQxu20QIAFXw_J7b4QU8BrY_iZyYWUa3_qjzR0ZtJXgQyUGzP4SFgUTOMCfaIN1qtgGkq8ZUOkCo6oUqJ2_NzhE0yMxkGi-m_ZX36mYtj0Q7DR-d0Rdc8VBQxRUQijALsOXydePWhWsvluHBeUAkcweUnxnVhU1yrQ1iwou9mwE4ZhnN9uIdquZVbWMvhPI8Ho7BfDWqhaQ5fbWFU9a3vztJG4_PBBdoUGdY5NZH2xx3e2sq2P-5w4QLPMHuRDooa7oSQAabsbFReYqsQ=w715-h443-no?authuser=0";
            if(color === "Blue")
                return "https://lh3.googleusercontent.com/kNtW8gl_3wnCUnQ8k8cj9u8ocLZkxrAphiMa8yKSxMuorcs_hk58xN75e_dbK4ATeWOU8hQkf5klInHL9C591HmfX6KgrtJEjf8E3sF-9olU23q7pAlw9fiRnHCCdzyAor-HIRUaqeHJolhYADfynG3FjaO_exwm6Fx3yEPj_OIkPMoHAjZQ7BsxhfiaNv7tsFNjIsKKD5YksIGsvOEr9yTgfDjF5r5YamngEHZ0XD1KviEme7LlirLwxl-QqUomSkXgx53yBmV0vHB7bx60GF8reg3gNs7smYh-pRBrN40UNdStU5fQCpd0UqETU7HiRjR71eMDWaFbnmFBBK7wINcH3sOsOybrm-QT4B7PBwj8TLOwli566MZjxpRJ4SSwnD67iN4k5n-VQGCOVlfwd39J6s4KQCpbGtJwYmAlhoLyfQhJG_RjdeIfSBaMbxelXvkO099YmPAYWWZudcw1Zs4tcdPr7OJpaDQgeZFz5HowC8DD8qH6U0ZpFWLpJ5NXytcrfbmzY10b9RN4ZgltUToLWfQCQzJhJmefasR6nsz2FNjpfo3VxSl764tevW4fvqItmDbC14ixGLwwAHqRyKFJ-S7v9WYteaCNb23_atfQInZrarcD-USIkAjaNoNzjmJ_qiPyDpINaFX9x2lQJXtuyeXPzRkvd20iCigKj0pa23PgvBWpiqw9vt84-fmMifDWdc_1NTi9y7PSHudkCto3Bw=w718-h468-no?authuser=0";
        case "Versa":
            if(color === "White")
                return "https://lh3.googleusercontent.com/LEgU-lmgg3vUP-majZCJtbE2d4SnHmgNAuN1iNexAW0lXcXYpGCOkJsh0oWs9Y3KoqfWOdbuIDjp3xjWDcBWxecc9OM98y2N2Kbh1DOGBg6EGlEA7wkU3t8D8rxkksDY5H8Tdyu8UaQVXXkaIj3LC0lJCxoyLqcevUTsxktGUowIVeOrppzws0ejBisz6GXyEE6Hl0Jf6JTMMbCrgisANNr8y7TfsKxpeegXBlCYUBHJHd77FgHg1i4I7NYfuTxldgJea6I9xEY9IhlLbhZChGPBAKL2BUf0LGUM2QoDu92JQ77V9RetUN9DBZClZfmv2MaE1mf-5-q8yjQdkMbZkEnCfTiLccdhkEjmQP54MjUr--2GdkvlT0Bw3SAOc205GrNvpi-x-1zWg0vLUHTnQ28mmAKfrJDtznVM5GIIBu9fngB-m-l8WsmOKyUqH8Kb0ON7x3GI1vIFCaQUVTfD4IXeUYXxFufxJA6NQLkFi_Tq1BsuBvlmn1YaqLnUgjb-jLdBcr526Zf7LFXmf8q6IcF0t9VvuRtE0PmCbUDN4J3a-oAEEAnflZlejjj4flWmdB68bDk8YpPpFG169qUZDrM-_RsC-T5NN2ON-53I5MdxngrzmCJ1Zq3Gq8wvf_99IHYaFtwB5FkwLOtUSqVpHigP33r0dHeGKOdXU8g7oxG1r6fQFmcsU5JJVNBmwNHZWv9XksvaXFfo7sEFc0YAF_i2GA=s250-k-rw-no";
            if(color === "Red")
                return "https://lh3.googleusercontent.com/v9VYYdIYM_odDcePW6aNHw1BmmeLoLmgeNvt0f-nrcIi08cFcPEeCz_zvCfTrtskBts02iF71q1R9yI9LUCk0BZipbenL17UkcRGPVEZP5lnjfaAmUPBBhQkCXi1c6P_F8926vHbnZxqZw5Q3Y6CHGMDXTXRx9mAPnhsnIL_zXH0D-U8IzcoHcVsRAXeyRbab8fXflGJlyUhLQvs8OZ4k0-91DApu5UyUTQWNEkXrMIdofJ3LCr5CB53ykxhDeyslg-PCuPvmFUKKfNxX78swRmRvx4OHzN8yfv_tasb4DrrHjRFA-or7izXAGqo8AprMxQgIvLcc1jBcypoNp_KOkenO5GKXk0OlOxY2_xcpXRmilqIyESDc0b0b41KtPjcrsabVVqB4SNAFFjOxgs7vdQ07ST8tVLDHn7ei5KNpdnQySNyYPBpCScH3k1yHjm-t5H3oTB_Q0ioE6OnjvNHnKNf4xAq2bl1D4FdXnbwTYR8njFJxR8SY77jDoNhJzFnizawIe6E-LMlGj0byEza9yhT_JKPnsxD1tDjdTxoyDGSnyX8DkKuB71-sDoKxy_BlWN16hmZKOk7u401bLreb9kIt72XniBq1jJNy_BbfCBag0UdoGksJ-ECCGC4NotXY49UDGHqnmMTkY6J9YnyGWL1dc3RxT2HJnDIv4YskETRMcaPHsw5ZA0Q-1NShCLJw46F53NaMyieZYFnZz2kVXMYaA=w728-h428-no?authuser=0";
            if(color === "Blue")
                return "https://lh3.googleusercontent.com/OkLwm8qK8JjZ5YI_WBZlynyKjeU1S5PTKkvCQ3tpsZzvR9GH9AmZyrDMqbZBLk5SP9GhEjx9-2Obe3CWYvKWHS7dzrgmwtdH_CymFCVaSZYp3ejDG4ty5Ry9vG4O2_0KnkSvV-7MSuJ_pwuqDpzevSJw1m3rlyYu6l7DJtt3yfAOrkYVTzjmurwAx9kPZE98sANsHY3uZ7xehqG_mDLQONMHDa4CHfXD5dRbUjlg5WNa2B71o9okjoOoYYKEV44tVp8gJUiL___3PskKUEqomUCF07arOaiokGja-QgJAE9SiikfiB_IQeeVh-81jdcgw38zt-N0MNr_UOWkOskrk8N2plXUGePL5UUX1zvm8JOQldWnl3NovjzENUcdC4e_V9kmy8m-3AofJ8gimJmNiLuBMcV7YKYc3B9UaiuxkjNgH9wX0f73gS7nmD8rNT2tvyvqIQBsDPru5n2ZJ8_ZxqPpwvzEQ1xMvJazOm9RbLCuxpHlL0Htjm1hRagzDD6LqS67sOceP8OhOEf0pxmRlFhvaL_uoI-JuRrU87kzHiYwwHyfCuD_DUq-Ih7d-yOnKUJ8f2NkSB02rMXxUGpef81GWtTOj2E_APCwnZPJn2yt4SKH0eGrJxsmwUv654JZZSVPUX4Vk-u90qeVBnfl8H2S85AjZVXxcu-EFL0DxjKgkPBLDda2dlwcAINnzBBzv-OI_Vdr9QmfCi9XFOA7Xrqu5g=w689-h399-no?authuser=0";
            if(color === "Black")
                return "https://lh3.googleusercontent.com/SIC8ra1y24N78KFIPn21LvTM2MbHC9SUu1UZCIy2H6AzVvkvdvK841Mz00iRsXCXiwHBxKGLVppy6TinXQolSoWsiPizDVB-U9dKYsPUzWiP-woAQfDV_Ah3YJFMuHpkZGlsZ2DOiqm9My7adCDkWefzzP53UwcMhlO1GkGaAScraHtOUEY2G9g7_0AKh4BzM67TB7j1TzT4ddbjKplbUBEdvDWQNCNLalKiChW00FxQo5jDRdfqKVlO7n3AdPsSa3HzuSPm40EV7jAG2G8KNMQwD8cY7b7GYFWWHlBNbRCKLa0IK0miuWPT7UcMgkur7Kc9QBnDSelm9tnDf2VmjzGHuxo0uEYsUjiW7U166TWO7QZgk7pv-LMEv8Hfd8hi8UqAXgD3D9ioF6IncyCxiTPaPtV-77bJsoewdAF_k0Gd3kRBTWhWaq5CXjtAmj5unlKoDhMh2IfLocEwQ6h1wVNCTxqtjNWzGCPdtvxQEf3WWHKtnIJArXVWxg5ArDVo4D1RF1cKVigUx1x72Z8DruK4LP7Erw0-FbmsXYsWcKaDYUl-GVOeK9enIJpRljp--mGpPTEzEUK9MWwlSE9b-t3TrPfHit-DzHUDUQYURmB-q1xZLcg02aceV8IjRs1gavQ5dNzQM6enVgPsVa6skm2xhk53FHedscnNS0PURzyHr7RLyPPOyjtfyV0BADOe3Uo9RkwB_7eSd_snH0oskFrXiw=w731-h479-no?authuser=0";
        case "March":
            if(color === "Red")
                return "https://lh3.googleusercontent.com/toRgbypfvd0EoH_2dCAEMo58DeanG1wWqfEwrbt3pZwfr-zbfpv5fRz95QB7GNIyypr0CPaYCcUqvtkJM80E972fUoXZOLxs3GwlpRbRv7-73qGJrbgISOL1-yTGTgMkk2sW18JtvKetK_KmTkNqSmuSwyQ5owtWYPEORfeGZ2rNBwldN6Y0lHFPAqtY_QFVcQQ3iIYtfxTKhV9_p1_kdj15MlnD1yyf7kWc7tCERwo0ewoixXSoTK0QsmN6S2mwehEQiTB8VCRrbzRngtgC7mBSsWHWbsioR1qPu0GHDfw8HwwZJpPeYl9NvlyojMX8_21c4domYMvmAgCegf9VJXpdWm7kYnANjEL-_hXiXgGnbKLAcI4kHiHjIep3Yx_TFks61oUNnaP2H89_MAuJ8gsJZS3evj-eJELvqQQRAgdEU4zJ6sjPuEQDsq6jAaTuQF4WOAEZLnt-iFHkK5h3U-YrLd8ou71ifs1iEpx0g64Pxw5dtgK9lLWGtr_hGwqrm0RXI75Yj14y68My_sLe7tjoJIYr0--KbAncwqsCJK1QavSQ2fPexxq9VUmczdYSq1o-MnU6eGx47Y1eT3GbpB2XFV21XbvBrDEspeItyXUQbKzmz2LCTKNFQpMiuAN7_U9PR1vmzs2z0rNB0ccA8WQ1QeeIGwDBesiItmXaFi4MUnC7KwG66zXw-Tlp0w5WcU8etaTMDBWDOPplvoN5QNqI1Q=w678-h411-no?authuser=0";
            if(color === "Black")
                return "https://lh3.googleusercontent.com/J7TQgwTPPff1jMX2rKdBYv7TSAzDfnSpv4LasYxYIb4IfOx6kAhwLQGviQiyJjt1p-he8XWWea6xRmtbDxfXqzJdnYW1_dk9Kex9te4h7TEZyULe7ad3VSL6AuKIbHxFlS6KNqkw3t3lQY7R-EsExlyowhxcP0n5l5kbzkRHhYjG-lDBQ_EwFhxn9xTJv1ixiagBc72uGnNc_kSBM74rkLc2BC2VUmCF3qAhXxHDfYdcpLYx7fmpeX-33JFQXXOg4uroZnD1MJlj0wVT1s9iWx7uT26QokaMC4N4XnL6nZ8kpJvHRMSXFFlR-qnazx12tdo7uqYthZg48sPy8DPwp0invL1TMtiFz2ZpwWJjg1X6uvVfG0z6wSP2mexzuvrEdKmevDzQxAbeojyaMiNCnAN4O1gawGkFuhlEMKijBL_MCkL5uxnEtiMko3IWt91KWcyEfmNTOY6kkxmXuVFp6OHzbZOWvAumAVMYnWPreee6_gb8TAOircF44Suyr3iudtpNH_yEDxACj6inJjmHHMeXPIzIkioiAht5gFO2nEWbOFlydIvTg61Nb-ls3nopJ5H2XZHttbHnqK5CoV5-YnI5QCS1AvTi8hwUgZsQesZZgqdmyHGMY3lyEj0uZM9aXbPM5Mx5ntalVml3qjQuLGis_MpA_KMhQ84lqXBQDOqWQ0CG8WoiUgPIZD0hWhbPLoKa3SVnl6rDDkA8MOrxIIsvFQ=w683-h406-no?authuser=0";
            if(color === "Blue")
                return "https://lh3.googleusercontent.com/uf-02tZtHJZ7maWjdgGrBF1Dpqc2xDzp6ZG_gvE_7YXturng8_vyGSmRBXjsYAyl_2sw-wl5C3iki-6VsMrUejyMs9ZzxckO5c5rP1PnQzqPkYqGrJMM0Fi2k7SXzWN-NgAc3wLi_iyLFDc-4XGcGJK_UB5hZWC_nnae1neG0qBwJx3zBkkfWUpdeM2cMv7qQ6vjjwqcqimb9jOFjbd6dVO2Vw72CBnTRGm8K7waJRE2Jqa4rKQgNM8xDRUgVhTwoX5Bvq-d0FBqKvHlhVFbFV7naaU-UHoQ-2AJwPnWaQn5jwexNjwhBvbOw5iSew28rvMBPd8qWip85WZp8Z6z5IIzFUpS1bUk_-AzM4S6ItGBf4XJZq-Bo7OYacJgllYAtMxMizxpbRLkjS9KTZYvv4ghU9srSj1kyN3IWYQqGGlLfYBCEz7MjPVobxVAt4Dn-lCzWWwBKH3oAVPGGRpjHE4RMB8-HJoDisF1gsLXcvZ_4k2zw8_wX-eDlK8Sdb599qKAdLN2KDmdoeVDgtouSBinxaBFsJQLdumpThOMZ_kW8EHEBQtCwFrCxu3BQ07TKDY0LTAiDntskKjaUtbh6taAT7NsG0jIBoCmA5u7OsK55zWVDuKGZbBXiFpQ0L4luAxF6ZtUhPuGXc2eB3IzdyT0uBJB0hDW2Jx1_R2xBgXLd3cUkzJB7F2NNs7CKBY35QzfYvI0YQZK4SCrPrZsGO299A=w685-h400-no?authuser=0";
        case "Mustang":
            if(color === "Red")
                return "https://lh3.googleusercontent.com/BATAphXDrAP0iPMKVUVStD4N3SHuFOq68cuy0JAkQAQtegQbBruZE5o1L0tUlKra9fuB0yAA4FnAoc9UcOwkPyiSpK83qTj3KqeFZDrPciOzfW6R0gFd-R2L_U_L8XLU1rvNwnnWIS2e-am_7pZ8KZveqM2s5goGcY8i_aRgZSY_IZDtmlgCTcVVhy-iA0u2s3ul5bO8dXhU074nNvX2UcgHBdDMyQJBfA_Y-12u9AuoKiLqH095j0q3Vqxgf2Fd4lPI0G2n8q-bTU1u8iPG6wPvrTjZYVvuUh_HemAijz7GsFFPwps9GliPJjIi6UIrmNGO9y6S11dRhTj3A-w5BU9h0Z_kknkOXmp6xLC5ecUkzcAET4YNLFMP5hav38JHxDZp3FgpRd81QCn06i7TnTEEw6WgROKjjiOHJlJVsm-PXKGhRoTbUlXGgctpG-yT9lbZQSQlaPjmT28nQYTXg7T2WPXDbY7ukzr8twvY86p3hEf2q5wCYHsQ5GVEf3L-1cB6d_6GsUG2OF3I8ZXyA1foQFs_AfzlDkMFRZ_ljlo3RkVGgTI5dgOjGzK83rcjYQhJOMIVAHE_AkdrW_kzspzBJ6l0xhfZnMbnfgxoUC_OSDgKRIYN0blysh0AzZ4nguRFx7wO76tlo_ChoUBK754awrsKWxN5EDoDm3niMmohkiVz7_UZ70FBK7GJVzZ2Iambzgea783rvFVidBcqLrVZ-w=w1209-h394-no?authuser=0";
            if(color === "Orange")
                return "https://lh3.googleusercontent.com/3ltQl_ico0NTp3K32nUV-sEvIiBBbruejvqnZyIvfuM3IM72xtp9-PRMUOe0QiClKYgvmhMUEe3o6HumQ-Llke_edhbo9NmOsojCsmvg5Bse6nQQnrv544Qak1n4gFN3tiiaBd8gP45ZwiYLxKP4ddmwkaDHSMl6ITuCDr5Fe_o3PyTzd5RIrlYw7fq_nVoD0AjHWl8_zgpabolMPkRObs6fDQAyRUfxrXkjJgtf5BUeXsaPPGmqnLHLCUR5Ix66ObTHajFCbRU6Lcws_u0HEYI1jp_ouW2GbCXa-8lEcj9LzuX2PspcfzS4wQlin8R7UEGiaJ-au5KeFZ66UyCu-QhOAY0E3agDhnjNlAS1ngcJZHLVs8XD_Nm8Ka3d7MtNcUuct4nhLZJV6MkRasdUFobIPQ7EVmAoub4Zv7NPKUEQ72JfJmOWbxuVG3DeYAdoaEAcb89pkmZdXuZnQ3lH7tYibriix1iCdzYrnfWkAXO3VbjVx9PfP5u0pJLq1Vl-sQ0kwMbPvHPv9MBeBUBsV9HFtohPZp2rdqb4mX878_nVtGhQI7_UPWJYESCHL_NYLk33RS-26kLEIPliSI1Pl4TtAYOnx0z4ItAqhUkhEVN-8aNvzKrDU4L6dBgfnsOs3NqX4aJiSb-T_uSmNk9m8Mns_lDYhyu8fEcmgmFC4mTqoLHnfcPt7i5ss6Gj4-QNmu0uPPkvHUGGPRRSr1w3H3nQbQ=w1182-h397-no?authuser=0";
            if(color === "Yellow")
                return "https://lh3.googleusercontent.com/E2Sxxwv-_x_CX4LI5PJgiltsiQotqZz6s8r5kKKa0gHwwxLOzL_ZuQvjGcB9VhjNRL6nnaBqdJ2WhfTQwXEwzOwYysNdUPOwWvjvlvEcpkBZoqC6qLIagZ6vIg285INnvlsGXZE89mtJ4Rk58MvrePwD6ArsTd8l-f0aI23JcdZK53JB32Ty0Z29HL5-NJYIFQ88Jff5ReQi9S8UjdCCOC6y50UzcevaO1tSmHddPimImmr3l9Np-_Xmfqvf664a2bSNH4IxRpKQMxzSgWXGdqafzh83cCjYzZ1ueVTzKXy8rT3s1aAzRZ9gH9vNlZPT8JRKydxEiqSQmX7Fv_aLKioIMcapdUqR-rN5pb6FrIBT-X4tOAsu1S8ubOPBc1bOHhRyy9njVXk4r3Nah4uzBW8NkGdE46Of82dMnY5x7mpfUvgZUK7WhJaTaiWClO34ziOoaaVZdudPA8CLgO0jlav5u-n5cMDbplmCc_C3ibVBLEUMVbiYKGCLZ0SYBLLqDov0rv8vVnzSC52LCMMnl4Zk6BjJJGmzkVw96gwcAoTKMzxJQaaJQoBXK2tAXJpCSTwQxcgc8C1HhShS89I-WOZjkRa9Y6XM0RQABjIDnwsUpDPC8LFEcvgeE5IvPKWLeahR3mVhbv1FXePfUeQXW-iBjFDOd-cMbKB5czlGkU1Oy94UfPjlSyUkWTwcNtB_USgnT2VHph2yBSRBlOtDrhhkkw=w1219-h396-no?authuser=0";
        case "Figo":
            if(color === "Red")
                return "https://lh3.googleusercontent.com/VfFi7nYvnVb2HJfuUybQDlb2i-kn8c37UX01k66pTpyrriONpSmsXr3bkpC_R2DOcWmiuiwSUUg1aK44h-lU1y9uhBdET0ZZBThGzk4fy8y6ihPhBSZYrzw1uCZmllB_V-KWRhfXlX6gRMSXdUxGybrFZ09aAPCOU96Ye0VYMV9hdXmDWYRiiu8-0Rl_qhtL9fKjf0XJ4avkZX11RAkveqGsJi6MPQAEv-zxFnzbVlbEM7_XX25CcHwCe60TXfJwgZcmqhXVGTRktX1Yf3L6CDO3216eZA04P_bc0nQnXdh333BfNpRuUB0UVFzW4NYborOMEgy2DEt86pOd0LkmWDFwjsxynjviUCbU6OAMeTAUZWYy7sZg5zfjTrjhP37rMzvGneDMIovpgjPc0Hg_-vxuhNOGvEEHAXLRjoJdomLWtaCCLDfwABMcu9V4Y-6k0Zr3At2dglz74A0OXucARWRN45DaWEq3ElumHEWaaTxG6AJ9RZFcn5ghQNS7K7S8WuUzcyq3tWPdv1WAr723XXOogU1WNotUNKNxCawIdbGnc0moXAftLLu-qIdlYhsqa3cKbJgOLk6O-UH61an8bU1GR2cNALr1IN66dSSS9d8NpJnrx60nSTDKFXbCE44TM-9aTT5JWqEh0DOIf0prii2G3FgABNqkGpGO0ZjzLHv8xjuoYOzbFNlMaA3wBq2NWwTbSJ6ahQA7uxwTxRfbk7TZHg=w934-h413-no?authuser=0";
            if(color === "Black")
                return "https://lh3.googleusercontent.com/xclhDVKgPeyuVkJYpraOyTfNkLEvu5zs2WesAQT3--BixxuYMcYQBeL_OEIW4kLek5GJSculE5BRrm-cH7nyyUHDrL-bL8Mu3wHFbZMyRKiLWB5hSvGnpwKtXoqLwXLrxG2JnZBuF9mQZl1z08Ezusdtnxo-VQfL__2PlFpfQCBGvzX5CMpKjgOu8eNnfO5nBJv3QRY47gQzj_BeULNtTrAboXsHyoZMoEbbVQ7lPGI4UhJhhSNspdHo627q1U9AsPGpyJQBnN0XvHPdZqwNZTwWI37udunl63QTUkog9QBVBEiVKfXpSb1gC4QPMoj6olwDssPZkOelDVqtuUQPdlS7joCq2s-uYIIdr-fqZijzlaxLXfTr_yk8whxyDNm-1ORvjFJ3X3lAkveXE1rKoGEGZBI-JZj8iwJPSPmgTYA6Wh-ZUP87Vopf-jQm4EWNAYOV7Y2FxghS5abDO5LXHZJXT9-MA0RPw1bSvrDUKAyydhCjmHtrgXLCpA7u1I1pVGBygELWbiBLOedoEEv_Y01jzU80dqaiFTsvoDcw5lnLgNoFFGSZkWWlyMcd6paLTDMy2vksMG9Pb6AMNML6d4Yqm4DcrNVDeFXq7nAnSMS5KQ2crpQsOv9ZMbHq_hYLRGYk0PT01nM8nNAUODxzrm8Xi8sHD_LuZ1kOlStof38HECCEtrXQacm-X8iLyLEi16-zfeKwQfUKOyUg0jn4TFvPlg=w911-h416-no?authuser=0";
            if(color === "Blue")
                return "https://lh3.googleusercontent.com/Q9AsJsO7WRDdXWxNbS1-LYE8eTQoDsyDvUcWyguovW51w8tE0tutiIcBAqkK_gh8rumLvNdft-vcPxujo7FXT0ob9j3qeKnmmwFoCGsc6rCu4mS2H6AkzgTAYC-_0QCOLVk3d5aiGMe9OTNg0MQ_XDU3apnjGdeUh3iPsEbThejfH0aN2w3P_jcHDIprWyQPqhLysKDty3iBH27_PK7IhSLIgKxspWJK1jan10gM5a2xcp3Ryy1Edeh_Bp-VQtiaGHYm2vDlcI9GR8I5TnrHNochldXTTO-F-TqFwoV2cXivYoW_NAJQp64cHEGloof2Fo98p474Mc0ozNmRZlzfynLqd_rdu6AnrgRWdsBiIldFtC_bx9wYqnx8HfqRjICQ5p9kTzJzxFe7AUv0in9jAlvES8YsGg64flw87VqQri9lui85IDqbXlXBgQNt0r8MGHw_MvVYTLMjx2ggOLQlac6OfaRC8BRmehlmhCgWZPKllV8cTktzCyOb6LLJhIZQx9lMQDCROrZUHWVug25UzxOt7guPwF5Iz_BV3Ku_fMSXZ0LxMUTbim_0t4EWH_yauXb2-CXAWvjM8FR8pu77PBCv7V1pcM5RsYoTGlr9uTpUJfz9yF_JO6u17qgp1STzXGnwvqgYGJjE4E_j1ISGNKzH1V1_6Q6uqYtsYHn7fR9bOOp-NXrbUs5oj0tw2Qq1nfAltpPwHqYw-fNfpYwbc1eP-Q=w912-h417-no?authuser=0";
        case "Fusion":
            if(color === "Red")
                return "https://lh3.googleusercontent.com/YAL4HO78mchDc5NOlmljIV26JEnhJ_66i2EOOwuNnlgyrzvLzxoqLMCDsLxR5jipZfTKs3d1K3-Xk1Ep46hoBAmQ3eG-2C18dXtHkN8fnku85wYlDCAZ9MiWxuleh3xEBoKOLKaEGCN5rtiBZ2P_HAr9ea0JPs7L-lKrGFBKttlIiubchHgkvF3OJUG3_kYTX5VfmzWMsx_-8f6RF1UXpTF730Ir1Alq2dPJgRACkhVrcrbDkVyGsfp2PcjR4CVskcFfZxaryaLiJ_f01nqOXeeweo33hIU6beYK4iapQLSBSFg3TcLCz82gn8NNRdJ2jJDzVOU1J2af4tT4eEPHMg4KBxXDCB2ZvwiMHFM3vFg3TsE20PzL6mgYFq21YT5HZ_aMaI8P4LVk1S1UXPcy446vPhUAE0GD5Fln357-Z7MO0zaRo2v9e6-r3_Zug5KDDyijrJlMnEKXBCFXeBB42r1nPAXjkNqd-HwHh7JmSdBYVFhIlSl40Mdb-BxDm9eb9GuCBcIkwPvAzUmAduHAE4qfLqLYR_td8T554kKUwQnwt8y-VYIj4QgSTfY889VoJl2fomfH--mhzfOx3Oah2LWjObz6Qmc_BOZFj4FDBD8kSvxuSfzYtpcDDORu9BEuNZ2Noo57c7yTwPmBWkECF-skQBewNO4EB80ZWVl0Ew6P3OHHfkpHg3XGw2-Xbqn_YQPsPypKKnlpsqgvt-HKRlHlRQ=w1057-h356-no?authuser=0";
            if(color === "Black")
                return "https://lh3.googleusercontent.com/h3R9eMSkiD_IWBtA9myI9FiyVvgIUKU1gsJA3RX4TgmUufzZlc0lzKR-YdzrAdMr4or6qGuCBjYp960JOKClalmO6VWKqL0_q0n8tIRiCWKbvBfP2Nrk_I0Gul9Z15RHnnzGT3ObN__efOI7nSbDFtftop2Ykaihxro0NAl4_T-Xfzgb1v3ywty0sKiQ3Z1Hyrkx7sRYsl1Aa_zMSoQPfCq_ntkBmC6qloJ_ZGq5gG-VGav1Tbr936dj_3t6xZMqQRI6n_0FDP_xHhbJBqzn31t1LChaGaNz4me2C99nntke2O7VAzYTPGGq4VzcOtb3mhXtrHWneJPgRGLGDpFKH8J_Qpw-LwwpDEJSLwZkB7fQ5LWzcEt5oTxp3h1-MMvGlm3SGuHoGZk5Aywt98sPTtsdAdwrRF03r1L_1Ezeb-2MnZuOto5tOPhVOlryvKNfRiMbRE7fhuntSoL6CZvCtW_fGaxO3eBT05GeqvJ-fWRaTBpRqggKMJ8cMhhEzMLgfcF9PL1rRk6dM2VaH1qX9OuojNAksPohPAF5ZJie4Ey3gI3KxFjnKfmvmdZqY9jpSwDE0ihd1xntR42K0sSxrd8PanFZELMewoPtW74bJvOMYiFk710qlFBFTBJ9buGrRVsMv2Hia-JlRyEjL2HezJedDLqiuKNanCtkVnP0-L62jj3ApH_3n6mIgeovSK09_HlB5uBiXUuzK9uWw_1c-syedA=w1080-h376-no?authuser=0";
            if(color === "White")
                return "https://lh3.googleusercontent.com/Pbf2VCT70nq0ZOsl0JRcfIvNRw_EHwiAMDzfkhGsO7m-cjRYtCBHdJLlgjYgRGNo5jPzYtEauI0X2_zojdR_khO2Db5_aFPaS57iDEaXVSMqwbFcoYk5L6YUGlHMn_GkUezPk_9BIHFxKug_8LYy4vPM5SLFIF9pxn-PR0321lrBqOal2O2WsnS2MMPgEjmOWwlREQK4sk461-x64mRmMs77m7FuNS9v93Wf2HA7o5i7LXDYimv8mz7Dn_yChGnbmXd9ygREXBtx-NK-wp51yENRq57IrTz567ZaZl93QpHr4mGIkk5LhzImNEYCPejHRRh25UtqANZl_HU9bC49-vP0zIuL_vNPeeBJ4LSt3Pc5bi3PfbpXWeFbzDq6_qltOsv3xL3YquzWDlp-2nckGybRXklQ9RrVe3mL_VzNgbT6vdMSMgApw7Y2MI9Ec-JnoL0HHXcOeHEz3fKI29HsogGvDUyHsZhvDuBxLy9a3c_i5Tx6fZ6EISo-JYwLfvdwuurRmzK-3ag85EKzQGAmyHQwN3ERr-yL6XHZXSAhALTZW6DiDoQG5pC95Z4N-ty0l6v-Se2sCOOs59NBSCxP7VRkl-tO3R8VLC3vQF78qIlUkjlz3xiM2g6eHSr2r8QGbd61i_4OqWLqAleALCb4h_pgEaKlkQR7ok3n0CjN_L7pdP23z_JX5K4-oIizS18ZZfX1XkqvbZ0tLJu12MhxdXZRHQ=w1124-h386-no?authuser=0";
    }

}