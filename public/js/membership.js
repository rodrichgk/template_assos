document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('#membership, #account, #projects, #favorite');
    const contents = document.querySelectorAll('.membership-content, .account-content, .projects-content, .favorite-content');

    let membershipState = true;
    let accountState = false;
    let projectsState = false;
    let favoriteProjectsState = false;
    
    contents.forEach(content => {
        content.style.display = 'none';
    });
    // Show the default content on page load
    document.querySelector('.membership-content').style.display = 'block';

    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const contentId = this.id;

            // Hide all contents
            contents.forEach(content => {
                content.style.display = 'none';
            });

            // Show the corresponding content
            document.querySelector(`.${contentId}-content`).style.display = 'block';

            // Set the state based on the clicked button's ID
            membershipState = contentId === 'membership';
            accountState = contentId === 'account';
            projectsState = contentId === 'projects';
            favoriteProjectsState = contentId === 'favorite';
        });
    });
});

function previewFile() {
    var fileInput = document.getElementById('profile-upload');
    var profileImage = document.getElementById('profile-image');

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            profileImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}