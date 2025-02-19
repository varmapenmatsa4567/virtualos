export const sortNotes = (folder) => {
    const { sort, order, notes } = folder;
    // console.log(folder);

    // Sort the notes array
    const sortedNotes = notes.sort((a, b) => {
        // console.log(sort, order, a, b);
        if (sort === 'dateModified') {
            // For date fields, convert to timestamps for comparison
            // console.log(new Date(a.dateModified) - new Date(b.dateModified));
            return order === 'asc' ? new Date(a.dateModified) - new Date(b.dateModified) : new Date(b.dateModified) - new Date(a.dateModified);
        }
        else if(sort === 'dateCreated') {
            return order === 'asc' ? new Date(a.dateCreated) - new Date(b.dateCreated) : new Date(b.dateCreated) - new Date(a.dateCreated);
        } else if (sort === 'title') {
            // For string fields, use localeCompare for comparison
            return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
        return 0; // Default case (no sorting)
    });
    // console.log(sortedNotes);

    return {
        ...folder,
        notes: sortedNotes
    };
};