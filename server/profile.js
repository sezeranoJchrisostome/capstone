if(userInfo == null){
    location.href = './blog.html';
}

/* Database configuration */
const firebaseConfig = {
    apiKey: "AIzaSyDyhJPX5hGXmkVCjWiDYDgxW8Ongh0YZqU",
    authDomain: "capstone-d17ab.firebaseapp.com",
    projectId: "capstone-d17ab",
    storageBucket: "capstone-d17ab.appspot.com",
    messagingSenderId: "658315154433",
    appId: "1:658315154433:web:ee6855874b6ed722da1c00",
    databaseURL:"https://capstone-d17ab-default-rtdb.europe-west1.firebasedatabase.app"
};
/* Initialize Database  */
const app = firebase.initializeApp(firebaseConfig);
const database = app.database();
elementLeader();
var limitInterval = 4 ;

const getContactInfo = (limitSent =  null) => {
    var limit = limitSent == null ? limitInterval : limitSent + limitInterval;
    const contactInfo = document.getElementById('contacts-info');
    var htmlInfo = '';
    console.log(limit);
    let query = database.ref('contact').orderByChild('isNew').limitToLast(limit).equalTo(true);
    query.once('value', (snap) => {
        let data = snap.val();
        for(let i in data){
            htmlInfo += `
                <div class="cbody shodow-none content-padding">
                    <div class="set"> 
                        <div class="r-card post-card" id="postCard" >
                            <div class="user-profile " id="profile-image">
                                <img src="../images/L8tWZT4CcVQ.jpg" id="profile-p" alt="sezerano">
                            </div>  
                            <div class="comment-field">
                                <div class="label-and-value quot">
                                    <img src="../assets/svgs/quotes.svg"  alt="chrysostome" srcset="">
                                </div>                            
                                <div class="label-and-value">
                                    <label for="">Email :</label> <span>${data[i].email}</span>
                                </div>
                                <div class="label-and-value">
                                    <label for="">Subject :</label> <span> ${data[i].subject} </span>
                                </div>
                                <div class="label-and-value">
                                    <label for="">Comment :</label>
                                    <span>  
                                       ${data[i].comment}                               
                                    </span>
                                </div>
                            </div>     
                            <div class="add-button" id="reply" onclick="replyTo('${data[i].id}')" >
                                <img src="../assets/svgs/paper-plane.svg" alt="" srcset="">
                            </div>     
                        </div>
                    </div>                      
                </div>
                `;
        } 
        contactInfo.innerHTML = htmlInfo;
    });
}

window.addEventListener('load',() => {
    getContactInfo();
});
const replyTo = (contactId) => {
    localStorage.setItem('cid',contactId);
    console.log(contactId);
} 


