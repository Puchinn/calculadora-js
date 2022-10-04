const btnNumeros = document.querySelectorAll(".numero");
const btnOperador = document.querySelectorAll(".operador");
const resActual = document.querySelector(".valor_actual");
const resFinal = document.querySelector(".valor_final");
const operadorhtml = document.querySelector(".operadorhtml");
const btnBorrar = document.getElementById("borrar");
const btnC = document.querySelector(".col-2");

class Calculadora {
    suma(num,num1){
        return num + num1
    }
    resta(num,num1){
        return num - num1
    }
    multiplicacion(num,num1){
        return num * num1
    }
    divicion(num,num1){
        return num / num1
    }
};

class Display {
    constructor(displayValorFinal,displayValorActual){
        this.displayValorFinal = displayValorFinal;
        this.displayValorActual = displayValorActual;
        this.calculadora = new Calculadora();
        this.valorActual = "";
        this.valorFinal = "";
        this.tipoOperacion = undefined;
    };
    imprimirValores(){
        this.displayValorActual.innerHTML = this.valorActual;
        this.displayValorFinal.innerHTML = this.valorFinal;
    };
    agregarNumero(num){
        if(num === "." && this.valorActual.includes(".")) return
        this.valorActual = this.valorActual.toString() + num.toString();
        this.imprimirValores();
    };
    borrar(){
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    };
    borrarTodo(){
        this.valorActual = "";
        this.valorFinal = "";
        this.tipoOperacion = undefined;
        this.imprimirValores();
        operadorhtml.innerHTML = "";
    };
    computar(tipo){
        this.tipoOperacion !== "igual" && this.calcular();
        this.tipoOperacion = tipo;
        this.valorFinal = this.valorActual || this.valorFinal;
        this.valorActual = "";
        this.imprimirValores();
    }
    calcular(){
        const valorActual = this.valorActual = parseFloat(this.valorActual);
        const valorFinal = this.valorFinal = parseFloat(this.valorFinal);

        if(isNaN(valorActual)|| isNaN(valorFinal))return
        this.valorActual = this.calculadora[this.tipoOperacion](valorFinal,valorActual);
    }
};

const display = new Display(resFinal,resActual);

btnBorrar.addEventListener("click",()=>{
    display.borrar();
});

btnC.addEventListener("click",()=>{
    display.borrarTodo();
})

btnNumeros.forEach(btn =>{
    btn.addEventListener("click",()=>{
        display.agregarNumero(btn.innerHTML);
    });
});

btnOperador.forEach(btn => {
    btn.addEventListener("click",()=>{
        display.computar(btn.value);
        operadorhtml.innerHTML = btn.innerHTML;
    });
})

window.addEventListener("keydown",(event)=>{
    btnNumeros.forEach(btn=>{
        if(event.key === btn.innerHTML){
            display.agregarNumero(btn.innerHTML);
        }
    });
    btnOperador.forEach(btn =>{
        if(event.key === btn.innerHTML){
            display.computar(btn.value);
            operadorhtml.innerHTML = btn.innerHTML;
        }
    })
    if(event.key === "c"){
        display.borrarTodo();
    };
    if(event.key === "Enter"){
        display.computar("igual");
    }
    if(event.key === "Backspace"){
        display.borrar();
    }
});
