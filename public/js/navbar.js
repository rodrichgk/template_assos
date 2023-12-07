async function fetchUserStatus() {
    const response = await fetch('/auth/current_user');
    const user = await response.json();
    return user;
  }

  // Function to update the button text based on the authentication status
  async function updateButtonText() {
    const user = await fetchUserStatus();
    const authButton = document.getElementById('authButton');

    if (user === 1) {
      // User is authenticated, change button text to "Sign Out"
      authButton.href = '/auth/logout';
      authButton.textContent = 'Sign Out';
    } else {
      // User is not authenticated, change button text to "Sign Up"
      authButton.href = '/auth/google';
      authButton.textContent = 'Sign Up';
    }
  }

  // Call the function when the page loads
  document.addEventListener('DOMContentLoaded', updateButtonText);