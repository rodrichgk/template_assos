document.addEventListener('DOMContentLoaded', function () {
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.addEventListener('click', function () {
            const contentId = this.getAttribute('data-content-id');
            document.getElementById('dynamic-content').setAttribute('data-content-id', contentId);
        });
    });
});