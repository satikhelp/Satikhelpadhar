document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".from_container");
    const adharDisplay = document.querySelector(".adhar_display");
    const submitButton = form.querySelector("button[type='submit']");
    const arrowButton = document.getElementById("arrow_icon");
    const editBtn = document.getElementById("edit_btn");

    // Mapping for relation translations
    const relationTranslations = {
        "S/O": "पुत्र",
        "D/O": "पुत्री",
        "H/O": "पति",
        "W/O": "पत्नी",
        "M/O": "माता",
        "F/O": "पिता",
        "G/O": "अभिभावक",
        "Other": "अन्य"
    };

    // Function to dynamically update the father-name label
    function updateFatherNameLabel() {
        const selectedRelation = document.getElementById('relation').value || "Other";
        const translatedRelation = relationTranslations[selectedRelation] || "अन्य";
        const fatherNameLabel = document.querySelector("label[for='father-name']");
        
        // Update the label with the translated relation
        fatherNameLabel.textContent = `${translatedRelation} का नाम`; 
    }

// Function to dynamically update the address in both English and Hindi
async function updateAddress() {
    const fatherName = document.getElementById('father-name').value || '';
    const houseNumber = document.getElementById('house-no').value || '';
    const locality = document.getElementById('locality').value || '';
    const area = document.getElementById('post-office').value || ''; // Assuming post-office is used for 'Area'
    const city = document.getElementById('city').value || '';
    const state = document.getElementById('state').value || '';
    const pincode = document.getElementById('pincode').value || '';
    const relationG = document.getElementById('relation').value || 'Other';
    
    // Translate relation manually or using Google Translate
    const relationHindi = relationTranslations[relationG] || relationG;

    // Translate each address component to Hindi
    const fatherNameHindi = await translateToHindi(fatherName);
    const houseNumberHindi = await translateToHindi(houseNumber);
    const localityHindi = await translateToHindi(locality);
    const areaHindi = await translateToHindi(area);
    const cityHindi = await translateToHindi(city);
    const stateHindi = await translateToHindi(state);

    // Construct the full address in both languages
    const fullAddress = `${relationG}: ${fatherName}, ${houseNumber}, ${locality}, ${area}, ${city}, ${state} - ${pincode}`;
    const fullAddressHindi = `${relationHindi}: ${fatherNameHindi}, ${houseNumberHindi}, ${localityHindi}, ${areaHindi}, ${cityHindi}, ${stateHindi} - ${pincode}`;

    // Update the address display in English and Hindi
    document.getElementById('address').textContent = fullAddress;
    document.getElementById('address-local-language').textContent = fullAddressHindi;
}



    // Add input listeners to update the address dynamically as the user types
    document.getElementById('father-name').addEventListener('input', updateAddress);
    document.getElementById('house-no').addEventListener('input', updateAddress);
    document.getElementById('locality').addEventListener('input', updateAddress);
    document.getElementById('post-office').addEventListener('input', updateAddress);
    document.getElementById('city').addEventListener('input', updateAddress);
    document.getElementById('state').addEventListener('input', updateAddress);
    document.getElementById('pincode').addEventListener('input', updateAddress);
    document.getElementById('relation').addEventListener('change', function() {
        updateAddress();
        updateFatherNameLabel(); // Update the father-name label when relation changes
    });

    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission

        const inputs = form.querySelectorAll("input[required], textarea[required], select[required]");
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
                input.style.borderColor = "red"; // Highlight empty fields
            } else {
                input.style.borderColor = ""; // Reset border color if filled

            }
        });

        if (allFilled) {
            adharDisplay.style.display = "block"; // Show the adhar_display section
            gsap.fromTo(adharDisplay, { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.5 });
       
            document.getElementById("md").style.display = "none";
        } else {
            alert("Please fill in all required fields.");
        }

        document.getElementById('englishName').textContent = document.getElementById('name').value;
        document.getElementById('fullName_show_hindi').textContent = document.getElementById('name-local-language').value;

        document.getElementById("address_show").innerHTML = document.getElementById("address").textContent;


        document.getElementById("hindi_addres").innerHTML = document.getElementById("address-local-language").value;


        document.getElementById("english_addres").innerHTML = document.getElementById("address").textContent;

        document.getElementById("name_show_main_adhar_front_hindi").innerHTML = document.getElementById("name-local-language").value;
        document.getElementById("name_show_main_adhar_front_english").innerHTML = document.getElementById("name").value;

        // Get the date value
        let dob = document.getElementById("date-of-birth").value;

        // Split the date by '-' to get year, month, and day
        let dobParts = dob.split("-");

        // Reformat the date to dd/mm/yyyy
        let formattedDOB = `${dobParts[2]}/${dobParts[1]}/${dobParts[0]}`;

        // Display the formatted date
        document.getElementById("dob_show_main_front_adhar").innerHTML = "जन्म तिथि / DOB: " + formattedDOB;

        // Update gender in both English and Hindi
        document.getElementById("hindi_g").innerHTML = document.getElementById("Gendar_local").value;
        document.getElementById("eng_g").innerHTML = document.getElementById("gender").value;

        const segment1 = "0000";  // First 4 digits fixed
        const segment2 = "0000"; // Middle 5 digits fixed
        
        // Generate random last 5 digits
        const segment3 = Math.floor(Math.random() * 90000) + 10000; // Last 5 digits
        
        // Format the enrollment number
        const enrollmentNumber = `${segment1}/${segment2}/${segment3}`;
        // Update the enrollment number
        document.getElementById("enrollment_no").innerText = "नामांकन क्रम / Enrollment No: " + enrollmentNumber;

        // Format Aadhaar number
        function formatAadhaarNumber(number) {
            return number.replace(/(\d{4})(\d)/, '$1 $2').replace(/(\d{4})(\d)/, '$1 $2').replace(/(\d{4})(\d)/, '$1 $2');
        }

        let a_number = document.getElementById('aadhaar-card-no').value;
        if (a_number.length === 12) { // Ensure it is 12 digits
            a_number = formatAadhaarNumber(a_number);
            document.getElementById("adhar_number_show_big").innerHTML = a_number;
            document.getElementById("adhar_number_show_front").innerHTML = a_number;
            document.getElementById("last_adhar_number_show").innerHTML = a_number;
        }
    });







    arrowButton.addEventListener("click", function () {
        gsap.to(adharDisplay, { x: "100%", opacity: 0, duration: 0.5, onComplete: function () {
               
            document.getElementById("md").style.display = "flex";
            
            adharDisplay.style.display = "none"; // Hide the display after animation
            } });
    });

    editBtn.addEventListener("click", function () {
        gsap.to(adharDisplay, { x: "100%", opacity: 0, duration: 0.5, onComplete: function () {
            document.getElementById("md").style.display = "flex";
             
            
            adharDisplay.style.display = "none"; // Hide the display after animation
            } });
    });

    // Function to translate text to Hindi using Google Translate API
    async function translateToHindi(text) {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0][0][0]; // Return the translated text
    }

    // Event listener for translating the name
    document.getElementById('name').addEventListener("blur", async function () {
        const name = document.getElementById('name').value;
        const translatedName = await translateToHindi(name);
        document.getElementById('name-local-language').value = translatedName;
    });



    document.getElementById('date-of-birth').addEventListener('input', function() {
        const dob = this.value; // Format is YYYY-MM-DD
        if (dob) {
            document.getElementById('local_dob').value = dob; // Keep the date in English numerals
        } else {
            document.getElementById('local_dob').value = ''; // Clear if empty
        }
    });

    

