if (chrome !== undefined) {
	browser = chrome; // Chromium (Chrome / EDGE)
} else {
	// maybe firefox
}

browser.storage.sync.get(null, (opt) => {
	const options = {};
	if (opt === null || opt === undefined || opt.urls === null || opt.urls === undefined) {
		options.urls = [];
	} else {
		options.urls = opt.urls;
	}
	if (options.urls === undefined) {
		options.urls = [];
	}
	const url = new URL(location.href);
	if (!options.urls.includes(url.origin)) {
		const already_running = document.getElementsByClassName('gaclltb_dummy');
		if (already_running === null || already_running.length === 0) {
			document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,div,span,table").forEach(e => {
				const dummy = document.createElement('b');
				dummy.className = 'gaclltb_dummy';
				e.appendChild(dummy);
			});
		}
	}
});
