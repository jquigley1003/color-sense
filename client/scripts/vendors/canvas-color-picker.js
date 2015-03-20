/*!
* Raving Roo - HTML5 Canvas Color Picker (HCCP) v1.0
* Copyright 2014 by David K. Sutton
* http://ravingroo.com
*
* With the help of:
* Rodrigo Siqueira - http://js.do/blog/canvas-color-picker/
* Tony Down - http://stackoverflow.com/a/5624139
*
* You are free to use this script on your website.
* While not required, it would be much appreciated if you could link back to http://ravingroo.com
*
* Requires jQuery 1.7 for .on() event handler (http://api.jquery.com/on/).
* You can substitute .bind() in place of .on() for legacy jQuery support.
*/

// set initial variables and grab image

var img = new Image();
img.src = 'images/color-picker.png';
var canvas = document.getElementById('hccp-FindCanvasColor');
var context = canvas.getContext('2d');

// draw image onto HTML5 canvas
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img,0,0);
};

// convert individual RGB components
function unitConversion(unit) {
  var hexconv = unit.toString(16);
  return hexconv.length == 1 ? '0' + hexconv : hexconv;
}

// convert RGB to Hex
function RGBtoHex(r, g, b) {
  return "#" + unitConversion(r) + unitConversion(g) + unitConversion(b);
}

// find pixel color value on jQuery mousemove or click event
// use document.getElementById to return values to user and change CSS
$('#hccp-FindCanvasColor').on('mousemove click', function(event){
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;
  var img_data = context.getImageData(x, y, 1, 1).data;
  var R = img_data[0];
  var G = img_data[1];
  var B = img_data[2];
  var rgb = 'rgb('+R+','+G+','+B+')';
  var hex = RGBtoHex(R,G,B);
  if(event.type=='mousemove') {
    document.getElementById('hccp-hoverColorFont').style.color = hex;
    document.getElementById('hccp-hoverColorBackground').style.backgroundColor = hex;
    document.getElementById('hccp-hoverColorRGB').value = rgb;
    document.getElementById('hccp-hoverColorHEX').value = hex;
  } 
  else if(event.type=='click') {
    document.getElementById('hccp-clickColorFont').style.color = hex;
    document.getElementById('hccp-clickColorBackground').style.backgroundColor = hex;
    document.getElementById('hccp-clickColorRGB').value = rgb;
    document.getElementById('hccp-clickColorHEX').value = hex;
  }
});