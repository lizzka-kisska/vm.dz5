let fs = require('fs');
var readlineSync = require('readline-sync');
let arg = process.argv;
let ram = new Array();
let progText = fs.readFileSync(arg[2]).toString();

ram = progText.split(/\s+/); 
let i=0, dif;

function goto(name){
	let t=0;
	while(ram[t]!=name)
		t++;
	return t;
}
function goUp(name,n){
	let t=n+1;
	while(ram[t]!=name)
		t++;
	return t-1;
}
while (ram[i]!='stop'){
    switch (ram[i]){
        case 'input':
            ram[Number(ram[i+1])]=readlineSync.question();
            i += 2;
            break
        case 'plus':
            ram[Number(ram[i+3])]=Number(ram[Number(ram[i+1])]) + Number(ram[Number(ram[i+2])]);
            i += 4;
            break
        case 'minus':
            ram[Number(ram[i+3])]=Number(ram[Number(ram[i+1])]) - Number(ram[Number(ram[i+2])]);
            i += 4;
            break
        case 'multiply':
            ram[Number(ram[i+3])]=Number(ram[Number(ram[i+1])]) * Number(ram[Number(ram[i+2])]);
            i += 4;
            break
        case 'divide':
            ram[Number(ram[i+3])]=Number(ram[Number(ram[i+1])]) / Number(ram[Number(ram[i+2])]);
            i += 4;
            break
        case 'output':
            console.log(ram[Number(ram[i+1])]);
            i += 2;
            break
        case 'compare':
            if (ram[Number(ram[i+1])]-ram[Number(ram[i+2])]<0){
                dif=-1;
            }
            else if (ram[Number(ram[i+1])]-ram[Number(ram[i+2])]>0){
                dif=1;
            }
            else {
                dif=0;
            }
            i += 3;
            break
        case 'jmpeq':
            if (dif==0) 
                i = Number(goUp(ram[i + 1], i + 1));
            else
                i += 2;
            break
        case 'jmplo':
            if (dif==-1)
                i = Number(goUp(ram[i + 1], i + 1));
		    else
			    i += 2;
            break
        case 'jmpmo':
            if (dif==1)
                i = Number(goUp(ram[i + 1], i + 1));
            else
                i += 2;
            break
        case 'go':
            i = Number(goto(ram[i+1]));
            break
        case 'point':
            i += 2;
            break
        case 'new':
            ram[Number(ram[i+1])]=ram[i+2];
            i += 3;
            break
        
    }
}

