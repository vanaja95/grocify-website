document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
});
function logout() {
    alert('Logged out successfully!');
    window.location.href = 'login.html'; // Redirect to login page
}
