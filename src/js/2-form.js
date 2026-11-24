const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

function getTrimmedData() {
  return {
    email: formData.email.trim(),
    message: formData.message.trim(),
  };
}

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!(name in formData)) {
    return;
  }

  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getTrimmedData()));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const data = getTrimmedData();

  if (data.email === '' || data.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(data);

  localStorage.removeItem(STORAGE_KEY);
  formData = {
    email: '',
    message: '',
  };
  form.reset();
});
