chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.scripting.executeScript({
		target: {tabId: tabs[0].id},
		files: ["inject.js"],
	});
});

let color = "#ff7f50";
let oldColor = "#ff7f50";
const color_picker = document.getElementById("color-picker");
const getColor = () => {
	chrome.storage.sync.get(["color"], (result) => {
		oldColor = color;
		color = result.color;
		if(result.color == undefined) {
			color = "#ff7f50"
		}
		color_picker.value = color;
	})
}
getColor();

const changeMarkerStyle = () => {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.scripting.executeScript({
			target: {tabId: tabs[0].id},
			args: [oldColor, color],
			func: (oldColor, color) =>  {
				changeMarkerStyle(oldColor, color);
			},
		});

	});
}

document.getElementById("color-button").addEventListener("click", () => {
	chrome.storage.sync.set({color: color_picker.value}, () => {
		console.log(color_picker.value);
		getColor();
	})
})

document.getElementById("scaleButton").onclick = function () {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.scripting.executeScript({
			target: {tabId: tabs[0].id},
			func: () =>  {resizeDialog();},
		});
	});
};

document.getElementById("marker-type-switch").onclick = function() {
	changeMarkerStyle();
}