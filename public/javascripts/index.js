console.log('kj');
var img=document.getElementById('img');

let i=1;

fetch("./javascripts/data.json").then(response =>{
    return response.json();
    
}).then((rsp)=>{
    img.innerHTML=`<img src="${rsp.data[0].img}"  alt="ss" srcset="">`
    img.style.width="100%"
    img.style.height="100vh"

    setInterval(() => {
        
        img.innerHTML=`<img src="${rsp.data[i].img}"  alt="ss" srcset="">`
        img.style.width="100%"
        img.style.height="100vh"
        img.style.transition="ease-in"

        if(i===4){
            i=0;
        }
        else{

            i++;
        }
    }, 20000); 
})