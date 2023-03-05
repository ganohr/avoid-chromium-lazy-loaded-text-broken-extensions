if (chrome !== undefined) {
	browser = chrome; // Chromium (Chrome / EDGE)
} else {
	// maybe firefox
}

const icon = document.getElementById("icon");

let href = null;
browser.tabs.query({ active: true, currentWindow: true }, (e) => {
	href = e[0].url;
});

let options = null;
browser.storage.sync.get(null, (opt) => {
	options = {};
	if (opt === null || opt === undefined || opt.urls === null || opt.urls === undefined) {
		options.urls = [];
	} else {
		options.urls = opt.urls;
	}
	if (options.urls === undefined) {
		options.urls = [];
	}
});

function updateIconWithUrl(url) {
	if (options.urls.includes(url)) {
		disableIcon();
	} else {
		enableIcon();
	}
}

function disableIcon() {
	icon.src = 'icons-128-g.png';
	if (!options.urls.includes(href)) {
		options.urls.push(href);
	}
	browser.action.setIcon({ path: "icons-16-g.png" });
}

function enableIcon() {
	icon.src = 'icons-128.png';
	options.urls = options.urls.filter(function (v) {
		return v != href;
	});
	browser.action.setIcon({ path: "icons-16.png" });
}

browser.runtime.onMessage.addListener((message) => {
	href = message.url;
	updateIconWithUrl(href);
});

const checker = setInterval(() => {
	if (href === null || options === null) {
		return;
	}
	clearInterval(checker);
	updateIconWithUrl(href);
	icon.addEventListener('click', () => {
		if (icon.src.includes('icons-128.png')) {
			disableIcon();
		} else {
			enableIcon();
		}
		browser.storage.sync.set(options);
		browser.tabs.reload();
	});
}, 100);
