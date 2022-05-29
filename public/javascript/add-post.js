const addPostBtn = document.querySelector('#add-post-btn');
const createPostCd = document.querySelector('#create-post-card');

function toggleHide(event) {
    createPostCd.classList.remove('hide');
    addPostBtn.classList.add('hide');
};

// file that the dashboard uses to create new posts
async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      addPostBtn.classList.remove('hide');
      createPostCd.classList.add('hide');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  addPostBtn.addEventListener('click', toggleHide) 
  