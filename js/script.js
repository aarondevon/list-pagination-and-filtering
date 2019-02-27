// Get needed elements
const studentList = document.querySelector('.student-list').getElementsByTagName('li');
const page = document.querySelector('.page');
// Set max number of students on each page
const maxItemsPerPage = 10;

// Show Page
const showPage = (list, page) => {
	const studentsOnPage = [];
	for (let i = 0; i < list.length; i++)
		if (i >= (page * maxItemsPerPage - maxItemsPerPage) && i < (page * maxItemsPerPage) ) {
			studentsOnPage.push(list[i]); 
		}
		return studentsOnPage;
}



// Append page links
const appendPageLinks = (list) => {
	// Get number of pages needed
	const numOfPages = list.length / 10;
	// Create div element
	const divPages = document.createElement('div');
	// Create ul element
	const ul = document.createElement('ul');

	// Add class names
	divPages.className = 'pagination';
	ul.className = 'pages';

	// Append ul and divPages
	divPages.appendChild(ul);
	page.appendChild(divPages);
	
	// Create buttons
	for ( let i = 0; i < numOfPages; i++) {
		let li = document.createElement('li');
		let a = document.createElement('a');	
		a.setAttribute('href', "#");
		a.textContent = i + 1;
		li.appendChild(a);
    ul.appendChild(li);
	}
	const a = ul.query
	console.log(a);
	
};



// Remember to delete the comments that came with this file, and replace them with your own code comments.