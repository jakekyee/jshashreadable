var s = [
                    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
                    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
                    4, 11, 46, 23, 4, 11, 46, 23, 4, 11, 46, 23, 4, 11, 46, 23,
                    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
                ];
                var K = [
                    "d76aa478", "e8c7b756", "242070db", "c1bdceee",
                    "f57c0faf", "4787c62a", "a8304613", "fd469501",
                    "698098d8", "8b44f7af", "ffff5bb1", "895cd7be",
                    "6b901122", "fd987193", "a679438e", "49b40821",
                    "f61e2562", "c040b340", "265e5a51", "e9b6c7aa",
                    "d62f105d", "02441453", "d8a1e681", "e7d3fbc8",
                    "21e1cde6", "c33707d6", "f4d50d87", "455a14ed",
                    "a9e3e905", "fcefa3f8", "676f02d9", "8d2a4c8a",
                    "fffa3942", "8771f681", "6d9d6122", "fde5380c",
                    "a4beea44", "4bdecfa9", "f6bb4b60", "bebfbc70",
                    "289b7ec6", "eaa127fa", "d4ef3085", "04881d05",
                    "d9d4d039", "e6db99e5", "1fa27cf8", "c4ac5665",
                    "f4292244", "432aff97", "ab9423a7", "fc93a039",
                    "655b59c3", "8f0ccc92", "ffeff47d", "85845dd1",
                    "6fa87e4f", "fe2ce6e0", "a3014314", "4e0811a1",
                    "f7537e82", "bd3af235", "2ad7d2bb", "eb86d391" 
                ];
                
                var m = [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                    1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12,
                    5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2,
                    0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9
                ];
                var i;
                //initialization vectors
                var A1 = "01234567";
                var B1 = "89abcdef";
                var C1 = "fedcba98";
                var D1 = "76543210";
                var A;
                var B;
                var C;
                var D;
            function tests() {
                console.log("fedcba98 - F - " + F("89abcdef", "fedcba98", "76543210"));
                console.log("1c1453be - G - " + G("2c34dfa2", "de1673be", "4b976282"));
                console.log("7699bd52 - H - " + H("d5071367", "c058ade2", "63c603d7"));
                console.log("f46109ba - I - " + I("7d502063", "8b3d715d", "1de3a739"));
                console.log(modAdd("89abcdef", "e984f815"));
            }
            function hash(tobehashed){
                //
                original = tobehashed;
                

                
                var X;
                var Y;
                var blocks = addPadding(convertTxt2Bin(original));
                console.log(blocks);
                console.log(blocks.length);
                for (let i = 0; i < (blocks.length); i++) {
                    var output = "";
                    var finalA = "";
                    var finalB = "";
                    var finalC = "";
                    var finalD = "";
                    //initialize values
                    A = A1;
                    B = B1;
                    C = C1;
                    D = D1;
                    //for each 512 block
                    //split into sixteen 32 bit chunks
                    console.log(blocks[i]);
                    var words = splitSixteen(blocks[i]);
//                    console.log(words);
                    for (let x = 0; x < 64; x++) {
                        operations(A, B, C, D, words, x);
                    }
                    finalA = modAdd(A, A1);
                    finalB = modAdd(B, B1);
                    finalC = modAdd(C, C1);
                    finalD = modAdd(D, D1);
                    output = finalA + finalB + finalC + finalD;
                    console.log(output);
                    
                }               
                
            }
            
            function operations (a, b, c, d, words, iteration) {
                var Y;
                var temp;
                var word = words[m[iteration]];
                if (iteration < 16){
                    temp = F(b, c, d);
                    Y= temp;
                    oneRound(a, b, c, d, Y, word, K[iteration], s[iteration]);
                }
                else if (iteration < 32) {
                    temp = G(b, c, d);
                    Y = temp;
                    oneRound(a, b, c, d, Y, word, K[iteration], s[iteration]);
                }
                else if (iteration < 48) {
                    temp = H(b, c, d);
                    Y = temp;
                    oneRound(a, b, c, d, Y, word, K[iteration], s[iteration]);
                }
                else {
                    temp = I(b, c, d);
                    Y = temp;
                    oneRound(a, b, c, d, Y, word, K[iteration], s[iteration]);
                }
                
            }
            
            function oneRound(a, b, c, d, y, word, kconstant, sconstant) {
                var temp;
                var doubletemp;
                var tripletemp;
                var quadtemp;
                var leftShifted;
                X = a;
                Y = y;
//                console.log("Y" + Y)
                temp = modAdd(X, Y);
                console.log("Step1 - " + temp);
                console.log("word - " + word);
                doubletemp = modAdd(convertInt2Hex(convertBin2Int(word)), temp);
                console.log("Step2 - " + doubletemp);
                tripletemp = modAdd(kconstant, doubletemp);
                console.log("Step3 - " + tripletemp);
                //Now the bit shift
                leftShifted = leftShift(tripletemp, sconstant);
                console.log("leftshifted" + leftShifted);
                quadtemp = modAdd(b, leftShifted);
                console.log("Quad" + quadtemp);
                temp = A;
                A = D;
                temp = D;
                D = C;
                C = B;
                B = quadtemp;
                console.log("A - " + A);
                console.log("B - " + B);
                console.log("C - " + C);
                console.log("D - " + D);
            }
            
            
            
            function convertTxt2Bin(tobebinary) {
                var original = tobebinary;
                var temp;
                var counter = 0;
                var output = "";
                for (let i = 0; i < original.length; i++) {
                    
                    temp = original[i].charCodeAt(0).toString(2);
                    if (temp.length < 8) {
                        temp = "0" + temp;
                    }
                    output = output + temp;
                    counter++;
                    
                    }
                    
                return output;   
                }

            function convertInt2Bin(number){
                //https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
                var temp;
                //Voodoo magic involving shifting stuff
                temp = (number >>> 0).toString(2);
                //affix extra zeroes to the front if needed
//                    if (temp.length < 8) {
//                        for (let j = 8; j > temp.length; j--) {
//                            temp = "0" + temp;
//                        }
//                    }

                    while (temp.length < 32) {
                        temp = "0" + temp;
                    }
                    
            return temp; 
            }
            
            function convertHex2Int(number) {
                var temp;
                temp = parseInt(number, 16);
                return temp;
            }
             
           function convertInt2Hex(number) {
                var temp;
                temp = number.toString(16);
                return temp;
            }
            
            function convertHex2Bin(hex){
                //https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
                var out = "";
                for(var c of hex) {
                    switch(c) {
                    case '0': out += "0000"; break;
                    case '1': out += "0001"; break;
                    case '2': out += "0010"; break;
                    case '3': out += "0011"; break;
                    case '4': out += "0100"; break;
                    case '5': out += "0101"; break;
                    case '6': out += "0110"; break;
                    case '7': out += "0111"; break;
                    case '8': out += "1000"; break;
                    case '9': out += "1001"; break;
                    case 'a': out += "1010"; break;
                    case 'b': out += "1011"; break;
                    case 'c': out += "1100"; break;
                    case 'd': out += "1101"; break;
                    case 'e': out += "1110"; break;
                    case 'f': out += "1111"; break;
                    default: return "";
                    }
                }
            return out;
            }
            
            function convertBin2Int(number) {
                var temp = parseInt(number, 2);
                return temp;
                
            }
            function addPadding(toBePadded) {
                //accepts binary strings
                original = toBePadded;
                modified = "";
                oneAdded = 0;
                final = [];
                
               
                if (original.length < 448) {
                    modified = original;
                    modified = modified + "1";
                    while (modified.length < 448) {
                        modified = modified + "0";
                    }
                    //add 64 bit message lenmgth
                    modified = modified + make64bitthingattheend(original.length);
                    final[0] = modified;
                }
                else {
                    blocksneeded = Math.ceil((original.length-447)/512) + 1;
                    counter = 0;
                    for (i = 0; i < blocksneeded-1; i++) {
                        tempstring = "";
                        for (x = 0; x < 512; x++) {
                            if (counter < original.length) {
                                tempstring = tempstring + original[counter];
                                counter++;
                            }
                            else if (oneAdded === 0) {
                                tempstring = tempstring + "1";
                                oneAdded = 1;
                            }
                            else if (oneAdded === 1) {
                                tempstring = tempstring + "0";
                            }
                            else {
                                //should not ever reach here
                                console.log("Something has gone terribly wrong.");
                            }             
                        }
                        final[i] = tempstring;
                    }
                    
                    //Make the final block
                    tempstring = "";
                    for (i = 0; i < 448; i++) {
                        if (counter < original.length) {
                            tempstring = tempstring + original[counter];
                            counter++;                        
                        }
                        else if (oneAdded === 0) {
                            tempstring = tempstring + "1";
                            oneAdded = 1;
                        
                        }
                        else if (oneAdded === 1) {
                            tempstring = tempstring + "0";
                            
                        }
                        else {
                            //shouldnoteverreachere
                            console.log("Something terrible has happened in AddPadding();");
                        }
                        
                    }
                    tempstring = tempstring + make64bitthingattheend(original.length);
                    final[blocksneeded - 1] = tempstring;
                    

                    
                }
                return final;
            }
            function make64bitthingattheend (number) {
                num = number;
                output = convertInt2Bin(num);
                while (output.length < 64) {
                    output = "0" + output;
                }
                return output;
            }
            
            function splitSixteen(input) {
                //accepts integers I think
                original = input.toString();
//                console.log(original);
                counter = 0;
                
                output = [];
                for (i = 0; i < 16; i++) {
                    tempstring = "";
                    for (let x = 0; x < 32; x++) {
                        tempstring = tempstring + original[counter];
//                        console.log(counter + "||||" + tempstring)
                        counter++;
                    }
                    output[i] = tempstring;
                }
                return output;
                
            }
            
            
            //Convert to int firt
            function F (b, c, d) {
                var B = convertHex2Int(b);
                var C = convertHex2Int(c);
                var D = convertHex2Int(d);
                var temp;
                var result;
                //boolean magic
                temp = orOperator((andOperator(B, C)), (andOperator(notOperator(B), D))); 
                result = convertInt2Hex(temp);
                return result;
                
            }
            
            function G (b, c, d) {
                var B = convertHex2Int(b);
                var C = convertHex2Int(c);
                var D = convertHex2Int(d);
                var result;
                var temp;
                temp = orOperator((andOperator(B,D)), (andOperator(C,notOperator(D))));
                result = convertInt2Hex(temp);
                return result; 
           }
           //convert to int first
           function H (b, c, d) {
               var B = convertHex2Int(b);
               var C = convertHex2Int(c);
               var D = convertHex2Int(d);
               var temp;
               var result;
               //use thebitwise xor stuff
               temp = xorOperator(B,xorOperator(C,D));
               result = convertInt2Hex(temp);
               return result;
           }
           // shhould write some unit tests
           function I (b, c, d) {
               var B = convertHex2Int(b);
               var C = convertHex2Int(c);
               var D = convertHex2Int(d);
               var temp;
               var result;
               temp = xorOperator(C,(orOperator(B, notOperator(D))));
               result = convertInt2Hex(temp);
               return result;
           }
            
            function modAdd(a, b) {
                //Accepts Hexadecimal strings
                //Converttoint so I can understand it
                var temp;
                var output;
                temp = ((convertHex2Int(a) + convertHex2Int(b))%4294967296);
                output = convertInt2Hex(temp);
                return output;
            }
            function leftShift (number, amount) {
                var temp = convertHex2Bin(number);
                var output = "";
                var doubletemp = "";
                var tripletemp = "";
                var section = "";
                
                for (i = 0; i < amount; i++) {
                    section = section + temp[i];
                    }
                
                for (i = amount; i < (temp.length); i++) {
                    doubletemp = doubletemp + temp[i];
                }
                tripletemp = doubletemp + section;
                output = convertInt2Hex(convertBin2Int(tripletemp));
                return output;
            }
            //Bitwise operators for understanding purposes
            function notOperator(number) {
                //recieves an integer and returns an integeer
                var temp = number;
                var binarytemp = convertInt2Bin(temp);
                var output = "";
                var result;
                for (var i = 1; i < 32; i++) {
                    if (binarytemp[i] === '1') {
                        output = output + "0";
                    }
                    else {
                        output = output + "1";
                    }
                }
//                console.log(output);
                
                output = binarytemp[0] + output;
//                console.log(output);
                result = convertBin2Int(output);
                return result;
                
            }
            
            
            
            function andOperator(number1, number2) {
                //recieves an integer and returns an int
                var temp1 = number1;
                var temp2 = number2;
                var binarytemp1 = convertInt2Bin(temp1);
                var binarytemp2 = convertInt2Bin(temp2);
                var output = "";
                var result;
                //32 length
                for (let i = 0; i < 32; i++) {
                    if (binarytemp1[i] === "1" && binarytemp1[i] === binarytemp2[i]) {
                        output = output + "1";
                    }
                    else {
                        output = output + "0";
                    }
                }
                result = convertBin2Int(output);
                return result;
            }
            
            
            function orOperator(number1, number2) {
                //recieves an integer and returns an int
                var temp1 = number1;
                var temp2 = number2;
                var binarytemp1 = convertInt2Bin(temp1);
                var binarytemp2 = convertInt2Bin(temp2);
                var output = "";
                var result;
                //32 length
                for (let i = 0; i < 32; i++) {
                    if (binarytemp1[i] === "1" || binarytemp2[i] === "1") {
                        output = output + "1";
                    }
                    else {
                        output = output + "0";
                    }
                }
                result = convertBin2Int(output);
                return result;
            }
            
            function xorOperator(number1, number2) {
                //recieves an integer and returns an int
                var temp1 = number1;
                var temp2 = number2;
                var binarytemp1 = convertInt2Bin(temp1);
                var binarytemp2 = convertInt2Bin(temp2);
                var output = "";
                var result;
                //32 length
                for (let i = 0; i < 32; i++) {
                    if ((binarytemp1[i] === "1" && binarytemp2[i] === "1") || (binarytemp1[i] === "0" && binarytemp2[i] === "0")) {
                        output = output + "0";
                    }
                    else {
                        output = output + "1";
                    }
                }
                result = convertBin2Int(output);
                return result;
