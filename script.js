const json = {
    "currentUser": {
      "image": { 
        "png": "./images/avatars/image-juliusomo.png",
        "webp": "./images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "./images/avatars/image-amyrobson.png",
            "webp": "./images/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "./images/avatars/image-maxblagun.png",
            "webp": "./images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "./images/avatars/image-ramsesmiron.png",
                "webp": "./images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]};
var lastMessageToDelete;

function updateScore() {
    const commentsSection = document.querySelector("section#comments");
    const comments = commentsSection.querySelectorAll("li.commReplies");
    console.log("updating score");
    // Update the vote of the post
    for (let index = 0; index < comments.length; index++) {
        /**@type {HTMLDivElement} */
        const liCommtReplies = comments[index];

        const divCommt = liCommtReplies.querySelector("div.comm");

        const p = divCommt.querySelector("p#vote-score");
        const score = p.textContent;

        liCommtReplies.style.order = score;
    };

    // Update the vote of the replies
    const replies = commentsSection.querySelectorAll("li.commInReplies");
    for (let index = 0; index < replies.length; index++) {
        const reply = replies[index];

        const p = reply.querySelector("p#vote-score");
        const score = p.textContent;
        reply.style.order = score;
    }
};

/**@param {Event} event */
function upvote(event) {
    const parent = event.target;

    /**@type {HTMLDivElement} */
    var voteDiv;
    if (parent.tagName === "IMG") {
        voteDiv = parent.parentElement.parentElement;
    } else if (parent.tagName === "BUTTON") {
        voteDiv = parent.parentElement;
    }

    const pScore = voteDiv.querySelector("p#vote-score");

    const classes = pScore.parentElement.parentElement.classList.toString().split(" ");
    const hasBeenDowned = classes.includes("downed");
    const hasBeenUped = classes.includes("uped");

    var newScore = parseInt(pScore.textContent);

    if (hasBeenUped) return
    else if (hasBeenDowned) {
        newScore += 1;
        pScore.parentElement.parentElement.classList = "vote";
    } else {
        newScore += 1;
        pScore.parentElement.parentElement.classList = "vote uped";
    }
    pScore.textContent = newScore;

    updateScore();
};

/**@param {Event} event */
function downvote(event) {
    const parent = event.target;

    /**@type {HTMLDivElement} */
    var voteDiv;
    if (parent.tagName === "IMG") {
        voteDiv = parent.parentElement.parentElement;
    } else if (parent.tagName === "BUTTON") {
        voteDiv = parent.parentElement;
    }

    const pScore = voteDiv.querySelector("p#vote-score");

    const classes = pScore.parentElement.parentElement.classList.toString().split(" ");
    const hasBeenDowned = classes.includes("downed");
    const hasBeenUped = classes.includes("uped");

    var newScore = parseInt(pScore.textContent);

    if (hasBeenDowned) return
    else if (hasBeenUped) {
        newScore -= 1;
        pScore.parentElement.parentElement.classList = "vote";
    } else {
        newScore -= 1;
        pScore.parentElement.parentElement.classList = "vote downed";
    }
    pScore.textContent = newScore;

    updateScore();
};


function deleteComPopup(event) {

    const target = event.target;

    /**@type {HTMLDivElement} */
    var button;
    if (target.tagName === "IMG") {
        button = target.parentElement;
    } else if (target.tagName === "BUTTON") {
        button = target;
    };

    //li.commReplies div.comm div.comment div.interact button.delete
    /** @type {HTMLDivElement} commentAndReplies */
    const commentAndReplies = button.parentElement.parentElement.parentElement.parentElement;

    const isYourMessage = commentAndReplies.querySelector(".comm").id === "you";
    if (!isYourMessage) return;

    var popup = document.getElementById("confirm");
    popup.style.visibility = "visible";

    document.body.style.overflowY = "hidden";
    document.body.style.marginRight = "18px";

    lastMessageToDelete = commentAndReplies;
};

function cancel(event) {
    const popup = document.getElementById("confirm");
    popup.style.visibility = "hidden";

    document.body.style.overflowY = "unset";
    document.body.style.marginRight = "0";
};

function confirmDelete(event) {
    lastMessageToDelete.remove();

    const popup = document.getElementById("confirm");
    popup.style.visibility = "hidden";

    document.body.style.overflowY = "unset";
    document.body.style.marginRight = "0";
};

function edit(event) {
    const target = event.target;

    /**@type {HTMLDivElement} */
    var button;
    if (target.tagName === "IMG") {
        button = target.parentElement;
    } else if (target.tagName === "BUTTON") {
        button = target;
    };

    const divComment = button.parentElement.parentElement;

    const amIAlreadyEditing = divComment.querySelector("textarea").style.display != "none";
    if(amIAlreadyEditing) return;

    var p = divComment.querySelectorAll("p")[1];

    const oldMsgContent = p.innerText;
    p.style.display = "none";

    const textarea = divComment.querySelector("textarea");
    textarea.style.display = "block"
    textarea.value = oldMsgContent;

    const updateBtn = divComment.querySelectorAll("button");
    updateBtn[3].style.display = "block";
};

function update(event) {
    const target = event.target;

    /**@type {HTMLDivElement} */
    var button;
    if (target.tagName === "IMG") {
        button = target.parentElement;
    } else if (target.tagName === "BUTTON") {
        button = target;
    };

    const divComment = button.parentElement.parentElement;

    const textarea = divComment.querySelector("textarea");
    const updatedMsg = textarea.value;
    
    var p = divComment.querySelectorAll("p")[2];
    p.innerText = updatedMsg;
    textarea.style.display = "none";
    p.style.display = "inline";

    const updateBtn = divComment.querySelectorAll("button")[5];
    updateBtn.style.display = "none";
};

function reply(event) {
    console.log("reply to a message !");
};

function sendMsg(event) {
    console.log("send my reply/post !");
};



function getFromJson() {
    const posts = document.getElementsByClassName("commReplies");

    const data = json;
    
    const ulPosts = document.querySelector("ul");

    const postRef = posts[0];
    const replyRef = document.getElementsByClassName("commInReplies")[0];
    const addReply = document.getElementsByClassName("add-reply")[0];

    while(posts.length > 0) {
        posts[0].remove();
    };

    var postsFromJson = [];

    data.comments.forEach(element => {
        const myRef = postRef;
        //get var from the json
        const src = element.user.image.png;//+ ", " + element.user.image.webp;
        const createdAt = element.createdAt;
        const score = element.score;
        const username = element.user.username;
        const replies = element.replies;
        const content = element.content;
        const isYou = element.user.username === data.currentUser.username;

        //get the each element corresponding from the HTML LI
        /**@type {HTMLImageElement} */
        const img = myRef.querySelector("img.profil-pic");
        /**@type {HTMLParagraphElement} */
        const pDate = myRef.querySelector("p.date");
        /**@type {HTMLParagraphElement} */
        const pScore = myRef.querySelector("p#vote-score");
        /**@type {HTMLHeadingElement} */
        const h2Username = myRef.querySelector("h2.pseudo");
        /**@type {HTMLUListElement} */
        const ulReplies = myRef.querySelector("ul.replies");
        /**@type {HTMLParagraphElement} */
        const pContent = myRef.querySelector("p.content");

        //change the post reference to the value found
        img.src = src;
        pDate.textContent = createdAt;
        pScore.textContent = score;
        myRef.style.order = score;
        h2Username.textContent = username;
        // ulReplies
        pContent.textContent = content;
        if(isYou) {
            myRef.querySelector("div.comm").id = "you";
        }else {
            myRef.querySelector("div.comm").id = "";
        };

        

        while(ulReplies.childElementCount > 0) {
            ulReplies.removeChild(ulReplies.querySelector("li"));
        };
        
        if(element.replies.length != 0) {
            element.replies.forEach(e => {
                const myReplyRef = replyRef;

                //get var from the json
                let src = e.user.image.png;
                let createdAt = e.createdAt;
                let score = e.score;
                let username = e.user.username;
                let content = e.content;
                let isYou = e.user.username === data.currentUser.username;
                let addressee = e.replyingTo;
                

                //get the each element corresponding from the HTML LI
                /**@type {HTMLImageElement} */
                const img = myReplyRef.querySelector("img.profil-pic");
                /**@type {HTMLParagraphElement} */
                const pDate = myReplyRef.querySelector("p.date");
                /**@type {HTMLParagraphElement} */
                const pScore = myReplyRef.querySelector("p#vote-score");
                /**@type {HTMLHeadingElement} */
                const h2Username = myReplyRef.querySelector("h2.pseudo");
                /**@type {HTMLParagraphElement} */
                const pContent = myReplyRef.querySelector("p.content");

                //change the post reference to the value found
                img.src = src;
                pDate.textContent = createdAt;
                pScore.textContent = score;
                myReplyRef.style.order = score;
                h2Username.textContent = username;
                pContent.textContent = content;
                if (isYou) {
                    myReplyRef.querySelector("div.comm").id = "you";
                } else {
                    myReplyRef.querySelector("div.comm").id = "";
                };
                const spanAddressee = document.createElement("span");
                spanAddressee.classList = "addressee";
                spanAddressee.textContent = "@" + addressee;
                pContent.insertBefore(spanAddressee,pContent.firstChild);
                
                ulReplies.innerHTML += myReplyRef.outerHTML;
            });

        };
        
        ulPosts.innerHTML += myRef.outerHTML;
    });
};

getFromJson();