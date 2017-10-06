

//get elements
const editProfileButton = document.querySelector(".edit-profile-button");
const editProfileModal = document.querySelector(".edit-profile-modal");
const closeModalButton = document.querySelector(".close-modal");

//add event listeners
editProfileButton.addEventListener('click', () => {
  editProfileModal.style.display = "block";
});

closeModalButton.addEventListener('click', () => {
  editProfileModal.style.display = "none";
});
editProfileModal.addEventListener('click', () => {
  if(event.target === editProfileModal) {
    editProfileModal.style.display = "none";
  }
});

//drop down comments
const commentsButton = document.querySelector(".comments-button");
const comments = document.querySelector(".comments");

commentsButton.addEventListener('click', () => {
  comments.classList.toggle('open-panel');
});

//drop down edit comments NOT WORKING
// const editCommentButtons = document.querySelector(".edit-comment-button");
// const editComments = document.querySelector(".edit-comments");
// console.log(editCommentButtons);
// editCommentButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     editComments.classList.toggle('show-edit-comments');
//   });
// });
