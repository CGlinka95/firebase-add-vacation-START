// write.js
// import your modules
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

// ref > form
document.forms["rentalForm"].addEventListener("submit", onAddRental);
// ref > file input element
document.querySelector("#rentalImage").addEventListener("change", onImageSelected);

//Rental Form Event Handler
function onAddRental(e) {
    e.preventDefault();
    //uploadNewVacactionRenal();
}

// File input change event listener function
function onImageSelected(e) {
    //selected file
    // [file, file, file, file]
    let file = e.target.files[0];
    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file);
    checkImageUpload(file);
}

async function checkImageUpload(file) {
    // ref path > where we plan on storing the image...
    const imageRef = storageRef(storage, file.name);
    // uplod the file
    const confirmation = await uploadBytes(imageRef, file);
    console.log(confirmation);
}