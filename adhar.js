$(document).ready(function () {
    // function generateUID() {
    //     let uid = '';
    //     for (let i = 0; i < 12; i++) {
    //         uid += Math.floor(Math.random() * 10);
    //     }
    //     return uid;
    // }


    function reformatDOB(dob) {
    let dobParts = dob.split("-");
    return `${dobParts[2]}/${dobParts[1]}/${dobParts[0]}`;
}

    function generateQRCode() {
        const name = $('#name').val();
        const gender = $('#gender').val();
        const dob = $('#date-of-birth').val();
        const fatherName = $('#father-name').val();
        const houseNo = $('#house-no').val();
        const street = $('#locality').val();
        const postOffice = $('#post-office').val();
        const state = $('#state').val();
        const pincode = $('#pincode').val();
        const uid = $('#aadhaar-card-no').val();
        const relations = $('#relation').val();
        const city1 = $('#city').val();
        
        // city
        // Simplify QR Data
        
        const largeQRData = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<PrintLetterBarcodeData ' +
            'uid="' + uid + '" ' +
            'name="' + name + '" ' +
            'gender="' + gender.charAt(0) + '" ' +
            'yob="' + (new Date(dob).getFullYear()) + '" ' +
            'co= " ' + relations + " " + fatherName + '" ' +
            'house="' + houseNo + '" ' +
            'street="' + street + '" ' +
            'po="' + postOffice + '" ' +
            'dist="' + city1 + '" ' +   
            'subdist="' + city1 + '" ' + 
            'state="' + state + '" ' +
            'pc="' + pincode + '" ' +
            'dob="' + reformatDOB(dob) + '" ' + 
            '/>';
            
        $('#qr_show').empty();
        $('#final_qr_show').empty();
        $('#first_page_qr').empty();

        function generateQRCodes(width1, height1, width2, height2, width3, height3) {
    // First QR Code
    $('#qr_show').empty().qrcode({
        render: "svg",
        text: largeQRData,
        width: width1,
        height: height1,
        version: 5,
        correctLevel: 1
    });

    // Second QR Code
    $('#final_qr_show').empty().qrcode({
        render: "svg",
        text: largeQRData,
        width: width2,
        height: height2,
        version: 5,
        correctLevel: 0
    });

    // Third QR Code
    $('#first_page_qr').empty().qrcode({
        render: "svg",
        text: largeQRData,
        width: width3,
        height: height3,
        version: 5,
        correctLevel: 0
    });
}

// Function to check screen size and update QR code sizes accordingly
function updateQRCodeSizes() {
    if (window.innerWidth <= 768) {
        // Mobile sizes
        generateQRCodes(110, 110, 80, 80, 60, 60);
    } else {
        // Desktop sizes
        // generateQRCodes(90, 90, 50, 50, 45, 45);
        generateQRCodes(110, 110, 80, 80, 60, 60);



    }
}

// Initial load
updateQRCodeSizes();

// Resize handler to update sizes dynamically on window resize
$(window).resize(function() {
    updateQRCodeSizes();
});

        console.log("Bada QR Data: ", largeQRData);
        console.log("Chhota QR Data: ", largeQRData);
    }

    $('#submit').on('click', function (e) {
        e.preventDefault();
        generateQRCode();
    });
});

// 

document.getElementById('downlode_btn').addEventListener('click', function () {
    var element = document.getElementById('maint');
    var button = document.getElementById('downlode_btn')
    var spinner = document.getElementById('spinner');
    var buttonText = document.getElementById('buttonText');

    // Show spinner and change button text
    spinner.style.display = "inline-block";
    buttonText.innerText = "Final Checking..";
    button.disabled = true; // Disable the button

    setTimeout(function () {
        html2pdf()
            .set({
                margin: 1,
                filename: 'aadhaar_card.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 5 },  // Adjust scale for better quality
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                }
            })
            .from(element)
            .save()
            .then(function () {
                console.log("PDF has been generated and downloaded.");
                // Hide spinner and reset button text after download
                spinner.style.display = "none";
                buttonText.innerText = "Download Now";
                button.disabled = false; // Enable the button
            });
    }, 10);
});