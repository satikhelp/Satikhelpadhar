$(document).ready(function () {
    // Function to reformat the date of birth into the desired format
    function reformatDOB(dob) {
        let dobParts = dob.split("-");
        return `${dobParts[2]}/${dobParts[1]}/${dobParts[0]}`;
    }

    // Function to generate the QR code based on the input values
    function generateQRCode() {
        const name = $('#name_pan').val().toUpperCase();;
        const fatherName = $('#fatherName_pan').val().toUpperCase();;
        const dob = $('#dateOfBirth_pan').val();
        const gender = $('#gender_pan').val().toUpperCase();;
        const panCardNo = $('#panCardNo').val().toUpperCase();;

        const qrData = (
    'Name / नाम : ' + name + '\n' +
    'Father\'s Name / पिता का नाम : ' + fatherName + '\n' +
    'DOB / जन्म की तारीख : ' + reformatDOB(dob) + '\n' +
    'PAN / पैन : ' + panCardNo
);
        // Generate and display the QR code on the PAN card
        $('#top_qrshow').empty().qrcode({
            render: "svg",
            // text: qrData,
            text: unescape(encodeURIComponent(qrData)),
            width: 80,
            height: 80,
            version: 5,
            correctLevel: 1
        });

        $('#pan_qr_show').empty().qrcode({
            render: "svg",
            // text: qrData,
            text: unescape(encodeURIComponent(qrData)),
            width: 80,
            height: 80,
            version: 5,
            correctLevel: 1
        });
    }

    // Function to update the PAN card details in the preview section
    function updatePanCardDetails() {
        let name = $('#name_pan').val();
        let fatherName = $('#fatherName_pan').val();
        let dob = reformatDOB($('#dateOfBirth_pan').val());
        let gender = $('#gender_pan').val();
        let panCardNo = $('#panCardNo').val();

        $('#pan_name_show').text(name);
        $('#fatharname_pan_show').text(fatherName);
        $('#dob_pan_show').text(dob);
        $('#pan_number_show').text(panCardNo);
        $('#top_pan_number_show').text(panCardNo);

        $('#top_name_show').text(name);
        $('#top_fater_name_show').text(fatherName);
        $('#top_dob_show').text(dob);
        $('#top_gnder_show').text(gender);

        // Update image and signature if files are selected
        const imagePan = $('#image_pan')[0].files[0];
        const signaturePan = $('#signature')[0].files[0];

        if (imagePan) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#top_pan_man_img').attr('src', e.target.result);
                $('#pan_man_img').attr('src', e.target.result);
            };
            reader.readAsDataURL(imagePan);
        }

        if (signaturePan) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#top_pan_signature_show').attr('src', e.target.result);
                $('#pan_signature_show').attr('src', e.target.result);
            };
            reader.readAsDataURL(signaturePan);
        }
    }

    // Function to handle form submission and generate the QR code and PAN card preview
    $('#submit_pan').on('click', function (e) {
        e.preventDefault();
        generateQRCode(); // Generate QR Code
        updatePanCardDetails(); // Update PAN card details
    });

    // Reset the form and clear the preview when the reset button is clicked
    $('#clear_pan').on('click', function () {
        $('#panDisplay').find("input[type=text], input[type=file]").val("");
        $('#panDisplay img').attr('src', 'blank_pan.jpg'); // Reset to default images
        $('#panDisplay .pan_details p').text(""); // Clear text fields
        $('#top_qrshow').empty();
        $('#pan_qr_show').empty();
    });
    
    $('#downlode_btn').on('click', function () {
    var element = document.getElementById('pan_div_d');
    var button = document.getElementById('downlode_btn');

    // Change button text and add spinner
    button.disabled = true;
    button.innerHTML = 'Downloading... <div class="buffering-spinner"></div>';

    setTimeout(function () {
        html2pdf()
            .set({
                margin: 1,
                filename: 'pan_card.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 5 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            })
            .from(element)
            .save()
            .then(function () {
                console.log("PDF generated and downloaded.");
                
                // Reset button text after download
                button.disabled = false;
                button.innerHTML = 'Download';
            })
            .catch(function (error) {
                console.error("Error generating PDF: ", error);

                // Reset button text in case of error
                button.disabled = false;
                button.innerHTML = 'Download';
            });
    }, 1000);
});
});