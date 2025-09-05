import JSZip from 'jszip';
import { GeneratedFiles } from '@/types/portfolio';

export async function downloadPortfolioZip(files: GeneratedFiles, fileName: string = 'portfolio') {
  const zip = new JSZip();
  
  // Add files to zip
  zip.file('index.html', files.indexHtml);
  zip.file('styles.css', files.stylesCss);
  zip.file('script.js', files.scriptJs);
  
  // Add a README file
  const readme = `# ${fileName} Portfolio

This portfolio was generated using the Mini Portfolio Generator.

## Files included:
- index.html - Main portfolio page
- styles.css - Styling and responsive design
- script.js - Interactive features and animations

## Usage:
1. Open index.html in any modern web browser
2. Host the files on any web server for online access
3. Customize the styles in styles.css as needed

Generated on: ${new Date().toLocaleDateString()}
`;

  zip.file('README.md', readme);
  
  try {
    // Generate zip blob
    const blob = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}-portfolio.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error creating ZIP file:', error);
    return false;
  }
}