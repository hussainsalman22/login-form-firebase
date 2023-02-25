var product = document.getElementById("table")



firebase.database().ref("dishes").once("value",(snap)=>{
    if(snap.toJSON()!=null){
        var value = Object.values(snap.toJSON())

        value.map((v,i)=>{
            console.log(v)
            product.innerHTML+=`
            <tr>
            <td>${v.Dishname}</td>
            <td>${v.Quantity}</td>
            <td>${v.price}</td>
            <td><img src="${v.image}" height="50px" width="200px"></td>

            `

        })
    }

})