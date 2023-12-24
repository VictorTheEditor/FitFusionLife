function botaoGerarTreino(){
    GerarTreino()
}

document.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        return GerarTreino()
    } 
})

const makeTraning = document.querySelector('#makeTraning')
const FundoBlur = document.querySelector('#FundoBlur')

const resForm = document.querySelector('#resForm')

//Botoes Do Formulario
const botoesForm = document.querySelector('#botoesForm')
const Botoes = botoesForm.querySelectorAll('button')

function displayMakeTraning(mk, fb){
    if(mk.style.display == 'block')  mk.style.display = 'none'
    else mk.style.display = 'block'

    if(fb.style.display == 'block')  fb.style.display = 'none'
    else fb.style.display = 'block'
}

function GerarTreino(){
    const idade = document.querySelector('#txtIdade')
    const nome = document.querySelector('#txtNome')
    const form = document.querySelector('#formulario')

    const parErroSexo = document.querySelector('.parErroSexo')
    const parErroTreino = document.querySelector('.parErroTreino')
    
    if(!verificarNome(nome.value)) alert('Insira Um Nome')

    const resultado = CondiçoesTreino(Number(idade.value), nome.value)
    if(resultado === undefined) { 
        verificarUnchecked(Botoes, parErroSexo, parErroTreino)
        return
    }
    
    changeDisplayForm(resForm, form)

    nome.value = ''
    idade.value = ''

    parErroSexo.innerText = ''
    parErroTreino.innerText = ''

    estilosPadrao()

    return resForm.innerHTML = resultado
}

function verificarUnchecked(btn, tr, sx){

    if(btn[0].classList.contains('Unchecked') && btn[1].classList.contains('Unchecked')){
        sx.innerText = 'Informe Seu Sexo'
        setTimeout(function(){
            parErroSexo.innerText = ''        
        },5000)
    }

    if(btn[2].classList.contains('Unchecked') && btn[3].classList.contains('Unchecked')){
        tr.innerText = 'Informe Seu Treino'
        setTimeout(function(){
            parErroTreino.innerText = ''
        },5000)
    }
}

function changeDisplayForm(resForm, form){
    const resFormButtom = document.querySelector('#resForm-buttom')

    if(resForm.style.display == 'block' && form.style.display == 'none'){
        resForm.style.display = 'none'
        form.style.display = 'block'
        resFormButtom.style.display = 'none'
    }else{
        resForm.style.display = 'block'
        form.style.display = 'none'
        resFormButtom.style.display = 'block'
    }

    estilosPadrao()
    resFormButtom.addEventListener('click', function(){
        retornarForm(resForm, form)
    })
}

function retornarForm(resForm, form){
    changeDisplayForm(resForm, form)
}

//FUNÇAO APARECER FORMULARIO
function AparecerMakeTraning(){
    displayMakeTraning(makeTraning, FundoBlur)
}

//FUNÇAO VOLTAR PAGINA
function voltarPg(){
    displayMakeTraning(makeTraning, FundoBlur)
    estilosPadrao()
}

function botoesSexoTreino(el){
    if(el.classList.contains('isMasc')){
        Botoes[0].classList.add('checked')
        Botoes[0].classList.remove('Unchecked')
        Botoes[1].classList.remove('checked')
        Botoes[1].classList.add('Unchecked')
    }

    if(el.classList.contains('isFem')){
        Botoes[1].classList.add('checked')
        Botoes[1].classList.remove('Unchecked')
        Botoes[0].classList.remove('checked')
        Botoes[0].classList.add('Unchecked')
    }
    
    if(el.classList.contains('isSup')){
        Botoes[2].classList.add('checked')
        Botoes[2].classList.remove('Unchecked')
        Botoes[3].classList.remove('checked')
        Botoes[3].classList.add('Unchecked')
    }

    if(el.classList.contains('isInf')){
        Botoes[3].classList.add('checked')
        Botoes[3].classList.remove('Unchecked')
        Botoes[2].classList.remove('checked')
        Botoes[2].classList.add('Unchecked')
    }
}

