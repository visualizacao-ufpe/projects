// Receives the input from the console and calls the parser
document.addEventListener("keydown", function(event) {
  if (event.which == 13) {
		var input = document.querySelector('input').value;
		parse(input)
	}
})

function isNumber(aux) {
	return !isNaN(parseFloat(aux))
}

function parse(input){

	// Separating before and after " = "
	var funct = input.split(' = ');
	console.log(funct);
	var var_name = funct[0];
	// Removing the parenthesis
	funct = funct[1].split(')');
	funct = funct[0].split('(');
	// Getting the parameters
	var params = funct[1];
	params = params.split(',');
	// Simplifying the function name
	funct = funct[0];

	switch(funct){

		case 'vector':
			if (checkNumberOfParameters(2, params.length)){
			 	if((isNumber(Number(params[0]))) && (isNumber(Number(params[1])))) {
					newvector2d(var_name, Number(params[0]), Number(params[1]))
					insertInMemory(funct, var_name, Number(params[0]), Number(params[1]))
				} else {
					alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser números. Dá um olhada no tutorial! ;)")
				}
			 }
			break;

		case 'point':
			if (checkNumberOfParameters(2, params.length)){
				if((isNumber(Number(params[0]))) && (isNumber(Number(params[1])))) {
					newpoint2d(var_name, Number(params[0]), Number(params[1]))
					insertInMemory(funct, var_name, Number(params[0]), Number(params[1]))
				} else {
					alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser números. Dá um olhada no tutorial! ;)")
				}
			 }
			break;

		case 'line':
			if (params.length == 2){
				var pORb = findobject(params[0]).object;
			    var vORb = findobject(params[1]).object;
			    if ((pORb instanceof Point2d) && (vORb instanceof Vector2d)) {
			        var result = newline2d(var_name, "parametric", {"p":params[0], "v":params[1]})
			     	insertInMemory(funct,"parametric", result, pORb, vORb)
			 	} else if ((isNumber(Number(params[0]))) && (isNumber(Number(params[1])))){
			 	    var result = newline2d(var_name, "cartesian", {"m":Number(params[0]), "b":Number(params[1])})
			     	insertInMemory(funct,"cartesian", result, Number(params[0]), Number(params[1]))
			 	} else {
					alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser ambos números ou um ponto e um vetor. Dá um olhada no tutorial! ;)")
				}
			} else if (checkNumberOfParameters(3, params.length)){
				if ((isNumber(Number(params[0]))) && (isNumber(Number(params[1]))) && (isNumber(Number(params[2])))) {
					var result = newline2d(var_name, "general", {"A":Number(params[0]), "B":Number(params[1]), "C":Number(params[2])})
					insertInMemory(funct, "general", result, Number(params[0]), Number(params[1]), Number(params[2]))
				} else {
					alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser números. Dá um olhada no tutorial! ;)")
				}
			}
			break;

		case 'sum':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Vector2d) && (verifier2 instanceof Vector2d)) {
    				var result = sumvector2d(var_name, params[0], params[1])
    				insertInMemory(funct, result, verifier1, verifier2)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser vetores. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'diff':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Vector2d) && (verifier2 instanceof Vector2d)) {
    				var result = diffvector2d(var_name, params[0], params[1])
    				insertInMemory(funct, result, verifier1, verifier2)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser vetores. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'norm':
			if (checkNumberOfParameters(1, params.length)){
				var verifier1 = findobject(params[0]).object;
				if (verifier1 instanceof Vector2d) {
    			    var num = normvector2d(params[0]);
				    insertInMemory(funct, var_name, verifier1, num)
			    } else {
    			    alert("Oh não, tem algo errado com seus parâmetros, ele deveria ser um vetor. Dá um olhada no tutorial! ;)")
    		    }
    		}
			break;

		case 'dist':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Point2d) && (verifier2 instanceof Point2d)) {
    				var num = distpoint2d(params[0], params[1])
    				insertInMemory(funct, var_name, verifier1, verifier2, num)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser pontos. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'dot':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Vector2d) && (verifier2 instanceof Vector2d)) {
    				var num = dotvector2d(params[0], params[1])
    				insertInMemory(funct, var_name, verifier1, verifier2, num)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser vetores. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'proj':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Vector2d) && (verifier2 instanceof Vector2d)) {
    				var result = projvector2d(var_name, params[0], params[1])
    				insertInMemory(funct, result, verifier1, verifier2)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser vetores. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'cos':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Vector2d) && (verifier2 instanceof Vector2d)) {
    				var num = cosvector2d(params[0], params[1])
    				insertInMemory(funct, verifier1, verifier2, num, var_name)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser vetores. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'angle':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Vector2d) && (verifier2 instanceof Vector2d)) {
    				var num = anglevector2d(params[0], params[1])
    				insertInMemory(funct, verifier1, verifier2, num, var_name)
    			} else if ((verifier1 instanceof Line2d) && (verifier2 instanceof Line2d)) {
    			    var num = angleline2d(params[0], params[1])
    				insertInMemory(funct, verifier1, verifier2, num, var_name)
    			}else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser ambos vetores ou ambos retas. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'mult':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
			    if ((verifier1 instanceof Vector2d) && (isNumber(Number(params[1])))) {
    				var result = multvector2d(var_name, params[0], Number(params[1]))
    				insertInMemory(funct, verifier1, Number(params[1]), result)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, ele deveria conter um vetor e um número. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'div':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
			    if ((verifier1 instanceof Vector2d) && (isNumber(Number(params[1])))) {
    				var result = divvector2d(var_name, params[0], Number(params[1]))
    				insertInMemory(funct, verifier1, Number(params[1]), result)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, ele deveria conter um vetor e um número. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'inter':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Line2d) && (verifier2 instanceof Line2d)) {
    				var poi = intersectionline2d(params[0], params[1])
    				if (typeof(poi) == "undefined"){
    					var rp = positionline2d(params[0], params[1])
    					insertInMemory(funct, var_name, rp, verifier1, verifier2)
    				} else {
    					insertInMemory(funct, var_name, poi, verifier1, verifier2)
    				}
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser retas. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		case 'relpos':
			if (checkNumberOfParameters(2, params.length)){
				var verifier1 = findobject(params[0]).object;
				var verifier2 = findobject(params[1]).object;
			    if ((verifier1 instanceof Line2d) && (verifier2 instanceof Line2d)) {
    				var rp = positionline2d(params[0], params[1])
    				insertInMemory(funct, var_name, rp, verifier1, verifier2)
    			} else {
    			    alert("Oh não, tem algo errado com seus parâmetros, eles deveriam ser retas. Dá um olhada no tutorial! ;)")
    			}
    		}
			break;

		default:
			alert("Oh oh, I don't think that's a real function. Try again and verify what you wrote.")
	}


}

function checkNumberOfParameters(number, received){
	if (number != received){

		switch(number){
			case 1:
				alert("So, we've got the wrong number of parameters here... it is 1. Check the tutorial!")
				break;

			case 2:
				alert("So, we've got the wrong number of parameters here... they're 2. Check the tutorial!")
				break;

			case 3:
				alert("So, we've got the wrong number of parameters here... they're 3. Check the tutorial!")
				break;
		}
		return false
	} else
		return true
}
