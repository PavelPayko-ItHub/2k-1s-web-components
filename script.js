customElements.define(
  "comment-div",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `
      <style>

      .comments {
        color:purple;
        font-style: italic;
        display:flexbox;
        width:100%;
        padding-bottom: 5px;
        }

      textarea {width: 50%}
          
      button {
        background-color:rgb(38, 73, 200);
        border: none;
        border-radius: 4px;
        color: white;
        padding: 5px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 15px;
        margin-bottom: 8px;
        }

      </style>
     
      <br>
      <button id="submitBtn">Комментировать</button>
      <br>
      <div class="comments"></div>
    `;

    const clickHandler =  () => {
      const submitBtn = shadowRoot.getElementById("submitBtn");
      console.log(submitBtn);
      submitBtn.style.display = "none";

      const comment = document.createElement("div");
      // comment.className = "comment";

      // const commentTemplate = document.getElementById("commentTemplate");
      // const templ = commentTemplate.content.cloneNode(true);
      // comment.appendChild(templ);

      const br = document.createElement("br");
      const commentInput = document.createElement("textarea");
      commentInput.required = true;
      comment.appendChild(commentInput);
      comment.appendChild(br);

      const sendButton = document.createElement("button");
      sendButton.textContent = "Отправить";

      const addCommentHandler = () => {
        const diveComment = document.createElement("div");
        const commentTemplate = document.getElementById("commentTemplate");
        const content = commentTemplate.content.cloneNode(true);
        diveComment.appendChild(content);
        diveComment.querySelector("slot").textContent =
        commentInput.value;

        if (diveComment.querySelector("slot").textContent === "") {
          alert("Комментарий не может быть пустым");
        } else {
          comment.insertBefore(diveComment, commentInput);
          commentInput.remove();
          sendButton.remove();
        }
        
        this.setupListeners(diveComment);
      }
      
      sendButton.addEventListener("click", addCommentHandler);

      comment.appendChild(sendButton);

      shadowRoot.querySelector(".comments").appendChild(comment);
    }

    shadowRoot
      .getElementById("submitBtn")
      .addEventListener("click", clickHandler);
    }

    setupListeners(comment) {
      const likeHandler = () => {
        const count = comment.querySelector(".like-count");
        count.textContent = parseInt(count.textContent) + 1;
      }

      const replyHandler = () => {
        const addCommentHandler = () => {
          const diveComment = document.createElement("div");
          const commentTemplate = document.getElementById("commentTemplate");
          const content = commentTemplate.content.cloneNode(true);
          diveComment.appendChild(content);
          diveComment.querySelector("slot").textContent =
            diveCommentInput.value;
          if (diveComment.querySelector("slot").textContent === "") {
            alert("Комментарий не может быть пустым");
          } else {
            diveComments.insertBefore(diveComment, diveCommentInput);
            diveCommentInput.remove();
            diveSubmitBtn.remove();
          }
          this.setupListeners(diveComment);
        }

        const diveComments = comment.querySelector(".dive-comments");

        const br = document.createElement("br");

        const diveCommentInput = document.createElement("textarea");
        diveCommentInput.required = true;

        diveComments.appendChild(diveCommentInput);
        diveComments.appendChild(br);
        
        const diveSubmitBtn = document.createElement("button");
        diveSubmitBtn.textContent = "Отправить";

        diveComments.appendChild(diveSubmitBtn);
        diveSubmitBtn.addEventListener("click", addCommentHandler );
      }

      const removeHandler = () => {
        comment.remove();
      }

      comment
      .querySelector(".like-btn")
      .addEventListener("click", likeHandler);

      comment
        .querySelector(".reply-btn")
        .addEventListener("click", replyHandler);

      comment
        .querySelector(".delete-btn")
        .addEventListener("click", removeHandler);
    }
  }
);
