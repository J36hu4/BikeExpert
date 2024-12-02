document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validar que todos los campos estén llenos
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (!email || !name || !phone || !message) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const serviceID = 'service_0i175vl';
    const templateID = 'template_nwi5jud'; // Reemplaza con tu Template ID de EmailJS
    const confirmationTemplateID = 'template_8rv0j8r'; // Reemplaza con tu Template ID para confirmación

    const templateParams = {
        email: email,
        name: name,
        phone: phone,
        message: message
    };

    // Enviar correo al administrador
    emailjs.send(serviceID, templateID, {
        from_name: name,
        from_email: email,
        message: message,
        phone: phone
    })
    .then(response => {
        alert('Correo enviado exitosamente!');
        // Enviar correo de confirmación al usuario
        emailjs.send(serviceID, confirmationTemplateID, {
            to_name: name,
            to_email: email,
            message: 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.'
        })
        .then(response => {
            console.log('Correo de confirmación enviado', response.status, response.text);
        }, error => {
            console.error('Error al enviar el correo de confirmación', error);
        });
    }, error => {
        alert('Error al enviar el correo: ' + JSON.stringify(error));
    });
});