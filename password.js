document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const correctUsername = "8084115377";
    const correctPassword = "7480939450";

    if (username === correctUsername && password === correctPassword) {
        alert('Login successful!'); 
        
        document.location = "adhar.html"; 
        
    } 
    
    else {
    sweetAlert("Password Worang \nWhatshapp No.\n 7480939450", "Enter Details", "error");
        
    }
});