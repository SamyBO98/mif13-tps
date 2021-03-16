/**
 * Chargement de la liste des utilisateurs existants
 */
let url = "http://localhost:3376/api/resources";
let init = {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    mode: 'cors',
    cache: 'default'
};
let request = new Request(url)

fetch(request, init)
    .then(resp => resp.json())
    .then(user => {
        var ul = document.getElementById("ul-users");

        for (const id of Object.keys(user)){
            if (user[id].role === "player"){
                renderHtmlUser(user[id], ul);
            }
        }
    }).catch(error => {
        console.log(error);
    })

function renderHtmlUser(user, ul){
    //li
    var li = document.createElement("li");
    li.setAttribute("id", "li-user-" + user.login);

    //li - create link for image
    var aImage = document.createElement("a");
    aImage.setAttribute("href", "javascript:updateImage(" + user.login + ")");
    var img = document.createElement("img");
    img.setAttribute("src", user.image);
    img.setAttribute("class", "icon");
    aImage.appendChild(img);
    li.appendChild(aImage);

    li.appendChild(document.createTextNode("  -  "));
    //li - create name
    var aName = document.createElement("a");
    aName.setAttribute("href", "javascript:updateName(" + user.login + ")");
    aName.appendChild(document.createTextNode(user.login));
    li.appendChild(aName);

    li.appendChild(document.createTextNode("  -  "));
    //li - create ttl
    var ttl = document.createElement("strong");
    ttl.appendChild(document.createTextNode("TTL: " + user.ttl));
    li.appendChild(ttl);

    li.appendChild(document.createTextNode("  -  "));
    //li - create trophys
    var trophys = document.createElement("strong");
    trophys.appendChild(document.createTextNode("Trophys: " + user.trophys));
    li.appendChild(trophys);
    
    //append li to ul
    ul.appendChild(li);
}

```<li id="il-user-toto">
<a href="javascript:updateImage('Toto');"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Pediculus_humanus_var_capitis.jpg/800px-Pediculus_humanus_var_capitis.jpg?uselang=fr" alt="Pediculus humanus var capitis AKA head louse; public domain from http://phil.cdc.gov/" class="icon"></a>&nbsp;&nbsp;-&nbsp;&nbsp;
<a href="javascript:updateName('Toto');">Toto</a>&nbsp;&nbsp;-&nbsp;&nbsp;
<strong>TTL</strong> : 180s&nbsp;&nbsp;-&nbsp;&nbsp;
<strong>Trophys</strong> : none
</li>```