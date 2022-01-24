// write.js
// import your modules
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get} from 'firebase/database'
import { db, storage } from "./libs/firebase/firebaseConfig";

// ref > form
document.forms["rentalForm"].addEventListener("submit", onAddRental);
// ref > file input element
document.querySelector("#rentalImage").addEventListener("change", onImageSelected);

//Rental Form Event Handler
function onAddRental(e) {
    e.preventDefault();
    // create the data for a vacation rental
    uploadNewVacactionRenal();
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

async function uploadNewVacactionRenal() {
    const city = document.querySelector('#cityName').value.trim();
    const file = document.querySelector('#rentalImage').files[0]
    
    const imageRef = storageRef( storage, `images/${file.name}`);
    const dataRef = databaseRef( db, 'rentals')
    const uploadResult = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef)
    const imagePath = uploadResult.metadata.fullPath;
    // I want the UNIQUE KEY
    const itemRef = push(dataRef)
    
    set(itemRef,{
      key:itemRef.key,
      sku:`jhvr${itemRef.key}`,
      image:imagePath,
      price:2499, //divide by 100 to display, DO NOT use a string.
      url,
      city
    }) 
}