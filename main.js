let timer;
let deleteFirstPhotoDelay;

async function start(){
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        createBreedList(data.message);
    } catch (error) {
        console.log("Problem fetching breed list", error);
    }
}

start();

function createBreedList(listOfBreeds) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadBreed(this.value)">

        <option>Choose a dog breed</option>

        ${Object.keys(listOfBreeds).map(breed => `<option>${breed}</option>`).join('')}

    </select>
    `
}

async function loadBreed(breed) {
    if(breed != "Choose a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        createSlideShow(data.message);
    } else {
        document.getElementById("slideShow").innerHTML = "";
    }
}

function createSlideShow(listOfImages) {

    let i = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);


    if (listOfImages.length > 1) {
        document.getElementById("slideShow").innerHTML = `<div class="slide" style="background-image: url('${listOfImages[0]}')";></div>
        <div class="slide" style="background-image: url('${listOfImages[1]}')";></div>`;

        i+=2;

        if(listOfImages.length == 2) i = 0;

        timer = setInterval(nextSlide, 3000);

    } else {

        document.getElementById("slideShow").innerHTML = `<div class="slide" style="background-image: url('${listOfImages[0]}')";></div>
        <div class="slide"></div>`;
    }

    function nextSlide() {
        document.getElementById("slideShow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${listOfImages[i]}')";></div>`);

        deleteFirstPhotoDelay = setTimeout( () => {
            document.querySelector(".slide").remove();
        }, 1000);

        if(i + 1 >= listOfImages.length) {
            i = 0;
        } else {
            i++;
        }
    }

}