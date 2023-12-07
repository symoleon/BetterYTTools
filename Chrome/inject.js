resizeDialog = () => {
	if(typeof(dialogs) == undefined) {
		let dialogs;
	}
	dialogs = document.getElementsByClassName("ytcp-dialog");
	for(let i = 0; i < dialogs.length; i++) {
		if(dialogs[i].tagName == "TP-YT-PAPER-DIALOG") {
			dialogs[i].style.maxWidth = "none";
			dialogs[i].style.left = "unset";
			dialogs[i].style.top = "unset";
			dialogs[i].style.maxHeight = "none";
			dialogs[i].style.height = "100%";
			dialogs[i].style.margin = 0;
		}
	}
	if(typeof(styles) == undefined) {
		let styles;
	}
	styles = document.getElementsByTagName("style");
	for(let i = 0; i < styles.length; i++) {
		if(styles[i].getAttribute("scope") == "ytve-editor") {
			let string = styles[i].innerHTML.replace("flex-basis:var(--ytve-panel-width, 50%)", "flex-basis:var(--ytve-panel-width, 42%)");
			styles[i].innerHTML = string;
		}
	}
	if(typeof(labels) == undefined) {
		let labels;
	}
	labels = document.getElementsByClassName("ytve-captions-editor-preview-cta");
	for(let i = 0; i < labels.length; i++) {
		labels[i].style.padding = "initial";
	}
}

changeMarkerStyle = async (oldColor, color) => {
	const head = document.head;
	const styleNode = document.querySelector(".BetterYTTools") ?? document.createElement("style");
	if (!styleNode.classList.contains("BetterYTTools")) {
		styleNode.classList.add("BetterYTTools");
	}
	styleNode.textContent = `
		#touch-area.ytve-captions-marker {
			width: 10px;
		}
	 	ytve-captions-marker[marker-type="captions-left"] #touch-area.ytve-captions-marker, ytve-captions-marker[marker-type="captions-right"] #touch-area.ytve-captions-marker {
			background-color: ${color};
		}
		ytve-captions-marker[marker-type="captions-right"] #touch-area.ytve-captions-marker {
			left: -11px;
		}
	`;
	if (head.contains(styleNode)) {
		head.removeChild(styleNode);
	} else {
		head.appendChild(styleNode);
	}
}