// Declare two arrays of numbers
var arr = [2, 4, 3];
var arr1 = [3, 4, 5, 6];

/*
 * Function: mapping
 * Description: Processes an array using nested loops.
 *              Prints the sum of elements from index 0 to i for each i.
 * Parameter: arr - input array
 */
function mapping(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j <= i; j++) {
            console.log(arr[i] + arr[j]); // Print sum of arr[i] and arr[j]
        }
    }
}

/**
 * Higher-order function: map
 * Description: Accepts an array and a callback function.
 *              Calls the callback with the given array.
 * Parameters:
 *   arr - input array
 *   callback - function to process the array
 */
let map = (arr, callback) => {
    return callback(arr);
};

// Call map function with both arrays and mapping callback
console.log("Output for arr:");
map(arr, mapping);

console.log("\nOutput for arr1:");
map(arr1, mapping);