console.log(firebase.database())
var email = document.getElementById("email1")
var password = document.getElementById("password")
var signin = document.getElementById("signin")
var signup = document.getElementById("signup")
var role = document.getElementsByName("user")
let getrole = ""

// console.log(email.value)
// console.log(password.value)
signup.addEventListener("click", async function () {
    console.log(email.value)
    console.log(password.value)

    for (var i = 0; i < role.length; i++) {
        if (role[i].checked) {
            getrole = role[i].value
            break
        }
        if (getrole == "") {
            alert("Select ROLE PLEASE")
        }
        else {
            console.log(getrole)
        }
    }
    await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)

        .then((user) => {
            console.log(user.user.uid)

            var obj = {
                email: email.value,
                password: password.value,
                role: getrole,
                uid: user.user.uid

            }
            firebase.database().ref(`${getrole.toString()}/`).child(user.user.uid.toString()).set(obj)
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
            firebase.database().ref("Admin/").child(user.user.uid).once("value", (snap) => {
                console.log(snap.toJSON())
                if (snap.toJSON() == null) {
                    firebase.database().ref("user/").child(user.user.uid).once("value", (snap) => {
                        console.log(snap.toJSON())
                        window.location.replace("user.html")
                    })
                }
                else{
                    window.location.replace("Admin.html")
                }

            })
        })
        .catch((e) => {
            alert(e.message)
        })

})

