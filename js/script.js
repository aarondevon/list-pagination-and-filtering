// Create div element
const divPages = document.createElement('div');

// Create ul element
const ul = document.createElement('ul');
// Create HTML Elements for search
const studentSearch = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

// Add class names
divPages.className = 'pagination';
ul.className = 'pages';

// Get needed elements
const studentList = document.querySelector('.student-list').getElementsByTagName('li');
const page = document.querySelector('.page');
const liList = ul.getElementsByTagName('li');
const pageHeader = document.querySelector('.page-header');

// Append ul and divPages
divPages.appendChild(ul);
page.appendChild(divPages);

// Set max number of students on each page
const maxItemsPerPage = 10;

// Get number of pages needed
const numOfPages = studentList.length / 10;

// Return student array for page
const showPage = (list, page) => {
	const studentsOnPage = [];
	for (let i = 0; i < list.length; i++)
		if (i >= (page * maxItemsPerPage - maxItemsPerPage) && i < (page * maxItemsPerPage) ) {
			studentsOnPage.push(list[i]); 
		}
		return studentsOnPage;
}

// hideStudents
const hideStudents = (list)  =>{
	// Hide All Students
	for (let i = 0; i < list.length; i ++) {
		list[i].style.display = 'none';
	}
}

// Show page one
const displayPageOne = (list) => {
	// Show students for page 1	
	for (let i = 0; i < showPage(list, 1).length; i ++) {
		showPage(list, 1)[i].style.display = '';
	}
}

// Append page links
const appendPageLinks = (list) => {
	let pageNumber;		
	// Create buttons
	for ( let i = 0; i < numOfPages; i++) {
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.setAttribute('href', "#");
		a.textContent = i + 1;
		li.appendChild(a);
    ul.appendChild(li);
	}

	// Add Active class to first page
	liList[0].firstElementChild.className = 'active';
	// Add event listener to to page links
	for ( let i = 0; i < numOfPages; i++) {
		liList[i].addEventListener('click', (event) => {
		
			if (event.target.tagName === 'A') {
				// Get page number
				pageNumber = parseInt(event.target.textContent);
				// Remove active class on other page links when page link is clicked
				for (let i = 0; i < numOfPages; i++) {
					if (liList[i].firstElementChild.classList.contains('active')) {
						liList[i].firstElementChild.classList.remove('active');
					}
				}
				// Add active class to target page link
				event.target.className = 'active';
				// Hide student list again
				for (let i = 0; i < list.length; i ++) {
					list[i].style.display = 'none';
				}
				// Display students for correct page link clicked
				for (let i = 0; i < showPage(list, pageNumber).length; i ++) {
					showPage(list, pageNumber)[i].style.display = '';
				}
			}
		})
	}
};

hideStudents(studentList);
displayPageOne(studentList);
appendPageLinks(studentList);

