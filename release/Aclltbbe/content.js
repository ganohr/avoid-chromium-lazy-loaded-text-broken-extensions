let already_running = document.getElementsByClassName('gaclltb_dummy');
if (already_running === null || already_running.length === 0) {
	document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,div,span,table").forEach(e => {
		let dummy = document.createElement('b');
		dummy.className = 'gaclltb_dummy';
		e.appendChild(dummy);
	});
}
