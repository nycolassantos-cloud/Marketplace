
fetch(linkJs)
    .then(res => res.json())
    .then(data => {
        
        const listaMenu = []

        data.forEach(element =>{

                listaMenu.push(element.categoria)

            const qd = document.createElement('div')
                qd.classList.add('qd')
                qd.addEventListener('click',()=>{
                    window.location.href="agente-detalhe.aspx?id="+element.id
                })
                document.querySelector('#tela-itens').appendChild(qd)

            const qdFundo = document.createElement('div')
                qdFundo.classList.add('qdFundo')
                qdFundo.style.background="url('img/bg"+element.img+".png')"
                qd.appendChild(qdFundo)

            const qdFundo2 = document.createElement('div')
                qdFundo2.classList.add('qdFundo2')
                qd.appendChild(qdFundo2)

            const qdFundo3 = document.createElement('div')
                qdFundo3.classList.add('qdFundo3')
                qd.appendChild(qdFundo3)

            const qdMeio = document.createElement('div')
                qdMeio.classList.add('qdMeio')
                qdMeio.style.background="url('img/"+element.img+".png')"
                qdFundo.appendChild(qdMeio)
                
                
            const titulo = document.createElement('p')
                titulo.classList.add('p2')
                titulo.textContent=element.alias
                qdFundo2.appendChild(titulo)                
                
            const nota = document.createElement('p')
                nota.classList.add('p4')
                nota.textContent=element.avaliacao+"★"
                qdFundo3.appendChild(nota)              
                
            const status = document.createElement('p')
            status.classList.add('p3')
                status.textContent=element.status
                qdFundo3.appendChild(status)

        })
            const novaListaMenu = listaMenu.filter(function(este, i){
                return listaMenu.indexOf(este) === i;
            })
            novaListaMenu.forEach(item => {
            const bt = document.createElement('div')
                bt.classList.add('bt')
                bt.textContent=item
                bt.addEventListener('click', ()=>{                    
                    filtro(item)
                })
                document.querySelector('#menu').appendChild(bt)
            })
    })


function filtro(x){
const todasQd = document.querySelectorAll('.qd')
    for (let i = 0; i < todasQd.length; i++) {        
        todasQd[i].remove()        
    }
    fetch('catalog_agentes.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(element =>{
            if(element.categoria == x){
                const qd = document.createElement('div')
                    qd.classList.add('qd')
                    qd.addEventListener('click',()=>{
                    window.location.href="agente-detalhe.aspx?id="+element.id
                })
                   document.querySelector('#tela-itens').appendChild(qd)

                const qdFundo = document.createElement('div')
                    qdFundo.classList.add('qdFundo')
                    qdFundo.style.background="url('img/bg"+element.img+".png')"
                    qd.appendChild(qdFundo)

                const qdFundo2 = document.createElement('div')
                    qdFundo2.classList.add('qdFundo2')
                    qd.appendChild(qdFundo2)

                const qdFundo3 = document.createElement('div')
                    qdFundo3.classList.add('qdFundo3')
                    qd.appendChild(qdFundo3)

                const qdMeio = document.createElement('div')
                    qdMeio.classList.add('qdMeio')
                    qdMeio.style.background="url('img/"+element.img+".png')"
                    qdFundo.appendChild(qdMeio)
                    
                    
                const titulo = document.createElement('p')
                    titulo.classList.add('p2')
                    titulo.textContent=element.alias
                    qdFundo2.appendChild(titulo)                
                    
                const nota = document.createElement('p')
                    nota.classList.add('p4')
                    nota.textContent=element.avaliacao+"★"
                    qdFundo3.appendChild(nota)              
                    
                const status = document.createElement('p')
                status.classList.add('p3')
                    status.textContent=element.status
                    qdFundo3.appendChild(status)

            }
        })
            
    })

}

