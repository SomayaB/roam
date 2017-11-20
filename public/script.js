
  console.log('connected?');
  //get elements
  const editProfileButton = document.querySelector(".edit-profile-button");
  const editProfileModal = document.querySelector(".edit-profile-modal");
  const closeModalButton = document.querySelector(".close-modal");

  //add event listeners Modal
  if (editProfileButton) {
    editProfileButton.addEventListener('click', () => {
      $('.edit-profile-modal').modal();
      // now you can open modal from code
      $('.edit-profile-modal').modal('open');

      //or by click on trigger
      // $('.trigger-modal').modal();

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
  }

  //drop down comments
  const commentsButton = document.querySelector(".comments-button");
  const comments = document.querySelector(".comments");

  if(commentsButton) {
    commentsButton.addEventListener('click', () => {
      comments.classList.toggle('open-panel');
    });
  }

  //edit comments
  const editCommentButtons = document.querySelectorAll(".edit-comment-button");
  if(editCommentButtons) {
    editCommentButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.parentNode.parentNode.querySelector('.edit-comment-input').classList.toggle('show-edit-comment');
        button.parentNode.parentNode.querySelector('.comment-paragraph').querySelector('.comment-paragraph-content').classList.toggle('hide-comment-paragraph');
      });
    });
  }

  // upload profile picture with uploader widget
  var profilePic = document.querySelector('.profile-pic');

  if(profilePic) {
    var widget = uploadcare.Widget('[role=uploadcare-uploader]');
    widget.onUploadComplete(function (fileInfo) {
      const id = document.querySelector('.profile').id;

      var myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      var myInit = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({image: fileInfo.cdnUrl}),
        credentials: 'same-origin',
        cache: 'default',
      };

      fetch(`/users/${id}/newProfilePicture`, myInit)
      .then(response => {
        return response.json();
      })
      .then(result => {
        document.querySelector('.uploadcare--widget__file-size').style.display = 'none';
        profilePic.src = result.image;
        document.querySelector('.uploadcare--widget__file-name').textContent = 'Choose a file';
      })
      .catch(error => {
        console.log(error);
      });
    });
  }

$('select').material_select();
$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});
