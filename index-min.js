function createContactItem(e){let t=JSON.parse(localStorage.getItem("User"+e)),n=document.createElement("div"),o=document.createElement("div"),l=document.createElement("div"),a=document.createElement("div"),c=document.createElement("div");n.classList.add("contacts__item"),o.classList.add("contacts__name","contacts__list-item"),l.classList.add("contacts__email","contacts__list-item"),a.classList.add("contacts__phone","contacts__list-item"),c.classList.add("contacts__company","contacts__list-item"),o.innerHTML=t.name,l.innerHTML=t.email,a.innerHTML=t.phone,c.innerHTML=t.company.name,c.innerHTML=t.company.name,n.append(o),n.append(l),n.append(a),n.append(c),n.setAttribute("data-userid",e),document.querySelector("#dynamicList").append(n)}fetch("http://demo.sibers.com/users").then(e=>e.json()).then(e=>{document.querySelector("#contactsNumber").innerHTML=e.length;for(let t=0;t<e.length;t++)localStorage.getItem("User"+t)||localStorage.setItem("User"+t,JSON.stringify(e[t]));for(let e=0;e<localStorage.length;e++)createContactItem(e)}).then(()=>{createPopup()});let headerInput=document.querySelector(".header__search");function createPopup(){let e=document.querySelectorAll("#dynamicList > *");for(let t=0;t<e.length;t++)e[t].addEventListener("click",function(e){document.querySelector(".popup-overlay").style="display: block",document.querySelector(".popup-show").style="display: block";let n=JSON.parse(localStorage.getItem("User"+t)).name,o=JSON.parse(localStorage.getItem("User"+t)).email,l=JSON.parse(localStorage.getItem("User"+t)).phone,a=JSON.parse(localStorage.getItem("User"+t)).company.name;console.log(n,o,l,a),document.querySelector(".popup-show__name").innerHTML=n,document.querySelector("#email").innerHTML=o,document.querySelector("#email").setAttribute("href","mailto:"+o),document.querySelector("#phone").innerHTML=l,document.querySelector("#phone").setAttribute("href","tel:"+l),document.querySelector("#company").innerHTML=a,nameInput.value=n,emailInput.value=o,phoneInput.value=l,companyInput.value=a,document.querySelector(".popup-show__edit").addEventListener("click",e=>{document.querySelector(".popup-show").style="display: none",document.querySelector(".popup-edit").style="display: block",editContacts(t)})})}headerInput.addEventListener("input",()=>{let e=document.querySelectorAll(".contacts__item");for(let t=0;t<e.length;t++)e[t].style="display: none";if(""===headerInput.value)for(let t=0;t<=e.length-1;t++)e[t].style="display: block";else{let n=headerInput.value[0].toUpperCase()+headerInput.value.slice(1);for(var t=0;t<localStorage.length;t++)0===JSON.parse(localStorage.getItem("User"+t)).name.indexOf(n)&&(e[t].style="display: block")}}),document.querySelector(".popup-show__hide").addEventListener("click",e=>{document.querySelector(".popup-overlay").style="display: none",document.querySelector(".popup-show").style="display: none",document.querySelector(".popup-edit").style="display: none"}),document.querySelector(".popup-overlay").addEventListener("click",e=>{document.querySelector(".popup-overlay").style="display: none",document.querySelector(".popup-edit").style="display: none",document.querySelector(".popup-show").style="display: none"});let nameInput=document.querySelector("input.popup-edit__name"),emailInput=document.querySelector("input.popup-edit__email"),phoneInput=document.querySelector("input.popup-edit__phone"),companyInput=document.querySelector("input.popup-edit__company");function editContacts(e){document.querySelector(".popup-edit__save").addEventListener("click",t=>{t.preventDefault();let n=JSON.parse(localStorage.getItem("User"+e));nameInput.value&&(n.name=nameInput.value[0].toUpperCase()+nameInput.value.slice(1)),emailInput.value&&(n.email=emailInput.value),phoneInput.value&&(n.phone=phoneInput.value),companyInput.value&&(n.company.name=companyInput.value),localStorage.setItem("User"+e,JSON.stringify(n)),window.location.reload()})}document.querySelector(".popup-edit__hide").addEventListener("click",e=>{document.querySelector(".popup-overlay").style="display: none",document.querySelector(".popup-edit").style="display: none",document.querySelector(".popup-show").style="display: none"}),document.querySelector(".popup-edit__cancel").addEventListener("click",e=>{e.preventDefault(),document.querySelector(".popup-edit").style="display: none",document.querySelector(".popup-show").style="display: block"});
//# sourceMappingURL=index-min.js.map
