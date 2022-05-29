async function signUpFormHandler(event) {
    event.preventDefault();

    // we need to POST the username, email, and password from the form to our server
    // grab data from form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // make a fetch() POST request to the /api/users/
    // add conditional to make sure all fields have values before making the POST request
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // after implementing the response variable, add error handling by using the .ok property on the response object
        if (response.ok) {
            document.location.replace('/');
        } else {
            // otherwise, we'll alert() the error
            alert(response.statusText);
        };
    };
};

document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);