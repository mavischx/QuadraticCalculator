//Calculate quadratic equations
//Draw line graphs
//Save past questions

let myChart;var root1, root2

function $(id){ 
  return document.getElementById(id)
}

function calculateRoots(){

  var a = parseFloat($("a").value)
  var b = parseFloat($("b").value)
  var c = parseFloat($("c").value)
  console.log("a = "+a+",b = "+b+",c = "+c)

  let bString = b.toString()
  let bSign = bString.charAt(0)
  let cString = c.toString()
  let cSign = cString.charAt(0)
  console.log("sign: " + bSign)
  console.log("sign: " + cSign)

  if(isNaN(a) || isNaN(b) || isNaN(c))
  {
    alert("Please enter numerical value")
    //clear textbox
    $("a").value=" "
    $("b").value=" "
    $("c").value=" "
  }
  else if(a == 0)
  {
    alert("'a' shouldn't be 0")
    //clear textbox
    $("a").value=" "
    $("b").value=" "
    $("c").value=" "
  }
  else
  {
    var disc = b * b - 4 * a * c
    console.log("discriminant:"+disc)

  //Calculate the roots 
  if (disc < 0)
  {
    $("result").innerHTML="There are no real roots."
    root1 = root2 =" "
    $("root1").innerHTML = " "
    $("root2").innerHTML = " "
  }
  else if (disc == 0)
  {
    $("result").innerHTML="There are two equal and real roots."
    root1 = root2 = (-b / (2 * a)).toFixed(2)
    $("root1").innerHTML = $("root2").innerHTML = "x = "+root1
  }
  else
  {
    $("result").innerHTML="There are two different and real roots."
    root1=((-b + Math.sqrt(disc)) / (2 * a)).toFixed(2)
    root2=((-b - Math.sqrt(disc)) / (2 * a)).toFixed(2)
    $("root1").innerHTML = "x = "+root1
    $("root2").innerHTML = "x = "+root2
  }

  //Generate the graph base on the equation that is input by user
  const ctx = document.getElementById('graph').getContext('2d');
  var xValues = [];
  var yValues = [];

  for (let x = -100; x <= 100; x += 1) {
    const y = a * x * x + b * x + c;
    xValues.push(x);
    yValues.push(y);
  }

  const data = {
    labels: xValues,
    datasets: [{
      label: 'y = ax^2 +bx +c',
      data: yValues,
      fill: false,
      borderColor: 'blue',
      pointRadius: 0
    }]
  };

  const options = {
    scales: {
    xAxes: [{
      ticks: {
        stepSize: 10,
      }
    }],
    yAxes: [{
      ticks: {
        stepSize: 10,

      }
    }]
    }
  };

  // destroy the previous chart if it exists
  if (myChart) {
    myChart.destroy(); 
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });

  history(bSign,cSign,a,b,c,root1,root2)
  }
    
}

//add questions to history
function history(bSign,cSign,a,b,c,root1,root2)
{
  //if plus/minus, two cases for ques
  if (bSign == "-")
  {
    if(cSign == "-")
    {
      ques = a+"x<sup>2</sup> "+b+" x "+c+" = 0"
    }
    else
    {
      ques = a+"x<sup>2</sup> "+b+" x + "+c+" = 0"
    }
  }
  else
  {
    if(cSign == "-")
    {
      ques = a+"x<sup>2</sup> + "+b+" x "+c+" = 0"
    }
    else
    {
      ques = a+"x<sup>2</sup> + "+b+" x + "+c+" = 0"
    }
  }
  let new_row = document.createElement("tr")
  var parentElement = $("table")
  parentElement.appendChild(new_row)
  
  let new_ques = document.createElement("td")
  new_ques.innerHTML = ques
  let new_root1 = document.createElement("td")
  new_root1.innerHTML = root1
  let new_root2 = document.createElement("td")
  new_root2.innerHTML = root2

  new_row.appendChild(new_ques)
  new_row.appendChild(new_root1)
  new_row.appendChild(new_root2)
}

function reset() 
{
  window.location.reload();
}

window.onload = function(){
  $("calculate").onclick=function(){calculateRoots()}
  $("reset").onclick=function(){reset()}
}