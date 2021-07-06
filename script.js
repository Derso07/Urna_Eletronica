const seuVotoPara = document.querySelector('.top-left-1 span');
const cargo = document.querySelector('.top-left-2');
const quadrado = document.querySelector('.top-left-3');
const descricao = document.querySelector('.top-left-4');
const lateralDireita = document.querySelector('.top-right');
const footer = document.querySelector('.bottom');


let numero = '';
let etapaAtual = 0;
let branco = false;
let votos = [];
function ComecarEtapa(){
    
    let quadradoNumero = '';
    numero = '';
    let branco = false;

        for(var i = 0; i < etapas[etapaAtual].numeros; i++){
            if(i === 0){
            quadradoNumero += '<div class="numero pisca"></div>';
        }else{
            quadradoNumero += '<div class="numero"></div>';
        }

        }

    seuVotoPara.style.display='none';
    cargo.innerHTML = etapas[etapaAtual].titulo;
    quadrado.innerHTML = quadradoNumero;
    descricao.innerHTML = '';
    lateralDireita.innerHTML = '';
    footer.style.display='none';

}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) =>{
            if(item.numero === numero){
               return true;

        }else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0]
        let fotos = '';
        for(var i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotos += `<div class="top-right-1 small"><img src="img/${candidato.fotos[i].url}" alt="${candidato.fotos[i].legenda}">${candidato.fotos[i].legenda}</div>`
            }else{
                fotos += `<div class="top-right-1"><img src="img/${candidato.fotos[i].url}" alt="${candidato.fotos[i].legenda}">${candidato.fotos[i].legenda}</div>`
        }
        }
        seuVotoPara.style.display='block';
        descricao.innerHTML = `Nome: ${candidato.nome} </br> Partido: ${candidato.partido}`;
        footer.style.display='block';
        lateralDireita.innerHTML = fotos;
    }else{
        seuVotoPara.style.display='block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div'
        footer.style.display='block';
    }
    
}

function Clicou(n){
    let elnumero = document.querySelector('.numero.pisca');
    if(elnumero !== null){
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;

        elnumero.classList.remove('pisca');
        if(elnumero.nextElementSibling !== null){
            elnumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();        }
    }
}

function Branco(){
    if(numero === ''){
        branco = true;
        seuVotoPara.style.display='block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
        footer.style.display='block';
        quadrado.innerHTML = '';
    }
}

function Corrige(){
    ComecarEtapa();
}

function Confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(branco === true || numero.length === etapa.numeros){
        votoConfirmado = true;
    }else{
        ComecarEtapa();
    }

    if(votoConfirmado){
        etapaAtual ++;
        if(etapas[etapaAtual] != undefined){
            ComecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-fim pisca">FIM</div>';
        }
    }
    
}

ComecarEtapa();