document.addEventListener('click', function(e){
    const el = e.target
    botoesSexoTreino(el)
})

function estilosPadrao(){
    for(let botao of Botoes){
        botao.classList.remove('checked')
        botao.classList.add('Unchecked')
        botao.classList.remove('EstiloErro')
    }
}


function verificarNome(nome){
    if(nome === '') return false
    else return true
}

function verificarSexoTreino(){
    const filtro = {
        sexo: '',
        treino: ''
    }

    for(valor of Botoes){

        if(valor.classList.contains('isMasc') && valor.classList.contains('checked')) filtro.sexo = 'Masc'
        
        if(valor.classList.contains('isFem') && valor.classList.contains('checked')) filtro.sexo = 'Fem'

        if(valor.classList.contains('isSup') && valor.classList.contains('checked')) filtro.treino = 'Sup'
        
        if(valor.classList.contains('isInf') && valor.classList.contains('checked')) filtro.treino = 'Inf'
    }
    return filtro
}

function CondiçoesTreino(idade, nome){
    const resultadoFiltro = verificarSexoTreino()
    const ObterIdade = CondiçoesIdade(idade)
    estilosPadrao()

    if(resultadoFiltro.sexo === 'Masc'){
        const resCondiçaoTreinoMasc = CondiçoesTreinoMasc(resultadoFiltro, ObterIdade, nome)
        return resCondiçaoTreinoMasc
    }

    if(resultadoFiltro.sexo === 'Fem'){
        const resCondiçaoTreinoFem = CondiçoesTreinoFem(resultadoFiltro, ObterIdade, nome)
        return resCondiçaoTreinoFem
    }
}

function CondiçoesIdade(idade){
    if(idade < 13 || idade > 70 || isNaN(idade)) return alert('Idade Não Recomendada Para Treino')
    if(idade >= 13 && idade <= 18) return 'adolescente'
    if(idade >= 18 && idade <= 30) return 'jovem'
    if(idade >= 30 && idade <= 50) return 'adulto'
    if(idade >= 50 && idade <= 70) return 'idoso'
}


