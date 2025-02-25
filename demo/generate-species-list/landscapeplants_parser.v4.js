/**
 * Program Name: Species List Parser
 * Description:
 * This program fetches and parses the species list from the
 * landscapeplants.oregonstate.edu website. The goal is to extract
 * relevant botanical information for each species, including genus,
 * species, subspecies, variety, forma, common name, trademarked name,
 * and hybrid status. The parsed data is then saved in JSON format,
 * with the extra types sorted under their species.
 *
 * Main Features:
 * - Fetches HTML content for each letter of the alphabet from the specified URL.
 * - Extracts botanical information, including handling special cases for
 *   subspecies, variety, forma, trademarked names, and hybrids.
 * - Marks entries with a hybrid flag if they are hybrids.
 * - Logs warnings if there are unprocessed content or unexpected data.
 *
 * Note: The genus names are intentionally lowercase for lookup purposes,
 *       despite the botanical convention of capitalizing genus names.
 *
 * Usage:
 * - The program outputs the parsed data to 'landscapeplants.json'.
 *
 * Author: Jake Thompson
 * Date: 2025-02-12
 *
 * Program description written by: Microsoft Copilot
 * Edited a bit by Jake.
 */

const fs = require('fs');
const {JSDOM} = require('jsdom');

function textContentNonRecursive(element) {
    let text = "";
    for (let node of element.childNodes) {
        if (node.nodeType === 3) { // Node.TEXT_NODE
            text += node.nodeValue;
        }
    }
    return text;
}

async function parseLetter(letter,full_list) {

    let data_by_sci_name = {}

    let url = `https://landscapeplants.oregonstate.edu/species/${letter}`
    console.log(url);
    let res = await fetch(url);
    let dom = new JSDOM(await res.text());
    
    let list = dom.window.document.querySelectorAll('.views-row');
    // let list = dom.window.document.querySelector('[role="tablist"]').querySelectorAll('.views-row');
    for (itm of list) {
        let a = itm.querySelector('a');
        let data = {genus:undefined,species:undefined,other_subtype:undefined};
        let ems = [...a.querySelectorAll('em')].map(x=>x.textContent.trim());
        [data.genus,data.species] = ems;
        other_subtypes = ems.slice(2);
        data.genus = data.genus[0].toLowerCase()+data.genus.slice(1);
        try {
            data.other_text = textContentNonRecursive(a).trim();
            data.cultivar = textContentNonRecursive(a).trim().match(/'(.+)'/)[1];
            data.other_text = data.other_text.replace(`'${data.cultivar}'`,"").trim() || undefined;
        } catch (error) {
            // console.log(a.textContent+' has bad cultivar');
        }

        // handle other types
        if (other_subtypes.length > 0) {
            let sub_ranks = data.other_text.match(/(subsp\.|var\.|f\.)/g) || [];
            other_subtypes.forEach((subtype, index) => {
                if (sub_ranks[index] === 'subsp.') {
                    data.subspecies = subtype;
                } else if (sub_ranks[index] === 'var.') {
                    data.variety = subtype;
                } else if (sub_ranks[index] === 'f.') {
                    data.forma = subtype;
                }
            });
            data.other_text = data.other_text.replace(/subsp\.|var\.|f\./g, '').trim() || undefined;
        }

        // find hybrids
        if (data.other_text && data.other_text.startsWith('×')) {
            data.hybrid = true;
            data.other_text = data.other_text.substring(1).trim() || undefined;
        }

        // extract trademarked names
        if (data.other_text && /™|®/.test(data.other_text)) {
            data.trademarked_name = data.other_text;
            data.other_text = undefined;
        }

        if (data.other_text) {
            console.warn(`Unprocessed other_text found: ${data.other_text}`);
        }

        try {
            data.common_name = a.querySelector('span.common-name').textContent.match(/\((.+)\)/)[1].trim();
        } catch (error) {
            // console.log(a.textContent+' has no common name');
        }
        data.href = a.href;
        let sci_name = `${data.genus} - ${data.species}`

        if (!data.species) {
            // console.log(`no species for  ${data.genus} - ${data.species} - ${data.cultivar} - ${data.common_name}`)
        }
        
        if (!(sci_name in data_by_sci_name)) {
            data_by_sci_name[sci_name] = {genus: data.genus,
                species: data.species};
        }
        if (data.subspecies) {
            delete data.genus
            delete data.species
            try {
                data_by_sci_name[sci_name].subspecies.push(data);
            } catch (error) {
                data_by_sci_name[sci_name].subspecies = [];
                data_by_sci_name[sci_name].subspecies.push(data);
            }
        } else if (data.variety) {
            delete data.genus
            delete data.species
            try {
                data_by_sci_name[sci_name].variety.push(data);
            } catch (error) {
                data_by_sci_name[sci_name].variety = [];
                data_by_sci_name[sci_name].variety.push(data);
            }
        } else if (data.forma) {
            delete data.genus
            delete data.species
            try {
                data_by_sci_name[sci_name].forma.push(data);
            } catch (error) {
                data_by_sci_name[sci_name].forma = [];
                data_by_sci_name[sci_name].forma.push(data);
            }
        } else if (data.other_subtype) {
            delete data.genus
            delete data.species
            try {
                data_by_sci_name[sci_name].other_subtype.push(data);
            } catch (error) {
                data_by_sci_name[sci_name].other_subtype = [];
                data_by_sci_name[sci_name].other_subtype.push(data);
            }
        } else if ('cultivar' in data) {
            delete data.genus
            delete data.species
            try {
                data_by_sci_name[sci_name].cultivars.push(data);
            } catch (error) {
                data_by_sci_name[sci_name].cultivars = [];
                data_by_sci_name[sci_name].cultivars.push(data);
            }
        } else {
            data_by_sci_name[sci_name] = {
                genus: data.genus,
                species: data.species,
                common_name: data.common_name,
                href: data.href,
                other_text: data_by_sci_name[sci_name].other_text,
                subspecies: data_by_sci_name[sci_name].subspecies,
                variety: data_by_sci_name[sci_name].variety,
                forma: data_by_sci_name[sci_name].forma,
                other_subtype: data_by_sci_name[sci_name].other_subtype,
                cultivars: data_by_sci_name[sci_name].cultivars
            };
        }
    }
    full_list.push(...Object.values(data_by_sci_name));
}

async function main(){

    let data = {
        base_url:"https://landscapeplants.oregonstate.edu",
        species: []
    }

    for (letter of 'abcdefghijklmnopqrstuvwxyz') {
        await parseLetter(letter,data.species)
    }

    fs.writeFile('landscapeplants.json',JSON.stringify(data,null,2), err => {
        if (err) {
            console.error('Error: writing landscapeplants.json', err);
        } else {
            console.log('wrote landscapeplants.json');
        }
    });
    
}

main();