const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const output = document.getElementById('output');
const loading = document.getElementById('loading');
const copyBtn = document.getElementById('copyBtn');
const dropZone = document.getElementById('dropZone');

// Process the image file (shared logic for both upload and drag-and-drop)
async function processImage(file) {
  if (!file || !file.type.startsWith('image/')) {
    output.textContent = 'Please upload or drop a valid image file.';
    preview.style.display = 'none';
    loading.style.display = 'none';
    return;
  }

  try {
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.style.display = 'block';
  } catch (error) {
    console.error('Error creating object URL:', error);
    preview.style.display = 'none';
  }
  output.textContent = 'Extracted text will appear here...';
  loading.style.display = 'block';

  try {
    const { createWorker } = Tesseract;
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(file);
    output.textContent = text || 'No text detected.';
    await worker.terminate();
  } catch (error) {
    output.textContent = 'Error processing image: ' + error.message;
  } finally {
    loading.style.display = 'none';
  }
}

// File input change event (for clicking "Upload Image")
imageInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  processImage(file);
});

// Drag-and-drop functionality
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = event.dataTransfer.files[0];
  if (!file) return;
  processImage(file);
});

// Keyboard support for drag-and-drop area
dropZone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    imageInput.click();
  }
});

// Copy button functionality
copyBtn.addEventListener('click', () => {
  const text = output.textContent;
  if (text && text !== 'Extracted text will appear here...' && text !== 'No text detected.') {
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  }
});