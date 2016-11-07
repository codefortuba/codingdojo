var test = require('tape');

var arrayUnidade = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
var dezena = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];

function capitalizeFirstLetter(string) {
    if (string == undefined || !string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function tratarNumero(valor, tipoNumero) {
  var unidadeMonetaria = '';
  var valorPorExtenso = '';
  var real = false;
  var valorEmInteiro = parseInt(valor);
  if (valorEmInteiro > 0){
    var valorDecimalInt = valorEmInteiro;
    var and = ' e ';

    if (tipoNumero == 'real') {
      unidadeMonetaria = tratarUnidadeMonetaria(valorDecimalInt, 'real', 'reais');
      real = true;
    } else {
      unidadeMonetaria = tratarUnidadeMonetaria(valorDecimalInt, 'centavo', 'centavos');
    }

    var unidade = arrayUnidade[valorDecimalInt];

    if (valorDecimalInt <= 19) {
      valorPorExtenso += unidade;
    } else {
      console.log(valorPorExtenso);
      if(real){
        
      valorPorExtenso += and + dezena[valor.charAt(0)];
      }
      if (valor.charAt(1) != '0') {
         valorPorExtenso += and + arrayUnidade[valor.charAt(1)];
      }
    }
    valorPorExtenso += ' ' + unidadeMonetaria;
  }
  return valorPorExtenso;
}

function tratarReais(reais) {
  return tratarNumero(reais, 'real');
}

var tratarUnidadeMonetaria = function(valor, unidadeMonetaria, unidadeMonetariaPlural) {
  return valor > 1 ? unidadeMonetariaPlural : unidadeMonetaria;
}

var retornaReais = function(valor) {
  return valor.split(',')[0];
}
var retornaCentavos = function(valor) {
  return valor.split(',')[1];
}

var converteValorEmExtenso = function(valor) {
  var arrayValores = valor.split(',');

  var valorPorExtenso = '';

  var reais = retornaReais(valor); 
  var centavos = retornaCentavos(valor); 
  var reaisInt = parseInt(reais);
  var centavosInt = parseInt(centavos);

  var real = reaisInt > 1 ? 'reais' : 'real';
  var unidade = arrayUnidade[reais];

  valorPorExtenso = tratarReais(reais)
  if(centavos != '00') {
    valorPorExtenso += tratarNumero(centavos, 'centavo');
  }

  valorPorExtenso = capitalizeFirstLetter(valorPorExtenso);
  
  return valorPorExtenso;  
}

test('testando cheque', function (t) {

  t.equal(converteValorEmExtenso('1,00'), 'Um real', 'Deveria retornar Um real');
  t.equal(converteValorEmExtenso('2,00'), 'Dois reais', 'Deveria retornar Dois reais');
  t.equal(converteValorEmExtenso('3,00'), 'Três reais', 'Deveria retornar Tres reais');
  t.equal(converteValorEmExtenso('3,40'), 'Três reais e quarenta centavos', 'Deveria retornar Tres reais e quarenta centavos');
  t.equal(converteValorEmExtenso('15,00'), 'Quinze reais', 'Deveria retornar Quinze reais');
  t.equal(converteValorEmExtenso('22,00'), 'Vinte e dois reais', 'Deveria retornar Vinte e dois reais');
  t.equal(converteValorEmExtenso('29,03'), 'Vinte e nove reais e três centavos', 'Deveria retornar Vinte e nove reais e três <centavos></centavos>');
  t.equal(converteValorEmExtenso('29,33'), 'Vinte e nove reais e trinta e três centavos', 'Deveria retornar Vinte e nove reais e trinta e três <centavos></centavos>');
  
  t.end();

});