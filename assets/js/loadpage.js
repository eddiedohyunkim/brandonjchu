const imageSection = document.querySelector('main.scroll');
const caption = document.getElementById('caption');
const photoCredit = document.getElementById('photoCredit');

window.addEventListener('DOMContentLoaded', () => {

	let observer = new IntersectionObserver(observeImgs, {
		root: null,   // default is the viewport
		threshold: 0.5 // percentage of target's visible area
	},)

	function observeImgs(entries, opts){
		entries.forEach(entry => {
			let currentImg = entry.target;
			let getMain = currentImg.closest('main');
			let getFigure = currentImg.closest('figure');
			let total = getMain.querySelectorAll('figure');
			let totalNum = total.length
			let index = [ ...total ].indexOf(getFigure);
			let description = getCaptions(currentImg);

			if(entry.isIntersecting){
				caption.innerHTML = `${index+1} / ${totalNum} ${description[0]}`;
				photoCredit.innerHTML = ' ' + description[1];
			}

		})
	}

	document.querySelectorAll('main.scroll > figure > img').forEach((entry) => {
		observer.observe(entry);
	});
	
});

function getCaptions(img){
	// CAPTION
	let path = img.src;
	// remove file path, extension from src 
	let filename = path.replace(/^.*[\\\/]/, '').split(".")[0];
	// change hyphens to spaces
	filename = filename.replace(/_/g, ' ');

	// PHOTOGRAPHER: must be after "shot by"
	filename = filename.toLowerCase();
	let photoCredit = ''
	if ( filename.includes('shot by') ){
		split = filename.split('--');
		filename = split[0];
		photoCredit = split[1];
	}
	
	return [filename, photoCredit];
}