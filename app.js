console.log(firebase.database())
var email = document.getElementById("email1")
var password = document.getElementById("password")
var signin = document.getElementById("signin")
var signup = document.getElementById("signup")

// console.log(email.value)
// console.log(password.value)
signup.addEventListener("click", async function () {
    console.log(email.value)
    console.log(password.value)
    await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    
        .then((user) => {
            console.log(user.user.uid)

            var obj = {
                email: email.value,
                password: password.value,
                role: "user",
                uid: user.user.uid

            }
            firebase.database().ref("users/").child(user.user.uid).set(obj)
            //  window.location.replace("index1.html")
            alert("your account has been created now you signin")
            
        })
        .catch((e) => {
            alert(e.message)
        })
        
})

signin.addEventListener("click", async function () {
    console.log(email.value)
    console.log(password.value)
    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((user) => {
            console.log(user.user.uid)
        })
        .catch((e) => {
            alert(e.message)
        })
    window.location.replace("index1.html")

})

