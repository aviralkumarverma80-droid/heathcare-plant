const plantImage = document.getElementById('plantImage');
const previewImage = document.getElementById('previewImage');
const previewContainer = document.getElementById('previewContainer');
const fileName = document.getElementById('fileName');
const detectBtn = document.getElementById('detectBtn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const diseaseName = document.getElementById('diseaseName');
const confidence = document.getElementById('confidence');

let selectedFile = null;

const diseaseCatalog = [
    'Leaf Spot Disease',
    'Powdery Mildew',
    'Rust Infection',
    'Early Blight',
    'Nutrient Deficiency',
    'Healthy Plant'
];

function updatePreview(file) {
    if (!file || !file.type.startsWith('image/')) {
        previewImage.removeAttribute('src');
        previewContainer.classList.remove('has-image');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        previewImage.src = event.target.result;
        previewContainer.classList.add('has-image');
    };
    reader.readAsDataURL(file);
}

plantImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    selectedFile = file;

    if (file) {
        fileName.textContent = file.name;
        updatePreview(file);
    } else {
        fileName.textContent = 'No image selected';
        previewImage.removeAttribute('src');
        previewContainer.classList.remove('has-image');
    }

    result.classList.add('hidden');
    diseaseName.textContent = '-';
    confidence.textContent = 'Confidence: -';
});

detectBtn.addEventListener('click', () => {
    if (!selectedFile) {
        alert('Please upload a plant image first.');
        return;
    }

    loading.classList.remove('hidden');
    result.classList.add('hidden');
    detectBtn.disabled = true;

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * diseaseCatalog.length);
        const randomDisease = diseaseCatalog[randomIndex];
        const randomConfidence = (Math.random() * 0.3 + 0.65).toFixed(2);

        diseaseName.textContent = randomDisease;
        confidence.textContent = `Confidence: ${randomConfidence * 100}%`;

        loading.classList.add('hidden');
        result.classList.remove('hidden');
        detectBtn.disabled = false;
    }, 1400);
});
