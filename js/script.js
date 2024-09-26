// Prompt the user for their name
const userName = prompt("Please enter your name:");

// Log the name to the console and update the h2 text
if (userName) {
    console.log(`Halo, ${userName}.`);
    document.getElementById("user-name").innerText = `Halo, ${userName}.`;
    
    // Set the placeholder for the name input field
    document.getElementById("name").placeholder = `${userName}`;
} else {
    console.log("No name entered.");
}

// Add event listener for form submission
document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get input values
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const sex = document.getElementById('sex').value;
    const message = document.getElementById('message').value;

    // Fetch IP address and location using a public API
    fetch('https://ipinfo.io/json?token=967c7b448d58bc') // Replace YOUR_API_TOKEN with your actual token
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const location = data.city ? `${data.city}, ${data.region}, ${data.country}` : "Location not available";

            // Display input values
            const output = document.getElementById('outputData');
            output.innerHTML = `
                <strong>Nama:</strong> ${name}<br><br>
                <strong>Tanggal Lahir:</strong> ${birthdate}<br><br>
                <strong>Jenis Kelamin:</strong> ${sex}<br><br>
                <strong>Pesan:</strong> ${message}<br><br>
                <strong>Alamat IP:</strong> ${ipAddress}<br><br>
                <strong>Lokasi:</strong> ${location}
            `;

            // Clear form fields after submission
            document.getElementById('inputForm').reset();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const output = document.getElementById('outputData');
            output.innerHTML = `
                <strong>Nama:</strong> ${name}<br>
                <strong>Tanggal Lahir:</strong> ${birthdate}<br>
                <strong>Jenis Kelamin:</strong> ${sex}<br>
                <strong>Pesan:</strong> ${message}<br>
                <strong>Alamat IP:</strong> Unable to fetch<br>
                <strong>Lokasi:</strong> Unable to fetch
            `;
            document.getElementById('inputForm').reset();
        });
});
