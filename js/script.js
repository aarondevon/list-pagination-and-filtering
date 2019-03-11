// Create div element
const divPages = document.createElement('div');

// Create ul element
const ulPage = document.createElement('ul');

// Create HTML Elements for search
const studentSearch = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const clearButton = document.createElement('button');

// Add class names
divPages.className = 'pagination';
ulPage.className = 'pages';
studentSearch.className = 'student-search';

// Get needed elements
const studentList = document.querySelector('.student-list').getElementsByTagName('li');
const page = document.querySelector('.page');
// Page links
const liList = ulPage.getElementsByTagName('li');
const pageHeader = document.querySelector('.page-header');

// Append ul and divPages
divPages.appendChild(ulPage);
page.appendChild(divPages);

// Add place holder
studentSearch.innerHTML = '<input placeholder="Search for students..."></input>';
// Add search button text
searchButton.textContent = 'Search';
clearButton.textContent = 'Clear';
// Append Search Elements
studentSearch.appendChild(searchButton);
studentSearch.appendChild(clearButton);
pageHeader.appendChild(studentSearch);

// Set max number of students on each page
const maxItemsPerPage = 10;

// Get number of pages needed
const numOfPages = (list) => 
{ return list.length / 10;};

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

// Remove page links
const removePageLinks = (pageLinks) => {
	let liListLength = liList.length;
	for (let i = 0; i < liListLength; i++) {
		liList[0].remove();
	}
}

// Append page links
const appendPageLinks = (studentList) => {
	let pageNumber;		
	// Create buttons
	for ( let i = 0; i < numOfPages(studentList); i++) {
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.setAttribute('href', "#");
		a.textContent = i + 1;
		li.appendChild(a);
    ulPage.appendChild(li);
	}

	// Add Active class to first page
	liList[0].firstElementChild.className = 'active';
	
	// Add event listener to to page links
	for ( let i = 0; i < numOfPages(studentList); i++) {
		liList[i].addEventListener('click', (event) => {
		
			if (event.target.tagName === 'A') {
				// Get page number
				pageNumber = parseInt(event.target.textContent);
				// Remove active class on other page links when page link is clicked
				for (let i = 0; i < numOfPages(studentList); i++) {
					if (liList[i].firstElementChild.classList.contains('active')) {
						liList[i].firstElementChild.classList.remove('active');
					}
				}
				// Add active class to target page link
				event.target.className = 'active';
				// Hide student list again
				hideStudents(studentList);
			
				// Display students for correct page link clicked
				for (let i = 0; i < showPage(studentList, pageNumber).length; i ++) {
					showPage(studentList, pageNumber)[i].style.display = '';
				}
			}
		})	
	}
	return liList;
};

let studentNames = document.querySelector('.student-list').getElementsByTagName('h3');
let studentEmails = document.querySelector('.student-list').getElementsByClassName('email');

searchButton.addEventListener('click', (e) => {
	hideStudents(studentList);
	removePageLinks(liList);
	let name = document.querySelector('.student-search').firstElementChild.value;
	const searchArray =[];
	for (let i = 0; i < studentNames.length; i++) {
		if (studentNames[i].textContent.toString().includes(name) || studentEmails[i].textContent.toString().includes(name)) {
			searchArray.push(studentList[i]);
		}	
	}
	if (searchArray.length === 0) {
		document.querySelector('h2').innerHTML = 'NO RESULTS';
	} else {
		displayPageOne(searchArray);
	appendPageLinks(searchArray);
	}
})

clearButton.addEventListener('click', (e) => {
	document.querySelector('h2').innerHTML = 'STUDENTS';
	document.querySelector('.student-search').firstElementChild.value = '';
	hideStudents(studentList);
	removePageLinks(liList);
	displayPageOne(studentList);
	appendPageLinks(studentList);
})

hideStudents(studentList);
displayPageOne(studentList);
appendPageLinks(studentList);