// Event listener for translating the gender
document.getElementById('gender').addEventListener('change', async function() {
    const gender = this.value;
    if (gender) {
        const translatedGender = await translateToHindi(gender);
        document.getElementById('Gendar_local').value = translatedGender;
    } else {
        document.getElementById('Gendar_local').value = ''; // Clear if empty
    }
});



    
    
    document.getElementById('image').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const imgShow = document.getElementById('img_show');
    
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imgShow.src = e.target.result; // Set the src of the img to the uploaded file
                imgShow.style.display = 'block'; // Show the image
            }
            reader.readAsDataURL(file); // Convert the file to a data URL
        }
    });
    
    



    // Event listener for translating the locality
    document.getElementById('locality').addEventListener('blur', async function () {
        const locality = document.getElementById('locality').value;
        const translatedLocality = await translateToHindi(locality);
        document.getElementById('locality-local-language').value = translatedLocality;
    });
});


// // pan card start 

document.getElementById('submit_pan').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Get all input fields and select elements
    const panCardNo = document.getElementById('panCardNo');
    const namePan = document.getElementById('name_pan');
    const fatherNamePan = document.getElementById('fatherName_pan');
    const dateOfBirthPan = document.getElementById('dateOfBirth_pan');
    const genderPan = document.getElementById('gender_pan');
    const panDisplay = document.getElementById("panDisplay");

    const signature = document.getElementById('signature');
    const imagePan = document.getElementById('image_pan');
    
    // Preview PAN images
    const pan_man_img = document.getElementById('pan_man_img');
    const top_pan_man_img = document.getElementById('top_pan_man_img');

    const topPanSignatureShow = document.getElementById('top_pan_signature_show');
    const panSignatureShow = document.getElementById('pan_signature_show');

    // Array of all input fields for easy validation
    const fields = [panCardNo, namePan, fatherNamePan, dateOfBirthPan, genderPan, signature, imagePan];

    // Validate each field
    fields.forEach(field => {
        if (field.value === '') {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = ''; // Reset the border color
        }
    });

    // If all fields are valid, proceed with form submission
    if (isValid) {
        // Show the PAN display section
        panDisplay.style.display = "block";

        // Get values from the form fields
        const panCardValue = panCardNo.value;
        const nameValue = namePan.value;
        const fatherNameValue = fatherNamePan.value;
        const dobValue = dateOfBirthPan.value;
        const genderValue = genderPan.value;

        // Update the display elements with the captured values
        document.getElementById("top_name_show").textContent = nameValue;
        document.getElementById("top_fater_name_show").textContent = fatherNameValue;
        document.getElementById("top_dob_show").textContent = formatDate(dobValue);
        document.getElementById("top_gnder_show").textContent = genderValue.charAt(0).toUpperCase() + genderValue.slice(1);
        document.getElementById("pan_name_show").textContent = nameValue;
        document.getElementById("fatharname_pan_show").textContent = fatherNameValue;
        document.getElementById("dob_pan_show").textContent = formatDate(dobValue);
        document.getElementById("pan_number_show").textContent = panCardValue;

        // Show images (PAN and signature) using FileReader
        if (imagePan.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                pan_man_img.src = e.target.result;
                top_pan_man_img.src =e.target.result;
            };
            reader.readAsDataURL(imagePan.files[0]);
        }

        if (signature.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                topPanSignatureShow.src = e.target.result;
                panSignatureShow.src = e.target.result;
            };
            reader.readAsDataURL(signature.files[0]);
        }

        // Use GSAP animation to display the PAN details
        gsap.fromTo(panDisplay, { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.5 });
    } else {
        alert('Please fill all the required fields.');
    }
});




// Date formatting function
function formatDate(dateString) {
    const date = new Date(dateString);
    // Get the UTC time and adjust for local time zone
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return utcDate.toLocaleDateString('en-GB', options); // Format as DD/MM/YYYY
}

// Clear button functionality
document.getElementById('clear_pan').addEventListener('click', function() {
    // Clear all input fields
    document.getElementById('fromC').reset();

    // Reset border color for all fields
    const fields = document.querySelectorAll('input, select');
    fields.forEach(field => {
        field.style.borderColor = '';
    });

    // Hide the images
    panImageShow.style.display = "none"; // Hide the PAN image when clearing the form
    topPanSignatureShow.style.display = "none"; // Hide the signature when clearing the form
});

// Edit button functionality
document.getElementById("pan_edit").addEventListener("click", function () {
    gsap.to(panDisplay, { x: "100%", opacity: 0, duration: 0.5, onComplete: function () {
        document.getElementById("md").style.display = "flex";
        panDisplay.style.display = "none"; // Hide the display after animation
        } 
    });
});
