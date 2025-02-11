export const formatDate = (date) => {
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const day = date.getDate().toString();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minute = date.getMinutes().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    return [`${weekday} ${month} ${day}`,`${hour}:${minute} ${period}`];
  };

export const lockScreenDate = (date) => {
    const weekday = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate().toString();

    return `${weekday}, ${month} ${day}`;
}

export const lockScreenTime = (date) => {
    const hour = (date.getHours() % 12 || 12).toString();
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${hour}:${minute}`;
}

export const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear();
}

export const isYesterday = (someDate) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return someDate.getDate() == yesterday.getDate() &&
        someDate.getMonth() == yesterday.getMonth() &&
        someDate.getFullYear() == yesterday.getFullYear();
}

export const noteDate = (date) => {
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    if(isToday(date)) return `${date.getHours() % 12 || 12}:${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'} `;
    else if(isYesterday(date)) return `Yesterday`;
    else return `${month} ${day}, ${year}`;
}

export const getLanguageFromExtension = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
  
    const languageMap = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
      txt: 'plaintext',
      // Add more mappings as needed
    };
  
    return languageMap[extension] || 'plaintext'; // Default to plaintext if extension is not recognized
  };

