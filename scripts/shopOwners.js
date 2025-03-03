function chatbox(){
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbotButton = document.getElementById('close-chatbot');

    chatbotIcon.addEventListener('click', function(event) {
        event.preventDefault();
        chatbotWindow.style.display = 'block';
    });

    closeChatbotButton.addEventListener('click', function() {
        chatbotWindow.style.display = 'none';
    });

    // Close the chatbox when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === body) {
            chatbotWindow.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", chatbox);


async function ownersignup() {
    const ownerName = document.getElementById('ownerName').value;
    const ownerContact = document.getElementById('ownerContact').value;
    const ownerEmail = document.getElementById('ownerEmail').value;
    const ownerPassword = document.getElementById('ownerPassword').value;
    const confirmPassword = document.getElementById('confirmOwnerPassword').value;
    
    console.log('Request Data:', { ownerName, ownerContact, ownerEmail }); // Log request data
    
    if (ownerPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const data = { ownerName, ownerContact, ownerEmail, ownerPassword };

    try {
        const response = await fetch('https://kasikotas-api.onrender.com/ownerSignup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Log the full response for debugging
        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);
        
        const responseText = await response.text();
        console.log('Response body:', responseText);

        if (response.ok) {
            const result = responseText ? JSON.parse(responseText) : {};
            alert('User created successfully!');
            const ownerRegistration = document.getElementById("ownerRegistration");
            const ownerLogin = document.getElementById("ownerLogin");
            ownerRegistration.style.display = 'none';
            ownerLogin.style.display = 'block';
        } else {
            throw new Error(responseText || `Server error: ${response.status}`);
        }
    } catch (error) {
        console.error('Detailed error:', error);
        alert(`Registration failed: ${error.message}`);
    }
}

// Set up event listener once when document loads
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('ownerForm');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            await ownersignup();
        });
    }
});

function signinpage(){
    const ownerRegistration = document.getElementById("ownerRegistration");
    const ownerLogin = document.getElementById("ownerLogin");
    ownerRegistration.style.display = 'none';
    ownerLogin.style.display = 'block';
}

async function ownerlogin(){
    document.getElementById('ownerLogin').addEventListener('submit', async function(event){
        event.preventDefault();

        const ownerEmail = document.getElementById('ownerEmail').value;
        const ownerPassword = document.getElementById('ownerPassword').value;

        console.log('owner login email: ', ownerEmail);
        console.log("owner pasword login: ", ownerPassword);

        const data = {ownerEmail, ownerPassword};

        try{
            const response = await fetch('https://kasikotas-api.onrender.com/ownerLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const result = await response.json();
                alert('User loggedin successfully!');
                // Redirect to landing page
                window.location.href = '#home';

                //now block the display of home, menuManagement, orderManagement, feedbackReview
                const home = document.getElementById('home');
                const ownerRegistration = document.getElementById('ownerRegistration');
                const menuManagement = document.getElementById('menuManagement');
                const orderManagement = document.getElementById('orderManagement');
                const feedbackReview = document.getElementById('feedbackReview');

                ownerRegistration.style.display = 'none';
                home.style.display = 'block';
                menuManagement.style.display = 'block';
                orderManagement.style.display = 'block';
                feedbackReview.style.display = 'block';

                addnewkota();
                shownotifications();


            } else {
                const error = await response.text();
                alert(error);
            }
        }catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    });
}
document.addEventListener("DOMContentLoaded", ownerlogin);