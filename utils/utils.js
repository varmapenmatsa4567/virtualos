import { v4 as uuidv4 } from 'uuid';

export const formatDate = (date) => {
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const day = date.getDate().toString();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minute = date.getMinutes().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    return [`${weekday} ${month} ${day}`,`${hour}:${minute} ${period}`];
  };

export const getTimeByGMTOffset = (offset, date) => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const newDate = new Date(utc + (3600000*offset));
    return newDate;
}

export const isBothTimeSame = (time1, time2) => {
    const dt1 = new Date(time1);
    const dt2 = new Date(time2);
    // console.log(dt1.getHours(), dt2.getHours(), dt1.getMinutes(), dt2.getMinutes(), dt1.getSeconds(), dt2.getSeconds());
    return dt1.getHours() === dt2.getHours() && dt1.getMinutes() === dt2.getMinutes() && dt1.getSeconds() === dt2.getSeconds();
}

export const formatDateTimeforFinder = (date) => {
    console.log(date);
    const dt = new Date(date);
    const month = dt.toLocaleString('en-US', { month: 'short' });
    const day = dt.getDate().toString().padStart(2, '0');
    const year = dt.getFullYear();
    const hours = dt.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = dt.getMinutes().toString().padStart(2, '0'); // Pad minutes to 2 digits
    const ampm = dt.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}

export const formatDateTimeforNotes = (date) => {
    // console.log(date);
    const dt = new Date(date);
    const month = dt.toLocaleString('en-US', { month: 'short' });
    const day = dt.getDate().toString();
    const year = dt.getFullYear();
    const hours = dt.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = dt.getMinutes().toString().padStart(2, '0'); // Pad minutes to 2 digits
    const ampm = dt.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    return `${day} ${month} ${year} at ${hours}:${minutes} ${ampm}`;
}

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
    const dt = new Date(date);
    const month = dt.toLocaleString('en-US', { month: 'short' });
    const day = dt.getDate().toString().padStart(2, '0');
    const year = dt.getFullYear().toString().slice(2);
    const hours = dt.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = dt.getMinutes().toString().padStart(2, '0'); // Pad minutes to 2 digits
    const ampm = dt.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    if (isToday(dt)) {
        return `${hours}:${minutes} ${ampm}`;
    } else if (isYesterday(dt)) {
        return `Yesterday`;
    } else {
        return `${month} ${day}, ${year}`;
    }
};

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

export const getId = () => {
    return uuidv4();
}

export const stopPropagation = (e) => {
    e.stopPropagation();
}