function CondiçoesTreinoMasc(filtro, idade, nome){
const TreinoMascSup = [`
<h1>Treino de Membros Superiores Para Adolescentes</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2><div class="exer">*Exercício 1: Supino com Barra (Bench Press)*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 2: Pull-Ups ou Lat Pulldown*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br>
</div><div class="exer">*Exercício 3: Desenvolvimento com Halteres (Dumbbell Shoulder Press)*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br>
</div><div class="exer">*Exercício 4: Rosca Direta com Halteres (Dumbbell Bicep Curl)*<br>4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br>
</div>
<h3>Nota: Certifique-se de que o adolescente tenha uma forma adequada e use um peso adequado para sua capacidade. A técnica correta é essencial para evitar lesões. Incentive o adolescente a não sobrecarregar as articulações e a realizar os exercícios de forma controlada.</h3>
`,`

<h1>Treino de Membros Superiores para Jovens Adultos</h1> 
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2><div class="exer">*Exercício 1: Supino com Barra (Bench Press)<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 2: Pull-Ups ou Lat Pulldown<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 3: Desenvolvimento com Halteres (Dumbbell Shoulder Press)<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 4: Rosca Direta com Barra (Barbell Bicep Curl)<br>4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br></div><h3>Nota: Certifique-se de que o adolescente tenha uma forma adequada e use um peso adequado para sua capacidade. A técnica correta é essencial para evitar lesões. Incentive o adolescente a não sobrecarregar as articulações e a realizar os exercícios de forma controlada.</h3>`,

`<h1>Treino de Membros Superiores para Adultos</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2><div class="exer">*Exercício 1: Supino com Barra (Bench Press)*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 2: Pull-Ups ou Lat Pulldown*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 3: Desenvolvimento com Halteres (Dumbbell Shoulder Press)*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 4: Rosca Direta com Barra (Barbell Bicep Curl)*<br>4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br></div>
<h3>Nota: Certifique-se de usar uma técnica adequada em todos os exercícios para evitar lesões. Inicie com pesos moderados e aumente gradualmente a carga à medida que sua força e condicionamento melhoram. Também, lembre-se de fazer um aquecimento adequado antes do treino e alongamentos suaves após o treino.</h3>`,

`<h1>Treino de Membros Superiores para Adultos e Idosos</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<h3><strong>É importante</strong> lembrar que a segurança é fundamental ao criar um programa de treinamento para idosos. Um treinamento para esse grupo etário deve ser adaptado às necessidades individuais e limitações físicas. Aqui está um exemplo de um treino de membros superiores adequado para idosos de 50 a 70 anos, com ênfase na manutenção da força e da mobilidade. Consulte um profissional de saúde ou educador físico antes de iniciar qualquer programa de exercícios, especialmente se você tiver condições médicas pré-existentes.</h3><div class="exer">Aquecimento:
5-10 minutos de aquecimento cardiovascular leve, como caminhada ou bicicleta estacionária.</div><div class="exer">*Exercício 1: Flexões de Parede (Wall Push-Ups)<br>4 séries de 10-12 repetições<br>Descanso: 1 minuto<br></div><div class="exer">*Exercício 2: Levantamento Lateral de Halteres (Lateral Raises)<br>4 séries de 10-12 repetições<br>Descanso: 1 minuto<br></div><div class="exer">*Exercício 3: Rosca Martelo (Hammer Curls)<br>4 séries de 10-12 repetições<br>Descanso: 1 minuto<br></div><div class="exer">*Exercício 4: Pulldown com Polia Alta (Lat Pulldown)<br>4 séries de 10-12 repetições<br>Descanso: 1 minuto<br></div>
<h3>Nota: Use pesos leves ou moderados para evitar sobrecarregar os músculos e as articulações. Mantenha uma técnica adequada e faça os movimentos de forma controlada. Se necessário, você pode ajustar o número de séries e repetições com base na sua capacidade. É essencial focar na qualidade dos movimentos e evitar qualquer desconforto ou dor durante o exercício Adaptar o treino de acordo com a capacidade individual é fundamental. Um treinador pessoal ou fisioterapeuta especializado em idosos pode fornecer orientações adicionais e 
garantir que o programa seja seguro e eficaz. Além disso, a supervisão durante o treinamento pode 
ser benéfica, especialmente se você for novo no exercício ou tiver preocupações com sua forma física.</h3>
<h3>Resfriamento:
5-10 minutos de alongamento suave para os membros superiores.</h3>`
]

const TreinoMascInf = [`
<h1>Treino de Membros Inferiores para Adolescentes</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2><div class="exer">*Exercício 1: Agachamento Livre (Squat)*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 2: Afundo com Barra (Barbell Lunges)*<br>4 séries de 8-10 repetições (cada perna)<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 3: Leg Press*<br>4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">Exercício 4: Panturrilhas em Pé (Standing Calf Raises)<br>4 séries de 12-15 repetições<br>Descanso: 1,5 minutos<br></div>
<h3>Nota: Certifique-se de que o adolescente tenha uma forma adequada e use um peso adequado para sua capacidade. A técnica correta é essencial para evitar lesões. Incentive o adolescente a não sobrecarregar as articulações e a realizar os exercícios de forma controlada.</h3>
`,

`<h1>Treino de Membros Inferiores para Jovens Adultos</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2><div class="exer">Exercício 1: Agachamento Livre (Squat)<br>4 séries de 8-10repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">Exercício 2: Levantamento Terra (Deadlift)<br>4 séries de 6-8 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">Exercício 3: Leg Press<br>4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">Exercício 4: Cadeira Extensora (Leg Extension)<br>4 séries de 12-15 repetições<br>Descanso: 1,5 minutos<br></div>
<h3>Nota: Certifique-se de usar uma técnica adequada em todos os exercícios para evitar lesões. Inicie com pesos moderados e aumente gradualmente a carga à medida que sua força e condicionamento melhoram. Também, lembre-se de fazer um aquecimento adequado antes do treino e alongamentos suaves após o treino.</h3>
`,

`<h1>Treino de Membros Inferiores para Adultos</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2><div class="exer">*Exercício 1: Agachamento Livre (Squat)*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 2: Levantamento Terra (Deadlift)*<br>4 séries de 6-8 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 3: Leg Press*<br>4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">*Exercício 4: Cadeira Extensora (Leg Extension)*<br>4 séries de 12-15 repetições<br>Descanso: 1,5 minutos<br></div>
<h3>Nota: Certifique-se de usar uma técnica adequada em todos os exercícios para evitar lesões. Inicie com pesos moderados e aumente gradualmente a carga à medida que sua força e condicionamento melhoram. Também, lembre-se de fazer um aquecimento adequado antes do treino e alongamentos suaves após o treino.</h3>`,
`
<h1>Treino de Membros Inferiores para Adultos e Idosos</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<h3><strong>É importante</strong> lembrar que a segurança é fundamental ao criar um programa de treinamento Para um idoso de 50 a 70 anos, é importante enfatizar a segurança, a estabilidade e a mobilidade ao criar um programa de treinamento de membros inferiores. O foco deve ser em exercícios que ajudem a manter a força das pernas e a funcionalidade. Consulte sempre um profissional de saúde ou fisioterapeuta antes de iniciar um programa de exercícios, especialmente se você tiver alguma condição médica pré-existente. Aqui está um exemplo de um treino de membros inferiores para idosos:</h3><div class="exer">Aquecimento:
5-10 minutos de aquecimento leve, como caminhada ou pedalada suave em uma bicicleta ergométrica.</div><div class="exer">*Exercício 1: Agachamento na Cadeira<br>4 séries de 10-12 repetições<br>Descanso: 1 minuto<br></div><div class="exer">*Exercício 2: Extensão de Quadril Sentado (Leg Extension)<br>4 séries de 10-12 repetições<br>Descanso: 1 minuto<br></div><div class="exer">*Exercício 3: Panturrilhas em Pé (Standing Calf Raises)<br>4 séries de 12-15 repetições<br>Descanso: 1 minuto<br></div><div class="exer">*Exercício 4: Elevação Pélvica (Bridge)<br>4 séries de 10-12 repetições<br>Descanso: 1 minuto<br></div>
<h3>Nota: Use pesos leves ou moderados e mantenha uma técnica adequada em todos os exercícios. Concentre-se em movimentos controlados e evite qualquer desconforto ou dor. Os exercícios selecionados visam a funcionalidade e a segurança.</h3>
<h3>Resfriamento:
5-10 minutos de alongamento leve para as pernas, com foco nas áreas trabalhadas durante o treino.
Este é um exemplo básico de um treino de membros inferiores para idosos. A adaptação do programa às suas necessidades e limitações individuais é fundamental. Um treinador pessoal ou fisioterapeuta especializado em idosos pode fornecer orientações adicionais e garantir que o programa seja seguro e eficaz. A supervisão durante o treinamento pode ser benéfica, especialmente se você for novo no exercício ou tiver preocupações com sua forma física.
</h3>
`]

    if(filtro.sexo == 'Masc' && filtro.treino == 'Sup' && idade === 'adolescente') return TreinoMascSup[0]
    if(filtro.sexo == 'Masc' && filtro.treino == 'Sup' && idade === 'jovem') return TreinoMascSup[1]
    if(filtro.sexo == 'Masc' && filtro.treino == 'Sup' && idade === 'adulto') return TreinoMascSup[2]
    if(filtro.sexo == 'Masc' && filtro.treino == 'Sup' && idade === 'idoso') return TreinoMascSup[3]

    ///////////////////////////////////////////////////////////////////

    if(filtro.sexo == 'Masc' && filtro.treino == 'Inf' && idade === 'adolescente') return TreinoMascInf[0]
    if(filtro.sexo == 'Masc' && filtro.treino == 'Inf' && idade === 'jovem') return TreinoMascInf[1]
    if(filtro.sexo == 'Masc' && filtro.treino == 'Inf' && idade === 'adulto') return TreinoMascInf[2]
    if(filtro.sexo == 'Masc' && filtro.treino == 'Inf' && idade === 'idoso') return TreinoMascInf[3]
}

