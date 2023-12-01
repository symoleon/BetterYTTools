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
	let styles = document.getElementsByTagName("style");
	for(let i = 0; i < styles.length; i++) {
		if(styles[i].getAttribute("scope") == "ytve-captions-marker") {
			let oString = styles[i].innerHTML;
			oString = oString.replace(/#touch-area.ytve-captions-marker\s*{\s*position:\s*absolute;\s*height:\s*100%;\s*width:\s*10px;\s*}/, "#touch-area.ytve-captions-marker{position:absolute;height:100%;width:2px;}");
			string = oString.replace(/#touch-area.ytve-captions-marker\s*{\s*position:\s*absolute;\s*height:\s*100%;\s*width:\s*2px;\s*}/, "#touch-area.ytve-captions-marker{position:absolute;height:100%;width:10px;}");
			oString = oString.replace(/#touch-area.ytve-captions-marker\s*{\s*position:\s*absolute;\s*left:\s*-11px;\s*}/, "#touch-area.ytve-captions-marker{position:absolute;left:-2px;}");
			string = string.replace(/#touch-area.ytve-captions-marker\s*{\s*position:\s*absolute;\s*left:\s*-2px;\s*}/, "#touch-area.ytve-captions-marker{position:absolute;left:-11px;}");
			let addStyle = ` ytve-captions-marker[marker-type="captions-left"] #touch-area.ytve-captions-marker, ytve-captions-marker[marker-type="captions-right"] #touch-area.ytve-captions-marker{background-color:${color};}`;
			string += addStyle;
			if(oString.search(`background-color:${oldColor};`) == -1 && oString.search(`background-color:${color};`) == -1 ) {
				styles[i].innerHTML = string;
			}else {
				styles[i].innerHTML = oString.slice(0, oString.length - addStyle.length);
			}
		}
	}
}

