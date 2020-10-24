const actionButton = document.getElementById("convert");
var binElement = $(".bincode");
actionButton.addEventListener("click", convertFromFile);
var errorElement = $(".error-feedback");
const registers = {
    "$zero": 0,
    "$at": 1,
    "$v0": 2,
    "$v1": 3,
    "$a0": 4,
    "$a1": 5,
    "$a2": 6,
    "$a3": 7,
    "$t0": 8,
    "$t1": 9,
    "$t2": 10,
    "$t3": 11,
    "$t4": 12,
    "$t5": 13,
    "$t6": 14,
    "$t7": 15,
    "$s0": 16,
    "$s1": 17,
    "$s2": 18,
    "$s3": 19,
    "$s4": 20,
    "$s5": 21,
    "$s6": 22,
    "$s7": 23,
    "$t8": 24,
    "$t9": 25,
    "$k0": 26,
    "$k1": 27,
    "$gp": 28,
    "$sp": 29,
    "$fp": 30,
    "$ra": 31
};

function argLengthError(instructionName, received, expects, line) { 
    errorMessage.register("Numero de argumentos incorretos para a instrução "+instructionName+" esperando: "+ expects+" recebidos: "+received, line);
}

function getFunctionName(){
    return getFunctionName.caller.name;
}

const instructions = {
    ADD: function(params, instructionAddress){
        params.shift();
    
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 2 },
            { "reg": 3 },
        ], [[1,0], [6,32]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    SUB: function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 2 },
            { "reg": 3 },
        ], [[1,0],[6, 34]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    ADDI : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
            { "number": [4,5,6] },
        ], [[1,8]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);

    },
    ADDU : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 2 },
            { "reg": 3 },
        ], [[1,0],[6, 33]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);

    },
    SUBU: function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }
        
        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 2 },
            { "reg": 3 },
        ], [[1,0],[6, 35]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    ADDIU : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
            { "number": [4,5,6]},
        ], [[1,9]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    MFC0 : function(params, instructionAddress){
        params.shift();
        var paramCount = 2
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }
    },
    MULT : function(params, instructionAddress){
        params.shift();
        var paramCount = 2
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
        ], [[1,0],[6,24]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);


        
    },
    MULTU : function(params, instructionAddress){
        params.shift();
        var paramCount = 2
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
        ], [[1,0],[6,25]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);

    },
    DIV : function(params, instructionAddress){
        params.shift();
        var paramCount = 2
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
        ], [[1,0],[6,26]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);


    },
    DIVU : function(params, instructionAddress){
        params.shift();
        var paramCount = 2
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
        ], [[1,0], [6,27]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);



    },
    MFHI : function(params, instructionAddress){
        params.shift();
        var paramCount = 1
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
        ], [[1,0], [6,16]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);



    },
    MFLO : function(params, instructionAddress){
        params.shift();
        var paramCount = 1
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
        ], [[1,0], [6,18]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);


    },
    AND : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 2 },
            { "reg": 3 },
        ], [[1,0], [6,36]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);


    },
    OR : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 2 },
            { "reg": 3 },
        ], [[1,0], [6,37]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    ANDI : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
            { "number": [4,5,6] },
        ], [[1,12]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    ORI : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
            { "number": [4,5,6] },
        ], [[1,13]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    SLL : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 3 },
            { "number": [5] },
        ], [[1,0],[6,0]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    SRL : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 3 },
            { "number": [5] },
        ], [[1,0],[6,2]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    LW : function(params, instructionAddress){
        params.shift();
        var paramCount = 2
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "mem" : true },
        ], [[1,35]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    SW : function(params, instructionAddress){
        params.shift();
        var paramCount = 2
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "mem" : true },
        ], [[1,43]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    LUI: function(params, instructionAddress){
        params.shift();
        var paramCount = 2
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "number": [4,5,6] },
        ], [[1,15]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    BEQ : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
            { "number": [4,5,6] },
        ], [[1,4]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    BNE : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
            { "number": [4,5,6] },
        ], [[1,5]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    SLT : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 2 },
            { "reg": 3 },
        ], [[1,0], [6,42]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    SLTI : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
            { "number": [4,5,6] },
        ], [[1,10]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    SLTU : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 4 },
            { "reg": 2 },
            { "reg": 3 },
        ], [[1,0],[6,43]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    SLTIU : function(params, instructionAddress){
        params.shift();
        var paramCount = 3
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "reg": 3 },
            { "reg": 2 },
            { "number": [4,5,6] },
        ], [[1,11]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    },
    J: function(params, instructionAddress){
        params.shift();
        var paramCount = 1
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "number": [2,3,4,5,6] },
        ], [[1,2]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    }, 
    JR: function(params, instructionAddress){
        params.shift();
        var paramCount = 1
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        if (params[0] != "$ra"){
            jrError(instructionAddress/4);
            return;
        } 

        var binarySingleInstruction = applyPattern(params,[
        ], [[1,0],[2,31],[6,8]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    }, 
    JAL: function(params, instructionAddress){
        params.shift();
        var paramCount = 1
        if (params.length != paramCount){
            argLengthError(getFunctionName(), params.length, paramCount, instructionAddress/4);
            return;
        }

        var binarySingleInstruction = applyPattern(params,[
            { "number": [2,3,4,5,6] }
        ], [[1,3]], instructionAddress/4 );

        if(binarySingleInstruction === undefined)
            return;

        binaryInstructions.push([binarySingleInstruction]);
    }
};



var mipsInstructions = [[]];
var stopProcess = false;
var binaryInstructions = [];
function convertFromText(){

}

function convertFromFile(){
    readFileAsync((fileText) => {
        convertInstructions(fileText);
    });
}



function convertInstructions(instructionText){
    binaryInstructions = [];
    errorElement.empty();
    binElement.empty();
    stopProcess = false;
    errorMessage.message = "";
    var currentAddress = 4;
    mipsInstructions = textToMipsInstructions(instructionText);


    if(!mipsInstructions.length){
        errorMessage.register("Não existem instruções a serem convertidas.", 0);
        return;
    }

    /* Processa linha por linha de instrução */
    for(var index = 0; index < mipsInstructions.length; index++){
        var single = mipsInstructions[index];

        if(!Array.isArray(single) || !single.length)
            errorMessage.register("Instrução Inválida: "+single.toString(), currentAddress/4);
        
            
        /* Instrução MIPS */
        if (instructions[single[0]] != undefined){
            instructions[single[0]](single, currentAddress);
            if (binaryInstructions[index])
                binaryInstructions[index].push(currentAddress);
        }
        /* Possível Label */
        else if(isLabel(single[0]))
            binaryInstructions.push([single[0], currentAddress]);
        else{
            if(instructions[single[0].toUpperCase()] != undefined)
                errorMessage.register("Erro de Reconhecimento da Instrução, você quis dizer "+single[0].toUpperCase()+"?", currentAddress/4);
            else
                errorMessage.register("Erro de Reconhecimento da Instrução ("+single[0].toString()+"), você quis dizer uma label (utilize \":\")?", currentAddress/4);
        }
            

        if (stopProcess)
            break;
        
        
        currentAddress += 4;
    }
    console.log(errorMessage.message);

    if(!errorMessage.message.length){
        binaryInstructions.forEach((item) => {
            binElement.append('<div class="bin-item"><div class="bin-single-code">'+item[0]+'</div><span>['+item[1]+']</span></div>');
        });
        console.log(binaryInstructions);
    }
    else{
        
        errorElement.empty().append('<div class="alert alert-danger d-block mx-auto">'+errorMessage.message+'</div>');
    }
}




