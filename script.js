const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const output = document.getElementById('output');
const loading = document.getElementById('loading');
const copyBtn = document.getElementById('copyBtn');

imageInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Display image preview
  preview.src = URL.createObjectURL(file);
  preview.style.display = 'block';
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
});

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