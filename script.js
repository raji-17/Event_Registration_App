
function toggleRegistrationForm(eventName) {
    const form = document.querySelector(`.form-${eventName}`);
    
    if (form) {
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = 'block'; 
        } else {
            form.style.display = 'none'; 
        }
    }
}

function submitRegistrationForm(event, eventName) {
    event.preventDefault(); 
  
    const participant = {
      name: document.getElementById('name').value,
      mobile: document.getElementById('mobile').value,
      college: document.getElementById('college').value,
      email: document.getElementById('email').value,
      event: eventName, 
    };
  
    console.log('Sending participant data:', participant); 
  
    fetch('/participants/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(participant),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      alert(data.message);
      toggleRegistrationForm(eventName); 
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred during registration');
    });
  }
  