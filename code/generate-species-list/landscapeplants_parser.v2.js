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
        let data = {genus:undefined,species:undefined};
        [data.genus,data.species] = [...a.querySelectorAll('em')].map(x=>x.textContent.trim());
        data.genus = data.genus[0].toLowerCase()+data.genus.slice(1)
        try {
            data.cultivar = textContentNonRecursive(a).trim().match(/'(.+)'/)[1];
        } catch (error) {
            // console.log(a.textContent+' has bad cultivar');
        }
        try {
            data.common_name = a.querySelector('span.common-name').textContent.match(/\((.+)\)/)[1].trim();
        } catch (error) {
            console.log(a.textContent+' has no common name');
        }
        data.href = a.href;
        let sci_name = `${data.genus} - ${data.species}`

        if (!data.species) {
            console.log(`no species for  ${data.genus} - ${data.species} - ${data.cultivar} - ${data.common_name}`)
        }
        
        if (!(sci_name in data_by_sci_name)) {
            data_by_sci_name[sci_name] = {genus: data.genus,
                species: data.species};
        }

        if ('cultivar' in data) {
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