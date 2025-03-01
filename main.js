async function start(){
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    createBreedList(data.message);
}

start();

function createBreedList(listOfBreeds) {

}