const circularListLength = 256;
const knotRounds = 64;

function knotHashOneIter(lengths, _currentPos, _skipSize, _circularList) { 
    var circularList = _circularList; 
    if(circularList === undefined) { 
        circularList = [];
        for(var i = 0; i < circularListLength; i++) { 
            circularList.push(i);
        }
    }
    
    var skipSize = _skipSize || 0; 
    var currentPos = _currentPos || 0;

    lengths.forEach(length => { 
        // 1 - reverse all elements in the list from currentPos to length (exclusive)
        for(var i = 0; i < Math.floor(length / 2); i++) { 
            // swap currentPos + i and currentPos + length - i -1
            const swap = circularList[(currentPos + i) % circularListLength];
            circularList[(currentPos + i) % circularListLength] = 
                circularList[(currentPos + length - i - 1) % circularListLength];
            circularList[(currentPos + length - i - 1) % circularListLength] = swap;
        }

        // 2 - move currentPos to the length plus skipSize
        currentPos = currentPos + length + skipSize;

        // 3 - increase the skip size 
        skipSize++;
    });

    return [circularList, currentPos, skipSize, circularList];
}

function knotHash(input) { 
    // calculate lengths list by taking ASCII code of characters
    // and converting to an int.  ASCII codes should be < 256
    const lengths = input.split('').map(char => char.charCodeAt(0));

    // add a sequence of special lengths to the lengths list
    [17, 31, 73, 47, 23].forEach(l => lengths.push(l));

    // run 64 rounds of the hash, tracking the currentPos and skiplength 
    // through all of those
    var currentPos; 
    var skip;
    var sparseHash;
    for(var i = 0; i < knotRounds; i++) { 
        const result = knotHashOneIter(lengths, currentPos, skip, sparseHash);
        currentPos = result[1];
        skip = result[2];
        sparseHash = result[3];
    }

    // reduce the sparse hash to a dense hash by taking an XOR over each 
    // 16 digit block of numbers in the sparseHash
    // TODO do we need a const for the 'magic number' 16? 
    var denseHash = [];
    for(var block = 0; block < 16; block++) { 
        var sum = sparseHash[block * 16];
        for(var i = 1; i < 16; i++) { 
            sum = sum ^ sparseHash[(block * 16) + i];
        }
        denseHash.push(sum);
    }

    // lastly, convert to hexadecimal for output 
    const result = denseHash.reduce((soFar, next) => { 
        var thisValue = next.toString(16); 
        if(thisValue.length < 2) { 
            thisValue = '0' + thisValue;
        }
        return soFar + thisValue;
    }, "");

    return result;
}

export { knotHash, knotHashOneIter };