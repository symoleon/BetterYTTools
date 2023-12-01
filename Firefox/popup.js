browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
	browser.tabs.executeScript(tabs[0].id, {file: "/inject.js"});
})

//old ff7f50

let color = "#dd823c";
let oldColor = "#dd823c";
const color_picker = document.getElementById("color-picker");
const getColor = () => {
	browser.storage.sync.get(["color"]).then(result => {
		oldColor = color;
		color = result.color;
		if(result.color == undefined) {
			color = "#dd823c"
		}
		color_picker.value = color;
		color_picker.style.backgroundColor = color;
		let color_picker_text = '#';
		// color_picker_text += parseInt(color.slice(1, 3));
		// color_picker_text += parseInt(color.slice(3, 4));
		// color_picker_text += parseInt(color.slice(5, 6));
		color_picker_text += parseInt(color.slice(1, 3), 16) > 122 ? '00' : 'ff';
		color_picker_text += parseInt(color.slice(3, 5), 16) > 122 ? '00' : 'ff';
		color_picker_text += parseInt(color.slice(5), 16) > 122 ? '00' : 'ff';
		color_picker.style.color = color_picker_text;
	});
}
getColor();

const changeMarkerStyle = () => {
	browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
		browser.tabs.executeScript(
			tabs[0].id,
			{code: `changeMarkerStyle("${oldColor}", "${color}");`}
		)
	});
}

document.getElementById("color-button").onclick = event => {
	const color = color_picker.value;
	if (color.match(/([a-f]|[0-9]){6}/gi)) {
		browser.storage.sync.set({color}).then(setitem => {
			getColor();
		});
	}
};

document.getElementById("scaleButton").onclick = function () {
	browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
		browser.tabs.executeScript(
			tabs[0].id,
			{code: "resizeDialog();"}
		)
	});
};

document.getElementById("marker-type-switch").onclick = function() {
	changeMarkerStyle();
}