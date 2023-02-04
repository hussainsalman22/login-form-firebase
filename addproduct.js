var dishname = document.getElementById("dishname")
var price = document.getElementById("price")
var qty = document.getElementById("qty")
var file = document.getElementById("file")
var upload = document.getElementById("upload")
var submit = document.getElementById("submit")
var input = document.getElementsByTagName("input")
let getfile;
let imgurl;
console.log(file.type)
file.addEventListener("click",function(){
    file.onchange=e=>{
        console.log(e.target.files[0])
        getfile = e.target.files[0]
        upload.removeAttribute("disabled")
    }
})

upload.addEventListener("click", async function(){

    event.preventDefault()
    // var uploaddata = firebase.storage().ref().child(`images/${getfile.name}`).put(getfile)
    var uploaddata = firebase.storage().ref().child(`images/${getfile.name}`)
        .put(getfile)
    uploaddata.on("state_changed",(snap)=>{
        var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        if (progress==0){
            alert("your image is uploading please wait")
        }
        if (progress==100){
            alert("your image is uploaded")

        }
       
    },
    (error)={

    },
    ()=>{
        uploaddata.snapshot.ref.getDownloadURL().then((downloadurl)=>{
            imgurl = downloadurl
            console.log(`file availabe at${downloadurl} ` )
            submit.removeAttribute("disabled")
        })
    
    }
    )


})

submit.addEventListener("click",async()=>{
    event.preventDefault()
    var key = firebase.database().ref("dishes").push().getKey()
    var obj =  { 
        Dishname:dishname.value,
        price:price.value,
        Quantity:qty.value,
        image: imgurl,
        productkey:key
    }

    await firebase.database().ref("dishes").child(key.toString()).set(obj)
    window.location.href= "Admin.html"

})
