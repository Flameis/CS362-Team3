const { JSDOM } = require('jsdom');

async function fetchPlantPageData(url) {
    let res = await fetch(url);
    let dom = new JSDOM(await res.text());

    let content = dom.window.document.querySelector('#content');
    let common_names = [...content.querySelectorAll('.field-name-field-plant-common-name .field-item')].map(item => item.textContent.trim());
    let pronunciation = content.querySelector('.field-name-field-plant-pronunciation .field-item')?.textContent.trim();
    let family = content.querySelector('.field-name-field-plant-family .field-item')?.textContent.trim();
    let plant_type = content.querySelector('.field-name-field-plant-type .field-item')?.textContent.trim();
    let native_to_oregon = content.querySelector('.field-name-field-plant-native .field-item')?.textContent.trim() === 'Yes';
    let original_info = content.querySelector('.field-name-field-plant-original-info .field-item')?.innerHTML.trim();
    let genus = content.querySelector('.field-name-field-plant-genus .field-item a')?.textContent.trim();
    let synonyms = [...content.querySelectorAll('.field-name-field-synonyms .field-item')].map(item => item.textContent.trim());
    let image_elements = content.querySelectorAll('.field-content a.colorbox');
    let images = [...image_elements].map(a => ({
        title: a.getAttribute('title'),
        url: a.getAttribute('href')
    }));

    // Detect any other unprocessed fields
    let other_fields = {};
    content.querySelectorAll('.field').forEach(field => {
        let field_name = field.querySelector('.field-label')?.textContent.trim();
        if (!['Common name:', 'Pronunciation:', 'Family:', 'Genus:', 'Type:', 'Native to (or naturalized in) Oregon:'].includes(field_name)) {
            other_fields[field_name] = [...field.querySelectorAll('.field-item')].map(item => item.textContent.trim());
        }
    });

    if (Object.keys(other_fields).length > 0) {
        console.warn(`New fields detected; they have been placed in other_fields: ${Object.keys(other_fields).join(', ')}`);
    }

    return {
        common_names: common_names,
        pronunciation: pronunciation,
        family: family,
        plant_type: plant_type,
        native_to_oregon: native_to_oregon,
        original_info: original_info,
        genus: genus,
        synonyms: synonyms,
        images: images,
        other_fields: other_fields
    };
}

// usage:
fetchPlantPageData('https://landscapeplants.oregonstate.edu/plants/garrya-elliptica').then(details => {
    console.log(details);
});
