const ValidEmailAddress = function(emailAddress) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  };
  const legeInput = function(fieldValue) {
    return !fieldValue || !fieldValue.length;
  };
const checking =()=> {

    input.addEventListener("change", function() {
    inputVeld = input.value;
	  if (!ValidEmailAddress(inputVeld)) {
		if (legeInput(inputVeld)) {
		  	alert("This field is required");
		} else {
			alert("The emailaddress is wrong");	
		}
	  }
    });
    
	let button=document.querySelector(".js-check")
	button.addEventListener("click", function() {
	  inputVeld = input.value;
	  if (ValidEmailAddress(inputVeld)) {
		  alert("You will be kept informed!");
	  } else {
		if (legeInput(inputVeld)) {
			alert("This field is required");
		} else {
			alert("The emailaddress is wrong");	
		}
		}
	  });
  };
  document.addEventListener('DOMContentLoaded', function() {
    console.info('DOM is ready to roll.. 👌');
    button=document.querySelector(".js-check");
	input=document.querySelector(".js-input");
	checking();
});