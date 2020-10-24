/** @returns String */
function readFileAsync(callback){
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        // file is loaded
        result = reader.result;
        document.getElementById("input").value = "";
        callback(result);
    };
    reader.readAsText(document.getElementById("input").files[0]);
}



function toBinaryWithOverflow(number, maxBits){
    let binary = "";
    var overflow = false;
    if (number < 0) 
    number = number >>> 0;

    while(Math.ceil(number/2) > 0){
        binary = number % 2 + binary;
        number = Math.floor(number/2);
    }

    binary = binary.toString();
    if (binary.length > maxBits){
        binary = binary.substr(maxBits);
        overflow = true;
    }
    while (binary.length < maxBits)
        binary = "0"+binary;
    
    return { result: binary, overflow: overflow };
}

const errorMessage = {
    message: "",
    register: function (msg, line) {
        this.message = "<strong>Erro: </strong>"+msg+" | Linha: "+line;
        stopProcess = true;
    }
}

/** @returns Array( [, Array]) */
function textToMipsInstructions(instructionText){
    var mipsInstructions = [];
    var fileTextSplit = instructionText.split('\n');
    var codeElement = $(".rawcode");
    codeElement.empty();
    fileTextSplit.forEach((line, index) => {
        line = line.trim();

        codeElement.append('<div><span>'+(index+1)+'</span>'+line+'</div>');
        if(!line.length)
            return;
        /* Remove virgulas e segmenta a instrução em um array */
        var singleInstruction = line.replace(/,/g, " ").replace(/ +(?= )/g,'').split(" ");
        
        
        mipsInstructions.push(singleInstruction);
        
    });
  
    return mipsInstructions;
}

/** @returns Bool */
function isLabel(name){
    return name.match(/:$/) !== null;
}
function getFunctionName(){
    return getFunctionName.caller.name;
}


/* =============================== Validation ============================== */
function argLengthError(instructionName, received, expects, line) { 
    errorMessage.register("Numero de argumentos incorretos para a instrução "+instructionName+" esperando: "+ expects+" recebidos: "+received, line);
}
function binarySegmentOverflowError(argumentPosition, value, maxBits, line){
    errorMessage.register("Overflow ocorrido com valor "+value+" do argumeto numero: "+argumentPosition+", número máximo de bits permitidos é de "+maxBits, line);
}
function invalidRegisterError(regName, line){
    errorMessage.register("Registrador inválido: "+regName, line);
}
function notRegisterError(argumentPosition, line){
    errorMessage.register("Argumento "+argumentPosition+ " deve ser um registrador", line);
}
function invalidNumberError(argumentPosition,line){
    errorMessage.register("Argumento "+argumentPosition+ " deve ser um inteiro", line);
}
function invalidMemError(argumentPosition, line){
    errorMessage.register("Argumento "+argumentPosition+ " deve ser um endereço de memória válido ex: 100($reg)", line);
}
function jrError(line) { 
    errorMessage.register("Registrador da Instrução JR deve ser $ra", line);
}
function applyPattern(params, rules, instructionConstant, line){

    var segments = [
        "000000",
        "00000",
        "00000",
        "00000",
        "00000",
        "000000"
    ];

    /* Tipo de Instrução */
    instructionConstant.forEach((constant, index) => {
        var binaryResult = toBinaryWithOverflow(constant[1], segments[constant[0] - 1].length);
        if (binaryResult.overflow){
            binarySegmentOverflowError(index+1, constant[1], segments[constant[0] - 1].length, line);
            return;
        }
        segments[constant[0] - 1] = binaryResult.result;
    });



    /* Parametros */
    for (var index = 0; index < params.length; index++){
        

        /* Parametro Registrador */
        if (rules[index].reg){
            if (!params[index].startsWith("$")){
                notRegisterError(index+1, line);
                return;
            }
            var registerValue = registers[params[index]];
            if (registerValue === undefined){
                invalidRegisterError(params[index], line);
                return;
            }
            segments[rules[index].reg-1] = toBinaryWithOverflow(registerValue, segments[rules[index].reg-1].length).result;
        }

        /* Parametro Valor */
        else if (rules[index].number){
            if (!/^\d+$/.test(params[index])){
                invalidNumberError(index+1,line);
                return;
            }
            var maxBits = 0;
            rules[index].number.forEach((segmentPart) => {
                maxBits += segments[segmentPart-1].length;
            });

            var binaryResult = toBinaryWithOverflow(parseInt(params[index]),maxBits);
            if (binaryResult.overflow){
                binarySegmentOverflowError(index+1, params[index], maxBits, line);
                return;
            }

            var lastLength = 0;
            rules[index].number.forEach((segmentPart) => {
                segments[segmentPart-1] = binaryResult.result.substr(lastLength, segments[segmentPart-1].length)
                lastLength += segments[segmentPart-1].length;
            });
        }

        /* Parametro Memória */

        else if (rules[index].mem){
            var memNumber = params[index].substr(0, params[index].indexOf("("));
            var registerValue = registers[/\(([^)]+)\)/.exec(params[index])[1]];

 
            if (!/^\d+$/.test(memNumber) || registerValue == undefined){
                invalidMemError(index+1,line);
                return;
            }

            segments[1] = toBinaryWithOverflow(registerValue, segments[2].length).result;


            var maxBits = segments[3].length + segments[4].length + segments[5].length;
            var binaryResult = toBinaryWithOverflow(parseInt(memNumber), maxBits)
            if (binaryResult.overflow){
                binarySegmentOverflowError(index+1, memNumber, maxBits, line);
                return;
            }
            
            var lastLength = 0;
            [4,5,6].forEach((segmentPart) => {
                segments[segmentPart-1] = binaryResult.result.substr(lastLength, segments[segmentPart-1].length)
                lastLength += segments[segmentPart-1].length;
            });

        }
    }

    return segments.join(" ");
}