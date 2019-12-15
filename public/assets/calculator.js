/*
TODO:
    Limit number input
    Disallow . from being entered multiple times
    Clean up structure
*/

window.onload = function(){
    "use strict";
  
    // Shortcut to get elements
    var el = function(element) {
      if (element.charAt(0) === "#") { // If passed an ID...
        return document.querySelector(element); // ... returns single element
      }
  
      return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };
  
    // Variables
    var viewer = el("#viewer"), // Calculator screen where result is displayed
      equals = el("#equals"), // Equal button
      nums = el(".num"), // List of numbers
      ops = el(".ops"), // List of operators
      theNum = "", // Current number
      oldNum = document.getElementById("player1").textContent, // First number
      resultNum, // Result
      operator; // Batman
      var player1 = el("#player1");
  
    // When: Number is clicked. Get the current number selected
    var setNum = function() {
      if (resultNum) { // If a result was displayed, reset number
        theNum = this.getAttribute("data-num");
        resultNum = "";
      } else { // Otherwise, add digit to previous number (this is a string!)
        theNum += this.getAttribute("data-num");
      }
      console.log(oldNum);
      viewer.innerHTML = theNum; // Display current number
  
    };
  
    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function() {
      operator = this.getAttribute("data-ops");
  
      // equals.setAttribute("data-result", ""); // Reset result in attr
      displayNum();
    };
  
    // When: Equals is clicked. Calculate result
    var displayNum = function() {
  
      // Convert string input to numbers
      oldNum = parseFloat(oldNum);
      theNum = parseFloat(theNum);
     
    
  
      // Perform operation
      switch (operator) {
        case "plus":
          resultNum = oldNum + theNum;
          break;
  
        case "minus":
          resultNum = oldNum - theNum;
          break;
  
        case "times":
          resultNum = oldNum * theNum;
          break;
  
        case "divided by":
          resultNum = oldNum / theNum;
          break;
  
          // If equal is pressed without an operator, keep number and continue
        default:
          resultNum = theNum;
      }
      console.log(resultNum)
  
      // If NaN or Infinity returned
      if (!isFinite(resultNum)) {
        if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
          resultNum = "You broke it!";
        } else { // If result is infinity, set off by dividing by zero
          resultNum = "Look at what you've done";
          el('#calculator').classList.add("broken"); // Break calculator
          el('#reset').classList.add("show"); // And show reset button
        }
      }
  
      // Display result, finally!
      viewer.innerHTML = 0;
      player1.innerHTML = resultNum;
      // equals.setAttribute("data-result", resultNum);
  
      // Now reset oldNum & keep result
      oldNum = resultNum;
      theNum = 0;
  
    };
  
    // When: Clear button is pressed. Clear everything
    var clearAll = function() {
      oldNum = "";
      theNum = "";
      viewer.innerHTML = "0";
      equals.setAttribute("data-result", resultNum);
    };
  
    /* The click events */
  
    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
      nums[i].onclick = setNum;
    }
  
    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
      ops[i].onclick = moveNum;
    }
  
    // Add click event to equal sign
    equals.onclick = displayNum;
  
    // Add click event to clear button
    el("#clear").onclick = clearAll;
  
    // Add click event to reset button
    el("#reset").onclick = function() {
      window.location = window.location;
    };
  
  }();