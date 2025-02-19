import data from './data.js';

class BaseGallery {

    constructor() {
        this.uniqueId = data.length;

        if(!localStorage.getItem('galleryData')) {
            localStorage.setItem('galleryData', JSON.stringify(data.slice(0, 3)));
        }

        this.main = document.getElementById('gallery-page');
        this.gallery = document.getElementById('gallery');
        this.sortByName = document.getElementById('sort-name');
        this.sortByDate = document.getElementById('sort-date');
    }

    init() {
        this.dataCpy = JSON.parse(localStorage.getItem('galleryData'));
        const savedFilter = sessionStorage.getItem('sortMethod');
        if (savedFilter) {
            this.sortImages(savedFilter);
        }
        this.gallery.innerHTML = this.generateGallery(this.transformData(this.dataCpy));
        this.main.style.display = 'block';
    }

    initListeners() {
        this.sortByName.addEventListener('change', () => this.sortingByNameSelected());
        this.sortByDate.addEventListener('change', () => this.sortingByDateSelected());
    }

    sortingByNameSelected() {
        this.sortByDate.style.border = '1px solid #cfcfcf';
        this.sortByDate.style.color = '#515151';
        this.sortByName.style.border = '1px solid #0275d8';
        this.sortByName.style.color = '#0275d8';
        this.sortByDate.selectedIndex = 0;

        sessionStorage.setItem('sortMethod', this.sortByName.value);
        this.init();
    }

    sortingByDateSelected() {
        this.sortByName.style.border='1px solid #cfcfcf';
        this.sortByName.style.color = '#515151';
        this.sortByDate.style.border='1px solid #0275d8';
        this.sortByDate.style.color = '#0275d8';
        this.sortByName.selectedIndex = 0;

        sessionStorage.setItem('sortMethod', this.sortByDate.value);
        this.init();
    }

    sortImages(sortMethod) {
        switch (sortMethod) {
            case 'a-to-z':
                this.dataCpy.sort((a, b) => a.name.localeCompare(b.name)); return;
            case 'z-to-a':
                this.dataCpy.sort((a, b) => b.name.localeCompare(a.name)); return;
            case 'newest':
                this.dataCpy.sort((a, b) => b.date - a.date); return;
            case 'oldest':
                this.dataCpy.sort((a, b) => a.date - b.date); return;
        }
    }

    hide() {
        this.main.style.display = 'none';
    }

    transformData(data) {
        return data.map((item) => {
            return {
                id: item.id,
                name: item.name[0].toUpperCase() + item.name.slice(1).toLowerCase(),
                url: "http://" + item.url,
                description: item.description.slice(0, 22) + "...",
                date: (new Date(item.date)).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })
            }
        });
    }

    generateGallery(allImages) {
        let result = '';
        for (let index = 0; index < allImages.length; index++) {
            result += this.objectToHtml(allImages[index], allImages.length - index);
        }
        return result;
    }

    objectToHtml(item, position) {
        return `<div class="col-md-4 image-wrapper" id="${item.id}">
					<div class="card mb-4 box-shadow">
						<img class="card-img-top"
							 data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
							 alt="${item.name}" src="${item.url}" data-holder-rendered="true"
							 style="height: 225px; width: 100%; display: block;">
						<div class="card-body">
						    <h3>${position}. ${item.name}</h3>
							<p class="card-text">${item.description}</p>
							<div class="d-flex justify-content-between align-items-center">
				                <div class="btn-group">
					                <button type="button" class="btn btn-outline-secondary">View</button>
					                <button type="button" class="btn btn-outline-secondary">Edit</button>
				                </div>
				                <a href="#" class="btn btn-danger delete-btn">Delete</a>
				                <small class="text-muted">${item.date}</small>
			                </div>
						</div>
					</div>
				</div>`;
    }
}

class ExtendedGallery extends BaseGallery {

    constructor() {
        super();
        this.btn = document.getElementById('add-img');
    }

    initListeners() {
        super.initListeners();
        this.btn.addEventListener('click', () => this.addImage());
        this.gallery.addEventListener('click', (event) => this.deleteImage(event));
    }

    addImage() {
        const rndIndex = Math.floor(Math.random() * data.length);
        const newItem = {...data[rndIndex]};
        newItem.id = ++this.uniqueId;
        this.dataCpy = [newItem, ...this.dataCpy];
        localStorage.setItem('galleryData', JSON.stringify(this.dataCpy));
        super.init();
    }

    deleteImage(event) {
        if (event.target.classList.contains('delete-btn')) {
            const imageItem = event.target.closest('.image-wrapper');
            if (imageItem) {
                this.dataCpy = this.dataCpy.filter(item => item.id !== Number(imageItem.id));
                localStorage.setItem('galleryData', JSON.stringify(this.dataCpy));
                super.init();
            }
        }
    }
}

export default ExtendedGallery;
