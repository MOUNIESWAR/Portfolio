
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('contact-form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = "Thanks for your submission!";
                form.reset();
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    formStatus.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.innerHTML = "Oops! There was a problem submitting your form";
                }
            }
        } catch (error) {
            formStatus.innerHTML = "Oops! There was a problem submitting your form";
        }
    }

    form.addEventListener("submit", handleSubmit)
});
