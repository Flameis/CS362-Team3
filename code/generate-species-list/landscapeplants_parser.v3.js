
// todo:  still does not handle the "×" for hybrids (currently in other_text)
    // check that this does not mess with the <em> order of: genus,species,(subspecies/variety/forma),(subspecies/variety/forma)
    //  by possibly denoting: species × other_species
// todo:  still does not handle the 1 instance of a variety of a subspecies (still has "var.  " in other_text)
    // warn: its also using the wrong one for subspecies (uses the variety name for subspecies)
// todo:  does not handle trademarked names (currently in other_text)


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
        [data.genus,data.species,data.other_subtype] = [...a.querySelectorAll('em')].map(x=>x.textContent.trim());
        try {
            data.other_text = textContentNonRecursive(a).trim();
            data.cultivar = textContentNonRecursive(a).trim().match(/'(.+)'/)[1];
            data.other_text = data.other_text.replace(`'${data.cultivar}'`,"").trim() || undefined;
        } catch (error) {
            // console.log(a.textContent+' has bad cultivar');
        }
        if (data.other_subtype!==undefined)
            if (data.other_text && data.other_text.includes('subsp.')) {
                data.other_text = data.other_text.replace('subsp.','').trim() || undefined
                data.subspecies = data.other_subtype;
                delete data.other_subtype;
            } else if (data.other_text && data.other_text.includes('var.')) {
                data.other_text = data.other_text.replace('var.','').trim() || undefined
                data.variety = data.other_subtype;
                delete data.other_subtype;
            } else if (data.other_text && data.other_text.includes('f.')) {
                data.other_text = data.other_text.replace('f.','').trim() || undefined
                data.forma = data.other_subtype;
                delete data.other_subtype;
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