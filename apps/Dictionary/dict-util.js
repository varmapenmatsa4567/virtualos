export const extractWordData = (data) => {
    if (!data || data.length === 0) return null;
    
    const result = data[0]; // Taking the first result as it's an array
    
    // Extract phonetics - take the first phonetic with text field
    let phonetics = "";
    if (result.phonetics && result.phonetics.length > 0) {
        for (const phonetic of result.phonetics) {
            if (phonetic.text) {
                phonetics = phonetic.text;
                break;
            }
        }
    }
    
    // Process meanings - combine duplicates by partOfSpeech
    const meaningsMap = new Map();
    if (result.meanings && result.meanings.length > 0) {
        for (const meaning of result.meanings) {
            const partOfSpeech = meaning.partOfSpeech;
            if (meaningsMap.has(partOfSpeech)) {
                // Combine definitions for existing partOfSpeech
                const existing = meaningsMap.get(partOfSpeech);
                existing.definitions.push(...meaning.definitions);
            } else {
                // Add new entry
                meaningsMap.set(partOfSpeech, {
                    partOfSpeech,
                    definitions: [...meaning.definitions]
                });
            }
        }
    }
    
    // Convert map back to array
    const meanings = Array.from(meaningsMap.values());
    
    // Extract all synonyms and antonyms from meanings
    const synonyms = new Set();
    const antonyms = new Set();
    
    if (result.meanings && result.meanings.length > 0) {
        for (const meaning of result.meanings) {
            if (meaning.synonyms && meaning.synonyms.length > 0) {
                meaning.synonyms.forEach(syn => synonyms.add(syn));
            }
            if (meaning.antonyms && meaning.antonyms.length > 0) {
                meaning.antonyms.forEach(ant => antonyms.add(ant));
            }
            
            // Also check definitions for synonyms/antonyms
            if (meaning.definitions && meaning.definitions.length > 0) {
                for (const def of meaning.definitions) {
                    if (def.synonyms && def.synonyms.length > 0) {
                        def.synonyms.forEach(syn => synonyms.add(syn));
                    }
                    if (def.antonyms && def.antonyms.length > 0) {
                        def.antonyms.forEach(ant => antonyms.add(ant));
                    }
                }
            }
        }
    }
    
    return {
        word: result.word || "",
        phonetics,
        meanings,
        synonyms: Array.from(synonyms),
        antonyms: Array.from(antonyms)
    };
};