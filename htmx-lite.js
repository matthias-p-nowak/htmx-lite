
function hxl_submit_form(action, event){
    let form= event.target.form ?? event.target.closest('form');
    let formData=new FormData(form);
    event.target.classList.add('requested');
    fetch(action, { method: "POST" , body: formData})
    .then(response => { 
        if(response.status==200){
            event.target.classList.remove('requested');
            event.target.classList.remove('failed');
            return response.text();
        } else{
            event.target.classList.remove('requested');
            event.target.classList.add('failed');
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        hxl_process_body(data);
    })
    .catch(error => { console.error("An error occurred:", error); })
    ;
}

function hxl_process_body(body){
    const div = document.createElement('div');
    div.innerHTML = body;
    while (div.childNodes.length > 0) {
        let n = div.childNodes[0];
        n.remove();
        if (n.nodeType == Node.ELEMENT_NODE) {
            let attr = n.getAttribute('x-action');
            let sameId = document.getElementById(n.id);
            if (n.hasAttribute('x-id')) {
                let oid = n.getAttribute('x-id');
                var otherId = document.getElementById(oid);
            }
            switch (attr) {
                case 'after':
                    otherId.after(n);
                    break;
                case 'append':
                    otherId.append(n);
                    break;
                case 'before':
                    otherId.before(n);
                    break;
                case 'prepend':
                    otherId.prepend(n);
                    break;
                case 'remove':
                    sameId.remove();
                    break;
                case 'replace':
                    sameId.replaceWith(n);
                    break;
                default:
                    console.log('had no action defined for ', n);
            }
        }
    }

}


