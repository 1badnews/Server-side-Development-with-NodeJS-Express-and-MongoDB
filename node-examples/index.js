var rect = require('./rectangle');

function solveRect(l,b) {
    console.log("solving for rectangle with l = " + l + "and b= " + b);
    if (l <= 0 || b <= 0)
    console.log("Rectangle dimensions should be greater than 0")
    else {
        console.log("area: " + rect.area(l,b));
        console.log("perimeter: " + rect.perimeter(l,b));
    }

}

solveRect(0,5);
solveRect(3,5);
solveRect(2,4);