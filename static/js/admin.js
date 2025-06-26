document.addEventListener('DOMContentLoaded', function () {
    console.log('Admin script loaded.');
    const workshopList = document.getElementById('workshop-list');
    const saveOrderBtn = document.getElementById('save-order-btn');
    const toggleBtn = document.getElementById('toggle-add-form-btn');
    const addForm = document.getElementById('add-workshop-form');
    const addWorkshopBtn = document.getElementById('add-workshop-btn');
    let sortable;

    // Modal elements
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    let workshopIdToDelete = null;

    if (!toggleBtn || !addForm || !addWorkshopBtn) {
        console.error('Could not find all required form elements.');
        return;
    }

    function createFormGroup(labelText, inputId, inputValue) {
        const group = document.createElement('div');
        group.className = 'form-group';
        const label = document.createElement('label');
        label.setAttribute('for', inputId);
        label.textContent = labelText;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = inputId;
        input.value = inputValue;
        group.appendChild(label);
        group.appendChild(input);
        return group;
    }

    function fetchWorkshops() {
        fetch('/api/workshops')
            .then(response => response.json())
            .then(data => {
                workshopList.innerHTML = '';
                data.forEach(workshop => {
                    const li = document.createElement('li');
                    li.className = 'workshop-item';
                    li.dataset.id = workshop.id;

                    const form = document.createElement('form');
                    form.className = 'workshop-form';
                    form.dataset.id = workshop.id;

                    form.appendChild(createFormGroup('Title', `title-${workshop.id}`, workshop.title));
                    form.appendChild(createFormGroup('Instructor', `instructor-${workshop.id}`, workshop.instructor));
                    form.appendChild(createFormGroup('Time', `time-${workshop.id}`, workshop.time));
                    form.appendChild(createFormGroup('Date', `date-${workshop.id}`, workshop.date));
                    form.appendChild(createFormGroup('Style', `style-${workshop.id}`, workshop.style));
                    form.appendChild(createFormGroup('Price', `price-${workshop.id}`, workshop.price));

                    const actions = document.createElement('div');
                    actions.className = 'form-actions';

                    const saveBtn = document.createElement('button');
                    saveBtn.type = 'submit';
                    saveBtn.className = 'save-btn';
                    saveBtn.textContent = 'Save';
                    actions.appendChild(saveBtn);

                    const deleteBtn = document.createElement('button');
                    deleteBtn.type = 'button';
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.dataset.id = workshop.id;
                    deleteBtn.textContent = 'Delete';
                    actions.appendChild(deleteBtn);

                    form.appendChild(actions);

                    li.appendChild(form);
                    workshopList.appendChild(li);
                });

                if (sortable) {
                    sortable.destroy();
                }
                sortable = new Sortable(workshopList, {
                    animation: 150,
                });
            });
    }

    workshopList.addEventListener('submit', function(e) {
        if (e.target.classList.contains('workshop-form')) {
            e.preventDefault();
            const id = e.target.dataset.id;
            const data = {
                title: document.getElementById(`title-${id}`).value,
                instructor: document.getElementById(`instructor-${id}`).value,
                time: document.getElementById(`time-${id}`).value,
                date: document.getElementById(`date-${id}`).value,
                style: document.getElementById(`style-${id}`).value,
                price: document.getElementById(`price-${id}`).value,
            };

            fetch(`/api/workshops/update/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(() => {
                alert(`Workshop ${id} updated!`);
            });
        }
    });

    workshopList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.preventDefault();
            workshopIdToDelete = e.target.dataset.id;
            deleteModal.style.display = 'flex';
        }
    });

    function closeDeleteModal() {
        workshopIdToDelete = null;
        deleteModal.style.display = 'none';
    }

    confirmDeleteBtn.addEventListener('click', function() {
        if (workshopIdToDelete) {
            fetch(`/api/workshops/delete/${workshopIdToDelete}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    fetchWorkshops();
                } else {
                    alert('Error deleting workshop.');
                }
                closeDeleteModal();
            });
        }
    });

    cancelDeleteBtn.addEventListener('click', closeDeleteModal);

    saveOrderBtn.addEventListener('click', function() {
        const order = sortable.toArray();
        fetch('/api/workshops/reorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: order })
        }).then(() => {
            alert('Order saved!');
            fetchWorkshops();
        });
    });

    toggleBtn.addEventListener('click', () => {
        console.log('Toggle button clicked!');
        addForm.classList.toggle('hidden');
        const isHidden = addForm.classList.contains('hidden');
        console.log('Form is now hidden:', isHidden);
        toggleBtn.textContent = isHidden ? '+ Add New Workshop' : '- Hide Form';
    });

    function validateAddForm() {
        const inputs = addForm.querySelectorAll('input[required]');
        let allValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allValid = false;
            }
        });
        addWorkshopBtn.disabled = !allValid;
    }

    addForm.addEventListener('input', validateAddForm);

    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(addForm);

        fetch('/api/workshops/add', {
            method: 'POST',
            body: formData // No headers needed, browser sets it for multipart/form-data
        }).then(response => response.json()).then(data => {
            if (data.status === 'success') {
                alert('New workshop added!');
                addForm.reset();
                addForm.classList.add('hidden');
                toggleBtn.textContent = '+ Add New Workshop';
                addWorkshopBtn.disabled = true;
                fetchWorkshops();
            } else {
                alert('Error: ' + data.message);
            }
        }).catch(error => {
            console.error('Error adding workshop:', error);
            alert('An error occurred. Please try again.');
        });
    });

    fetchWorkshops();
});
