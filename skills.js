document.addEventListener('DOMContentLoaded', () => {
    const skillData = {
        python: { name: 'Python', description: 'Proficient in Python for data analysis, machine learning, and web development. Experienced with libraries like Pandas, NumPy, and Scikit-learn.', proficiency: 90 },
        c: { name: 'C', description: 'Solid understanding of C for system-level programming and performance-critical applications. Familiar with memory management and data structures.', proficiency: 70 },
        java: { name: 'Java', description: 'Experienced in Java for building robust, object-oriented applications. Knowledge of core Java concepts and frameworks.', proficiency: 75 },
        html: { name: 'HTML', description: 'Strong command of HTML5 for creating well-structured, semantic, and accessible web pages.', proficiency: 95 },
        css: { name: 'CSS', description: 'Skilled in using CSS3, including Flexbox, Grid, and animations, to design responsive and visually appealing user interfaces.', proficiency: 85 },
        'machine-learning': { name: 'Machine Learning', description: 'In-depth knowledge of ML algorithms including regression, classification, and clustering. Practical experience in model training and evaluation.', proficiency: 85 },
        'machine-learning-algorithm': { name: 'Machine Learning Algorithm', description: 'Deep understanding of the theory and practical application of various machine learning algorithms.', proficiency: 87 },
        'deep-learning': { name: 'Deep Learning', description: 'Proficient in designing and training deep neural networks for complex tasks. Experience with frameworks like TensorFlow and Keras.', proficiency: 80 },
        'neural-networks': { name: 'Neural Networks', description: 'Strong understanding of various neural network architectures, including CNNs for image processing and RNNs for sequential data.', proficiency: 80 },
        'neural-networking': { name: 'Neural Networking', description: 'Knowledge of designing and implementing neural network models for various applications.', proficiency: 78 },
        'prompt-engineering': { name: 'Prompt Engineering', description: 'Skilled in designing and refining prompts for large language models (LLMs) to elicit precise, relevant, and creative outputs.', proficiency: 88 },
        'english': { name: 'English (Spoken)', description: 'Fluent in English with excellent communication skills, capable of collaborating effectively in international teams and presenting technical concepts clearly.', proficiency: 95 },
        'japanese': { name: 'Japanese (Spoken)', description: 'Conversational proficiency in Japanese, enabling basic communication and understanding in professional and social contexts.', proficiency: 60 }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const skillId = urlParams.get('skill');
    const data = skillData[skillId];

    const nameEl = document.getElementById('skill-name');
    const descriptionEl = document.getElementById('skill-description');
    const barEl = document.getElementById('proficiency-bar');
    const textEl = document.getElementById('proficiency-text');
    const titleEl = document.querySelector('title');

    if (data) {
        titleEl.textContent = `Skill: ${data.name} - Makaraju Mounieswar Raju`;
        nameEl.textContent = data.name;
        descriptionEl.textContent = data.description;
        
        setTimeout(() => {
            barEl.style.width = `${data.proficiency}%`;
            textEl.textContent = `${data.proficiency}%`;
        }, 300); 
    } else {
        nameEl.textContent = 'Skill Not Found';
        descriptionEl.textContent = 'The requested skill could not be found. Please return to the portfolio and select a valid skill.';
    }
});