function CondiçoesTreinoFem(filtro, idade, nome){
const TreinoFemSup = [`
<h1>Treino de Membros Superiores para Adolescente</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<div class="exer">Aquecimento:5-10 minutos de aquecimento cardiovascular leve, como corrida no local ou pular corda.</div><div class="exer">Exercício 1: Flexões de joelhos<br>4 séries de 8 a 10 repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercício 2: Pull-Ups Assisitidos ou Lat Pulldown<br>4 séries de 8 a 10 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">Exercício 3: Rosca Direta com Halteres (rosca bíceps com halteres)<br> 4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">Exercício 4: Tríceps com Corda na Polia (Tríceps Pushdown)<br>4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br></div>
<h3>Nota: Utilize pesos leves a moderados, concentre-se na técnica adequada e evite sobrecarregar os músculos e músculos. Se você é um jovem, certifique-se de ter uma técnica adequada. A forma correta é crucial para evitar lesões.</h3>
<h3>Resfriamento:
5-10 minutos de alongamento suave para os membros superiores.</h3>`,


`<h1>Treino de Membros Superiores para Mulheres Jovens Adultos</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<div class="exer">
Aquecimento:
5-10 minutos de aquecimento cardiovascular leve, como corrida no local ou pular corda.</div>
<div class="exer">*Exercício 1: Supino com Halteres*<br>4 séries de 8-10 repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">*Exercício 2: Pull-Ups ou Lat Pulldown*<br>4 séries de 8-10 repetições<br> Descanso: 1,5 minutos<br></div>
<div class="exer">Exercício 3: Desenvolvimento com Halteres<br>4 séries de 8 a 10 repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercício 4: Rosca Direta com Halteres (Dumbbell Bicep Curl)<br>4 séries de 10-12 repetições<br>Descanso: 1,5 minutos<br></div>
<h3>Nota: Use pesos que desafiem seus músculos, mas ainda permitam a execução correta</h3>
<h3>Resfriamento:
5-10 minutos de alongamento suave para os membros superiores.</h3>`,

`<h1>Treino de Membros Superiores para Mulheres Adultas</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2><div class="exer">Aquecimento:5-10 minutos de aquecimento cardiovascular leve, como corrida no local ou pular corda.</div><div class="exer">Exercício 1: Supino com Barra (Supino)<br>4 séries de 8 a 10 repetições<br>Descanso: 1 minuto e meio<br></div><div class="exer">Exercício 2: Pulldown Lat<br>4 séries de 8 a 10 repetições<br>Descanso: 1 minuto e meio<br></div><div class="exer">Exercício 3: Desenvolvimento com Halteres (Surpresa de Ombro com Halteres)<br>4 séries de 8 a 10 repetições<br>Descanso: 1 minuto e meio<br></div><div class="exer">Exercício 4: Rosca Direta com Halteres (Dumbbell Bicep Curl)<br>4 séries de 10-12 repetições<br>Descanso: 1 minuto e meio<br></div>
<h3>Nota: Use pesos que desafiem seus músculos, mas ainda permitam a execução correta</h3>
<h3>Resfriamento:5-10 minutos de alongamento suave para os membros superiores.</h3>`,


`<h1>Treino de Membros Superiores para Mulheres Adultas e Idosas</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<h3><strong>É importante</strong> lembrar que a segurança é fundamental ao criar um programa de treinamento Para um idoso de 50 a 70 anos, é importante enfatizar a segurança, a estabilidade e a mobilidade ao criar um programa de treinamento de membros inferiores. O foco deve ser em exercícios que ajudem a manter a força das pernas e a funcionalidade. Consulte sempre um profissional de saúde ou fisioterapeuta antes de iniciar um programa de exercícios, especialmente se você tiver alguma condição médica pré-existente. Aqui está um exemplo de um treino de membros inferiores para idosos:</h3>
<div class="exer">Aquecimento:<br>5-10 minutos de aquecimento cardiovascular leve, como corrida no local ou pular corda.<br></div>
<div class="exer">Exercicio 1: Flexões de parede<br>4 Séries de 10-12 Repetições<br>Descanso: 1 minuto e meio<br></div><div class="exer">Exercicio 2: Elevação lateral com halteres leves<br>4 Séries 12-15 Repetições<br>Descanso: 1,5 minutos<br></div><div class="exer">Exercicio 3:Rosca direta com halteres leves<br>4 Séries 10-12 Repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 4: Tríceps no banco (utilizando um banco ou uma cadeira resistente)<br>4 Séries 12-15 Repetições <br>Descanso: 1,5 minutos<br></div>
<h3>Nota: Lembre-se de que é importante adaptar o peso e o número de repetições de acordo com a capacidade individual de cada pessoa. Certifique-se de que a execução dos exercícios seja segura, com boa forma e sem causar dor. Antes de iniciar qualquer programa de exercícios, é aconselhável consultar um profissional de saúde ou um treinador pessoal para garantir que o treino seja adequado para a pessoa em questão.</h3>`
]

const TreinoFemInf = [`
<h1>Treino de Membros Inferiores para Adolescentes</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<div class="exer">
Aquecimento:<br>
5-10 minutos de aquecimento cardiovascular leve, como corrida no local ou pular corda.</div>
<div class="exer">Exercicio 1: Agachamento livre<br>4 Séries 10-12 Repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 2: Avanço<br>4 Séries 12-15 Repetições (por perna)<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 3: Prensa de pernas (se disponível em uma academia ou centro de treinamento)<br>4 Séries 10-12 Repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 4: Elevação de panturrilha em máquina (ou panturrilha em pé com halteres)<br>4 Séries 12-15 Repetições<br>Descanso: 1,5 minutos<br></div>
<h3>Nota: Lembre-se de que é fundamental usar técnicas de segurança ao realizar exercícios com pesos e máquinas, especialmente para adolescentes. Utilize pesos adequados ao nível de condicionamento físico de cada indivíduo e supervisione o treino de perto, especialmente se estiver trabalhando com adolescentes. Antes de iniciar qualquer programa de exercícios, é aconselhável consultar um profissional de saúde ou um treinador pessoal para garantir que o treino seja apropriado.</h3>`, 

`<h1>Treino de Membros Inferiores para Jovens Adultas</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<div class="exer">Aquecimento:<br>5-10 minutos de aquecimento cardiovascular leve, como corrida no local ou pular corda.
</div>
<div class="exer">Exercicio 1: Agachamento livre<br>4 Séries 10-12 Repetições<br>Descanso: 1,5 minutos<br>
</div>
<div class="exer">Exercicio 2: Afundo (alternando pernas)<br>4 Séries 12-15 Repetições (por perna)<br>Descanso: 1,5 minutos<br>
</div>
<div class="exer">Exercicio 3: Leg press (se disponível em uma academia ou centro de treinamento)<br>4 Séries 10-12 Repetições<br>Descanso: 1,5 minutos<br>
</div>
<div class="exer">Exercicio 4: Elevação de panturrilha em máquina (ou panturrilha em pé com halteres)<br>4 Séries 12-15 Repetições<br>Descanso: 1,5 minutos<br>
</div>
<h3>Nota: Lembre-se de que é essencial adaptar o peso e o número de repetições com base no nível de condicionamento físico pessoal. Certifique-se de realizar os exercícios com a técnica adequada para evitar lesões. É sempre aconselhável consultar um profissional de saúde ou um treinador pessoal antes de iniciar qualquer programa de exercícios, especialmente se você for iniciante ou estiver fazendo mudanças significativas na sua rotina de treinamento.
</h3>` ,

`<h1>Treino de Membros Inferiores para Mulheres Adultas</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<div class="exer">Aquecimento:<br>5-10 minutos de aquecimento cardiovascular leve, como corrida no local ou pular corda.</div>
<div class="exer">Exercicio 1: Agachamento livre<br>4 Séries 8-10 Repetições <br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 2: Leg press (se disponível em uma academia ou centro de treinamento)<br>4 Séries 10-12 Repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 3: Afundo (alternando pernas)<br>4 Séries 10-12 Repetições (por perna)<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 4: Elevação de panturrilha em máquina (ou panturrilha em pé com halteres)<br>4 Séries 12-15 Repetições<br>Descanso: 1,5 minutos<br>
</div>
<h3>Nota: Lembre-se de que é importante adaptar o peso e o número de repetições de acordo com o nível de condicionamento físico pessoal. Garanta uma boa técnica e evite sobrecarregar as articulações. Consultar um profissional de saúde ou um treinador pessoal antes de iniciar qualquer programa de exercícios é uma prática recomendada, especialmente se você não tem experiência prévia com treinamento de força ou se tem alguma condição médica.</h3>`,

`<h1>Treino de Membros Inferiores para Mulheres Adultas e Idosas</h1>
<h2>Olá, <strong>${nome}</strong>! Preparamos um treino personalizado para você, que pode ser usado em nossa academia.Duvidas Consultar Professor</h2>
<h3><strong>É importante</strong> lembrar que a segurança é fundamental ao criar um programa de treinamento Para um idoso de 50 a 70 anos, é importante enfatizar a segurança, a estabilidade e a mobilidade ao criar um programa de treinamento de membros inferiores. O foco deve ser em exercícios que ajudem a manter a força das pernas e a funcionalidade. Consulte sempre um profissional de saúde ou fisioterapeuta antes de iniciar um programa de exercícios, especialmente se você tiver alguma condição médica pré-existente. Aqui está um exemplo de um treino de membros inferiores para idosos:</h3>
<div class="exer">Aquecimento:<br>5-10 minutos de aquecimento cardiovascular leve, como corrida no local ou pular corda.</div>
<div class="exer">Exercicio 1: Agachamento na cadeira (usando uma cadeira resistente)<br>4 Séries 10-12 Repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 2: Extensão de quadril (com ou sem elásticos de resistência)<br>4 Séries 12-15 Repetições<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 3: Passada lateral (alternando as pernas)<br>4 Séries 10-12 Repetições (por perna)<br>Descanso: 1,5 minutos<br></div>
<div class="exer">Exercicio 4: Elevação de panturrilha em pé (usando o peso corporal ou uma parede para apoio)<br>4 Séries 12-15 Repetições<br>Descanso: 1,5 minutos<br>
</div>
<h3>Nota: Certifique-se de escolher pesos e intensidades que sejam seguros e confortáveis, levando em consideração o nível de condicionamento pessoal. A execução correta dos exercícios é fundamental, evitando qualquer tipo de desconforto ou dor. Se você tiver alguma condição médica, é aconselhável consultar um profissional de saúde antes de iniciar um programa de exercícios.</h3>`
]

    if(filtro.sexo == 'Fem' && filtro.treino == 'Sup' && idade === 'adolescente') return TreinoFemSup[0]
    if(filtro.sexo == 'Fem' && filtro.treino == 'Sup' && idade === 'jovem') return TreinoFemSup[1]
    if(filtro.sexo == 'Fem' && filtro.treino == 'Sup' && idade === 'adulto') return TreinoFemSup[2]
    if(filtro.sexo == 'Fem' && filtro.treino == 'Sup' && idade === 'idoso') return TreinoFemSup[3]

    ///////////////////////////////////////////////////////////////////

    if(filtro.sexo == 'Fem' && filtro.treino == 'Inf' && idade === 'adolescente') return TreinoFemInf[0]
    if(filtro.sexo == 'Fem' && filtro.treino == 'Inf' && idade === 'jovem') return TreinoFemInf[1]
    if(filtro.sexo == 'Fem' && filtro.treino == 'Inf' && idade === 'adulto') return TreinoFemInf[2]
    if(filtro.sexo == 'Fem' && filtro.treino == 'Inf' && idade === 'idoso') return TreinoFemInf[3]
}